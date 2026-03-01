import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/storage/v1/object/public/avatars/**',
      },
      {
        hostname: 'localhost'
      }
    ]
  }
};

export default nextConfig;
