const withNextIntl = require('next-intl/plugin')(
  './i18n/request.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
    // typedRoutes: true // Disabled due to dynamic routing conflicts
};

module.exports = withNextIntl(nextConfig);
