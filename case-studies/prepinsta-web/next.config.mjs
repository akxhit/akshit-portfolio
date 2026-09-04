import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(here, '../..');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/case-studies/prepinsta-web',
  trailingSlash: true,

  // Dependencies and the lockfile are shared by every case-study workspace.
  turbopack: { root: workspaceRoot },

  images: {
    unoptimized: true,
    // Desktop captures are shown at ~1088 CSS px inside the browser frame, so a
    // Retina screen asks for ~2176. The old ceiling of 1080 was inherited from
    // the app case study, where everything was a 260px phone — it capped every
    // desktop screen at half resolution.
    deviceSizes: [640, 828, 1080, 1440, 1920, 2176, 2560],
    imageSizes: [128, 200, 256, 320, 384, 512, 640, 750, 828],

    // WebP, not AVIF. These pages are 8,000–20,000px tall; AVIF encoding at that
    // size takes tens of seconds per variant, which the first visitor pays for.
    // WebP at q90 is visually indistinguishable on flat UI screenshots and
    // encodes in a fraction of the time.
    formats: ['image/webp'],
    qualities: [75, 90],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
