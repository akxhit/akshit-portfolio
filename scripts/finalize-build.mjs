import { appendFile, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const headersFile = path.resolve(here, '..', 'dist', 'client', '_headers');
const marker = '# Cache versioned case-study media immutably';
const mediaHeaders = `

${marker}
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/case-studies/prepinsta-app/media/*
  Cache-Control: public, max-age=31536000, immutable

/case-studies/prepinsta-web/media/*
  Cache-Control: public, max-age=31536000, immutable

/case-studies/zeltgold/media/*
  Cache-Control: public, max-age=31536000, immutable

/case-studies/infraone/media/*
  Cache-Control: public, max-age=31536000, immutable
`;

const currentHeaders = await readFile(headersFile, 'utf8');
if (!currentHeaders.includes(marker)) {
  await appendFile(headersFile, mediaHeaders, 'utf8');
}

const siteRoot = path.resolve(here, '..');
const generatedDirectories = [
  path.join(siteRoot, '.next'),
  path.join(siteRoot, '.vinext'),
  path.join(siteRoot, '.wrangler'),
  path.join(siteRoot, 'public', 'assets'),
  path.join(siteRoot, 'public', 'cars24'),
  path.join(siteRoot, 'public', 'case-studies'),
  path.join(siteRoot, 'public', 'portfolio'),
  ...['infraone', 'prepinsta-app', 'prepinsta-web', 'zeltgold'].flatMap(
    (project) => [
      path.join(siteRoot, 'case-studies', project, '.next'),
      path.join(siteRoot, 'case-studies', project, 'node_modules'),
      path.join(siteRoot, 'case-studies', project, 'out'),
    ],
  ),
];

await Promise.all(
  generatedDirectories.map((directory) =>
    rm(directory, { recursive: true, force: true }),
  ),
);
