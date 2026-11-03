/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cpus: 1,
    webpackBuildWorker: false
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**'
      },
      {
        protocol: 'https',
        hostname: 'books.google.com',
        pathname: '/books/content/**'
      }
    ]
  }
}

module.exports = nextConfig
