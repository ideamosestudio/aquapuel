import type { Metadata } from 'next';
import { Building2, Home, MapPin, MessagesSquare, Phone } from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import { ContactForm } from '@/components/contact-form';
import { asset } from '@/lib/assets';
import { ADDRESS, MAPS_EMBED_URL, MAPS_URL, PHONE_DISPLAY, WHATSAPP_URL } from '@/lib/contact';

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
        <div className="contact-backdrop" style={{ backgroundImage: `linear-gradient(90deg, rgba(2,21,64,.97), rgba(0,73,154,.67)), url('${asset('/media/aquapuel-hogar.png')}')` }} />
        <div className="container contact-title reveal-up">
          <span className="eyebrow light">
            <span /> Contacto
          </span>
          <h1>
            Hablemos de
            <br />
            <em>lo que necesitás.</em>
          </h1>
          <p>
            Dejanos tus datos y coordinamos la mejor forma de acercarte
            Aquapuel.
          </p>
        </div>
      </section>
      <section className="contact-section">
        <div className="container contact-grid">
          <div className="contact-aside">
            <span className="eyebrow">
              <span /> Estamos cerca
            </span>
            <h2>Tu próxima entrega empieza acá.</h2>
            <p>
              Elegí si buscás agua para tu casa o para un espacio de trabajo.
              Con algunos datos podemos darte una respuesta más precisa.
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
                  <strong>Pedidos</strong>{PHONE_DISPLAY}
                </span>
              </div>
            </div>
          </div>
          <div className="form-wrap">
            <div className="form-heading">
              <MessagesSquare />
              <span>Completá el formulario</span>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
      <section className="location-section">
        <div className="container location-grid">
          <div className="location-copy">
            <span className="eyebrow"><span /> Encontranos</span>
            <h2>Estamos en Cuartel V.</h2>
            <p>Aquapuel está ubicada en el Parque Industrial Desarrollo Productivo, Provincia de Buenos Aires.</p>
            <a className="location-line" href={MAPS_URL} target="_blank" rel="noreferrer"><MapPin /> <span><strong>Dirección</strong>{ADDRESS}</span></a>
            <a className="location-line" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><Phone /> <span><strong>Pedidos al</strong>{PHONE_DISPLAY}</span></a>
          </div>
          <div className="map-frame"><iframe src={MAPS_EMBED_URL} title="Ubicación de Aquapuel en Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
