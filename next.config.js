/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: false,
  productionBrowserSourceMaps: false,
  optimizeFonts: false,
  poweredByHeader: false,
  swcMinify: false,
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      config.optimization = {
        ...config.optimization, 
        minimize: false,
        splitChunks: {
          chunks: 'all',
        },
      }
    }
    return config
  },
}

module.exports = nextConfig
 
