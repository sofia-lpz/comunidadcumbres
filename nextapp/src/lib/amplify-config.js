// Configuración específica para AWS Amplify
// Este archivo maneja los secrets en producción

import { getEnvConfig } from './env-config.js';

let cachedConfig = null;

export async function getSupabaseConfigForAmplify() {
  // Cache la configuración para evitar múltiples llamadas
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    // En desarrollo o cuando AWS no está disponible, usar variables tradicionales
    if (process.env.NODE_ENV !== 'production' || typeof window !== 'undefined') {
      cachedConfig = {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      };
      return cachedConfig;
    }

    // En producción con AWS Amplify
    const config = await getEnvConfig();
    cachedConfig = {
      url: config.supabaseUrl,
      key: config.supabaseKey
    };

    return cachedConfig;
  } catch (error) {
    console.error('Error loading Amplify config:', error);
    
    // Fallback a variables de entorno tradicionales
    cachedConfig = {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
    };
    
    return cachedConfig;
  }
}

// Función para limpiar cache (útil para testing)
export function clearConfigCache() {
  cachedConfig = null;
}
