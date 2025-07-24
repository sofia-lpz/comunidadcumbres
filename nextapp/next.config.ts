import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración de variables de entorno para desarrollo y producción
  env: {
    // Variables públicas (disponibles en cliente)
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    // Variables privadas (solo en servidor) - para AWS Amplify
    SUPABASE_URL: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  
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
    ],
    // Alternatively, you can use domains for specific hosts:
    // domains: [
    //   'www.record.com.mx',
    //   'example.com',
    //   'images.unsplash.com',
    //   'via.placeholder.com'
    // ]
  },

  // Configuración para el build
  serverExternalPackages: ['@supabase/supabase-js'],

  // Configuración de variables públicas en tiempo de build
  publicRuntimeConfig: {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }
};

export default nextConfig;
