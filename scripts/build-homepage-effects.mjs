import { build } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export async function buildHomepageEffects() {
  const outDir = path.join(root, 'homepage/vendor/aero-shards');
  await build({
    configFile: false,
    root,
    publicDir: false,
    plugins: [react()],
    define: { 'process.env.NODE_ENV': JSON.stringify('production') },
    build: {
      outDir,
      emptyOutDir: true,
      lib: {
        entry: path.join(root, 'components/portfolio/prepinsta-background.jsx'),
        name: 'PrepInstaBackground',
        formats: ['iife'],
        fileName: () => 'aero-shards.js',
        cssFileName: 'aero-shards',
      },
    },
  });
  await copyFile(
    path.join(root, 'node_modules/vgpu/LICENSE'),
    path.join(outDir, 'VGPU-LICENSE.txt'),
  );
}
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await buildHomepageEffects();
}
