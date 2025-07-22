'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Button from '@/components/ui/Button';
import type { User } from '@supabase/supabase-js';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Verificar sesión actual
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);

      // Si no hay sesión y no está en login, redirigir
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    };

    checkSession();

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        
        if (event === 'SIGNED_OUT') {
          router.push('/admin/login');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router, pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5D84C4] mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Si es la página de login, mostrar sin layout
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  // Si no hay usuario, no mostrar nada (el middleware redirigirá)
  if (!user) {
    return null;
  }

  // Layout principal del admin
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de administración */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-[#222222]">
                Panel de Administración
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user.email}
              </span>
              <Button variant="ghost" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navegación del admin */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <a 
              href="/admin" 
              className={`py-4 px-1 border-b-2 text-sm font-medium ${
                pathname === '/admin' 
                  ? 'border-[#5D84C4] text-[#5D84C4]' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Dashboard
            </a>
            <a 
              href="/admin/programs" 
              className={`py-4 px-1 border-b-2 text-sm font-medium ${
                pathname.startsWith('/admin/programs') 
                  ? 'border-[#5D84C4] text-[#5D84C4]' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Programas
            </a>
            <a 
              href="/admin/blog" 
              className={`py-4 px-1 border-b-2 text-sm font-medium ${
                pathname.startsWith('/admin/blog') 
                  ? 'border-[#5D84C4] text-[#5D84C4]' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Blog
            </a>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}