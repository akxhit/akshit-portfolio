import { Archivo, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import '@designcodeio/threeui/style.css';
import Providers from '@/components/Providers';

// Same voice as the app case study — these two pieces are one portfolio.
// Archivo's width axis echoes PrepInsta's own chunky display type.
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
  title: 'PrepInsta on the Web — redesigning the pages that carry the revenue',
  description:
    'A web product case study: rebuilding the pricing page, syllabus page, profile, ' +
    'search and navigation behind PrepInsta Prime — for 10M+ monthly learners.',
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
