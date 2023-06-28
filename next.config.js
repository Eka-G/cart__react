/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: "https://api.lichi.com/:slug*",
      },
    ];
  },
};

module.exports = nextConfig;
