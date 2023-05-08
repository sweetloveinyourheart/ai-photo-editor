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
    API_ENDPOINT: process.env.API_ENDPOINT,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
  }
}

module.exports = nextConfig
