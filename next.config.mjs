/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true, // Lint check is run before build step
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
};
export default nextConfig;
