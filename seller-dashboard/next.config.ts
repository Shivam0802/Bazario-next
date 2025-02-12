import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost', 'your-production-domain.com'], // Add your allowed domains here
  },
};

export default nextConfig;
