/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [],
    unoptimized: true, // Disable image optimization for SVGs
  },
  // Suppress warnings about dynamic routes during build
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Enable static exports if needed
  // output: 'export',
};

module.exports = nextConfig;


















