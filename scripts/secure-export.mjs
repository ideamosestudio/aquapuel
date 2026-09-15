import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

// The site is exported HTML: allow exactly its generated inline bootstrap scripts.
const directory = 'dist/client';
const hashes = new Set();
for (const name of readdirSync(directory).filter((name) => name.endsWith('.html'))) {
  const html = readFileSync(join(directory, name), 'utf8');
  for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) {
    if (match[1]) hashes.add("'sha256-" + createHash('sha256').update(match[1]).digest('base64') + "'");
  }
}
const policy = [
  "default-src 'self'",
  "script-src 'self' " + [...hashes].join(' '),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://formsubmit.co",
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formsubmit.co",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join('; ');
const file = join(directory, '.htaccess');
writeFileSync(file, readFileSync(file, 'utf8') + '\n<IfModule mod_headers.c>\n  Header always set Content-Security-Policy "' + policy + '"\n</IfModule>\n');
console.log('Static CSP generated with ' + hashes.size + ' inline script hashes.');
