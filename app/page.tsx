import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Droplets,
  Home as HomeIcon,
  Building2,
} from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import { asset } from '@/lib/assets';
import { WHATSAPP_URL } from '@/lib/contact';

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-backdrop" aria-hidden="true">
          <div
            className="hero-scene hero-scene-one"
            style={{
              backgroundImage: `url('${asset('/media/planta-aquapuel.png')}')`,
            }}
          />
          <div
            className="hero-scene hero-scene-two"
            style={{
              backgroundImage: `url('${asset('/media/aquapuel-hogar.png')}')`,
            }}
          />
          <div className="hero-wash" />
        </div>
        <div className="water-orb orb-one" aria-hidden="true" />
        <div className="water-orb orb-two" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy reveal-up">
            <span className="eyebrow light">
              <span /> Agua pura, todos los días
            </span>
            <h1 id="hero-title">
              Bienestar que
              <br />
              <em>fluye con vos.</em>
            </h1>
            <p>
              Agua de mesa envasada, baja en sodio y tratada con ozono. En tu
              casa o en tu oficina, siempre cerca.
            </p>
            <div className="hero-actions">
              <a className="button button-lime" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Hacé tu pedido <ArrowRight size={17} />
              </a>
              <Link className="text-link light-link" href={asset('/oficina')}>
                Soluciones para empresas <ArrowRight size={15} />
              </Link>
            </div>
            <div className="hero-points" aria-label="Beneficios principales">
              <span>
                <Check size={14} /> Baja en sodio
              </span>
              <span>
                <Check size={14} /> Tratada con ozono
              </span>
              <span>
                <Check size={14} /> Entrega programada
              </span>
            </div>
          </div>
          <div
            className="hero-product reveal-product"
            aria-label="Bidón Aquapuel de 12 litros"
          >
            <div className="product-halo" />
            <img
              src={asset('/media/bidon.png')}
              alt="Bidón Aquapuel de 12 litros"
            />
            <div className="product-note note-one">
              <strong>12 L</strong>
              <span>
                Más agua,
                <br />
                menos vueltas
              </span>
            </div>
            <div className="product-note note-two">
              <Droplets size={19} />
              <span>
                Frescura
                <br />
                en cada gota
              </span>
            </div>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <span>Descubrí Aquapuel</span>
          <i />
        </div>
      </section>
      <section className="trust-strip" aria-label="Características">
        <div className="container trust-row">
          <p>
            <strong>12 litros</strong>
            <span>Formato rendidor</span>
          </p>
          <i />
          <p>
            <strong>Bajo sodio</strong>
            <span>Para todos los días</span>
          </p>
          <i />
          <p>
            <strong>Con ozono</strong>
            <span>Calidad cuidada</span>
          </p>
          <i />
          <p>
            <strong>En tu puerta</strong>
            <span>Entrega coordinada</span>
          </p>
        </div>
      </section>
      <section className="choice-section section-pad">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">
              <span /> Elegí tu experiencia
            </span>
            <h2>
              El agua que necesitás,
              <br />
              <em>donde la necesitás.</em>
            </h2>
          </div>
          <div className="choice-grid">
            <Link href={asset('/hogar')} className="choice-card choice-home">
              <div
                className="choice-image"
                style={{
                  backgroundImage: `url('${asset('/media/aquapuel-hogar.png')}')`,
                }}
              />
              <div className="choice-overlay" />
              <div className="choice-content">
                <HomeIcon size={24} />
                <span>Para tu hogar</span>
                <h3>
                  Siempre fresca.
                  <br />
                  Siempre cerca.
                </h3>
                <b>
                  Conocé el servicio <ArrowRight size={17} />
                </b>
              </div>
            </Link>
            <Link href={asset('/oficina')} className="choice-card choice-office">
              <div
                className="choice-image"
                style={{
                  backgroundImage: `url('${asset('/media/planta-aquapuel.png')}')`,
                }}
              />
              <div className="choice-overlay" />
              <div className="choice-content">
                <Building2 size={24} />
                <span>Para tu oficina</span>
                <h3>
                  Hidratación que
                  <br />
                  acompaña al equipo.
                </h3>
                <b>
                  Ver planes para empresas <ArrowRight size={17} />
                </b>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
