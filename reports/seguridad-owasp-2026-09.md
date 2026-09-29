# Seguridad y rendimiento de Aquapuel

Revisión: 29 de septiembre de 2026. Referencia: https://top10.owasp.org/2025/.

OWASP Top 10 orienta la revisión de riesgos; no es un complemento instalable ni una certificación de seguridad absoluta.

## Cambios

- Dependencias compatibles actualizadas, incluido Vinext 1.0.0 estable. Se mantienen TypeScript 5.9 y los tipos de Node 22 correspondientes al entorno de publicación: una migración mayor se debe evaluar por separado.
- Parche `fflate` 0.7.5 fijado por override: Satori fija 0.7.3 y arrastra GHSA-px8p-9vwx-vf98. Quitar el override cuando el proveedor incorpore una versión corregida. Los paquetes de Cloudflare actualizados corrigen la cadena de Undici detectada en la revisión inicial.
- Publicación bloqueada ante alertas moderadas, altas o críticas. Revisión semanal y de pull requests con permisos de lectura. Acciones oficiales actualizadas y fijadas a commits completos.
- CSP específica por documento, con hashes de sus scripts. Ningún permiso `unsafe-inline` ni `unsafe-eval` para JavaScript. CSS conserva `unsafe-inline` por los estilos usados por React.
- Bloqueo Apache ampliado para respaldos, registros, volcados SQL y archivos de configuración; límite de 16 KiB al cuerpo del formulario antes de PHP.
- Lectura acotada del registro de límites; datos dañados fallan con 503. Validación explícita de UTF-8 y manejo genérico de excepciones del transporte de correo. Los registros de fallos no incluyen nombres, correos ni mensajes.
- Imágenes responsivas generadas en la compilación, sin ampliar originales y con nombres basados en su contenido. Precargas coordinadas con las variantes. Fondo decorativo específico para móvil. Se conservan las imágenes actuales del bidón y el diseño.

## Riesgos OWASP y alcance

| Riesgo                        | Cobertura y límites                                                                                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A01 Control de acceso         | Sitio público sin cuentas ni panel administrativo. Archivos internos bloqueados; formulario con origen, sesión y token. cPanel/GitHub requieren controles de sus cuentas. |
| A02 Configuración             | HTTPS, HSTS, CSP, no listado de directorios, antienmarcado, tipos MIME, permisos de navegador y cabeceras verificables.                                                   |
| A03 Cadena de suministro      | Versiones fijadas, lockfile, auditoría, Dependabot, revisiones periódicas y acciones fijadas por SHA.                                                                     |
| A04 Criptografía              | HTTPS; token aleatorio comparado con hash_equals; cookie Secure/HttpOnly/SameSite=Strict.                                                                                 |
| A05 Inyección                 | Validación del lado servidor, listas de valores admitidos, límites de texto y correo con remitente fijo. No hay SQL ni ejecución de comandos a partir de campos.          |
| A06 Diseño                    | Límites globales y por IP, honeypot, espera y caducidad del desafío, formulario con mensajes de error. No sustituye la protección de red del hosting.                     |
| A07 Autenticación             | No hay autenticación de visitantes; el token del formulario no es un sistema de login. Revisar MFA y accesos de las cuentas administrativas con sus titulares.            |
| A08 Integridad                | Instalación por lockfile, controles antes de publicar y hashes de scripts/imágenes; despliegue existente con validación de archivos.                                      |
| A09 Registros y alertas       | Registro genérico de fallos y auditoría semanal en GitHub. La alerta operativa de errores PHP y la revisión de registros del proveedor quedan pendientes.                 |
| A10 Condiciones excepcionales | Cuerpos y lecturas acotados, registros dañados rechazados, errores de transporte sin detalles internos ni falso éxito.                                                    |

## Verificación y límites

Las pruebas PHP se ejecutan con el intérprete del hosting y callbacks simulados: validación, abuso, caducidad, UTF-8, registros dañados, fallo y excepción de correo. No envían emails. La aceptación del transporte no demuestra la recepción en la casilla.

La prueba de navegador recorre las cinco páginas en 390 y 1366 px, comprueba desbordamientos, menú, imágenes responsivas, errores JavaScript/CSP y envío simulado. La exportación comprueba los hashes CSP y la existencia de las imágenes generadas.

Las mediciones Lighthouse son de laboratorio y varían con la carga del equipo. No se debe interpretar una diferencia entre pruebas concurrentes como mejora demostrada. Los informes crudos se conservan en la carpeta local ignorada `work/`.

Quedan fuera del control del código: actualizaciones del sistema del hosting, WAF/red, MFA y accesos administrativos, respaldo externo y restauración integral, retención de datos y alertas operativas. No se modifican DNS, correo ni cuentas de administración.

El estado de publicación y las mediciones finales se añaden tras completar la verificación.
