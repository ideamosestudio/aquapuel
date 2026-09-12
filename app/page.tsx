import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Droplets,
  Home as HomeIcon,
  Building2,
  Filter,
  MapPin,
  MessageCircle,
  RefreshCw,
  Route,
  ShieldCheck,
  Sparkles,
  Search,
  Truck,
  Waves,
} from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import { asset } from '@/lib/assets';
import { ADDRESS, MAPS_EMBED_URL, MAPS_URL, WHATSAPP_URL } from '@/lib/contact';

const CLIENT_LOGOS = Array.from(
  { length: 7 },
  (_, index) => `/media/clientes/${String(index + 1).padStart(3, '0')}.png`,
);

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
              Agua envasada para tu hogar, con calidad cuidada, atención
              cercana, precios competitivos y una entrega simple.
            </p>
            <div className="hero-actions">
              <a
                className="button button-lime"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
              >
                Hacé tu pedido <ArrowRight size={17} />
              </a>
              <a className="text-link light-link" href={asset('/oficina')}>
                Soluciones para empresas <ArrowRight size={15} />
              </a>
            </div>
            <div
              className="client-logos"
              aria-label="Clientes que eligen Aquapuel"
            >
              <div className="client-logos-track">
                {[...CLIENT_LOGOS, ...CLIENT_LOGOS.slice(0, 4)].map(
                  (logo, index) => (
                    <span
                      className="client-logo"
                      key={`${logo}-${index}`}
                      aria-hidden="true"
                    >
                      <span
                        className="client-logo-image"
                        style={{ backgroundImage: `url('${asset(logo)}')` }}
                      />
                    </span>
                  ),
                )}
              </div>
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
            <strong>12 y 20 litros</strong>
            <span>Dos formatos rendidores</span>
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
      <div className="mobile-order-break">
        <a
          className="button button-lime"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={19} /> Hacé tu pedido
          <ArrowRight size={17} />
        </a>
      </div>
      <section id="calidad" className="purity-section section-pad">
        <div className="container purity-grid">
          <div className="purity-copy">
            <span className="eyebrow">
              <span /> Calidad desde el origen
            </span>
            <h2>
              Un proceso integral.
              <br />
              <em>Calidad en cada etapa.</em>
            </h2>
            <p>
              Purificamos y controlamos el agua desde su origen hasta el
              envasado para ofrecer un producto confiable todos los días.
            </p>
            <div className="purity-list">
              <article>
                <RefreshCw />
                <div>
                  <strong>Ósmosis inversa</strong>
                  <span>
                    Membranas que permiten reducir impurezas y sales disueltas.
                  </span>
                </div>
              </article>
              <article>
                <Filter />
                <div>
                  <strong>Arena y carbón activado</strong>
                  <span>
                    Sistemas de filtrado para continuar eliminando partículas,
                    impurezas y olores.
                  </span>
                </div>
              </article>
              <article>
                <Sparkles />
                <div>
                  <strong>Ozonización</strong>
                  <span>
                    El ozono contribuye a la desinfección y purificación del
                    agua.
                  </span>
                </div>
              </article>
              <article>
                <ShieldCheck />
                <div>
                  <strong>Iones de plata</strong>
                  <span>
                    Un refuerzo adicional para el tratamiento microbiológico.
                  </span>
                </div>
              </article>
            </div>
          </div>
          <div className="formats-panel">
            <span className="formats-kicker">Llenado de bidones</span>
            <div className="formats-numbers">
              <strong>12</strong>
              <i>y</i>
              <strong>20</strong>
              <span>litros</span>
            </div>
            <p>
              Elegí el formato que mejor se adapte al consumo de tu hogar.
              También abastecemos oficinas y comercios.
            </p>
            <div className="format-details">
              <span>
                <b>12 L</b> Ideal para hogares, oficinas y comercios.
              </span>
              <span>
                <b>20 L</b> Práctico para espacios de mayor consumo.
              </span>
            </div>
            <img src={asset('/media/bidon.png')} alt="Bidón Aquapuel" />
          </div>
        </div>
        <div className="container filling-band">
          <Truck />
          <div>
            <span>Servicio para repartidores independientes</span>
            <h3>También llenamos tus propios bidones.</h3>
            <p>
              Trabajamos con llenadores y repartidores que traen envases de
              distintas marcas y gestionan su propia distribución.
            </p>
            <span className="filling-hours">
              Lun. a vie. 8:00–16:00 · Sáb. 8:00–14:00
            </span>
          </div>
          <a
            className="button button-blue"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
          >
            Consultar llenado <ArrowRight size={17} />
          </a>
        </div>
      </section>
      <section id="proceso" className="bottling-section section-pad">
        <div className="container">
          <div className="section-heading bottling-heading">
            <span className="eyebrow">
              <span /> Limpieza y envasado
            </span>
            <h2>
              Control en cada bidón,
              <br />
              <em>antes de cada entrega.</em>
            </h2>
            <p>
              Cada envase atraviesa una secuencia de inspección, limpieza,
              lavado, llenado y control final antes de salir de la planta.
            </p>
          </div>
          <div className="bottling-grid">
            <article>
              <span>01</span>
              <Search />
              <h3>Inspección</h3>
              <p>
                Verificamos el estado de cada bidón y descartamos unidades
                dañadas o contaminadas.
              </p>
            </article>
            <article>
              <span>02</span>
              <Waves />
              <h3>Limpieza exterior</h3>
              <p>
                Una cepilladora automática de cuatro cuerpos limpia la parte
                superior, los laterales y la base.
              </p>
            </article>
            <article>
              <span>03</span>
              <RefreshCw />
              <h3>Lavado y enjuague</h3>
              <p>Prelavado, lavado, enjuague paracéptico y enjuague final.</p>
            </article>
            <article>
              <span>04</span>
              <BadgeCheck />
              <h3>Llenado y control</h3>
              <p>
                Llenado, tapado, control final, colocación de fecha y precinto
                de seguridad.
              </p>
            </article>
          </div>
        </div>
      </section>
      <div className="mobile-order-break mobile-order-break-blue">
        <a
          className="button button-blue"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={19} /> Hacé tu pedido
          <ArrowRight size={17} />
        </a>
      </div>
      <section id="experiencias" className="choice-section section-pad">
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
            <a href={asset('/hogar')} className="choice-card choice-home">
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
            </a>
            <a href={asset('/oficina')} className="choice-card choice-office">
              <div
                className="choice-image"
                style={{
                  backgroundImage: `url('${asset('/media/dispenser-oficina.png')}')`,
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
            </a>
          </div>
        </div>
      </section>
      <section id="dispenser" className="dispenser-section section-pad">
        <div className="container dispenser-grid">
          <div className="dispenser-art">
            <div className="dispenser-ring">
              <Droplets />
            </div>
            <img
              src={asset('/media/bidon-invertido.png')}
              alt="Bidón Aquapuel para dispenser"
            />
          </div>
          <div className="dispenser-copy">
            <span className="eyebrow light">
              <span /> Para clientes Aquapuel
            </span>
            <h2>
              Bidones de 12 y 20 L<br />
              <em>con dispenser natural.</em>
            </h2>
            <p>
              Una solución simple y práctica para servir agua en tu casa, con
              entregas coordinadas según tu consumo.
            </p>
            <div className="dispenser-options">
              <span>
                <Droplets /> Dispenser natural
              </span>
              <span>
                <ShieldCheck /> Bidones de 12 litros
              </span>
              <span>
                <ShieldCheck /> Bidones de 20 litros
              </span>
            </div>
            <p className="dispenser-note">
              Los equipos frío-calor se evalúan según consumo, antigüedad,
              ubicación y disponibilidad. Consultanos para conocer las opciones
              vigentes.
            </p>
            <a
              className="button button-lime"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
            >
              Consultar servicio <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>
      <section id="reparto" className="delivery-section">
        <div
          className="delivery-visual"
          style={{
            backgroundImage: `url('${asset('/media/reparto-aquapuel.png')}')`,
          }}
        >
          <div className="delivery-shade" />
          <div className="container delivery-inner">
            <div className="delivery-copy">
              <span className="eyebrow light">
                <span /> Reparto a domicilio
              </span>
              <h2>
                Tu agua llega
                <br />
                <em>hasta vos.</em>
              </h2>
              <p>
                Coordinamos entregas para hogares, oficinas y comercios.
                Consultanos por cobertura en tu zona.
              </p>
              <div className="delivery-points">
                <span>
                  <Route /> Entrega coordinada
                </span>
                <span>
                  <ShieldCheck /> Bidones retornables
                </span>
                <span>
                  <Clock /> Lun. a vie. 8:00–16:00
                </span>
              </div>
              <a
                className="button button-lime"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
              >
                Consultar mi zona <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id="pedido" className="home-order section-pad">
        <div className="container order-card">
          <div>
            <span className="eyebrow light">
              <span /> Pedí Aquapuel
            </span>
            <h2>
              ¿Cuántos bidones
              <br />
              <em>necesitás?</em>
            </h2>
            <p>
              Completá los datos de entrega y recibí una respuesta para
              coordinar tu pedido.
            </p>
          </div>
          <div className="order-actions">
            <a className="button button-lime" href={asset('/contacto')}>
              Armar mi pedido <ArrowRight size={17} />
            </a>
            <a
              className="button button-ghost-light"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
            >
              Pedir por WhatsApp
            </a>
          </div>
        </div>
      </section>
      <section className="home-location">
        <div className="container home-location-grid">
          <div className="home-location-copy">
            <span className="eyebrow">
              <span /> Dónde estamos
            </span>
            <h2>
              Desde Cuartel V,
              <br />
              más cerca de tu casa.
            </h2>
            <p>
              Estamos en el Parque Industrial Desarrollo Productivo, Provincia
              de Buenos Aires.
            </p>
            <a
              className="location-line"
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin />
              <span>
                <strong>Ver en Google Maps</strong>
                {ADDRESS}
              </span>
            </a>
          </div>
          <div className="map-frame home-map">
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
