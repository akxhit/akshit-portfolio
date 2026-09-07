import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(here, '..');
const clientDir = path.join(siteRoot, 'dist', 'client');
const serverPath = path.join(siteRoot, 'dist', 'server', 'index.js');

let server = null;
try {
  const serverMod = await import(pathToFileURL(serverPath).href);
  server = serverMod.default?.fetch ? serverMod.default : (serverMod.fetch ? serverMod : serverMod.default?.default);
} catch (err) {
  console.warn('Could not dynamically import server worker:', err.message);
}

// Find built CSS file if available
let cssHref = '/_next/static/css/index.css';
try {
  const cssDir = path.join(clientDir, '_next', 'static', 'css');
  const cssFiles = await readdir(cssDir);
  const mainCss = cssFiles.find((f) => f.endsWith('.css'));
  if (mainCss) {
    cssHref = `/_next/static/css/${mainCss}`;
  }
} catch {
  // Use fallback
}

const inlineStyles = `
  html, body {
    background: #0a0a0a;
    height: 100%;
    margin: 0;
    overflow: hidden;
    width: 100%;
  }
  .portfolio-shell, .case-study-shell {
    height: 100dvh;
    overflow: hidden;
    position: relative;
    width: 100vw;
  }
  .portfolio-frame, .case-study-frame {
    background: #0a0a0a;
    border: 0;
    display: block;
    height: 100%;
    width: 100%;
  }
  @media (max-width: 809.98px) {
    .cars24-shell {
      overflow-x: auto;
      overscroll-behavior-x: contain;
      -webkit-overflow-scrolling: touch;
    }
    .cars24-frame {
      min-width: 1440px;
      width: 1440px;
    }
  }
  noscript {
    color: white;
    font-family: sans-serif;
    inset: 0;
    padding: 32px;
    position: fixed;
  }
`;

const routes = [
  {
    url: '/',
    title: 'Akshit Manik | Product Designer',
    desc: 'Product designer working across mobile and web. Explore selected case studies for ZELTGOLD, PrepInsta Prime, and Cars24.',
    iframeSrc: '/portfolio/index.html?v=portfolio10',
    iframeTitle: 'Akshit Manik product design portfolio',
    isHome: true,
    files: ['index.html'],
  },
  {
    url: '/work/cars24',
    title: 'Cars24 Dealer Auctions | Akshit Manik',
    desc: 'A product design case study focused on trust, transparency, and energy in the Cars24 dealer auction experience.',
    iframeSrc: '/cars24/index.html?v=portfolio10',
    iframeTitle: 'Cars24 dealer auction case study',
    desktopOnMobile: true,
    files: ['work/cars24.html', 'work/cars24/index.html'],
  },
  {
    url: '/work/infraone',
    title: 'InfraOne AI Labs | Akshit Manik',
    desc: 'Landing page, identity and campaign design for InfraOne School of AI.',
    iframeSrc: '/case-studies/infraone/index.html?v=portfolio9',
    iframeTitle: 'InfraOne AI Labs brand and digital case study',
    files: ['work/infraone.html', 'work/infraone/index.html'],
  },
  {
    url: '/work/prepinsta-app',
    title: 'PrepInsta Prime Mobile App | Akshit Manik',
    desc: 'Rebuilding the PrepInsta Prime mobile experience around a clear path to learning.',
    iframeSrc: '/case-studies/prepinsta-app/index.html?v=portfolio9',
    iframeTitle: 'PrepInsta Prime mobile app case study',
    files: ['work/prepinsta-app.html', 'work/prepinsta-app/index.html'],
  },
  {
    url: '/work/prepinsta-web',
    title: 'PrepInsta Prime Web | Akshit Manik',
    desc: 'A redesign of the syllabus, purchase, profile, search, and navigation across PrepInsta Prime on the web.',
    iframeSrc: '/case-studies/prepinsta-web/index.html?v=portfolio9',
    iframeTitle: 'PrepInsta Prime web case study',
    files: ['work/prepinsta-web.html', 'work/prepinsta-web/index.html'],
  },
  {
    url: '/work/zeltgold',
    title: 'ZELTGOLD Jewellery Savings App | Akshit Manik',
    desc: 'A two-designer team delivered a jewellery savings app and launch site in 20 days.',
    iframeSrc: '/case-studies/zeltgold/index.html?v=portfolio9',
    iframeTitle: 'ZELTGOLD jewellery savings app case study',
    files: ['work/zeltgold.html', 'work/zeltgold/index.html'],
  },
];

function generateFallbackHtml(r) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${r.title}</title>
    <meta name="description" content="${r.desc}" />
    <meta property="og:title" content="${r.title}" />
    <meta property="og:description" content="${r.desc}" />
    <meta property="og:image" content="https://akshitmanik.vercel.app/og.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Akshit Manik product design portfolio" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${r.title}" />
    <meta name="twitter:description" content="${r.desc}" />
    <meta name="twitter:image" content="https://akshitmanik.vercel.app/og.png" />
    <link rel="icon" href="/favicon.svg" />
    <link rel="stylesheet" href="${cssHref}" />
    <style>${inlineStyles}</style>
    <script src="/shared/page-transition-parent.js?v=portfolio4"></script>
  </head>
  <body>
    <main class="${r.isHome ? 'portfolio-shell' : `case-study-shell${r.desktopOnMobile ? ' cars24-shell' : ''}`}">
      <iframe class="${r.isHome ? 'portfolio-frame' : `case-study-frame${r.desktopOnMobile ? ' cars24-frame' : ''}`}" src="${r.iframeSrc}" title="${r.iframeTitle}"></iframe>
      ${r.isHome ? `<noscript><a href="${r.iframeSrc}">Open Akshit Manik's portfolio</a></noscript>` : ''}
    </main>
  </body>
</html>`;
}

for (const r of routes) {
  let html = '';
  if (server?.fetch) {
    try {
      const res = await server.fetch(new Request('http://localhost' + r.url), {}, { waitUntil: () => {} });
      if (res.status === 200) {
        html = await res.text();
      }
    } catch (e) {
      console.warn(`Server render failed for ${r.url}, using static template:`, e.message);
    }
  }

  if (!html) {
    html = generateFallbackHtml(r);
  }

  for (const relFile of r.files) {
    const fullPath = path.join(clientDir, relFile);
    await mkdir(path.dirname(fullPath), { recursive: true });
    await writeFile(fullPath, html, 'utf8');
    console.log(`Prerendered: ${relFile} (${html.length} bytes)`);
  }
}

console.log('All routes prerendered successfully.');
