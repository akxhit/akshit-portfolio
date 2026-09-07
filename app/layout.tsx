import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://akshitmanik.vercel.app'),
  title: {
    default: 'Akshit Manik | AI Product Designer',
    template: '%s | Akshit Manik',
  },
  description:
    'Product Designer, with PM mindset and artist eye, 0→1 Products, Growth & UX | Turning Complex Problems into Simple Experiences',
  icons: { icon: { url: '/favicon.png', type: 'image/png' } },
  openGraph: {
    url: 'https://akshitmanik.vercel.app',
    type: 'website',
    siteName: 'Akshit Manik',
    title: 'Akshit Manik | AI Product Designer',
    description:
      'Product Designer, with PM mindset and artist eye, 0→1 Products, Growth & UX | Turning Complex Problems into Simple Experiences',
    images: [
      {
        url: '/og-v3.jpg',
        secureUrl: 'https://akshitmanik.vercel.app/og-v3.jpg',
        type: 'image/jpeg',
        width: 1200,
        height: 630,
        alt: 'Akshit Manik product design portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akshit Manik | AI Product Designer',
    description:
      'Product Designer, with PM mindset and artist eye, 0→1 Products, Growth & UX | Turning Complex Problems into Simple Experiences',
    images: ['/og-v3.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* oxlint-disable-next-line nextjs/no-sync-scripts -- This local bridge must load before iframe navigation. */}
        <script
          src="/shared/page-transition-parent.js?v=portfolio4"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
