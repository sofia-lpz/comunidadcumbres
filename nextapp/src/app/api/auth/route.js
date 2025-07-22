
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  
  // Verificar si el token es válido
  const { data, error } = await supabase.auth.getUser(token);
  
  if (error || !data?.user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  
  return NextResponse.json({ 
    authenticated: true,
    user: {
      id: data.user.id,
      email: data.user.email
    }
  });
}