<?php
declare(strict_types=1);
define('AQUAPUEL_CONTACT_TEST', true);
require __DIR__ . '/../public/api/contact.php';

function expect(bool $condition, string $message): void {
    if (!$condition) { throw new RuntimeException($message); }
}
$directory = sys_get_temp_dir() . '/aquapuel-contact-test-' . bin2hex(random_bytes(8));
$server = ['REQUEST_METHOD' => 'POST', 'HTTP_ORIGIN' => 'https://aquapuel.com', 'CONTENT_TYPE' => 'application/json', 'REMOTE_ADDR' => '192.0.2.10'];
$data = ['_honey' => '', 'nombre' => 'Prueba local', 'telefono' => '1112345678', 'email' => 'prueba@example.com', 'direccion' => 'Prueba 123', 'localidad' => 'Moreno', 'destino' => 'Mi hogar', 'formato' => '12 litros', 'dispenser' => 'No', 'frecuencia' => 'Pedido por única vez', 'cantidad' => '1', 'referencia' => '', 'mensaje' => 'Mensaje de prueba'];
$calls = [];
$deliver = static function ($to, $subject, $message, $headers) use (&$calls) { $calls[] = [$to, $subject, $message, $headers]; return true; };
$run = static function ($input, $request = null) use ($directory, $server, $deliver) { return \Aquapuel\Contact\handle_request($request ?? $server, is_string($input) ? $input : json_encode($input), $directory, $deliver); };
try {
    expect($run($data, array_merge($server, ['REQUEST_METHOD' => 'GET']))[0] === 405, 'Reject GET');
    expect($run($data, array_merge($server, ['HTTP_ORIGIN' => 'https://other.example']))[0] === 403, 'Reject external origin');
    expect($run($data, array_merge($server, ['HTTP_ORIGIN' => '']))[0] === 403, 'Reject missing origin');
    expect($run($data, array_merge($server, ['CONTENT_TYPE' => 'text/plain']))[0] === 415, 'Reject simple cross-origin content type');
    expect($run('{bad json')[0] === 400, 'Reject invalid JSON');
    expect($run(str_repeat('x', 17000))[0] === 413, 'Bound request size');
    expect($run(array_merge($data, ['email' => "a@example.com\r\nBcc: attacker@example.com"]))[0] === 422, 'Reject header injection');
    expect($run(array_merge($data, ['nombre' => ['array']]))[0] === 422, 'Reject nested values');
    expect($run(array_merge($data, ['cantidad' => '0']))[0] === 422, 'Reject invalid quantity');
    expect($run(array_merge($data, ['formato' => 'Invalid']))[0] === 422, 'Validate enum');
    expect($run(array_merge($data, ['_honey' => 'bot']))[0] === 200 && count($calls) === 0, 'Trap bots without delivering');
    expect($run($data)[0] === 200 && count($calls) === 1, 'Accept valid request');
    expect($calls[0][0] === 'info@aquapuel.com', 'Use requested recipient');
    expect($calls[0][3]['From'] === 'AQUAPUEL <info@aquapuel.com>', 'Use fixed sender');
    expect($calls[0][3]['Reply-To'] === 'prueba@example.com', 'Reply to visitor');
    expect(strpos(quoted_printable_decode($calls[0][2]), 'Mensaje de prueba') !== false, 'Keep message body');
    $failed = \Aquapuel\Contact\handle_request($server, json_encode($data), $directory, static function () { return false; });
    expect($failed[0] === 503 && $failed[1]['success'] === false, 'Never report success when mail fails');
    for ($i = 0; $i < 3; $i++) { expect($run($data)[0] === 200, 'Allow five attempts'); }
    expect($run($data)[0] === 429 && count($calls) === 4, 'Rate limit prevents delivery');
    expect(\Aquapuel\Contact\reserve_request($directory, '192.0.2.10', time() + 901) === 200, 'Rate limit expires');
    echo "Contact tests passed: validation, anti-abuse and local mail contract. No emails sent.\n";
} finally {
    if (is_file($directory . '/rate-limit.json')) { unlink($directory . '/rate-limit.json'); }
    if (is_dir($directory)) { rmdir($directory); }
}
