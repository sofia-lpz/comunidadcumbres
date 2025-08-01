// En src/app/admin/login/page.jsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { createClient } from '@/utils/supabase/client';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('Autenticación deshabilitada en modo estático');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('Autenticación deshabilitada temporalmente para el build estático');
    
    // Comentado temporalmente para build estático
    // try {
    //   console.log('Attempting login for:', email);
      
    //   const supabase = createClient();
    //   const { data, error: authError } = await supabase.auth.signInWithPassword({
    //     email: email.trim(),
    //     password: password
    //   });
      
    //   console.log('Login response:', { data, error: authError });
      
    //   if (authError) {
    //     console.error('Auth error:', authError);
        
    //     // Manejo específico de errores
    //     if (authError.message.includes('Invalid login credentials')) {
    //       setError('Credenciales incorrectas. Verifica tu email y contraseña.');
    //     } else if (authError.message.includes('Email not confirmed')) {
    //       setError('Por favor confirma tu email antes de iniciar sesión.');
    //     } else if (authError.message.includes('Too many requests')) {
    //       setError('Demasiados intentos. Espera un momento antes de intentar nuevamente.');
    //     } else {
    //       setError(`Error de autenticación: ${authError.message}`);
    //     }
    //     return;
    //   }
      
    //   if (data.user) {
    //     console.log('Login successful, redirecting to admin...');
    //     router.push('/admin');
    //   } else {
    //     setError('No se pudo autenticar el usuario');
    //   }
    // } catch (error) {
    //   console.error('Unexpected error during login:', error);
    //   setError('Error inesperado. Por favor, intenta nuevamente.');
    // } finally {
      setLoading(false);
    // }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#222222]">Acceso Administrador</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleLogin}>
        <div className="space-y-4">
          <Input 
            label="Correo electrónico"
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@example.com"
          />
          
          <Input 
            label="Contraseña"
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Tu contraseña"
          />
          
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </div>
      </form>
    </div>
  );
}