# Guía de Deployment en Vercel - Comunidad Cumbres

## Problema Resuelto ✅

El error de deployment en Vercel ocurría por:
1. Importación dinámica compleja de Supabase que fallaba durante el build
2. Variables de entorno no configuradas correctamente
3. Falta de configuración `dynamic = 'force-dynamic'` en las rutas API

## Variables de Entorno Requeridas

### En Vercel Dashboard (Settings > Environment Variables):

```bash
# Frontend (para componentes React)
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_aqui

# Backend (para API routes - MÁS SEGURO)
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui

# Alternativa si no tienes service role key
SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

## Cómo obtener las credenciales de Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Abre tu proyecto
3. Ve a **Settings > API**
4. Copia:
   - **Project URL** → `SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `SUPABASE_ANON_KEY` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` (recomendado para APIs)

## Configuración en Vercel

### Paso 1: Variables de Entorno
1. Ve a tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Agrega todas las variables de arriba
4. Aplica a: **Production**, **Preview**, y **Development**

### Paso 2: Redeploy
Después de configurar las variables, haz un redeploy:
- Opción 1: Push un nuevo commit a tu repo
- Opción 2: En Vercel Dashboard → **Deployments** → **⋯** → **Redeploy**

## Cambios Implementados

### ✅ API Routes Mejoradas
- `/api/blog` - Manejo robusto de Supabase
- `/api/programs` - Detección de build-time
- `/api/auth` - Configuración simplificada

### ✅ Configuración Next.js
- `next.config.ts` actualizado para Vercel
- Eliminadas configuraciones complejas innecesarias
- Debug de variables en build-time

### ✅ Cliente Supabase Simplificado
- `src/lib/supabase.js` simplificado
- Solo variables públicas para frontend
- API routes usan variables privadas

### ✅ Build Configuration
- `dynamic = 'force-dynamic'` en todas las rutas API
- `runtime = 'nodejs'` especificado
- Detección de build-time para evitar errores

## Verificación

Después del deployment, verifica que:

1. **Frontend funciona**: Las páginas cargan correctamente
2. **API Routes funcionan**: Prueba crear/editar programas y blog posts
3. **No hay errores de build**: Check los logs en Vercel

## Troubleshooting

### Si sigues teniendo errores:

1. **Revisa las variables**: Ve a Vercel Settings y confirma que todas las variables están configuradas
2. **Check los logs**: En Vercel → Functions → Ver logs de errores
3. **Verifica Supabase**: Confirma que tu proyecto de Supabase está activo
4. **Build local**: Prueba `npm run build` localmente primero

### Logs útiles:
Los API routes ahora muestran información de debug:
```bash
Environment check: {
  NODE_ENV: 'production',
  VERCEL_ENV: 'production', 
  has_url: true,
  has_key: true
}
```

## Próximos Pasos

Una vez que el deployment funcione:

1. Configura tu dominio personalizado en Vercel
2. Configura Analytics (opcional)
3. Considera usar Supabase Edge Functions para lógica más compleja
4. Implementa caché para mejor performance

---

**Nota**: Esta configuración está optimizada para Vercel + Supabase en 2025. Si cambias de proveedor, algunas configuraciones pueden necesitar ajustes.
