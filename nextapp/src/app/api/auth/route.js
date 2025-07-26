
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server';

function createSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Auth API: Missing Supabase environment variables')
    throw new Error('Supabase configuration missing')
  }

  return createClient(supabaseUrl, supabaseKey)
}

export async function GET(request) {
  try {
    // Detectar build time de manera agnóstica a la plataforma
    const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL && !process.env.SUPABASE_URL
    
    if (isBuildTime) {
      return NextResponse.json({ authenticated: false }, { status: 503 })
    }

    const supabase = createSupabaseClient()
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
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

// IMPORTANTE: Esto previene que la ruta se pre-renderice durante el build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'