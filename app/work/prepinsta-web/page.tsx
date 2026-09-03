import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PrepInsta Prime Web',
  description: 'A redesign of the syllabus, purchase, profile, search, and navigation across PrepInsta Prime on the web.',
};

export default function PrepInstaWebCaseStudy() {
  return (
    <main className="case-study-shell">
      <iframe
        className="case-study-frame"
        src="/case-studies/prepinsta-web/index.html?v=portfolio6"
        title="PrepInsta Prime web case study"
      />
    </main>
  );
}
