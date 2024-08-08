/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://clair-cosmetic.netlify.app/", "http://localhost:3000/"],
  },
};

export default nextConfig;
