import type { Metadata } from 'next';
import {
  Building2,
  Home,
  Mail,
  MapPin,
  MessagesSquare,
  Phone,
} from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import { ContactForm } from '@/components/contact-form';
import { asset } from '@/lib/assets';
import {
  ADDRESS,
  EMAIL,
  MAPS_EMBED_URL,
  MAPS_URL,
  PHONE_DISPLAY,
  WHATSAPP_URL,
} from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contactate con Aquapuel para recibir agua en tu hogar, oficina o empresa.',
};

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <section className="contact-hero">
        <div
          className="contact-backdrop"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(2,21,64,.97), rgba(0,73,154,.67)), url('${asset('/media/aquapuel-hogar.png')}')`,
          }}
        />
        <div className="container contact-title reveal-up">
          <span className="eyebrow light">
            <span /> Contacto
          </span>
          <h1>
            Armá tu
            <br />
            <em>pedido.</em>
          </h1>
          <p>
            Completá los datos básicos de entrega. Te contactamos para confirmar
            disponibilidad, zona y coordinación.
          </p>
        </div>
      </section>
      <section id="pedido" className="contact-section">
        <div className="container contact-grid">
          <div className="contact-aside">
            <span className="eyebrow">
              <span /> Estamos cerca
            </span>
            <h2>Todo lo necesario para coordinar.</h2>
            <p>
              Pedí bidones de 12 o 20 litros con dispenser natural para tu casa,
              oficina o comercio.
            </p>
            <div className="contact-cards">
              <div>
                <Home />
                <span>
                  <strong>Para tu hogar</strong>Una rutina simple y coordinada.
                </span>
              </div>
              <div>
                <Building2 />
                <span>
                  <strong>Para tu oficina</strong>Una propuesta según tu equipo.
                </span>
              </div>
              <div>
                <Phone />
                <span>
                  <strong>Pedidos</strong>
                  {PHONE_DISPLAY}
                </span>
              </div>
              <div>
                <Mail />
                <span>
                  <strong>Email</strong>
                  {EMAIL}
                </span>
              </div>
            </div>
          </div>
          <div className="form-wrap">
            <div className="form-heading">
              <MessagesSquare />
              <span>Datos del pedido y la entrega</span>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
      <section className="location-section">
        <div className="container location-grid">
          <div className="location-copy">
            <span className="eyebrow">
              <span /> Encontranos
            </span>
            <h2>Estamos en Cuartel V.</h2>
            <p>
              Aquapuel está ubicada en el Parque Industrial Desarrollo
              Productivo, Provincia de Buenos Aires.
            </p>
            <a
              className="location-line"
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin />{' '}
              <span>
                <strong>Dirección</strong>
                {ADDRESS}
              </span>
            </a>
            <a
              className="location-line"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
            >
              <Phone />{' '}
              <span>
                <strong>Pedidos al</strong>
                {PHONE_DISPLAY}
              </span>
            </a>
          </div>
          <div className="map-frame">
            <iframe
              src={MAPS_EMBED_URL}
              title="Ubicación de Aquapuel en Google Maps"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
