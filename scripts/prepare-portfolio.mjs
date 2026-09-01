import { cp, mkdir, mkdtemp, readFile, readdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(here, '..');
const workspaceRoot = path.resolve(siteRoot, '..');
const publicRoot = path.join(siteRoot, 'public');

const sources = {
  homepage: path.join(workspaceRoot, 'Homepage'),
  mobile: path.join(workspaceRoot, 'PrepInsta Prime Mobile App Case Study'),
  web: path.join(workspaceRoot, 'PrepInsta Prime Web Case Study'),
};

function runBuild(cwd, label) {
  const result = spawnSync('npm', ['run', 'build'], {
    cwd,
    env: process.env,
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    throw new Error(`${label} failed to build.`);
  }
}

async function replaceDirectory(source, destination) {
  await rm(destination, { recursive: true, force: true });
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination, { recursive: true });
}

async function requireFile(file) {
  const info = await stat(file);
  if (!info.isFile()) throw new Error(`Expected a file at ${file}`);
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  }));
  return files.flat();
}

async function optimizeCaseStudyImages(directory) {
  const files = await walk(directory);
  const pngs = files.filter((file) => path.extname(file).toLowerCase() === '.png');

  await Promise.all(pngs.map(async (input) => {
    const output = input.replace(/\.png$/i, '.webp');
    const image = sharp(input);
    const metadata = await image.metadata();
    const width = metadata.width ?? 16000;
    const height = metadata.height ?? 16000;
    const pipeline = width > 16000 || height > 16000
      ? image.resize({ width: 16000, height: 16000, fit: 'inside', withoutEnlargement: true })
      : image;
    await pipeline.webp({ quality: 86, effort: 4 }).toFile(output);
    await rm(input);
  }));

  const textExtensions = new Set(['.css', '.html', '.js', '.json', '.txt']);
  const generatedFiles = await walk(directory);
  await Promise.all(generatedFiles
    .filter((file) => textExtensions.has(path.extname(file).toLowerCase()))
    .map(async (file) => {
      const original = await readFile(file, 'utf8');
      const updated = original.replace(/\.png\b/g, '.webp');
      if (updated !== original) await writeFile(file, updated, 'utf8');
    }));
}

async function optimizeCaseStudyVideos(directory) {
  if (process.platform !== 'darwin') return;

  const files = await walk(directory);
  const videos = [];
  for (const file of files) {
    if (path.extname(file).toLowerCase() !== '.mp4') continue;
    const info = await stat(file);
    if (info.size > 1_000_000) videos.push(file);
  }

  for (const input of videos) {
    const tempDirectory = await mkdtemp(path.join(os.tmpdir(), 'portfolio-video-'));
    const output = path.join(tempDirectory, 'optimized.m4v');
    const result = spawnSync('avconvert', [
      '--source', input,
      '--preset', 'PresetAppleM4VCellular',
      '--output', output,
      '--replace',
      '--disableMetadataFilter',
    ], { stdio: 'inherit' });

    if (result.status !== 0) {
      await rm(tempDirectory, { recursive: true, force: true });
      throw new Error(`Could not optimize ${input}.`);
    }

    await rename(output, input);
    await rm(tempDirectory, { recursive: true, force: true });
  }
}

const chromeHead = '<link data-portfolio-chrome rel="stylesheet" href="/shared/case-study-chrome.css">';
const chromeBody = '<!-- portfolio-chrome:start --><script src="/shared/case-study-chrome.js"></script><!-- portfolio-chrome:end -->';

async function injectCaseStudyChrome(file) {
  let html = await readFile(file, 'utf8');
  html = html
    .replace(/\r?\n?<link data-portfolio-chrome[^>]*>\r?\n?/g, '')
    .replace(/\r?\n?<!-- portfolio-chrome:start -->[\s\S]*?<!-- portfolio-chrome:end -->\r?\n?/g, '')
    .replace(/[ \t\r\n]+(?=<\/head>)/, '');

  if (!html.includes('</head>') || !html.includes('</body>')) {
    throw new Error(`Could not find a complete HTML document at ${file}`);
  }

  html = html
    .replace('</head>', `\n${chromeHead}\n</head>`)
    .replace('</body>', `\n${chromeBody}\n</body>`);
  await writeFile(file, html, 'utf8');
}

runBuild(sources.mobile, 'PrepInsta mobile case study');
runBuild(sources.web, 'PrepInsta web case study');

await replaceDirectory(sources.homepage, path.join(publicRoot, 'portfolio'));
await replaceDirectory(path.join(sources.mobile, 'out'), path.join(publicRoot, 'case-studies', 'prepinsta-app'));
await replaceDirectory(path.join(sources.web, 'out'), path.join(publicRoot, 'case-studies', 'prepinsta-web'));

await Promise.all([
  optimizeCaseStudyImages(path.join(publicRoot, 'case-studies', 'prepinsta-app')),
  optimizeCaseStudyImages(path.join(publicRoot, 'case-studies', 'prepinsta-web')),
  optimizeCaseStudyImages(path.join(publicRoot, 'cars24')),
  optimizeCaseStudyImages(path.join(publicRoot, 'zeltgold')),
  optimizeCaseStudyImages(path.join(publicRoot, 'portfolio')),
]);

await Promise.all([
  optimizeCaseStudyVideos(path.join(publicRoot, 'case-studies', 'prepinsta-app')),
  optimizeCaseStudyVideos(path.join(publicRoot, 'case-studies', 'prepinsta-web')),
]);

await Promise.all([
  requireFile(path.join(publicRoot, 'portfolio', 'index.html')),
  requireFile(path.join(publicRoot, 'case-studies', 'prepinsta-app', 'index.html')),
  requireFile(path.join(publicRoot, 'case-studies', 'prepinsta-web', 'index.html')),
  requireFile(path.join(publicRoot, 'cars24', 'index.html')),
  requireFile(path.join(publicRoot, 'zeltgold', 'index.html')),
  requireFile(path.join(publicRoot, 'shared', 'case-study-chrome.css')),
  requireFile(path.join(publicRoot, 'shared', 'case-study-chrome.js')),
]);

await Promise.all([
  injectCaseStudyChrome(path.join(publicRoot, 'case-studies', 'prepinsta-app', 'index.html')),
  injectCaseStudyChrome(path.join(publicRoot, 'case-studies', 'prepinsta-web', 'index.html')),
  injectCaseStudyChrome(path.join(publicRoot, 'cars24', 'index.html')),
  injectCaseStudyChrome(path.join(publicRoot, 'zeltgold', 'index.html')),
]);

console.log('Portfolio homepage and all four case studies are ready.');
