import Link from 'next/link';
import { ArrowUpRight, Menu } from 'lucide-react';

export function SiteHeader() {
  return <header className="site-header"><div className="container nav-wrap">
    <Link href="/" className="brand" aria-label="Aquapuel, inicio"><img src="/media/logo-blanco.png" alt="Aquapuel" /></Link>
    <nav className="desktop-nav" aria-label="Navegación principal"><Link href="/">Inicio</Link><Link href="/quienes-somos">Quiénes somos</Link><Link href="/hogar">Para el hogar</Link><Link href="/oficina">Para la oficina</Link></nav>
    <Link className="nav-cta" href="/contacto">Contactanos <ArrowUpRight size={16} /></Link>
    <details className="mobile-menu"><summary aria-label="Abrir menú"><Menu size={23} /></summary><nav><Link href="/">Inicio</Link><Link href="/quienes-somos">Quiénes somos</Link><Link href="/hogar">Para el hogar</Link><Link href="/oficina">Para la oficina</Link><Link href="/contacto">Contactanos</Link></nav></details>
  </div></header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-grid">
    <div className="footer-brand"><img src="/media/logo-blanco.png" alt="Aquapuel" /><p>Agua de mesa envasada para hogares, oficinas y empresas.</p></div>
    <div><span className="footer-label">Explorá</span><Link href="/quienes-somos">Quiénes somos</Link><Link href="/hogar">Para el hogar</Link><Link href="/oficina">Para la oficina</Link></div>
    <div><span className="footer-label">Hablemos</span><Link href="/contacto">Contactanos</Link><Link href="/hogar">Servicio para hogares</Link><Link href="/oficina">Servicio para empresas</Link></div>
    <div className="footer-stamp"><img src="/media/tratada-con-ozono.png" alt="Tratada con ozono" /></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} AQUAPUEL</span><span>Agua de mesa envasada · 12 L</span></div></footer>;
}
