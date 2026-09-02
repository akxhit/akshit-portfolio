import { appendFile, readFile } from 'node:fs/promises';
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
`;

const currentHeaders = await readFile(headersFile, 'utf8');
if (!currentHeaders.includes(marker)) {
  await appendFile(headersFile, mediaHeaders, 'utf8');
}
