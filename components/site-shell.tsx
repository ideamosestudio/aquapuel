import Link from 'next/link';
import { ArrowUpRight, MapPin, Menu, MessageCircle, Phone } from 'lucide-react';
import { asset } from '@/lib/assets';
import { ADDRESS, MAPS_URL, PHONE_DISPLAY, WHATSAPP_URL } from '@/lib/contact';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href={asset('/')} className="brand" aria-label="Aquapuel, inicio">
          <img src={asset('/media/logo-blanco.png')} alt="Aquapuel" />
        </Link>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <Link href={asset('/')}>Inicio</Link>
          <Link href={asset('/quienes-somos')}>Quiénes somos</Link>
          <Link href={asset('/hogar')}>Para el hogar</Link>
          <Link href={asset('/oficina')}>Para la oficina</Link>
        </nav>
        <a className="nav-cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
          Hacé tu pedido <ArrowUpRight size={16} />
        </a>
        <details className="mobile-menu">
          <summary aria-label="Abrir menú">
            <Menu size={23} />
          </summary>
          <nav>
            <Link href={asset('/')}>Inicio</Link>
            <Link href={asset('/quienes-somos')}>Quiénes somos</Link>
            <Link href={asset('/hogar')}>Para el hogar</Link>
            <Link href={asset('/oficina')}>Para la oficina</Link>
            <Link href={asset('/contacto')}>Contactanos</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="floating-order" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Hacé tu pedido por WhatsApp">
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
          <Link href={asset('/quienes-somos')}>Quiénes somos</Link>
          <Link href={asset('/hogar')}>Para el hogar</Link>
          <Link href={asset('/oficina')}>Para la oficina</Link>
        </div>
        <div>
          <span className="footer-label">Hablemos</span>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><Phone size={16} /> {PHONE_DISPLAY}</a>
          <a href={MAPS_URL} target="_blank" rel="noreferrer"><MapPin size={16} /> {ADDRESS}</a>
          <Link href={asset('/contacto')}>Ver contacto</Link>
        </div>
        <div className="footer-stamp">
          <img
            src={asset('/media/tratada-con-ozono.png')}
            alt="Tratada con ozono"
          />
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} AQUAPUEL</span>
        <span>Agua de mesa envasada · 12 L</span>
      </div>
    </footer>
  );
}
