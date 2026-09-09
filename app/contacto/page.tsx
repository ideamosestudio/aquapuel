import type { Metadata } from 'next';
import { Clock3, Home, MessagesSquare, Building2 } from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = { title: 'Contacto', description: 'Contactate con Aquapuel para recibir agua en tu hogar, oficina o empresa.' };

export default function ContactPage() {
  return <main><SiteHeader /><section className="contact-hero"><div className="contact-backdrop" /><div className="container contact-title reveal-up"><span className="eyebrow light"><span /> Contacto</span><h1>Hablemos de<br /><em>lo que necesitás.</em></h1><p>Dejanos tus datos y coordinamos la mejor forma de acercarte Aquapuel.</p></div></section>
    <section className="contact-section"><div className="container contact-grid"><div className="contact-aside"><span className="eyebrow"><span /> Estamos cerca</span><h2>Tu próxima entrega empieza acá.</h2><p>Elegí si buscás agua para tu casa o para un espacio de trabajo. Con algunos datos podemos darte una respuesta más precisa.</p><div className="contact-cards"><div><Home /><span><strong>Para tu hogar</strong>Una rutina simple y coordinada.</span></div><div><Building2 /><span><strong>Para tu oficina</strong>Una propuesta según tu equipo.</span></div><div><Clock3 /><span><strong>Respuesta personalizada</strong>Revisamos cada consulta.</span></div></div></div><div className="form-wrap"><div className="form-heading"><MessagesSquare /><span>Completá el formulario</span></div><ContactForm /></div></div></section><SiteFooter /></main>;
}
