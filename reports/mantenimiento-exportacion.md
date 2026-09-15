# Exportación estática y mantenimiento

Las páginas inicio, hogar, oficina y quienes-somos exportan HTML completo y cargan únicamente public/site-interactions.js, con nombre versionado por contenido. scripts/secure-export.mjs elimina su arranque de React y sus precargas. Contacto conserva React para el formulario.

Si se agrega una función React interactiva a una página informativa, retirarla primero de staticPages en scripts/secure-export.mjs. La compilación rechaza controles de formulario en esas páginas para evitar publicarlos sin comportamiento. El menú nativo details y los enlaces funcionan sin React.

El script de exportación también genera la política CSP para los documentos HTML a partir de los scripts reales de la compilación. Nunca copiar una CSP de otra compilación. El deploy publica dist/client, no el código fuente.

Tailwind busca clases sólo en app y en los tres componentes del sitio indicados al inicio de app/globals.css. Si se incorpora un componente nuevo con clases Tailwind, registrar su ruta allí. Referencia: https://tailwindcss.com/docs/detecting-classes-in-source-files

Validación antes de publicar: compilación, cinco rutas, menú móvil, logo e imágenes, visibilidad de WhatsApp junto al crédito y envío exitoso/fallido simulado del formulario. No enviar pedidos reales como prueba automática.
