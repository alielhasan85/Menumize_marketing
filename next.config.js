// next.config.js
const createNextIntlPlugin = require('next-intl/plugin');

// Tell next-intl where your request config is
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

module.exports = withNextIntl(nextConfig);
