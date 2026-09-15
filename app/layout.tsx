import type { Metadata } from 'next';
import { asset } from '@/lib/assets';
import './globals.css';

export const metadata: Metadata = {
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
      <body>{children}</body>
    </html>
  );
}
