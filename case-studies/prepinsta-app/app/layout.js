import { Archivo, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import '@designcodeio/threeui/style.css';
import Providers from '@/components/Providers';

// Display voice. Geist is the framework default — fine for text, but it is not
// a face anyone chose. Archivo's width axis echoes the app's own chunky
// display type ("LIKE A PRO", "TECH SKILLS").
const display = Archivo({
  variable: '--font-display',
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
});
const sans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});
const mono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'PrepInsta Prime Mobile App',
  description:
    "A 0→1 UX case study: rebuilding India's placement-prep subscription as a native app — " +
    'first for the students who had already paid, then for the ones who never would.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F6F2' },
    { media: '(prefers-color-scheme: dark)', color: '#070C0A' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
