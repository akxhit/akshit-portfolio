import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(here, '../..');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/case-studies/infraone',
  trailingSlash: true,
  turbopack: { root: workspaceRoot },
  images: { unoptimized: true },
};

export default nextConfig;
