/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'tcgwvzqiygfpmcrovgzl.supabase.co',
        protocol: 'https',
      },
    ],
  },
};

module.exports = nextConfig;
