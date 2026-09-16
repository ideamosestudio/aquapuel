# Servidor Nuthost: operación y pendientes

Revisado el 15/09/2026 con acceso SSH real al usuario aquapuel, puerto 9022.

## Realizado

- Cron cada cinco minutos mediante `/home5/aquapuel/.aquapuel-deploy/sync.py`, versionado en `ops/cpanel-sync.py`. Conserva el despliegue de cPanel y sus registros.
- Bloqueo exclusivo para evitar solapamientos; sólo publica cuando cambia la revisión. Rechaza cambios locales, ramas inesperadas, enlaces simbólicos y exportaciones incompletas. Actualiza Git exclusivamente por avance directo.
- Copia previa de public_html en `.aquapuel-deploy/backups`, fuera del acceso web, con hasta tres respaldos. Se verifica restauración de HTML, PHP y configuración en un directorio temporal privado. No equivale a restaurar toda la cuenta de correo/cPanel.
- Confirmación del despliegue mediante comparación SHA-256 de todos los archivos exportados, antes de marcar la versión como publicada. Una segunda ejecución sin cambios no volvió a desplegar.
- Registro privado de hasta 1 MB y dos rotaciones. Cron anterior respaldado en `.aquapuel-deploy/crontab.before`.
- 18 imágenes/favicon antiguos, 15.683.231 bytes, movidos a `.aquapuel-deploy/obsolete-20260915`, con inventario y copia completa previa. Carpeta pública: 23 MB → 7,8 MB. Se conservan recursos con hash de versiones recientes para no romper pestañas abiertas.
- Publicación con permisos públicos 644 para archivos y 755 para directorios; los respaldos y registros administrativos conservan permisos privados. Se corrigió y verificó un 403 de CSS causado por la máscara de permisos del proceso de despliegue.
- Directorios SSH y datos privados del formulario con modo 700; archivo de límites de envío con modo 600. Sin archivos públicos escribibles por cualquier usuario.
- PHP del dominio: ea-php83; CLI 8.3.33. Endpoint sin errores de sintaxis; controles HTTP 405/422/403/415 verificados sin enviar correos.
- Certificado de aquapuel.com y comodín gestionado por AutoSSL de Let's Encrypt; vencimiento informado 14/12/2026. Revisar futuras renovaciones, no es garantía de que nunca puedan fallar.

## Operación

Ejecutar manualmente `python3 /home5/aquapuel/.aquapuel-deploy/sync.py` equivale a adelantar el próximo cron. No borra archivos del hosting durante la publicación. Los cambios al script de operaciones se instalan deliberadamente por SSH; publicar el repositorio no sobrescribe ese script administrativo.

Los respaldos locales protegen frente a una publicación incorrecta. Falta una copia fuera de Nuthost y una prueba de recuperación integral que incluya correo, configuración y DNS. También resta definir retención y responsables. No se modificaron las casillas ni los registros DNS.

## Pendientes que necesitan acceso o información adicional

- Search Console y Bing Webmaster Tools: propiedad, sitemap e indexación.
- Localidades cubiertas y Perfil de Empresa: diferidos expresamente por la usuaria.
- Política de privacidad y retención de pedidos; métricas comerciales a acordar.
- Confirmar con Nuthost actualización del sistema/servidor web y política de copias de toda la cuenta: el usuario compartido no tiene administración del sistema.
- Monitorizar Core Web Vitals reales; la última medición de laboratorio fue 83/100, con LCP 3,8 s. No se repitió por cambios limitados al footer.
- Revisión periódica de dependencias y futuras renovaciones SSL. Documentación de soporte PHP: https://www.php.net/supported-versions.php.
