import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function PageHero({ eyebrow, title, accent, copy, image, children }: { eyebrow: string; title: string; accent: string; copy: string; image: string; children?: React.ReactNode }) {
  return <section className="page-hero"><div className="page-hero-bg" style={{ backgroundImage: `url('${image}')` }} /><div className="page-hero-shade" /><div className="container page-hero-inner"><div className="page-hero-copy reveal-up"><span className="eyebrow light"><span /> {eyebrow}</span><h1>{title}<br /><em>{accent}</em></h1><p>{copy}</p>{children}</div></div><div className="page-wave" aria-hidden="true" /></section>;
}

export function ClosingCta({ eyebrow = 'Empecemos', title, text, button = 'Contactanos', href = '/contacto' }: { eyebrow?: string; title: string; text: string; button?: string; href?: string }) {
  return <section className="closing-cta"><div className="bubble bubble-a" /><div className="bubble bubble-b" /><div className="container closing-inner"><span className="eyebrow light"><span /> {eyebrow}</span><h2>{title}</h2><p>{text}</p><Link className="button button-lime" href={href}>{button} <ArrowRight size={17} /></Link></div></section>;
}
