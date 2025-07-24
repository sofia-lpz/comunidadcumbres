// Configuración para manejo de variables de entorno optimizada para Vercel + Supabase
async function loadVercelSecrets() {
  // Solo en servidor - Vercel automáticamente expone las variables de entorno
  if (typeof window === 'undefined') {
    try {
      // En Vercel, las variables de entorno se exponen directamente
      const hasVercelEnv = process.env.VERCEL || process.env.VERCEL_ENV;
      
      if (hasVercelEnv) {
        return {
          supabaseUrl: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
          supabaseKey: process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        };
      }
    } catch (error) {
      console.warn('Vercel environment variables not available, falling back to standard env vars');
    }
  }
  return null;
}

export async function getEnvConfig() {
  // Verificar si estamos en el lado del cliente o servidor
  const isClient = typeof window !== 'undefined';
  const isProduction = process.env.NODE_ENV === 'production';
  
  let config = {
    supabaseUrl: null,
    supabaseKey: null,
    nodeEnv: process.env.NODE_ENV || 'development',
    isClient
  };

  // En servidor de producción, intentar cargar desde Vercel secrets primero
  if (!isClient && isProduction) {
    const vercelSecrets = await loadVercelSecrets();
    if (vercelSecrets) {
      config.supabaseUrl = vercelSecrets.supabaseUrl;
      config.supabaseKey = vercelSecrets.supabaseKey;
    }
  }
  
  // Fallback a variables de entorno públicas/tradicionales
  if (!config.supabaseUrl || !config.supabaseKey) {
    config.supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    config.supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  }

  // Validar que las variables críticas estén presentes
  const requiredVars = ['supabaseUrl', 'supabaseKey'];
  const missingVars = requiredVars.filter(key => !config[key]);

  if (missingVars.length > 0) {
    const errorDetails = {
      missing: missingVars,
      environment: config.nodeEnv,
      isClient,
      available: {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
        SUPABASE_URL: process.env.SUPABASE_URL ? 'SET' : 'NOT SET',
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
        VERCEL: process.env.VERCEL ? 'SET' : 'NOT SET',
        VERCEL_ENV: process.env.VERCEL_ENV || 'NOT SET',
        NODE_ENV: config.nodeEnv
      }
    };
    
    console.error('Missing environment variables:', errorDetails);
    
    if (isProduction) {
      throw new Error(`Production deployment failed: Missing environment variables: ${missingVars.join(', ')}`);
    } else {
      console.warn('Development warning: Some environment variables are missing');
    }
  }

  return config;
}

// Versión síncrona para compatibilidad con código existente
export function getEnvConfigSync() {
  const isClient = typeof window !== 'undefined';
  
  const config = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY,
    nodeEnv: process.env.NODE_ENV || 'development',
    isClient
  };

  // Validación básica
  if (!config.supabaseUrl || !config.supabaseKey) {
    console.warn('Environment variables not fully configured, using fallback');
  }

  return config;
}

// Función para validar la configuración durante el build
export async function validateBuildConfig() {
  try {
    const config = await getEnvConfig();
    console.log('✅ Environment configuration validated successfully');
    return true;
  } catch (error) {
    console.error('❌ Environment configuration validation failed:', error.message);
    return false;
  }
}

// Función síncrona para validar la configuración durante el build
export function validateBuildConfigSync() {
  try {
    const config = getEnvConfigSync();
    
    // Verificar que tenemos al menos una configuración válida
    const hasPublicVars = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const hasPrivateVars = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY;
    
    if (!hasPublicVars && !hasPrivateVars) {
      throw new Error('No valid Supabase configuration found');
    }
    
    console.log('✅ Environment configuration validated successfully');
    return true;
  } catch (error) {
    console.error('❌ Environment configuration validation failed:', error.message);
    return false;
  }
}
