# AQUAPUEL

Sitio institucional de [aquapuel.com](https://aquapuel.com), con páginas para hogares, oficinas, la empresa y pedidos.

## Requisitos y trabajo local

Node.js 22.13 o superior. La publicación usa Node.js 22.

```sh
npm ci
npm run dev
npm run lint
npm run format:check
npm run build
```

`npm run format` aplica el formato común. La versión publicable queda en `dist/client/`. No subir `node_modules`, archivos `.env`, claves SSH ni carpetas de trabajo.

## Estructura

- `app/`: páginas, metadatos raíz y estilos.
- `components/`: encabezado/pie, bloques compartidos y formulario. Sólo componentes usados.
- `lib/`: contacto, rutas de recursos y SEO.
- `public/`: recursos publicados, favicon, imagen social, sitemap, robots y configuración Apache.
- `scripts/`: optimización de la exportación, interacción ligera y comprobaciones.
- `.github/workflows/`: compilación y publicación.
- `reports/`: decisiones de mantenimiento y pendientes.

## Publicación

1. Los cambios en `main` ejecutan `Preparar web para cPanel`.
2. GitHub instala, revisa y compila; guarda la web en `cpanel-deploy`.
3. El cron de cPanel obtiene esa rama y ejecuta su `.cpanel.yml` para copiar a `public_html`.
4. Verificar el sitio público: una compilación exitosa no garantiza que el hosting ya haya actualizado.

La rama `cpanel-deploy` es generada: editar siempre `main`. GitHub Pages conserva una copia marcada `noindex` y con canónica apuntando a Aquapuel.

## Rendimiento y seguridad

Las páginas informativas publican HTML con un script pequeño. Contacto conserva React para el formulario. Ver [mantenimiento de la exportación](reports/mantenimiento-exportacion.md) antes de agregar interactividad.

Se usan imágenes optimizadas y dimensiones explícitas, caché para recursos versionados, HTTPS y una política CSP calculada en cada compilación. Las imágenes `<img>` son intencionales: este hosting sirve una exportación estática sin optimizador de imágenes de Next.js.

Dependabot propone actualizaciones semanales. `npm audit --audit-level=high` bloquea publicaciones con alertas altas/críticas conocidas. Revisar los cambios antes de fusionarlos.

## Imagen al compartir

`public/media/aquapuel-social.png` es la imagen Open Graph y Twitter Card en todas las páginas. Sus dimensiones y texto alternativo están en `lib/seo.ts`. No se carga como imagen de contenido de la página. Las plataformas pueden conservar vistas previas anteriores en caché.

## Datos y próximos pasos

Contacto y redes: `lib/contact.ts`. Títulos, descripciones y datos estructurados: `lib/seo.ts`. El formulario usa FormSubmit; comprobar su activación y entrega real con el titular del correo.

[Informe y pendientes](reports/optimizacion-y-pendientes.md). Cobertura real de reparto y Perfil de Empresa quedan pendientes de confirmación. No añadir zonas, reseñas, certificados ni precios sin respaldo.
