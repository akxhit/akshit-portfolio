import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PrepInsta Prime Mobile App',
  description: 'Rebuilding the PrepInsta Prime mobile experience around a clear path to learning.',
};

export default function PrepInstaAppCaseStudy() {
  return (
    <main className="case-study-shell">
      <iframe
        className="case-study-frame"
        src="/case-studies/prepinsta-app/index.html?v=portfolio2"
        title="PrepInsta Prime mobile app case study"
      />
    </main>
  );
}
