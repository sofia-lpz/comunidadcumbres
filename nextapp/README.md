# Comunidad Cumbres - Next.js Application

Una aplicación web para la gestión de programas comunitarios, construida con Next.js y Supabase.

## 🚀 Configuración Inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia el archivo de ejemplo y configura tus variables:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
```

### 3. Verificar conexión

```bash
npm run verify
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🛠️ Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción (con validación)
- `npm run build:safe` - Build con validación extra
- `npm run start` - Servidor de producción
- `npm run verify` - Verificar conexión con la base de datos
- `npm run validate-env` - Validar variables de entorno

## 🚀 Deployment en AWS Amplify

### Variables de Entorno Requeridas

En AWS Amplify Console > App settings > Environment variables, configura:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
```

### Build Command

```bash
npm run build
```

### Solución a Problemas de Deployment

Si experimentas errores durante el deployment:

1. ✅ **Variables de entorno configuradas**: Asegúrate de que las variables estén en AWS Amplify
2. ✅ **Build mejorado**: Usamos importación dinámica para evitar errores durante el build
3. ✅ **Validación pre-build**: El sistema valida la configuración antes del build
4. ✅ **Manejo de errores robusto**: APIs con mejor manejo de errores de conexión

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   ├── admin/             # Panel administrativo
│   ├── blog/              # Blog y artículos
│   └── programas/         # Gestión de programas
├── components/            # Componentes reutilizables
├── lib/                   # Utilidades y configuración
│   ├── supabase.js       # Cliente Supabase mejorado
│   └── env-config.js     # Configuración de entorno
└── types/                 # Definiciones de tipos TypeScript
```

## 🗄️ Base de Datos

La aplicación utiliza Supabase como backend con las siguientes tablas principales:

- `programs` - Programas comunitarios
- `categories` - Categorías de programas
- `blog_posts` - Artículos del blog

## 🔧 Características Implementadas

- ✅ **Gestión de Programas**: CRUD completo para programas comunitarios
- ✅ **Blog**: Sistema de gestión de contenido
- ✅ **Admin Panel**: Panel administrativo para gestión
- ✅ **Responsive Design**: Diseño adaptable con Tailwind CSS
- ✅ **TypeScript**: Tipado estático para mejor desarrollo
- ✅ **Error Handling**: Manejo robusto de errores
- ✅ **Production Ready**: Optimizado para producción en AWS Amplify

## 🐛 Troubleshooting

### Error: "Missing Supabase environment variables"

1. Verifica que `.env.local` existe y tiene las variables correctas
2. En AWS Amplify, configura las variables en App settings > Environment variables
3. Ejecuta `npm run validate-env` para verificar

### Problemas de Build

1. Ejecuta `npm run validate-env` localmente
2. Verifica que no hay errores de sintaxis en las APIs
3. Revisa los logs de build en AWS Amplify Console

### Conexión a Supabase

1. Verifica que la URL de Supabase sea correcta
2. Confirma que la clave anónima sea válida
3. Revisa la configuración de CORS en Supabase

## 📄 Licencia

Este proyecto es parte de Comunidad Cumbres.

---

## 📚 Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs) - Documentación oficial de Next.js
- [Supabase Documentation](https://supabase.com/docs) - Documentación de Supabase
- [Tailwind CSS](https://tailwindcss.com/docs) - Framework CSS utilizado
- [AWS Amplify](https://aws.amazon.com/amplify/) - Plataforma de deployment
