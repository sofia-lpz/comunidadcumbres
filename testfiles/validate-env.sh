#!/bin/bash

echo "🔍 Validación de configuración (MODO ESTÁTICO)..."

# Archivo comentado temporalmente para build estático
# TODO: Descomentar cuando se reactive la conexión a base de datos

echo "✅ Validación omitida - modo estático habilitado"
echo "✅ Build puede continuar sin variables de entorno de Supabase"

exit 0

# # Función para verificar variables de entorno
# check_env_var() {
#     local var_name=$1
#     local var_value=${!var_name}
    
#     if [ -z "$var_value" ]; then
#         echo "❌ $var_name no está configurada"
#         return 1
#     else
#         echo "✅ $var_name está configurada"
#         return 0
#     fi
# }

# # Verificar las variables críticas
# echo "Verificando variables de entorno críticas..."
# all_good=true

# if ! check_env_var "NEXT_PUBLIC_SUPABASE_URL"; then
#     all_good=false
# fi

# if ! check_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY"; then
#     all_good=false
# fi

if [ "$all_good" = false ]; then
    echo ""
    echo "❌ Error: Faltan variables de entorno críticas"
    echo "Por favor, configura las siguientes variables:"
    echo "  - NEXT_PUBLIC_SUPABASE_URL"
    echo "  - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo ""
    echo "En AWS Amplify, ve a App settings > Environment variables"
    echo "En desarrollo local, crea un archivo .env.local"
    exit 1
fi

echo ""
echo "✅ Todas las variables de entorno están configuradas correctamente"
echo "🚀 Procediendo con el build..."
