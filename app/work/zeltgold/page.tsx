import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ZELTGOLD Jewellery Savings App',
  description: 'A two-designer team delivered a jewellery savings app and launch site in 20 days.',
  openGraph: {
    title: 'ZELTGOLD Jewellery Savings App',
    description: 'A two-designer team delivered a jewellery savings app and launch site in 20 days.',
    images: [{ url: '/portfolio/assets/zeltgold.png', alt: 'ZELTGOLD product design case study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZELTGOLD Jewellery Savings App',
    description: 'A two-designer team delivered a jewellery savings app and launch site in 20 days.',
    images: ['/portfolio/assets/zeltgold.png'],
  },
};

export default function ZeltgoldCaseStudy() {
  return (
    <main className="case-study-shell">
      <iframe
        className="case-study-frame"
        src="/case-studies/zeltgold/?v=portfolio2"
        title="ZELTGOLD jewellery savings app case study"
      />
    </main>
  );
}
