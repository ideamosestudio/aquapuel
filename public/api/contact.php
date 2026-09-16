<?php
// Receives only same-origin JSON. Delivery uses this hosting account's mail server.
declare(strict_types=1);

namespace Aquapuel\Contact;

const RECIPIENT = 'info@aquapuel.com';
const MAX_BODY_BYTES = 16384;

function response(int $status, bool $success): array
{
    return [$status, ['success' => $success]];
}

function valid_text($value, int $limit, bool $required = true, bool $multiline = false): bool
{
    if (!is_string($value) || ($required && trim($value) === '')) {
        return false;
    }
    if (preg_match_all('/./us', $value) > $limit || preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', $value)) {
        return false;
    }
    return $multiline || !preg_match('/[\r\n]/', $value);
}

// A private, bounded, locked ledger; no names, emails or message bodies are stored.
function reserve_request(string $directory, string $ip, int $now, int $perIp = 5, int $global = 100): int
{
    if (!is_dir($directory) && !@mkdir($directory, 0700, true) && !is_dir($directory)) {
        return 503;
    }
    $file = $directory . '/rate-limit.json';
    if (is_link($file)) {
        return 503;
    }
    $handle = @fopen($file, 'c+');
    if (!$handle) {
        return 503;
    }
    @chmod($file, 0600);
    if (!flock($handle, LOCK_EX)) {
        fclose($handle);
        return 503;
    }
    try {
        $raw = stream_get_contents($handle);
        $state = $raw === '' ? ['salt' => bin2hex(random_bytes(32)), 'requests' => []] : json_decode($raw, true);
        if (!is_array($state) || !isset($state['salt'], $state['requests']) || !is_string($state['salt']) || !is_array($state['requests'])) {
            return 503;
        }
        $total = 0;
        foreach ($state['requests'] as $key => $times) {
            $times = array_values(array_filter($times, static function ($time) use ($now) { return is_int($time) && $time > $now - 900; }));
            if (!$times) {
                unset($state['requests'][$key]);
            } else {
                $state['requests'][$key] = $times;
                $total += count($times);
            }
        }
        $key = hash_hmac('sha256', $ip, $state['salt']);
        if (count($state['requests'][$key] ?? []) >= $perIp || $total >= $global) {
            return 429;
        }
        $state['requests'][$key][] = $now;
        $encoded = json_encode($state);
        rewind($handle);
        if ($encoded === false || !ftruncate($handle, 0) || fwrite($handle, $encoded) !== strlen($encoded) || !fflush($handle)) {
            return 503;
        }
        return 200;
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

// A short-lived, single-use token belongs to the browser session, not the page HTML.
function valid_challenge(array $challenge, $token, int $now): bool
{
    return is_string($token) && strlen($token) === 64
        && isset($challenge['token'], $challenge['issued'])
        && is_string($challenge['token']) && is_int($challenge['issued'])
        && $now - $challenge['issued'] >= 2 && $now - $challenge['issued'] <= 1800
        && hash_equals($challenge['token'], $token);
}

function handle_request(array $server, string $body, string $storage, callable $deliver, array $challenge = []): array
{
    if (($server['REQUEST_METHOD'] ?? '') !== 'POST') {
        return response(405, false);
    }
    if (($server['HTTP_ORIGIN'] ?? '') !== 'https://aquapuel.com') {
        return response(403, false);
    }
    if (strtolower(trim(explode(';', $server['CONTENT_TYPE'] ?? '')[0])) !== 'application/json') {
        return response(415, false);
    }
    if (strlen($body) > MAX_BODY_BYTES) {
        return response(413, false);
    }
    $data = json_decode($body, true);
    if (!is_array($data)) {
        return response(400, false);
    }
    if (!isset($data['_honey']) || !is_string($data['_honey'])) {
        return response(422, false);
    }
    if ($data['_honey'] !== '') {
        return response(200, true);
    }
    $fields = ['nombre' => 120, 'telefono' => 40, 'email' => 254, 'direccion' => 240, 'localidad' => 120];
    foreach ($fields as $field => $limit) {
        if (!valid_text($data[$field] ?? null, $limit)) {
            return response(422, false);
        }
    }
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL) || !preg_match('/^[0-9+(). -]{6,40}$/D', $data['telefono'])) {
        return response(422, false);
    }
    $options = [
        'destino' => ['Mi hogar', 'Mi oficina o empresa', 'Mi comercio'],
        'formato' => ['12 litros', '20 litros', 'Quiero asesoramiento'],
        'dispenser' => ['No', 'Natural', 'Consultar frío-calor sujeto a disponibilidad'],
        'frecuencia' => ['Pedido por única vez', 'Semanal', 'Quincenal', 'A coordinar'],
    ];
    foreach ($options as $field => $values) {
        if (!in_array($data[$field] ?? null, $values, true)) {
            return response(422, false);
        }
    }
    if (!is_string($data['cantidad'] ?? null) || !preg_match('/^[1-9][0-9]{0,2}$/D', $data['cantidad'])) {
        return response(422, false);
    }
    if (!valid_text($data['referencia'] ?? '', 240, false) || !valid_text($data['mensaje'] ?? '', 2000, false, true)) {
        return response(422, false);
    }
    if (!valid_challenge($challenge, $data['_token'] ?? null, time())) {
        return response(403, false);
    }
    $rate = reserve_request($storage, $server['REMOTE_ADDR'] ?? 'unknown', time());
    if ($rate !== 200) {
        return response($rate, false);
    }
    $labels = ['nombre' => 'Nombre', 'telefono' => 'Teléfono', 'email' => 'Email', 'destino' => 'Pedido para', 'direccion' => 'Dirección', 'localidad' => 'Localidad', 'referencia' => 'Referencia', 'formato' => 'Formato', 'cantidad' => 'Cantidad', 'dispenser' => 'Dispenser', 'frecuencia' => 'Frecuencia', 'mensaje' => 'Aclaraciones'];
    $lines = ['Nuevo pedido desde aquapuel.com', ''];
    foreach ($labels as $field => $label) {
        $lines[] = $label . ': ' . trim($data[$field] ?? '');
    }
    $headers = [
        'From' => 'AQUAPUEL <' . RECIPIENT . '>',
        'Reply-To' => $data['email'],
        'MIME-Version' => '1.0',
        'Content-Type' => 'text/plain; charset=UTF-8',
        'Content-Transfer-Encoding' => 'quoted-printable',
    ];
    $accepted = $deliver(RECIPIENT, 'AQUAPUEL - Nuevo pedido web', quoted_printable_encode(implode("\r\n", $lines)), $headers);
    return response($accepted ? 200 : 503, $accepted);
}

if (!defined('AQUAPUEL_CONTACT_TEST')) {
    ini_set('display_errors', '0');
    header('Content-Type: application/json; charset=UTF-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    header('Allow: GET, POST');
    $storage = dirname(__DIR__, 2) . '/.aquapuel-form';
    try {
        $method = $_SERVER['REQUEST_METHOD'] ?? '';
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        $crossSite = ($_SERVER['HTTP_SEC_FETCH_SITE'] ?? '') === 'cross-site';
        if ($method === 'GET' && ($_SERVER['HTTP_X_AQUAPUEL_FORM'] ?? '') === '1' && !$crossSite && ($origin === '' || $origin === 'https://aquapuel.com')) {
            $rate = reserve_request($storage . '/challenges', $_SERVER['REMOTE_ADDR'] ?? 'unknown', time(), 30, 500);
            if ($rate !== 200) {
                [$status, $payload] = response($rate, false);
            } else {
                session_name('__Host-aquapuel_form');
                if (!session_start(['use_strict_mode' => 1, 'use_only_cookies' => 1, 'cookie_secure' => 1, 'cookie_httponly' => 1, 'cookie_samesite' => 'Strict', 'cookie_path' => '/'])) { throw new \RuntimeException('Session unavailable'); }
                if (!isset($_SESSION['challenge']) || time() - $_SESSION['challenge']['issued'] > 1500) {
                    $_SESSION['challenge'] = ['token' => bin2hex(random_bytes(32)), 'issued' => time()];
                }
                $status = 200;
                $payload = ['token' => $_SESSION['challenge']['token'], 'wait' => max(0, 2 - (time() - $_SESSION['challenge']['issued']))];
                session_write_close();
            }
        } elseif ($method === 'POST' && $origin === 'https://aquapuel.com' && !$crossSite) {
            session_name('__Host-aquapuel_form');
            if (!session_start(['use_strict_mode' => 1, 'use_only_cookies' => 1, 'cookie_secure' => 1, 'cookie_httponly' => 1, 'cookie_samesite' => 'Strict', 'cookie_path' => '/'])) { throw new \RuntimeException('Session unavailable'); }
            [$status, $payload] = handle_request($_SERVER, file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1), $storage, static function ($to, $subject, $message, $headers) {
                return function_exists('mail') && mail($to, $subject, $message, $headers);
            }, $_SESSION['challenge'] ?? []);
            if ($status === 200) { unset($_SESSION['challenge']); }
            session_write_close();
        } else {
            [$status, $payload] = response($method === 'POST' || $method === 'GET' ? 403 : 405, false);
        }
    } catch (\Throwable $error) {
        error_log('Aquapuel contact handler failed; check private storage and mail configuration.');
        [$status, $payload] = response(503, false);
    }
    http_response_code($status);
    if ($status === 429) {
        header('Retry-After: 900');
    }
    echo json_encode($payload);
}
