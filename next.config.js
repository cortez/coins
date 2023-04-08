/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL || 'https://coins.cortez.link'
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  nextConfig
}