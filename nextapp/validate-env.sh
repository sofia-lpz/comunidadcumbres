#!/bin/bash

echo "🔍 Validando configuración antes del build..."

# Función para verificar variables de entorno
check_env_var() {
    local var_name=$1
    local var_value=${!var_name}
    
    if [ -z "$var_value" ]; then
        echo "❌ $var_name no está configurada"
        return 1
    else
        echo "✅ $var_name está configurada"
        return 0
    fi
}

# Verificar las variables críticas
echo "Verificando variables de entorno críticas..."
all_good=true

if ! check_env_var "NEXT_PUBLIC_SUPABASE_URL"; then
    all_good=false
fi

if ! check_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY"; then
    all_good=false
fi

if [ "$all_good" = false ]; then
    echo ""
    echo "❌ Error: Faltan variables de entorno críticas"
    echo "Por favor, configura las siguientes variables:"
    echo "  - NEXT_PUBLIC_SUPABASE_URL"
    echo "  - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo ""
    echo "En Vercel, ve a Settings > Environment Variables"
    echo "En desarrollo local, crea un archivo .env.local"
    exit 1
fi

echo ""
echo "✅ Todas las variables de entorno están configuradas correctamente"
echo "🚀 Procediendo con el build..."
