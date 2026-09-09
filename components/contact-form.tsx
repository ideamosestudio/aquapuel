'use client';

import { ArrowRight } from 'lucide-react';

export function ContactForm() {
  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const message = [
          'Hola Aquapuel, quiero hacer un pedido.',
          `Nombre: ${String(data.get('nombre') ?? '')}`,
          `Teléfono: ${String(data.get('telefono') ?? '')}`,
          `Email: ${String(data.get('email') ?? '')}`,
          `Servicio: ${String(data.get('tipo') ?? '')}`,
          `Detalle: ${String(data.get('mensaje') ?? '')}`,
        ].join('\n');
        window.open(
          `https://wa.me/5491173643736?text=${encodeURIComponent(message)}`,
          '_blank',
          'noopener,noreferrer',
        );
      }}
    >
      <div className="field"><label htmlFor="nombre">Nombre y apellido</label><input id="nombre" name="nombre" autoComplete="name" required placeholder="¿Cómo te llamás?" /></div>
      <div className="field"><label htmlFor="telefono">Teléfono</label><input id="telefono" name="telefono" type="tel" autoComplete="tel" required placeholder="Tu número de contacto" /></div>
      <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" placeholder="nombre@ejemplo.com" /></div>
      <div className="field"><label htmlFor="tipo">Quiero Aquapuel para</label><select id="tipo" name="tipo" required defaultValue=""><option value="" disabled>Elegí una opción</option><option>Mi hogar</option><option>Mi oficina o empresa</option><option>Otra consulta</option></select></div>
      <div className="field field-wide"><label htmlFor="mensaje">Contanos qué necesitás</label><textarea id="mensaje" name="mensaje" rows={5} placeholder="Cantidad estimada, zona o cualquier detalle que nos ayude." /></div>
      <div className="field-wide form-action"><button className="button button-blue" type="submit">Hacé tu pedido por WhatsApp <ArrowRight size={17} /></button><small>Se abrirá WhatsApp con tu consulta lista para enviar.</small></div>
    </form>
  );
}
