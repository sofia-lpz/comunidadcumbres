#!/usr/bin/env node
// Archivo comentado temporalmente para build estático
// TODO: Descomentar cuando se reactive la conexión a base de datos

// import { config } from 'dotenv';
// import { resolve } from 'path';

// // Load environment variables from .env.local
// config({ path: resolve(process.cwd(), '.env.local') });

console.log('Environment variables test (STATIC MODE):');
console.log('✅ Environment test skipped - static mode enabled');

// console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET');
// console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET');
// console.log('NODE_ENV:', process.env.NODE_ENV);

// if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
//   console.log('✅ Environment variables are loaded correctly');
// } else {
//   console.log('❌ Environment variables are NOT loaded');
// }
