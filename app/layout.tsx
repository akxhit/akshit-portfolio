import type { Metadata } from 'next';
import { Fraunces, Instrument_Sans } from 'next/font/google';
import './globals.css';

const instrument = Instrument_Sans({ variable: '--font-instrument', subsets: ['latin'] });
const fraunces = Fraunces({ variable: '--font-fraunces', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cars24 Auction Experience — Product Design Case Study',
  description: 'A complete product design case study improving transparency, trust and energy in the Cars24 dealer auction experience.',
  openGraph: {
    title: 'Redesigning a Car Auction App Experience',
    description: 'Trust, transparency, and energy for dealer auctions.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Cars24 auction app redesign case study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Redesigning a Car Auction App Experience',
    description: 'Trust, transparency, and energy for dealer auctions.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${instrument.variable} ${fraunces.variable}`}>{children}</body></html>;
}
