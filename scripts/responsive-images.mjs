import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { basename, join } from 'node:path';
import sharp from 'sharp';

// Only called for pages whose React hydration is deliberately removed.
// Keep original src as the no-srcset fallback and never upscale an image.
const cache = new Map();
export async function responsiveImages(html, directory, basePath) {
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const source = tag.match(/\bsrc="([^"]+)"/)?.[1];
    if (!source?.startsWith(basePath + '/media/') || !source.endsWith('.webp'))
      continue;
    const relative = source.slice(basePath.length + 1);
    let variants = cache.get(relative);
    if (!variants) {
      const original = await readFile(join(directory, relative));
      const { width } = await sharp(original).metadata();
      if (!width || width <= 650) continue;
      variants = [];
      await mkdir(join(directory, 'responsive'), { recursive: true });
      for (const size of [480, 720, 960]) {
        if (size >= width) continue;
        const buffer = await sharp(original)
          .resize({ width: size })
          .webp({ quality: 82 })
          .toBuffer();
        if (buffer.length >= original.length) continue;
        const hash = createHash('sha256')
          .update(buffer)
          .digest('hex')
          .slice(0, 12);
        const name =
          basename(relative, '.webp') + '-' + size + '-' + hash + '.webp';
        await writeFile(join(directory, 'responsive', name), buffer);
        variants.push(basePath + '/responsive/' + name + ' ' + size + 'w');
      }
      variants.push(source + ' ' + width + 'w');
      cache.set(relative, variants);
    }
    if (variants.length < 2) continue;
    const fullWidth = /page-hero-bg|closing-photo/.test(tag);
    const sizes = fullWidth ? '100vw' : '(max-width: 900px) 100vw, 50vw';
    // React can emit a high-priority preload; give it the same candidates so
    // mobile does not download both the original and the selected variant.
    for (const preload of html.matchAll(/<link\b[^>]*>/gi)) {
      if (
        preload[0].includes('href="' + source + '"') &&
        /as="image"/.test(preload[0]) &&
        !preload[0].includes('imagesrcset=')
      ) {
        html = html.replace(
          preload[0],
          preload[0].replace(
            '<link',
            '<link imagesrcset="' +
              variants.join(', ') +
              '" imagesizes="' +
              sizes +
              '"',
          ),
        );
      }
    }
    html = html.replace(
      tag,
      tag.replace(
        '<img',
        '<img srcset="' + variants.join(', ') + '" sizes="' + sizes + '"',
      ),
    );
  }
  if (html.includes('hero-scene-one')) {
    // This photo is a dimmed decorative background. Crop at build time for
    // the tall mobile hero instead of transferring a full landscape image.
    const buffer = await sharp(join(directory, 'media/planta-aquapuel.webp'))
      .resize(640, 1600, {
        fit: 'cover',
        position: 'centre',
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toBuffer();
    const hash = createHash('sha256').update(buffer).digest('hex').slice(0, 12);
    const name = 'hero-mobile-' + hash + '.webp';
    await mkdir(join(directory, 'responsive'), { recursive: true });
    await writeFile(join(directory, 'responsive', name), buffer);
    html = html.replace(
      '</head>',
      '<style>@media(max-width:600px){.hero-scene-one{background-image:url("' +
        basePath +
        '/responsive/' +
        name +
        '")!important}}</style></head>',
    );
  }
  return html;
}
