import type { Metadata } from 'next';
import {
  ArrowRight,
  CalendarCheck,
  GlassWater,
  Heart,
  RefreshCw,
  Truck,
} from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import { ClosingCta, PageHero } from '@/components/marketing-blocks';
import { asset } from '@/lib/assets';
import { WHATSAPP_URL } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Agua para el hogar',
  description:
    'Bidones Aquapuel de 12 litros con entrega coordinada para tu casa.',
};

export default function HomeServicePage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="Aquapuel en tu hogar"
        title="Agua fresca."
        accent="Casa feliz."
        copy="Bidones de 12 litros, baja en sodio y con entrega coordinada. Una rutina simple para que en tu casa siempre haya agua."
        image="/media/aquapuel-hogar.png"
      >
        <a className="button button-lime" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
          Hacé tu pedido <ArrowRight size={17} />
        </a>
      </PageHero>
      <section className="product-section section-pad">
        <div className="container product-grid">
          <div className="product-stage">
            <div className="stage-ring" />
            <img src={asset('/media/bidon.png')} alt="Bidón Aquapuel de 12 litros" />
            <span className="mini-badge">
              <Heart size={17} /> Para compartir
            </span>
          </div>
          <div className="product-copy">
            <span className="eyebrow">
              <span /> Pensado para tu día
            </span>
            <h2>
              Más simple.
              <br />
              Más fresco.
            </h2>
            <p>
              Un formato rendidor que se integra a la vida de tu casa. Coordinás
              la entrega y disfrutás agua lista para servir.
            </p>
            <div className="feature-list">
              <div>
                <GlassWater />
                <span>
                  <strong>Agua baja en sodio</strong>Ideal para acompañar cada
                  comida.
                </span>
              </div>
              <div>
                <RefreshCw />
                <span>
                  <strong>Envase retornable</strong>Un bidón que vuelve a
                  circular.
                </span>
              </div>
              <div>
                <Truck />
                <span>
                  <strong>Entrega coordinada</strong>Organizamos cada visita con
                  vos.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="steps section-pad">
        <div className="section-wave" style={{ backgroundImage: `url('${asset('/media/onda-marca.png')}')` }} />
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow light">
              <span /> Así de fácil
            </span>
            <h2>
              Tu agua, en <em>tres pasos.</em>
            </h2>
          </div>
          <div className="steps-grid">
            <article>
              <span>1</span>
              <h3>Escribinos</h3>
              <p>Contanos tu zona y cuánta agua necesitás.</p>
            </article>
            <article>
              <span>2</span>
              <h3>Coordinamos</h3>
              <p>Definimos una entrega que se adapte a tu rutina.</p>
            </article>
            <article>
              <span>3</span>
              <h3>Disfrutá</h3>
              <p>Recibí Aquapuel y renová tus bidones.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="faq section-pad">
        <div className="container faq-grid">
          <div>
            <span className="eyebrow">
              <span /> Preguntas frecuentes
            </span>
            <h2>
              Todo claro
              <br />
              antes de pedir.
            </h2>
            <CalendarCheck size={58} />
          </div>
          <div className="faq-list">
            <details open>
              <summary>¿De cuántos litros es el bidón?</summary>
              <p>
                El bidón Aquapuel contiene 12 litros de agua de mesa envasada.
              </p>
            </details>
            <details>
              <summary>¿Cómo coordino la entrega?</summary>
              <p>
                Dejanos tus datos en el formulario y nos comunicamos para
                definir la modalidad disponible para tu zona.
              </p>
            </details>
            <details>
              <summary>¿Los envases son retornables?</summary>
              <p>
                Sí. En cada reposición se coordinan los bidones retornables para
                mantener el circuito.
              </p>
            </details>
          </div>
        </div>
      </section>
      <ClosingCta
        title="Que el agua te espere en casa."
        text="Dejanos tus datos y armemos una rutina de entrega a tu medida."
        button="Pedir Aquapuel"
      />
      <SiteFooter />
    </main>
  );
}
