#!/usr/bin/env node
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

// Also try .env
config({ path: resolve(process.cwd(), '.env') });

console.log('🔍 Validating environment configuration...');

// Check all possible environment variable sources
const envVars = {
  // Public variables (Next.js standard)
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  // Private variables (for server-side Vercel)
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  // Vercel configuration
  VERCEL: process.env.VERCEL,
  VERCEL_ENV: process.env.VERCEL_ENV,
  NODE_ENV: process.env.NODE_ENV || 'development'
};

console.log('📋 Environment variables status:');
Object.entries(envVars).forEach(([key, value]) => {
  const status = value ? '✅ SET' : '❌ NOT SET';
  console.log(`  ${key}: ${status}`);
});

// Validate that we have at least one set of credentials
const hasPublicVars = envVars.NEXT_PUBLIC_SUPABASE_URL && envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const hasPrivateVars = envVars.SUPABASE_URL && envVars.SUPABASE_ANON_KEY;
const hasVercelConfig = envVars.VERCEL || envVars.VERCEL_ENV;

if (!hasPublicVars && !hasPrivateVars) {
  console.error('❌ No valid Supabase configuration found!');
  console.error('   You need either:');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY (for client-side)');
  console.error('   - SUPABASE_URL + SUPABASE_ANON_KEY (for server-side/Vercel)');
  process.exit(1);
}

if (hasVercelConfig) {
  console.log('� Vercel deployment configuration detected');
}

if (hasPublicVars) {
  console.log('🌐 Public environment variables configured (client + server)');
}

if (hasPrivateVars) {
  console.log('🔒 Private environment variables configured (server-only)');
}

console.log('✅ Environment configuration is valid!');
