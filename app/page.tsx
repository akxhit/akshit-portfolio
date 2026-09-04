export default function Home() {
  return (
    <main className="portfolio-shell">
      <iframe
        className="portfolio-frame"
        src="/portfolio/index.html?v=portfolio5"
        title="Akshit Manik product design portfolio"
      />
      <noscript>
        {/* oxlint-disable-next-line nextjs/no-html-link-for-pages -- Static fallback when React and Next navigation are unavailable. */}
        <a href="/portfolio/index.html?v=portfolio5">
          Open Akshit Manik&apos;s portfolio
        </a>
      </noscript>
    </main>
  );
}
