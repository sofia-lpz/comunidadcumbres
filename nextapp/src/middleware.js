import { NextResponse } from 'next/server'

export async function middleware(request) {
  // Verificar si la ruta es del admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Si es la página de login, permitir acceso
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }
    
    // Para otras rutas de admin, la verificación se hará en el layout del cliente
    // El middleware solo se usa para rutas públicas vs privadas básicas
    return NextResponse.next()
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
