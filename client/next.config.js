/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  pwa: {
    disable: true,
  },
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT
  }
}

module.exports = nextConfig
