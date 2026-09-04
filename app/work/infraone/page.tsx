import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InfraOne AI Labs',
  description:
    'Landing page, identity and campaign design for InfraOne School of AI.',
};

export default function InfraOneCaseStudy() {
  return (
    <main className="case-study-shell">
      <iframe
        className="case-study-frame"
        src="/case-studies/infraone/index.html?v=portfolio9"
        title="InfraOne AI Labs brand and digital case study"
      />
    </main>
  );
}
