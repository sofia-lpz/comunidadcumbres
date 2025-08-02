
// Archivo comentado temporalmente para build estático
// TODO: Descomentar cuando se reactive la conexión a base de datos

// import { createClient } from '@supabase/supabase-js'

// // Para el frontend, usar siempre las variables públicas
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// // Validación simple para development
// if (!supabaseUrl || !supabaseKey) {
//   console.error('Supabase frontend configuration missing:', {
//     url: !!supabaseUrl,
//     key: !!supabaseKey,
//     env: process.env.NODE_ENV
//   })
  
//   // Solo lanzar error en producción del cliente
//   if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
//     throw new Error('Supabase configuration is required')
//   }
// }

// // Crear cliente para el frontend con validación
// const createSupabaseClient = () => {
//   if (!supabaseUrl || !supabaseKey) {
//     throw new Error('Supabase configuration missing. Check your environment variables.')
//   }
  
//   return createClient(supabaseUrl, supabaseKey, {
//     auth: {
//       autoRefreshToken: true,
//       persistSession: typeof window !== 'undefined',
//       detectSessionInUrl: typeof window !== 'undefined'
//     }
//   })
// }

// // Export el cliente con validación mejorada
// export const supabase = (() => {
//   if (!supabaseUrl || !supabaseKey) {
//     // En desarrollo, mostrar error claro pero no fallar
//     if (process.env.NODE_ENV === 'development') {
//       console.error('🚨 Supabase configuration missing. Please check your .env.local file:')
//       console.error('Required variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY')
//       return null
//     }
//     // En producción, fallar inmediatamente
//     throw new Error('Supabase configuration is required in production')
//   }
//   return createSupabaseClient()
// })()

// // Export función para obtener cliente con validación
// export const getSupabaseClient = () => {
//   if (!supabase) {
//     throw new Error('Supabase client is not available. Check your environment variables.')
//   }
//   return supabase
// }

// Exports temporales para modo estático (evitar errores de import)
export const supabase = null;
export const getSupabaseClient = () => {
  throw new Error('Supabase deshabilitado en modo estático');
};