# Formulario alojado en Nuthost

## Funcionamiento

El navegador envía JSON al endpoint del mismo sitio `/api/contact.php`. PHP entrega el mensaje a `info@aquapuel.com` mediante `mail()` del servidor de Nuthost. No se usan FormSubmit, servicios de formularios externos ni credenciales SMTP en el repositorio.

El remitente es fijo (`info@aquapuel.com`) y Responder apunta al email validado del visitante. El contenido es texto plano con codificación UTF-8. El servidor limita el tamaño y los campos, rechaza orígenes ajenos, controla intentos repetidos y utiliza un campo trampa contra bots. No es una garantía de que todo spam sea bloqueado.

La carpeta privada `.aquapuel-form` se crea fuera de `public_html` y sólo contiene un registro limitado de horarios e identificadores derivados de la IP para limitar intentos. No guarda nombres, direcciones, emails ni mensajes. Requiere permiso de escritura del usuario PHP en su directorio personal. Límite actual: 5 intentos por IP y 100 globales cada 15 minutos.

## Verificación

La publicación ejecuta `php -l public/api/contact.php` y `php tests/contact.php`. Las pruebas comprueban validación, inyección de cabeceras, método/origen/tamaño, límites y respuestas cuando el transporte falla, con el envío reemplazado por una función simulada. No mandan correos.

Una petición GET al endpoint debe responder 405 en JSON. Un POST vacío con origen correcto debe responder 422 y no enviar nada. El formulario muestra éxito únicamente si el servidor acepta el mensaje.

`mail()` aceptado no equivale a recepción en la bandeja. La casilla está creada según confirmación de la usuaria; falta verificar la entrega real y revisar SPF, DKIM, enrutamiento de correo y spam con Nuthost si no llega. Documentación: https://www.php.net/manual/en/function.mail.php

## Copia de GitHub Pages

GitHub Pages no ejecuta PHP. Esa copia enlaza al formulario de aquapuel.com y excluye el endpoint del artefacto publicado.
