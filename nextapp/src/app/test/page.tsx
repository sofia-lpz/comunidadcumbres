'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestConnection() {
  const [connectionStatus, setConnectionStatus] = useState('Verificando...');
  const [config, setConfig] = useState(null);

  useEffect(() => {
    // Verificar configuración
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    setConfig({
      url: supabaseUrl,
      hasKey: !!supabaseKey,
      keyPreview: supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'No encontrada'
    });

    // Probar conexión
    async function testConnection() {
      try {
        const { data, error } = await supabase.from('categories').select('count');
        
        if (error) {
          setConnectionStatus(`Error: ${error.message}`);
        } else {
          setConnectionStatus('✅ Conexión exitosa a Supabase');
        }
      } catch (error) {
        setConnectionStatus(`❌ Error de conexión: ${error.message}`);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Prueba de Conexión</h1>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700">Configuración:</h3>
            <p className="text-sm"><strong>URL:</strong> {config?.url || 'No encontrada'}</p>
            <p className="text-sm"><strong>API Key:</strong> {config?.hasKey ? '✅ Configurada' : '❌ No encontrada'}</p>
            <p className="text-sm text-gray-500">{config?.keyPreview}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700">Estado de Conexión:</h3>
            <p className="text-sm">{connectionStatus}</p>
          </div>
          
          <div className="pt-4 border-t">
            <a 
              href="/admin/login" 
              className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700"
            >
              Ir a Login Admin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
