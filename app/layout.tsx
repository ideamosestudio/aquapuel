import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
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
