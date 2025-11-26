/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@neondatabase/serverless'],
  },
  // Enable SWC minification for better performance
  swcMinify: true,
  // Optimize images
  images: {
    unoptimized: true, // Since we're not using Next.js image optimization
  },
  // Enable compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig