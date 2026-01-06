/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [],
    unoptimized: true, // Disable image optimization for SVGs
  },
  // Enable static exports if needed
  // output: 'export',
};

module.exports = nextConfig;


















