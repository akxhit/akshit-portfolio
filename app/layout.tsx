import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://akshit.work'),
  title: {
    default: 'Akshit Manik | Product Designer',
    template: '%s | Akshit Manik',
  },
  description:
    'Product designer working across mobile and web. Explore selected case studies for ZELTGOLD, PrepInsta Prime, and Cars24.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Akshit Manik | Product Designer',
    description:
      'Product design for mobile and web, told through five detailed case studies.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Akshit Manik product design portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akshit Manik | Product Designer',
    description:
      'Product design for mobile and web, told through five detailed case studies.',
    images: ['/og.png'],
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
