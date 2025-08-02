// Script para verificar la conexión a Supabase - COMENTADO PARA MODO ESTÁTICO
// TODO: Descomentar cuando se reactive la conexión a base de datos
// Ejecutar con: node verify-connection.js

// const { createClient } = require('@supabase/supabase-js');
// require('dotenv').config({ path: '.env.local' });

async function verifyConnection() {
  console.log('🔍 Verificación de Supabase (MODO ESTÁTICO)...\n');
  console.log('✅ Verificación omitida - aplicación en modo estático');
  console.log('✅ No se requiere conexión a base de datos para el build');
  console.log('✅ Todas las funcionalidades usan datos estáticos\n');
  return true;
}

// Ejecutar verificación
verifyConnection().then(() => {
  console.log('🎉 Verificación completada exitosamente');
}).catch((err) => {
  console.error('❌ Error en verificación:', err);
});

/*
// CÓDIGO ORIGINAL COMENTADO

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function verifyConnection() {
  console.log('🔍 Verificando configuración de Supabase...\n');
  
  // Verificar variables de entorno
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  console.log('📋 Variables de entorno:');
  console.log(`   SUPABASE_URL: ${supabaseUrl ? '✅ Configurada' : '❌ Faltante'}`);
  console.log(`   SUPABASE_KEY: ${supabaseKey ? '✅ Configurada' : '❌ Faltante'}\n`);
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Faltan variables de entorno. Verifica tu archivo .env.local');
    process.exit(1);
  }
  
  try {
    // Crear cliente
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Verificar conexión básica
    console.log('🌐 Verificando conexión...');
    const { data, error } = await supabase.from('programs').select('count').limit(1);
    
    if (error) {
      console.log(`❌ Error de conexión: ${error.message}`);
      
      if (error.message.includes('relation "programs" does not exist')) {
        console.log('💡 La tabla "programs" no existe. Ejecuta el archivo setup-database.sql en Supabase.');
      }
    } else {
      console.log('✅ Conexión exitosa a Supabase');
    }
    
    // Verificar autenticación
    console.log('\n🔐 Verificando servicio de autenticación...');
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.log(`❌ Error de autenticación: ${authError.message}`);
    } else {
      console.log('✅ Servicio de autenticación disponible');
      
      if (authData.session) {
        console.log('✅ Usuario autenticado actualmente');
      } else {
        console.log('ℹ️  No hay usuario autenticado actualmente');
      }
    }
    
  } catch (error) {
    console.log(`❌ Error inesperado: ${error.message}`);
  }
  
  console.log('\n🎉 Verificación completada');
}

// Ejecutar verificación
verifyConnection();
*/
