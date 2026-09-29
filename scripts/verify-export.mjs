import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const directory = 'dist/client';
const pages = ['index', 'hogar', 'oficina', 'quienes-somos', 'contacto'];
const documents = pages.map((page) =>
  readFileSync(join(directory, page + '.html'), 'utf8'),
);
for (const [index, html] of documents.entries()) {
  assert.match(
    html,
    /smooth-wheel-[a-f0-9]+\.js/,
    pages[index] + ': missing wheel enhancement',
  );
  assert.match(html, /rel="canonical"/, pages[index] + ': missing canonical');
  assert.match(
    html,
    /property="og:image"[^>]+aquapuel-social\.png/,
    pages[index] + ': missing share image',
  );
  assert.match(
    html,
    /name="twitter:card"[^>]+summary_large_image/,
    pages[index] + ': missing social card',
  );
  assert.doesNotMatch(
    html,
    /formsubmit\.co|aquapuel@gmail\.com/,
    pages[index] + ': old email service',
  );
  assert.ok(
    html.includes('info@aquapuel.com'),
    pages[index] + ': contact email missing',
  );
  const schemas = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ];
  assert.ok(schemas.length, pages[index] + ': missing structured data');
  schemas.forEach((match) => JSON.parse(match[1]));
  if (pages[index] !== 'contacto') {
    assert.doesNotMatch(
      html,
      /<script[^>]*src="[^"]*\/_next\//,
      pages[index] + ': unnecessary framework',
    );
    assert.match(html, /site-interactions-[a-f0-9]+\.js/);
  }
}
const content = documents.join('\n');
for (const name of readdirSync('public/media', { recursive: true })) {
  if (!/\.(png|webp|svg|jpg)$/i.test(name)) continue;
  const relative = '/media/' + name.replaceAll('\\', '/');
  assert.ok(content.includes(relative), 'Unused public resource: ' + relative);
}
const image = readFileSync('public/media/aquapuel-social.png');
assert.equal(image.readUInt32BE(16), 1733);
assert.equal(image.readUInt32BE(20), 907);
assert.ok(image.length < 5 * 1024 * 1024, 'Share image exceeds 5 MB');
console.log(
  'Export verified: five pages, metadata, static scripts and referenced media.',
);

// Every executable inline script must be authorized by this document's CSP.
const htaccess = readFileSync(join(directory, '.htaccess'), 'utf8');
const policies = new Map(
  [
    ...htaccess.matchAll(
      /<Files "([^"]+)">\s*Header always set Content-Security-Policy "([^"]+)"/g,
    ),
  ].map((match) => [match[1], match[2]]),
);
for (const name of readdirSync(directory).filter((name) =>
  name.endsWith('.html'),
)) {
  const html = readFileSync(join(directory, name), 'utf8');
  const policy = policies.get(name);
  assert.ok(policy, name + ': missing page CSP');
  assert.ok(
    policy.includes("object-src 'none'") &&
      policy.includes("frame-ancestors 'none'"),
  );
  assert.doesNotMatch(
    policy.split(';').find((part) => part.trim().startsWith('script-src')),
    /unsafe-inline|unsafe-eval/,
  );
  for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) {
    if (!match[1]) continue;
    const hash = createHash('sha256').update(match[1]).digest('base64');
    assert.ok(
      policy.includes("'sha256-" + hash + "'"),
      name + ': CSP blocks an inline script',
    );
  }
  for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(', ')) {
      const url = candidate.split(' ')[0];
      const path = url.replace(/^.*?\/(media|responsive)\//, '$1/');
      assert.ok(
        readFileSync(join(directory, path)).length,
        name + ': missing responsive image',
      );
    }
  }
}
console.log('Security policies and responsive image files verified.');
