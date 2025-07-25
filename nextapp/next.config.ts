import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NO incluyas variables secretas en env - solo las públicas
  env: {
    CUSTOM_BUILD_ID: process.env.VERCEL_GIT_COMMIT_SHA || 'local'
  },
  
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
  },

  // Debug en build time (solo para verificar)
  webpack: (config, { buildId, dev, isServer }) => {
    if (!dev && isServer) {
      console.log('🔍 Server Build-time check:')
      console.log('NODE_ENV:', process.env.NODE_ENV)
      console.log('VERCEL_ENV:', process.env.VERCEL_ENV)
      console.log('Has SUPABASE_URL:', !!process.env.SUPABASE_URL)
      console.log('Has SERVICE_ROLE_KEY:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
      console.log('Has ANON_KEY:', !!process.env.SUPABASE_ANON_KEY)
    }
    return config
  }
};

export default nextConfig;
