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
  WHATSAPP_URL,
} from '@/lib/contact';

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
