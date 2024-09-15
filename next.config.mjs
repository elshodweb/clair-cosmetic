/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'ba745807670a.vps.myjino.ru',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
