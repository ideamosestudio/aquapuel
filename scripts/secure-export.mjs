import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

// The site is exported HTML: allow exactly its generated inline bootstrap scripts.
const directory = 'dist/client';
// Only these pages have no client behavior beyond SiteHeader/SiteFooter.
// Remove a page from this list when adding React-dependent interactivity.
const staticPages = new Set([
  'index.html',
  'hogar.html',
  'oficina.html',
  'quienes-somos.html',
]);
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
const enhancement = readFileSync('scripts/site-interactions.js', 'utf8');
const enhancementName =
  'site-interactions-' +
  createHash('sha256').update(enhancement).digest('hex').slice(0, 12) +
  '.js';
writeFileSync(join(directory, enhancementName), enhancement);
const hashes = new Set();
for (const name of readdirSync(directory).filter((name) =>
  name.endsWith('.html'),
)) {
  let html = readFileSync(join(directory, name), 'utf8');
  if (staticPages.has(name)) {
    if (/<(?:form|button|input|select|textarea)\b/i.test(html)) {
      throw new Error(
        name +
          ': interactive controls require hydration; remove this page from staticPages.',
      );
    }
    // Preserve JSON-LD, rendered HTML and stylesheet links. No framework bootstrap
    // is needed on this explicit static allowlist; contacto is deliberately kept.
    html = html.replace(
      /<script\b([^>]*)>[\s\S]*?<\/script>/gi,
      (tag, attributes) =>
        /type=["']application\/ld\+json["']/i.test(attributes) ? tag : '',
    );
    html = html.replace(/<link\b[^>]*>/gi, (tag) =>
      /rel=["']modulepreload["']/i.test(tag) || /as=["']script["']/i.test(tag)
        ? ''
        : tag,
    );
    html = html.replace(
      '</body>',
      '<script defer src="' +
        basePath +
        '/' +
        enhancementName +
        '"></script></body>',
    );
    writeFileSync(join(directory, name), html);
  }
  for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) {
    if (match[1])
      hashes.add(
        "'sha256-" +
          createHash('sha256').update(match[1]).digest('base64') +
          "'",
      );
  }
}
const policy = [
  "default-src 'self'",
  "script-src 'self' " + [...hashes].join(' '),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://formsubmit.co",
  'frame-src https://www.google.com https://maps.google.com',
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formsubmit.co",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');
const file = join(directory, '.htaccess');
writeFileSync(
  file,
  readFileSync(file, 'utf8') +
    '\n<IfModule mod_headers.c>\n  <FilesMatch \"\\.html$\">\n  Header always set Content-Security-Policy "' +
    policy +
    '"\n  </FilesMatch>\n</IfModule>\n',
);
console.log(
  'Static CSP generated with ' + hashes.size + ' inline script hashes.',
);
