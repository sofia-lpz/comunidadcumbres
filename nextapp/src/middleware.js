import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })
  
  // Verificar si la ruta es del admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Si es la página de login, permitir acceso
    if (request.nextUrl.pathname === '/admin/login') {
      return res
    }
    
    // Para otras rutas de admin, verificar autenticación
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      // Redirigir a login si no hay sesión
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  
  return res
}

export const config = {
  matcher: ['/admin/:path*']
}
