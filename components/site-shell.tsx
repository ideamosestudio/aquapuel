'use client';

import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react';
import { asset } from '@/lib/assets';
import {
  ADDRESS,
  EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  MAPS_URL,
  PHONE_DISPLAY,
  TIKTOK_URL,
  WHATSAPP_URL,
} from '@/lib/contact';

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.12 2.7 1.63 4.24 1.8V10c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.03-.5-.04-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.45 3.98-2.14 6.15-1.73.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.06-.14 1.6.24 1.64 1.82 3.02 3.5 2.87 1.11-.01 2.17-.66 2.75-1.6.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z"
      />
    </svg>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container nav-wrap">
        <a href={asset('/')} className="brand" aria-label="Aquapuel, inicio">
          <img src={asset('/media/logo-blanco.png')} alt="Aquapuel" />
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href={asset('/')}>Inicio</a>
          <a href={asset('/quienes-somos')}>Quiénes somos</a>
          <a href={asset('/hogar')}>Para el hogar</a>
          <a href={asset('/oficina')}>Para la oficina</a>
          <a href={asset('/contacto')}>Contacto</a>
        </nav>
        <a
          className="nav-cta"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
        >
          Hacé tu pedido <ArrowUpRight size={16} />
        </a>
        <details className="mobile-menu">
          <summary aria-label="Abrir menú">
            <Menu className="menu-open-icon" size={23} />
            <X className="menu-close-icon" size={25} />
          </summary>
          <nav>
            <a href={asset('/')}>Inicio</a>
            <a href={asset('/quienes-somos')}>Quiénes somos</a>
            <a href={asset('/hogar')}>Para el hogar</a>
            <a href={asset('/oficina')}>Para la oficina</a>
            <a href={asset('/contacto')}>Contactanos</a>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a
        className="floating-order"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Hacé tu pedido por WhatsApp"
      >
        <span className="order-ripple" />
        <MessageCircle size={21} />
        <b>Hacé tu pedido</b>
      </a>
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={asset('/media/logo-blanco.png')} alt="Aquapuel" />
          <p>Agua de mesa envasada para hogares, oficinas y empresas.</p>
        </div>
        <div>
          <span className="footer-label">Explorá</span>
          <a href={asset('/quienes-somos')}>Quiénes somos</a>
          <a href={asset('/hogar')}>Para el hogar</a>
          <a href={asset('/oficina')}>Para la oficina</a>
        </div>
        <div>
          <span className="footer-label">Hablemos</span>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            <Phone size={16} /> {PHONE_DISPLAY}
          </a>
          <a href={MAPS_URL} target="_blank" rel="noreferrer">
            <MapPin size={16} /> {ADDRESS}
          </a>
          <a href={`mailto:${EMAIL}`}>
            <Mail size={16} /> {EMAIL}
          </a>
          <a href={asset('/contacto')}>Ver contacto</a>
        </div>
        <div className="footer-stamp">
          <img
            src={asset('/media/tratada-con-ozono.png')}
            alt="Tratada con ozono"
          />
          <div className="social-links">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Aquapuel en Instagram"
            >
              <span aria-hidden="true">ig</span>
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Aquapuel en Facebook"
            >
              <span aria-hidden="true">f</span>
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Aquapuel en TikTok"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} AQUAPUEL</span>
        <span>Agua de mesa envasada · 12 y 20 L</span>
      </div>
    </footer>
  );
}
