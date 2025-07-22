# Guía de Solución para Acceso al Admin

## Problemas Identificados y Solucionados:

### 1. Dependencia Obsoleta
- ❌ **Problema**: `@supabase/auth-helpers-nextjs` está obsoleto
- ✅ **Solución**: Eliminada del package.json, usando solo `@supabase/supabase-js`

### 2. Middleware Incompatible
- ❌ **Problema**: El middleware usaba la API obsoleta
- ✅ **Solución**: Simplificado para Next.js 15

### 3. Manejo de Errores Deficiente
- ❌ **Problema**: Errores genéricos sin información útil
- ✅ **Solución**: Mensajes específicos y logging mejorado

## Pasos para Configurar:

### 1. Configurar Supabase
1. Ve a tu panel de Supabase: https://ilajjgswcwozltuhzwll.supabase.co
2. En "SQL Editor", ejecuta el contenido de `setup-database.sql`
3. Ve a "Authentication" > "Users" y crea un usuario admin:
   - Email: tu-email@example.com  
   - Password: tu-contraseña-segura
   - Confirma el email del usuario

### 2. Verificar Variables de Entorno
Tu archivo `.env.local` debe contener:
```
NEXT_PUBLIC_SUPABASE_URL=https://ilajjgswcwozltuhzwll.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsYWpqZ3N3Y3dvemx0dWh6d2xsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTM5MjcsImV4cCI6MjA2ODY2OTkyN30.Z72mKXo-pwf5pkddmRSim76DN8isuKNb2-PFxzzju2o
```

### 3. Instalar Dependencias y Ejecutar
```bash
npm install
npm run dev
```

### 4. Acceder al Admin
1. Ve a: http://localhost:3000/admin/login
2. Usa las credenciales del usuario que creaste en Supabase
3. Si ves el panel de debug con ✅, las variables están bien configuradas

## Posibles Errores y Soluciones:

### "Invalid login credentials"
- Verifica que el usuario existe en Supabase Authentication
- Confirma que el email del usuario está verificado
- Revisa que la contraseña es correcta

### "Missing Supabase environment variables"
- Verifica que el archivo `.env.local` existe en la raíz del proyecto
- Reinicia el servidor de desarrollo (`npm run dev`)

### "Error getting session"
- Verifica la conexión a internet
- Comprueba que la URL de Supabase es correcta
- Revisa la consola del navegador para más detalles

## URLs de Acceso:
- **Login Admin**: http://localhost:3000/admin/login
- **Dashboard**: http://localhost:3000/admin
- **Programas**: http://localhost:3000/admin/programs
- **Blog**: http://localhost:3000/admin/blog

## Comandos de Debug:
```bash
# Verificar conexión a Supabase
node -e "const { supabase } = require('./src/lib/supabase.js'); supabase.auth.getSession().then(console.log);"

# Ver logs del servidor
npm run dev
```

## Siguiente Paso:
Una vez que puedas acceder al admin, podrás crear y gestionar programas desde la interfaz web.
