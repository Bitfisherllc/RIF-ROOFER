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
  // Suppress build-time errors for dynamic routes (they're expected)
  experimental: {
    // Allow dynamic routes to be analyzed without failing build
  },
};

module.exports = nextConfig;


















