import type { Metadata } from 'next';
import {
  ArrowRight,
  CircleCheckBig,
  Flame,
  Gauge,
  Lightbulb,
  Snowflake,
  Users,
} from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import { ClosingCta, PageHero } from '@/components/marketing-blocks';
import { asset } from '@/lib/assets';

const officeWhatsapp = (message: string) =>
  `https://wa.me/5491173643736?text=${encodeURIComponent(message)}`;

const HERO_WHATSAPP = officeWhatsapp(
  'Hola Aquapuel, quiero consultar por el dispenser frío/calor para mi empresa.',
);
const DETAIL_WHATSAPP = officeWhatsapp(
  'Hola Aquapuel, quiero recibir más información sobre el dispenser frío/calor.',
);
const AVAILABILITY_WHATSAPP = officeWhatsapp(
  'Hola Aquapuel, quiero consultar disponibilidad y condiciones del dispenser frío/calor para mi empresa.',
);

export const metadata: Metadata = {
  title: 'Agua para oficinas',
  description:
    'Una solución flexible de agua Aquapuel para oficinas, comercios y equipos.',
};

export default function OfficePage() {
  return (
    <main className="office-page">
      <SiteHeader />
      <PageHero
        eyebrow="AQUAPUEL PARA EMPRESAS"
        title="Agua fría y caliente."
        accent="Lista para tu equipo."
        copy="Equipá tu oficina o comercio con un dispenser práctico y confiable, acompañado por la calidad de los bidones Aquapuel."
        image="/media/office-aquadisp-hero.webp"
        imageAlt="Dispenser de agua Aquapuel en una oficina"
      >
        <a
          className="button button-lime"
          href={HERO_WHATSAPP}
          target="_blank"
          rel="noreferrer"
        >
          Consultar por el dispenser <ArrowRight size={17} />
        </a>
      </PageHero>
      <section className="office-intro section-pad">
        <div className="container office-grid">
          <div>
            <span className="eyebrow">
              <span /> DISPENSER FRÍO/CALOR
            </span>
            <h2>
              Agua bien fría.
              <br />
              Agua caliente al instante.
            </h2>
            <p>
              El dispenser brinda agua realmente fría gracias a su sistema
              de refrigeración por motocompresor, no por plaqueta. Además,
              cuenta con una caldera de acero inoxidable para disponer de agua
              caliente durante toda la jornada.
            </p>
            <ul className="office-spec-list">
              <li>
                <CircleCheckBig /> Refrigeración de hasta 12 litros por hora.
              </li>
              <li>
                <CircleCheckBig /> Calentamiento de hasta 8 litros por hora.
              </li>
              <li>
                <CircleCheckBig /> Temperaturas de 5 °C a 95 °C.
              </li>
              <li>
                <CircleCheckBig /> Compatible con bidones de 10, 12 y 20
                litros.
              </li>
              <li>
                <CircleCheckBig /> Dos canillas e indicadores LED.
              </li>
              <li>
                <CircleCheckBig /> Bandeja recolectora incorporada.
              </li>
            </ul>
            <p className="office-use-copy">
              Una solución práctica para oficinas, comercios, salas de reunión
              y espacios de atención al público.
            </p>
            <a
              href={DETAIL_WHATSAPP}
              className="button button-blue office-detail-cta"
              target="_blank"
              rel="noreferrer"
            >
              Conocé el dispenser <ArrowRight size={16} />
            </a>
          </div>
          <div className="office-photo">
            <img
              src={asset('/media/office-aquadisp-detail.webp')}
              alt="Persona sirviéndose agua fría en un dispenser Aquapuel"
            />
            <div className="office-floating">
              <Users />
              <strong>Frío + calor</strong>
              <span>Listo para tu equipo</span>
            </div>
          </div>
        </div>
      </section>
      <section className="business-benefits section-pad">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow light">
              <span /> COMODIDAD TODOS LOS DÍAS
            </span>
            <h2>
              Todo lo que tu espacio necesita.
            </h2>
          </div>
          <div className="benefit-grid">
            <article>
              <Snowflake />
              <h3>Realmente fría</h3>
              <p>
                Su sistema con motocompresor enfría el agua hasta 5 °C y ofrece
                un rendimiento de hasta 12 litros por hora.
              </p>
            </article>
            <article>
              <Flame />
              <h3>Agua caliente</h3>
              <p>
                Caldera de acero inoxidable de 2 litros, con temperaturas de
                hasta 95 °C.
              </p>
            </article>
            <article>
              <Lightbulb />
              <h3>Uso simple</h3>
              <p>
                Dos canillas, indicadores LED y bandeja recolectora para un uso
                práctico durante toda la jornada.
              </p>
            </article>
            <article>
              <Gauge />
              <h3>Versátil</h3>
              <p>
                Diseño de columna con carga superior, compatible con bidones
                de 10, 12 y 20 litros.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="office-banner">
        <div className="container">
          <img
            src={asset('/media/aquadisp-40lb.webp')}
            alt="Dispenser frío calor con bidón Aquapuel"
          />
          <div>
            <span className="eyebrow light">
              <span /> DISPENSER FRÍO/CALOR
            </span>
            <h2>
              Un dispenser preparado para el ritmo de tu empresa.
            </h2>
            <p>
              Agua fría y caliente en un mismo equipo, con un funcionamiento
              simple y una capacidad pensada para el consumo cotidiano de
              oficinas y comercios.
            </p>
            <ul className="office-tech-list">
              <li>Equipo frío/calor.</li>
              <li>Color blanco.</li>
              <li>Alimentación 220 V.</li>
              <li>Dos canillas.</li>
              <li>Caldera de acero inoxidable de 2 litros.</li>
              <li>Indicadores LED.</li>
              <li>Carga superior.</li>
              <li>Medidas: 98 × 33 × 33 cm.</li>
              <li>Apto para gas ecológico.</li>
              <li>Organismo de certificación: IRAM.</li>
            </ul>
          </div>
        </div>
      </section>
      <ClosingCta
        eyebrow="EQUIPÁ TU EMPRESA"
        title="Agua fría y caliente para todo tu equipo."
        text="Consultanos por el dispenser frío/calor y los bidones Aquapuel para tu oficina, comercio o espacio de trabajo."
        button="Consultar disponibilidad"
        href={AVAILABILITY_WHATSAPP}
        image="/media/office-aquadisp-cta.webp"
        imageAlt="Dispenser Aquapuel para oficinas y empresas"
      />
      <SiteFooter />
    </main>
  );
}
