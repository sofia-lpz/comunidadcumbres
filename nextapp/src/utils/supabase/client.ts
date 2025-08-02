// Archivo comentado temporalmente para build estático
// TODO: Descomentar cuando se reactive la conexión a base de datos

// import { createBrowserClient } from '@supabase/ssr'

// export function createClient() {
//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   )
// }

// Export temporal para evitar errores de import
export function createClient() {
  throw new Error('Supabase cliente deshabilitado en modo estático');
}
