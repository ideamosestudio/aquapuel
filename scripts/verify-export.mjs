import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const directory = 'dist/client';
const pages = ['index', 'hogar', 'oficina', 'quienes-somos', 'contacto'];
const documents = pages.map((page) =>
  readFileSync(join(directory, page + '.html'), 'utf8'),
);
for (const [index, html] of documents.entries()) {
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
