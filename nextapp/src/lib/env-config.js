// Archivo comentado temporalmente para build estático
// TODO: Descomentar cuando se reactive la conexión a base de datos

export async function getEnvConfig() {
  // Retornar configuración estática para evitar errores
  return {
    supabaseUrl: null,
    supabaseKey: null,
    nodeEnv: process.env.NODE_ENV || 'development',
    isClient: typeof window !== 'undefined',
    isConfigured: false,
    message: 'Configuración de entorno deshabilitada en modo estático'
  };
}

// Versión síncrona para compatibilidad con código existente
export function getEnvConfigSync() {
  return {
    supabaseUrl: null,
    supabaseKey: null,
    nodeEnv: process.env.NODE_ENV || 'development',
    isClient: typeof window !== 'undefined',
    isConfigured: false,
    message: 'Configuración de entorno deshabilitada en modo estático'
  };
}

// Función para validar la configuración durante el build
export async function validateBuildConfig() {
  console.log('✅ Environment configuration skipped (static mode)');
  return true;
}

// Función síncrona para validar la configuración durante el build
export function validateBuildConfigSync() {
  console.log('✅ Environment configuration skipped (static mode)');
  return true;
}

/*
// CÓDIGO ORIGINAL COMENTADO PARA REACTIVAR POSTERIORMENTE

// Configuración para manejo de variables de entorno optimizada para deployment + Supabase
async function loadServerSecrets() {
  // Solo en servidor - Las plataformas de deployment automáticamente exponen las variables de entorno
  if (typeof window === 'undefined') {
    try {
      // Variables de entorno de servidor/deployment platform
      return {
        supabaseUrl: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      };
    } catch (error) {
      console.warn('Server environment variables not available, falling back to standard env vars');
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

  // En servidor de producción, intentar cargar desde variables de servidor primero
  if (!isClient && isProduction) {
    const serverSecrets = await loadServerSecrets();
    if (serverSecrets) {
      config.supabaseUrl = serverSecrets.supabaseUrl;
      config.supabaseKey = serverSecrets.supabaseKey;
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
*/
