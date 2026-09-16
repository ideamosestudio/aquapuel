'use client';
import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { EMAIL, WHATSAPP_URL } from '@/lib/contact';
type FormStatus = 'idle' | 'sending' | 'sent' | 'error';
export function ContactForm() {
  const [errorMessage, setErrorMessage] = useState(
    'No pudimos enviarlo en este momento.',
  );
  const [status, setStatus] = useState<FormStatus>('idle');
  const successRef = useRef<HTMLOutputElement>(null);
  useEffect(() => {
    if (status !== 'sent') return;
    const confirmation = successRef.current;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        confirmation?.focus({ preventScroll: true });
        confirmation?.scrollIntoView({ block: 'center', behavior: 'instant' });
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [status]);
  if (process.env.NEXT_PUBLIC_BASE_PATH) {
    return (
      <div className="form-success">
        <h2>Hacé tu pedido en Aquapuel</h2>
        <p>Ingresá al sitio oficial para coordinar tu entrega.</p>
        <a className="button button-blue" href="https://aquapuel.com/contacto">
          Ir al formulario de pedidos
        </a>
      </div>
    );
  }
  async function sendOrder(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    event.preventDefault();
    if (status === 'sending') return;
    setErrorMessage('No pudimos enviarlo en este momento.');
    setStatus('sending');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const challengeResponse = await fetch('/api/contact.php', {
        headers: { 'X-Aquapuel-Form': '1' },
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
      });
      if (!challengeResponse.ok) {
        if (challengeResponse.status === 429)
          setErrorMessage(
            'Recibimos varios intentos. Esperá 15 minutos y volvé a probar.',
          );
        throw new Error('No se pudo verificar');
      }
      const challenge = await challengeResponse.json();
      if (
        typeof challenge !== 'object' ||
        challenge === null ||
        !('token' in challenge) ||
        !('wait' in challenge) ||
        typeof challenge.token !== 'string' ||
        !/^[a-f0-9]{64}$/.test(challenge.token)
      )
        throw new Error('Verificación inválida');
      await new Promise((resolve) =>
        setTimeout(
          resolve,
          Math.min(2, Math.max(0, Number(challenge.wait) || 0)) * 1000 + 150,
        ),
      );
      data._token = challenge.token;
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        signal: AbortSignal.timeout(15000),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        if (response.status === 429)
          setErrorMessage(
            'Recibimos varios intentos. Esperá 15 minutos y volvé a probar.',
          );
        throw new Error('No se pudo enviar');
      }
      const result = await response.json();
      if (
        typeof result !== 'object' ||
        result === null ||
        !('success' in result) ||
        (result.success !== true && result.success !== 'true')
      )
        throw new Error('No se pudo confirmar el envío');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }
  if (status === 'sent') {
    return (
      <output
        ref={successRef}
        className="form-success"
        tabIndex={-1}
        aria-label="Pedido enviado"
      >
        <CheckCircle2 size={48} />
        <h2>Tu pedido fue enviado.</h2>
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
    <form
      className="contact-form"
      method="post"
      action="/api/contact.php"
      onSubmit={sendOrder}
    >
      <input
        className="form-honey"
        aria-label="Dejar este campo vacío"
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
          maxLength={120}
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
          maxLength={40}
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
          maxLength={254}
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
          maxLength={240}
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
          maxLength={120}
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
          maxLength={240}
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
          max="999"
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
          maxLength={2000}
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
        <small>El pedido llegará a {EMAIL}.</small>
      </div>
      {status === 'error' && (
        <div className="field-wide form-error" role="alert">
          {errorMessage}{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Mandalo por WhatsApp
          </a>
          .
        </div>
      )}
    </form>
  );
}
