import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(here, '..');
const serverPath = path.join(siteRoot, 'dist', 'server', 'index.js');
const server = (await import(serverPath)).default;

const routes = [
  { url: '/', files: ['index.html'] },
  { url: '/work/cars24', files: ['work/cars24.html', 'work/cars24/index.html'] },
  { url: '/work/infraone', files: ['work/infraone.html', 'work/infraone/index.html'] },
  { url: '/work/prepinsta-app', files: ['work/prepinsta-app.html', 'work/prepinsta-app/index.html'] },
  { url: '/work/prepinsta-web', files: ['work/prepinsta-web.html', 'work/prepinsta-web/index.html'] },
  { url: '/work/zeltgold', files: ['work/zeltgold.html', 'work/zeltgold/index.html'] },
];

for (const { url, files } of routes) {
  const res = await server.fetch(new Request('http://localhost' + url), {}, { waitUntil: () => {} });
  if (res.status !== 200) throw new Error(`Failed to prerender ${url}: ${res.status}`);
  const html = await res.text();

  for (const relFile of files) {
    const fullPath = path.join(siteRoot, 'dist', 'client', relFile);
    await mkdir(path.dirname(fullPath), { recursive: true });
    await writeFile(fullPath, html, 'utf8');
    console.log(`Prerendered: ${relFile} (${html.length} bytes)`);
  }
}

console.log('Static routes prerendered successfully.');
