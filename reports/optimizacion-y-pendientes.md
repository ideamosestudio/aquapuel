# Aquapuel: mejoras y próximos pasos

Revisión: 15 de septiembre de 2026.

## Implementado

- Imágenes WebP: 17 archivos pasan de 15.682.519 a 1.165.752 bytes (92,6% menos). Dimensiones explícitas, carga diferida y prioridad de la portada.
- Actualización de dependencias compatibles: npm audit pasa de 11 alertas a 0 conocidas. Dependabot semanal y control de alertas altas en la publicación. Esto no garantiza ausencia de toda vulnerabilidad.
- Políticas de seguridad, HTTPS, compresión y caché preparadas en la configuración del sitio. Falta confirmar su aplicación efectiva por Nuthost tras publicar.
- Títulos y descripciones propios, URLs canónicas, sitemap, robots, datos estructurados LocalBusiness/WebSite y metadatos sociales. La copia GitHub Pages se marca noindex.
- Contenido principal disponible en HTML; llms.txt con información comprobada. No se inventaron zonas, reseñas, certificados ni precios.
- Favicon, rutas internas, iconos reales de redes y crédito simple «Diseño que fluye» con el logo enlazado a Ideamos. WhatsApp se oculta al llegar al crédito.
- Formulario con límite de espera, prevención de doble envío y comprobación de la respuesta del proveedor.

## Verificación

Compilación correcta; cinco páginas generadas. Navegador en 390 y 1366 px sin desbordamiento ni errores JavaScript/CSP, logo cargado, rutas internas correctas y WhatsApp ocultándose/reapareciendo. Envío del formulario probado con respuesta simulada: no se enviaron correos reales.

Medición inicial Lighthouse móvil: rendimiento 61, accesibilidad 90, buenas prácticas 100, SEO 100; LCP 19,1 s, bloqueo 460 ms. Es una prueba de laboratorio, no datos reales de todos los visitantes. SEO 100 no significa primer puesto ni posicionamiento resuelto.

## Pendientes priorizados

| Prioridad | Trabajo                               | Qué falta / para qué sirve                                                                                                                                                          |
| --------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Alta      | Habilitar SSH                         | Nuthost acepta conexión por 9022, pero deniega shell al usuario aquapuel. Solicitar habilitación; clave pública ya autorizada.                                                      |
| Alta      | Confirmar actualización automática    | Revisar cron, registro y copia real en public_html; evitar ejecuciones superpuestas y publicar únicamente cuando cambia la versión.                                                 |
| Alta      | Medir web pública optimizada          | Confirmar compresión, caché, CSP, redirecciones HTTPS y www, error 404 y recursos; comparar Lighthouse móvil tras despliegue.                                                       |
| Alta      | Search Console y Bing Webmaster Tools | Verificar propiedad, enviar sitemap y revisar indexación, canónicas y errores. Requiere acceso del titular.                                                                         |
| Alta      | Entrega real del formulario           | Confirmar recepción de un pedido real en info@aquapuel.com mediante el correo de Nuthost. Revisar SPF/DKIM y spam. La simulación no demuestra entrega de correo.                    |
| Alta      | Privacidad y tratamiento de datos     | Definir responsable, finalidades, proveedor externo, retención y política de privacidad adecuada antes de incorporar seguimiento adicional.                                         |
| Alta      | Zonas reales y Perfil de Empresa      | Pendiente expresamente por decisión de la usuaria. No crear páginas de localidades sin cobertura confirmada.                                                                        |
| Media     | Datos reales de rendimiento           | Seguir Core Web Vitals en Search Console/CrUX cuando exista muestra suficiente; revisar especialmente móviles lentos.                                                               |
| Media     | Servidor                              | Revisar certificados/renovación, versiones del servidor, copias de seguridad y prueba de restauración, permisos y protección del proveedor. El hosting compartido limita controles. |
| Media     | Residuos de publicaciones             | La copia actual no borra imágenes ni paquetes antiguos. Inventariar y retirar sólo archivos propios obsoletos con respaldo.                                                         |
| Media     | Calidad de contenido                  | Incorporar información confirmada sobre envases, retornos, entrega, mantenimiento de dispensers y controles de calidad; publicar documentación auténtica si existe.                 |
| Media     | Medición comercial                    | Acordar métricas de clic a WhatsApp, pedidos y contactos; configurar analítica respetando privacidad.                                                                               |
| Media     | Reputación local                      | Unificar nombre/dirección/teléfono, completar perfil oficial y conseguir reseñas auténticas; enlaces de clientes/proveedores relevantes.                                            |
| Media     | Accesibilidad                         | Auditoría manual de teclado, lectores de pantalla, contraste, zoom y formularios; resolver advertencias heredadas del código.                                                       |
| Baja      | JavaScript y fuentes                  | Tras medir la versión optimizada, evaluar menor hidratación del contenido estático, subconjuntos de fuentes y animación inicial.                                                    |
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

La usuaria actualizó y desplegó desde cPanel. Las cinco páginas responden 200, la URL inexistente 404; /hogar.html y /hogar/ redirigen a /hogar. Confirmados HTTPS, cabeceras de seguridad/CSP, gzip en HTML, caché de imágenes, robots, sitemap y llms.txt accesibles.

Lighthouse móvil después: rendimiento **56**, accesibilidad **100**, buenas prácticas **100**, SEO **100**. LCP bajó de **19,1 a 6,2 s** y transferencia total de **14.393 a 1.226 KiB**, pero el bloqueo de JavaScript subió de **460 a 880 ms** y el puntaje de rendimiento global cayó de 61 a 56. No se considera cerrada la optimización: la siguiente prioridad es reducir trabajo JavaScript/hidratación y repetir mediciones controladas; todavía no se alcanza un LCP bueno. La carga local del equipo también puede influir en estos resultados de laboratorio.

SSH sigue pendiente de habilitación. No se pudo verificar el cron directamente; el despliegue público confirmado en esta revisión fue manual.
