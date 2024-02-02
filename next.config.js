/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['payeer.com'],
  },
  env:{
    BASE_API_URL: process.env.NODE_ENV === "development" ? 'https://api.babelcoins.com'  : 'https://api.babelcoins.com'
  }
}

module.exports = nextConfig
