# Guía de Deployment - Comunidad Cumbres

## Problema Resuelto

El error de deployment en Vercel ocurría porque las variables de entorno de Supabase no estaban siendo cargadas correctamente durante el proceso de build, causando errores en las rutas API.

## Soluciones Implementadas

### 1. Configuración Mejorada de Supabase (`src/lib/supabase.js`)
- ✅ Importación dinámica para evitar errores durante el build
- ✅ Validación robusta de variables de entorno
- ✅ Configuración optimizada para cliente/servidor
- ✅ Mejor manejo de errores

### 2. Configuración de Next.js (`next.config.ts`)
- ✅ Variables de entorno explícitas en configuración
- ✅ Configuración experimental para Supabase
- ✅ Runtime config público

### 3. Rutas API Mejoradas
- ✅ Importación dinámica de Supabase en todas las rutas API
- ✅ Mejor manejo de errores durante el build
- ✅ Validación de conexión antes de usar

### 4. Validación de Entorno
- ✅ Script de validación pre-build
- ✅ Configuración centralizada en `src/lib/env-config.js`
- ✅ Scripts npm actualizados

## Configuración en Vercel

### Variables de Entorno Requeridas

En el dashboard de Vercel, ve a **Settings > Environment Variables** y configura:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
```

### Configuración de Build

Usa el siguiente comando de build en Vercel:

```bash
npm run build
```

O para validación extra:

```bash
npm run build:safe
```

## Configuración Local

### 1. Crear archivo `.env.local`

```bash
# Copia desde .env.example
cp .env.example .env.local
```

### 2. Completar variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
NODE_ENV=development
```

### 3. Verificar configuración

```bash
npm run verify
```

## Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Build con validación
npm run build

# Build con validación extra
npm run build:safe

# Verificar conexión
npm run verify

# Validar variables de entorno
npm run validate-env
```

## Troubleshooting

### Error: "Missing Supabase environment variables"

1. Verifica que las variables estén configuradas en Vercel
2. Asegúrate de que los nombres sean exactos: `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redespliega después de configurar las variables

### Error durante el build

1. Ejecuta `npm run validate-env` localmente
2. Verifica que las variables sean accesibles durante el build
3. Revisa los logs de build en Vercel

### Problemas de conexión en producción

1. Verifica que Supabase esté configurado para aceptar conexiones desde el dominio de Vercel
2. Revisa la configuración de CORS en Supabase
3. Confirma que las URLs y claves sean correctas

## Estructura de Archivos Modificados

```
src/
├── lib/
│   ├── supabase.js          # Cliente Supabase mejorado
│   └── env-config.js        # Configuración de entorno
├── app/
│   └── api/
│       ├── blog/
│       │   └── route.ts     # API mejorada
│       └── programs/
│           └── route.ts     # API mejorada
├── next.config.ts           # Configuración Next.js
├── package.json             # Scripts actualizados
├── .env.example             # Plantilla de variables
└── validate-env.sh          # Script de validación
```

## Próximos Pasos

1. ✅ Deploy a Vercel con las nuevas configuraciones
2. ✅ Verificar que todas las rutas API funcionen
3. ✅ Probar la carga de datos desde la base de datos
4. ✅ Monitorear logs de producción

---

**Nota**: Este fix resuelve el problema de variables de entorno en producción manteniendo la compatibilidad con el desarrollo local.
