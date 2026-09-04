import { Inter, Newsreader } from 'next/font/google';
import './globals.css';

const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const display = Newsreader({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata = {
  title: 'InfraOne AI Labs | Brand and Digital Case Study',
  description:
    'Brand identity, landing page and campaign design for InfraOne School of AI.',
  openGraph: {
    title: 'InfraOne AI Labs | Brand and Digital Case Study',
    description: 'Landing page, identity and campaign design by Akshit Manik.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fff8f1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
