import type { Metadata } from 'next';
import { asset } from '@/lib/assets';
import { BUSINESS_SCHEMA, SITE_URL } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: {
    index: !process.env.NEXT_PUBLIC_BASE_PATH,
    follow: true,
    googleBot: { index: !process.env.NEXT_PUBLIC_BASE_PATH, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [
      { url: asset('/favicon-32.png'), type: 'image/png', sizes: '32x32' },
      { url: asset('/favicon-192.png'), type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: asset('/apple-touch-icon.png'), sizes: '180x180' }],
  },
  title: { default: 'AQUAPUEL | Agua que acompaña', template: '%s | AQUAPUEL' },
  description:
    'Agua de mesa envasada, baja en sodio y tratada con ozono para hogares y oficinas.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BUSINESS_SCHEMA).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  );
}
