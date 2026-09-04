import Link from 'next/link';

export default function Home() {
  return (
    <main className="portfolio-shell">
      <iframe
        className="portfolio-frame"
        src="/portfolio/index.html?v=portfolio5"
        title="Akshit Manik product design portfolio"
      />
      <noscript>
        <Link href="/portfolio/index.html?v=portfolio5">
          Open Akshit Manik&apos;s portfolio
        </Link>
      </noscript>
    </main>
  );
}
