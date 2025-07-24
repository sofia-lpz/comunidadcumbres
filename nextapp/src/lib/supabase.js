
import { createClient } from '@supabase/supabase-js'
import { getEnvConfigSync } from './env-config'

// Obtener configuración de variables de entorno
const config = getEnvConfigSync()
const supabaseUrl = config.supabaseUrl
const supabaseKey = config.supabaseKey

// Detailed error logging for debugging
if (!supabaseUrl || !supabaseKey) {
  const errorInfo = {
    supabaseUrl: supabaseUrl ? '✅ SET' : '❌ MISSING',
    supabaseKey: supabaseKey ? '✅ SET' : '❌ MISSING',
    nodeEnv: process.env.NODE_ENV || 'undefined',
    isClient: typeof window !== 'undefined',
    availableVars: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
      SUPABASE_URL: process.env.SUPABASE_URL ? 'SET' : 'NOT SET',
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'
    }
  }
  
  console.error('Supabase configuration error:', errorInfo)
  
  if (!supabaseUrl) {
    throw new Error('supabaseUrl is required.')
  }
  
  if (!supabaseKey) {
    throw new Error('supabaseKey is required.')
  }
}

// Crear cliente con configuración optimizada
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: typeof window !== 'undefined', // Solo en el cliente
    detectSessionInUrl: typeof window !== 'undefined' // Solo en el cliente
  },
  // Configuración adicional para producción
  global: {
    headers: {
      'x-application-name': 'comunidadcumbres'
    }
  }
})