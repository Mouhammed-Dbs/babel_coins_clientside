/** @type {import('next').NextConfig} */
const path = require("path");
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});
const nextConfig = {
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "payeer.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    BASE_API_URL:
      process.env.NODE_ENV === "development"
        ? "https://api.babelcoins.com"
        : "https://api.babelcoins.com",
    COIN_MARKET_CAP:
      "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest",
  },
  async headers() {
    return [
      {
        source:
          process.env.NODE_ENV === "development"
            ? "//api.babelcoins.com/(.*)"
            : "//api.babelcoins.com/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value:
              process.env.NODE_ENV === "development"
                ? "http://localhost:3000"
                : "https://babelcoins.com",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-CMC_PRO_API_KEY",
          },
        ],
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
