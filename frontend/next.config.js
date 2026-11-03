/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/SITE-KATALOG',
  assetPrefix: '/SITE-KATALOG',
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    cpus: 1,
    webpackBuildWorker: false
  }
}

module.exports = nextConfig
