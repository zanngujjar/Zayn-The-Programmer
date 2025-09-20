/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable static worker request deduping for better build performance
    staticWorkerRequestDeduping: true,
  },

  // Custom build ID for cache invalidation
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID
    }
    return `build-${Date.now()}`
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // Compression
  compress: true,

  // Output configuration for static export (if needed)
  // trailingSlash: true,
  // output: 'export',

  // Headers for better caching
  async headers() {
    return [
      {
        source: '/how-to/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/content/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Rewrites for API routes (if needed for content management)
  async rewrites() {
    return [
      {
        source: '/api/posts/:path*',
        destination: '/api/posts/:path*',
      },
    ]
  },

  // Webpack configuration for performance
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    }

    // Add support for importing markdown files
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })

    return config
  },

  // Environment variables
  env: {
    CONTENT_CACHE_TTL: process.env.CONTENT_CACHE_TTL || '3600',
    REVALIDATE_SECRET: process.env.REVALIDATE_SECRET || 'dev-secret',
  },

  // Powered by header removal for security
  poweredByHeader: false,

  // React strict mode
  reactStrictMode: true,

  // SWC minification
  swcMinify: true,
}

module.exports = nextConfig