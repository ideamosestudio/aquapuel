import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, CalendarClock, CircleCheckBig, Handshake, Users } from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import { ClosingCta, PageHero } from '@/components/marketing-blocks';

export const metadata: Metadata = { title: 'Agua para oficinas', description: 'Una solución flexible de agua Aquapuel para oficinas, comercios y equipos.' };

export default function OfficePage() {
  return <main><SiteHeader /><PageHero eyebrow="Aquapuel para empresas" title="Equipos hidratados." accent="Días que fluyen." copy="Una solución práctica para oficinas, comercios y espacios de trabajo. Coordinamos el abastecimiento según el ritmo de tu equipo." image="/media/planta-aquapuel.png"><Link className="button button-lime" href="/contacto">Solicitar una propuesta <ArrowRight size={17} /></Link></PageHero>
    <section className="office-intro section-pad"><div className="container office-grid"><div><span className="eyebrow"><span /> Nos adaptamos a tu equipo</span><h2>Agua disponible.<br />Gestión simple.</h2><p>Planificamos la entrega para que tu equipo tenga Aquapuel sin sumar tareas innecesarias. Una respuesta clara para operaciones grandes o pequeñas.</p><Link href="/contacto" className="text-link">Conversemos sobre tu espacio <ArrowRight size={16} /></Link></div><div className="office-photo"><img src="/media/planta-aquapuel.png" alt="Stock de bidones Aquapuel" /><div className="office-floating"><Users /><strong>Para equipos</strong><span>Servicio flexible</span></div></div></div></section>
    <section className="business-benefits section-pad"><div className="container"><div className="section-heading centered"><span className="eyebrow light"><span /> Un servicio que acompaña</span><h2>Menos gestión.<br /><em>Más bienestar.</em></h2></div><div className="benefit-grid"><article><BriefcaseBusiness /><h3>A medida</h3><p>Una propuesta pensada según el tamaño y consumo de tu espacio.</p></article><article><CalendarClock /><h3>Coordinado</h3><p>Organizamos las entregas de acuerdo con la dinámica de tu operación.</p></article><article><Handshake /><h3>Cercano</h3><p>Atención directa para resolver consultas y acompañar cada reposición.</p></article><article><CircleCheckBig /><h3>Confiable</h3><p>Agua baja en sodio y tratada con ozono, lista para todo el equipo.</p></article></div></div></section>
    <section className="office-banner"><div className="container"><img src="/media/bidon-invertido.png" alt="Bidón Aquapuel para dispenser" /><div><span className="eyebrow light"><span /> Formato de 12 litros</span><h2>Listo para<br />tu dispenser.</h2><p>Práctico para salas de reunión, espacios comunes y áreas de atención.</p></div></div></section>
    <ClosingCta title="Una propuesta para tu equipo." text="Contanos cuántas personas comparten el espacio y preparemos una solución." button="Pedir asesoramiento" /><SiteFooter /></main>;
}
