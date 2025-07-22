import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
    // Alternatively, you can use domains for specific hosts:
    // domains: [
    //   'www.record.com.mx',
    //   'example.com',
    //   'images.unsplash.com',
    //   'via.placeholder.com'
    // ]
  }
};

export default nextConfig;
