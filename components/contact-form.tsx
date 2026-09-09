'use client';

import { useState, type SyntheticEvent } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/contact';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');

  async function sendOrder(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    event.preventDefault();
    setStatus('sending');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/aquapuel@gmail.com',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            ...data,
            _subject: `Nuevo pedido Aquapuel — ${typeof data.nombre === 'string' ? data.nombre : ''}`,
            _template: 'table',
          }),
        },
      );
      if (!response.ok) throw new Error('No se pudo enviar');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <output className="form-success">
        <CheckCircle2 size={48} />
        <h2>Recibimos tu pedido.</h2>
        <p>
          Te vamos a contactar para confirmar zona, disponibilidad y entrega.
        </p>
        <button type="button" onClick={() => setStatus('idle')}>
          Hacer otro pedido
        </button>
      </output>
    );
  }

  return (
    <form className="contact-form" onSubmit={sendOrder}>
      <input
        className="form-honey"
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
      />
      <div className="field">
        <label htmlFor="nombre">Nombre y apellido</label>
        <input
          id="nombre"
          name="nombre"
          autoComplete="name"
          required
          placeholder="¿Cómo te llamás?"
        />
      </div>
      <div className="field">
        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          autoComplete="tel"
          required
          placeholder="Tu número de contacto"
        />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="nombre@ejemplo.com"
        />
      </div>
      <div className="field">
        <label htmlFor="destino">Pedido para</label>
        <select id="destino" name="destino" required defaultValue="">
          <option value="" disabled>
            Elegí una opción
          </option>
          <option>Mi hogar</option>
          <option>Mi oficina o empresa</option>
          <option>Mi comercio</option>
        </select>
      </div>
      <div className="field field-wide">
        <label htmlFor="direccion">Dirección de entrega</label>
        <input
          id="direccion"
          name="direccion"
          autoComplete="street-address"
          required
          placeholder="Calle, número, piso o departamento"
        />
      </div>
      <div className="field">
        <label htmlFor="localidad">Localidad o barrio</label>
        <input
          id="localidad"
          name="localidad"
          autoComplete="address-level2"
          required
          placeholder="¿En qué zona estás?"
        />
      </div>
      <div className="field">
        <label htmlFor="referencia">Entre calles o referencia</label>
        <input
          id="referencia"
          name="referencia"
          placeholder="Dato útil para encontrar el domicilio"
        />
      </div>
      <div className="field">
        <label htmlFor="formato">Formato de bidón</label>
        <select id="formato" name="formato" required defaultValue="">
          <option value="" disabled>
            Elegí el tamaño
          </option>
          <option>12 litros</option>
          <option>20 litros</option>
          <option>Quiero asesoramiento</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="cantidad">Cantidad</label>
        <input
          id="cantidad"
          name="cantidad"
          type="number"
          inputMode="numeric"
          min="1"
          required
          placeholder="Ej: 3"
        />
      </div>
      <div className="field">
        <label htmlFor="dispenser">¿Necesitás dispenser?</label>
        <select id="dispenser" name="dispenser" defaultValue="No">
          <option>No</option>
          <option>Natural</option>
          <option>Consultar frío-calor sujeto a disponibilidad</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="frecuencia">Frecuencia estimada</label>
        <select
          id="frecuencia"
          name="frecuencia"
          defaultValue="Pedido por única vez"
        >
          <option>Pedido por única vez</option>
          <option>Semanal</option>
          <option>Quincenal</option>
          <option>A coordinar</option>
        </select>
      </div>
      <div className="field field-wide">
        <label htmlFor="mensaje">Aclaraciones</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          placeholder="Horario preferido u otro dato que nos ayude con la entrega."
        />
      </div>
      <div className="field-wide form-action">
        <button
          className="button button-blue"
          type="submit"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Enviando pedido…' : 'Enviar pedido'}{' '}
          <ArrowRight size={17} />
        </button>
        <small>El pedido llegará a aquapuel@gmail.com.</small>
      </div>
      {status === 'error' && (
        <div className="field-wide form-error" role="alert">
          No pudimos enviarlo en este momento.{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Mandalo por WhatsApp
          </a>
          .
        </div>
      )}
    </form>
  );
}
