# Aquapuel: mejoras y próximos pasos

Revisión: 15 de septiembre de 2026.

## Implementado

- Imágenes WebP: 17 archivos pasan de 15.682.519 a 1.165.752 bytes (92,6% menos). Dimensiones explícitas, carga diferida y prioridad de la portada.
- Actualización de dependencias compatibles: npm audit pasa de 11 alertas a 0 conocidas. Dependabot semanal y control de alertas altas en la publicación. Esto no garantiza ausencia de toda vulnerabilidad.
- Políticas de seguridad, HTTPS, compresión y caché preparadas en la configuración del sitio. Aplicación confirmada en la web pública.
- Títulos y descripciones propios, URLs canónicas, sitemap, robots, datos estructurados LocalBusiness/WebSite y metadatos sociales. La copia GitHub Pages se marca noindex.
- Contenido principal disponible en HTML; llms.txt con información comprobada. No se inventaron zonas, reseñas, certificados ni precios.
- Favicon, rutas internas, iconos reales de redes y crédito simple «Diseño que fluye» con el logo enlazado a Ideamos. WhatsApp se oculta al llegar al crédito.
- Formulario nativo PHP en Nuthost, destinatario info@aquapuel.com, validación y límites contra abuso. Recepción real confirmada por la usuaria; sin intermediarios.

## Verificación

Compilación correcta; cinco páginas generadas. Navegador en 390 y 1366 px sin desbordamiento ni errores JavaScript/CSP, logo cargado, rutas internas correctas y WhatsApp ocultándose/reapareciendo. Envío del formulario probado con respuesta simulada: no se enviaron correos reales.

Medición inicial Lighthouse móvil: rendimiento 61, accesibilidad 90, buenas prácticas 100, SEO 100; LCP 19,1 s, bloqueo 460 ms. Es una prueba de laboratorio, no datos reales de todos los visitantes. SEO 100 no significa primer puesto ni posicionamiento resuelto.

## Pendientes priorizados

| Prioridad | Trabajo                               | Qué falta / para qué sirve                                                                                                                                                          |
| --------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Alta      | Habilitar SSH                         | Nuthost acepta conexión por 9022, pero deniega shell al usuario aquapuel. Solicitar habilitación; clave pública ya autorizada.                                                      |
| Alta      | Confirmar actualización automática    | Publicación automática observada en varias versiones. Resta revisar registro y evitar ejecuciones superpuestas al habilitar SSH.                                                    |
| Alta      | Medir web pública optimizada          | Confirmar compresión, caché, CSP, redirecciones HTTPS y www, error 404 y recursos; comparar Lighthouse móvil tras despliegue.                                                       |
| Alta      | Search Console y Bing Webmaster Tools | Verificar propiedad, enviar sitemap y revisar indexación, canónicas y errores. Requiere acceso del titular.                                                                         |
| Alta      | Entrega real del formulario           | Recepción real confirmada en info@aquapuel.com el 15/09. SPF y DKIM presentes; DMARC en monitoreo. Revisar alineación con cabeceras reales.                                         |
| Alta      | Privacidad y tratamiento de datos     | Definir responsable, finalidades, alojamiento, retención y política de privacidad adecuada antes de incorporar seguimiento adicional.                                               |
| Alta      | Zonas reales y Perfil de Empresa      | Pendiente expresamente por decisión de la usuaria. No crear páginas de localidades sin cobertura confirmada.                                                                        |
| Media     | Datos reales de rendimiento           | Seguir Core Web Vitals en Search Console/CrUX cuando exista muestra suficiente; revisar especialmente móviles lentos.                                                               |
| Media     | Servidor                              | Revisar certificados/renovación, versiones del servidor, copias de seguridad y prueba de restauración, permisos y protección del proveedor. El hosting compartido limita controles. |
| Media     | Residuos de publicaciones             | La copia actual no borra imágenes ni paquetes antiguos. Inventariar y retirar sólo archivos propios obsoletos con respaldo.                                                         |
| Media     | Calidad de contenido                  | Incorporar información confirmada sobre envases, retornos, entrega, mantenimiento de dispensers y controles de calidad; publicar documentación auténtica si existe.                 |
| Media     | Medición comercial                    | Acordar métricas de clic a WhatsApp, pedidos y contactos; configurar analítica respetando privacidad.                                                                               |
| Media     | Reputación local                      | Unificar nombre/dirección/teléfono, completar perfil oficial y conseguir reseñas auténticas; enlaces de clientes/proveedores relevantes.                                            |
| Media     | Accesibilidad                         | Auditoría manual de teclado, lectores de pantalla, contraste, zoom y formularios; resolver advertencias heredadas del código.                                                       |
| Baja      | JavaScript y fuentes                  | Cuatro páginas ya usan sólo 1.168 bytes de JavaScript propio; contacto conserva React. Evaluar fuentes y recursos críticos para reducir más el LCP.                                 |
| Baja      | Dependencias mayores                  | Evaluar migraciones con cambios incompatibles por separado. Vinext sigue siendo beta: revisar estabilidad y alternativas si surgen incidencias.                                     |

## Oportunidades de contenido y búsqueda

Hipótesis para validar en Search Console y con datos reales; sin volúmenes ni posiciones inventados:

1. Agua en bidones Moreno.
2. Agua de mesa Cuartel V.
3. Aquapuel contacto.
4. Aquapuel pedidos.
5. Bidones de agua 12 litros.
6. Bidones de agua 20 litros.
7. Agua envasada para el hogar.
8. Agua para oficinas.
9. Agua para comercios.
10. Dispenser frío calor para empresas.
11. Cómo pedir agua Aquapuel.
12. Retorno de envases de agua.
13. Entrega de bidones: horarios y condiciones.
14. Limpieza y uso del dispenser.
15. Diferencias entre bidones de 12 y 20 litros.

Primero mejorar las páginas existentes. Nuevas páginas locales sólo después de confirmar reparto. Una comparación comercial de competidores requiere definir cobertura y recopilar ofertas vigentes; no se midieron cuotas ni posiciones.

## Lectura por buscadores e IA

La prioridad es contenido útil y verificable, accesible sin JavaScript, enlaces claros e indexación permitida. llms.txt es complementario, no una garantía de inclusión o citas. Google explica que sus funciones de IA no requieren archivos especiales ni un esquema exclusivo: https://developers.google.com/search/docs/appearance/ai-features

Referencias: https://developers.google.com/search/docs/appearance/structured-data/local-business y https://developers.openai.com/api/docs/bots

## Resultado público confirmado

Las cinco páginas responden 200, la URL inexistente 404; /hogar.html y /hogar/ redirigen a /hogar. Confirmados HTTPS, cabeceras de seguridad/CSP, gzip en HTML, caché de imágenes, robots, sitemap y llms.txt. Se observaron publicaciones automáticas de varias versiones sin intervención manual.

Última medición Lighthouse móvil (15/09, versión e46fdd3): **83 rendimiento, 100 accesibilidad, 100 buenas prácticas y 100 SEO**. LCP **3,8 s**, bloqueo **270 ms**, transferencia **964 KiB**. Base inicial: 61 rendimiento, LCP 19,1 s y 14.393 KiB. Son mediciones de laboratorio: hubo variación entre ejecuciones (59–83 en las últimas iteraciones), no representan todas las visitas. El LCP todavía necesita mejorar; falta validar Core Web Vitals con datos reales.

Se retiraron componentes sin uso y 14 dependencias directas (348 paquetes eliminados en la limpieza). CSS reducido de unos 192 KB a 46 KB. Cuatro páginas conservan HTML y un script de 1.168 bytes; contacto mantiene la interacción React. Auditoría de dependencias: cero alertas conocidas en esta revisión; no es garantía de ausencia de vulnerabilidades. CI verifica formato, lint, exportación y controles del formulario PHP sin enviar correos.

La imagen social profesional está publicada con metadatos en las cinco páginas: /media/aquapuel-social.png. No se descarga como imagen de contenido durante una visita normal. Detalles en imagen-social.md.

La usuaria confirmó la recepción real del formulario en info@aquapuel.com. El envío usa el correo del propio Nuthost; no utiliza un proveedor externo de formularios. Detalles en formulario-nuthost.md. Se corrige además el desplazamiento al sustituir el formulario por la confirmación: el mensaje recibe foco y queda visible.

SSH sigue pendiente de habilitación de shell. No se pudo inspeccionar el registro del cron ni retirar residuos del servidor. GitHub no permitió comprobar/activar las alertas administrativas de vulnerabilidades con este acceso (404); Dependabot y la auditoría de paquetes del flujo sí están configurados.
