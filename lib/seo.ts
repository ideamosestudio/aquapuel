import type { Metadata } from 'next';
import { EMAIL, FACEBOOK_URL, INSTAGRAM_URL, TIKTOK_URL } from './contact';

export const SITE_URL = 'https://aquapuel.com';
export const SEO_PAGES = {
  home: { path: '/', title: 'Agua en bidones de 12 y 20 litros en Moreno | AQUAPUEL', description: 'Agua de mesa envasada para hogares, oficinas y comercios. Aquapuel, en Cuartel V, Moreno. Consultá cobertura y coordiná tu pedido de bidones de 12 y 20 litros.' },
  hogar: { path: '/hogar', title: 'Bidones de agua para tu hogar | AQUAPUEL', description: 'Bidones de agua Aquapuel de 12 y 20 litros para tu casa. Consultá cobertura, disponibilidad y entrega desde Cuartel V, Moreno. Hacé tu pedido por WhatsApp.' },
  oficina: { path: '/oficina', title: 'Agua y dispensers para oficinas y empresas | AQUAPUEL', description: 'Agua en bidones y dispensers frío/calor para oficinas, comercios y empresas. Consultá disponibilidad, condiciones y entrega con Aquapuel en Moreno.' },
  'quienes-somos': { path: '/quienes-somos', title: 'Conocé Aquapuel: agua envasada en Moreno', description: 'Conocé Aquapuel, nuestra propuesta de agua de mesa envasada y la atención para hogares y empresas. Estamos en Cuartel V, Moreno, Buenos Aires.' },
  contacto: { path: '/contacto', title: 'Contacto y pedidos de agua en Moreno | AQUAPUEL', description: 'Contactá a Aquapuel por WhatsApp, email o formulario. Consultá cobertura y coordiná bidones de 12 y 20 litros. Ruta Provincial 24 5801, Cuartel V, Moreno.' },
} as const;

export function pageMetadata(page: keyof typeof SEO_PAGES): Metadata {
  const item = SEO_PAGES[page];
  const url = SITE_URL + item.path;
  return {
    title: { absolute: item.title },
    description: item.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website', locale: 'es_AR', siteName: 'AQUAPUEL',
      title: item.title, description: item.description, url,
      images: [{ url: SITE_URL + '/media/planta-aquapuel.webp', alt: 'Bidones de agua Aquapuel' }],
    },
    twitter: {
      card: 'summary_large_image', title: item.title,
      description: item.description, images: [SITE_URL + '/media/planta-aquapuel.webp'],
    },
  };
}

export const BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness', '@id': SITE_URL + '/#negocio',
      name: 'AQUAPUEL', url: SITE_URL,
      description: 'Agua de mesa envasada en bidones de 12 y 20 litros para hogares, oficinas y comercios.',
      logo: SITE_URL + '/media/logo.webp',
      image: SITE_URL + '/media/planta-aquapuel.webp',
      telephone: '+54-11-7364-3736', email: EMAIL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ruta Provincial 24 5801, Cuartel V',
        addressLocality: 'Moreno', addressRegion: 'Buenos Aires', addressCountry: 'AR',
      },
      sameAs: [INSTAGRAM_URL, FACEBOOK_URL, TIKTOK_URL],
    },
    {
      '@type': 'WebSite', '@id': SITE_URL + '/#sitio',
      url: SITE_URL, name: 'AQUAPUEL', inLanguage: 'es-AR',
      publisher: { '@id': SITE_URL + '/#negocio' },
    },
  ],
};
