import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { asset } from '@/lib/assets';
import { WHATSAPP_URL } from '@/lib/contact';

export function PageHero({
  eyebrow,
  title,
  accent,
  copy,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  copy: string;
  image: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div
        className="page-hero-bg"
        style={{ backgroundImage: `url('${asset(image)}')` }}
      />
      <div className="page-hero-shade" />
      <div className="container page-hero-inner">
        <div className="page-hero-copy reveal-up">
          <span className="eyebrow light">
            <span /> {eyebrow}
          </span>
          <h1>
            {title}
            <br />
            <em>{accent}</em>
          </h1>
          <p>{copy}</p>
          {children}
        </div>
      </div>
      <div className="page-wave" aria-hidden="true" />
    </section>
  );
}

export function ClosingCta({
  eyebrow = 'Empecemos',
  title,
  text,
  button = 'Contactanos',
  href = WHATSAPP_URL,
}: {
  eyebrow?: string;
  title: string;
  text: string;
  button?: string;
  href?: string;
}) {
  return (
    <section className="closing-cta">
      <div
        className="closing-wave"
        style={{ backgroundImage: `url('${asset('/media/onda-marca.png')}')` }}
      />
      <div className="bubble bubble-a" />
      <div className="bubble bubble-b" />
      <div className="container closing-inner">
        <span className="eyebrow light">
          <span /> {eyebrow}
        </span>
        <h2>{title}</h2>
        <p>{text}</p>
        {href.startsWith('http') ? (
          <a
            className="button button-lime"
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            {button} <ArrowRight size={17} />
          </a>
        ) : (
          <Link className="button button-lime" href={asset(href)}>
            {button} <ArrowRight size={17} />
          </Link>
        )}
      </div>
    </section>
  );
}
