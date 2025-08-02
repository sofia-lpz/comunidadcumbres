# Script de instalación y configuración

# 1. Instalar dependencias
npm install

# 2. Verificar que las variables de entorno están configuradas
echo "Verificando variables de entorno..."
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
  echo "❌ NEXT_PUBLIC_SUPABASE_URL no está configurada"
else 
  echo "✅ NEXT_PUBLIC_SUPABASE_URL está configurada"
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
  echo "❌ NEXT_PUBLIC_SUPABASE_ANON_KEY no está configurada"
else 
  echo "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY está configurada"
fi

# 3. Ejecutar el proyecto
npm run dev
