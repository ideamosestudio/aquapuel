'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) return <div className="form-success" role="status"><CheckCircle2 size={42} /><h2>¡Consulta preparada!</h2><p>El formulario quedó listo. Falta conectar el canal de contacto de Aquapuel para recibir los mensajes.</p><button className="text-link" onClick={() => setSent(false)}>Volver al formulario <ArrowRight size={16} /></button></div>;
  return <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
    <div className="field"><label htmlFor="nombre">Nombre y apellido</label><input id="nombre" name="nombre" autoComplete="name" required placeholder="¿Cómo te llamás?" /></div>
    <div className="field"><label htmlFor="telefono">Teléfono</label><input id="telefono" name="telefono" type="tel" autoComplete="tel" required placeholder="Tu número de contacto" /></div>
    <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" placeholder="nombre@ejemplo.com" /></div>
    <div className="field"><label htmlFor="tipo">Quiero Aquapuel para</label><select id="tipo" name="tipo" required defaultValue=""><option value="" disabled>Elegí una opción</option><option>Mi hogar</option><option>Mi oficina o empresa</option><option>Otra consulta</option></select></div>
    <div className="field field-wide"><label htmlFor="mensaje">Contanos qué necesitás</label><textarea id="mensaje" name="mensaje" rows={5} placeholder="Cantidad estimada, zona o cualquier detalle que nos ayude." /></div>
    <div className="field-wide form-action"><button className="button button-blue" type="submit">Enviar consulta <ArrowRight size={17} /></button><small>Usaremos tus datos solamente para responder tu consulta.</small></div>
  </form>;
}
