import { ArrowRight } from 'lucide-react';
import { asset } from '@/lib/assets';
import { WHATSAPP_URL } from '@/lib/contact';

export function PageHero({
  eyebrow,
  title,
  accent,
  copy,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  copy: string;
  image: string;
  imageAlt?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div
        className="page-hero-bg"
        style={{ backgroundImage: `url('${asset(image)}')` }}
        role={imageAlt ? 'img' : undefined}
        aria-label={imageAlt}
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
  image,
  imageAlt,
}: {
  eyebrow?: string;
  title: string;
  text: string;
  button?: string;
  href?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className={`closing-cta${image ? ' has-photo' : ''}`}>
      {image ? (
        <div
          className="closing-photo"
          style={{ backgroundImage: `url('${asset(image)}')` }}
          role="img"
          aria-label={imageAlt}
        />
      ) : null}
      {image ? <div className="closing-photo-shade" /> : null}
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
          <a className="button button-lime" href={asset(href)}>
            {button} <ArrowRight size={17} />
          </a>
        )}
      </div>
    </section>
  );
}
