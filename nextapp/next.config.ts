import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  // Configuración actualizada para Next.js 15.3.5
  serverExternalPackages: ['@supabase/supabase-js'],
  
  // Configuración de imágenes
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
    ]
  }
};

export default nextConfig;
