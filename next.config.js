/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable SWC minification for faster builds
  swcMinify: true,
  // Optimize images
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    // Faster transpilation
    typedRoutes: false,
    // Optimize CSS
    optimizeCss: false,
  },
  // Disable production sourcemaps for better performance
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
