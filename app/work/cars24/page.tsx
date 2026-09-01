import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cars24 Dealer Auctions',
  description: 'A product design case study focused on trust, transparency, and energy in the Cars24 dealer auction experience.',
};

export default function Cars24CaseStudy() {
  return (
    <main className="case-study-shell">
      <iframe
        className="case-study-frame"
        src="/cars24/"
        title="Cars24 dealer auction case study"
      />
    </main>
  );
}
