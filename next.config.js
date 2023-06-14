/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cortez.link', 'cdn.raster.app']
  }
}

module.exports = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  nextConfig
}