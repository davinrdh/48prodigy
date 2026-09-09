import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https' as const,
        hostname: 'drive.usercontent.google.com',
      },
    ],
  },
};
 
module.exports = withNextIntl(nextConfig);