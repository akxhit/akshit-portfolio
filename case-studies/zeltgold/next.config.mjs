import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(here, '../..');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/case-studies/zeltgold',
  trailingSlash: true,

  // Dependencies and the lockfile are shared by every case-study workspace.
  turbopack: { root: workspaceRoot },

  images: {
    unoptimized: true,
    // Source art is 1125px-wide phone captures shown at ~200–260 CSS px.
    // These are the only widths the layout ever asks for.
    imageSizes: [96, 128, 160, 200, 256, 320, 384],
    deviceSizes: [420, 640, 828, 1080],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
