import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    // Detectar build time de manera agnóstica a la plataforma
    const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL && !process.env.SUPABASE_URL
    
    if (isBuildTime) {
      console.log('Build time detected, returning empty data')
      return NextResponse.json([])
    }

    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    
    let query = supabase
      .from('blog_posts')
      .select('*');
    
    if (published === 'true') {
      query = query.eq('published', true);
    }
    
    query = query.order('created_at', { ascending: false });
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('API Route error:', error);
    return NextResponse.json(
      { 
        error: 'Server error', 
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Detectar build time de manera agnóstica a la plataforma
    const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL && !process.env.SUPABASE_URL
    
    if (isBuildTime) {
      return NextResponse.json({ error: 'Not available during build' }, { status: 503 })
    }

    const supabase = await createClient();
    const body = await request.json();
    const { title, content, image_urls, published } = body;
    
    if (!title || !content) {
      return NextResponse.json({ error: 'Título y contenido son obligatorios' }, { status: 400 });
    }
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{
        title,
        content,
        image_urls: image_urls || [],
        published: published || false,
        published_at: published ? new Date().toISOString() : null
      }])
      .select();
    
    if (error) {
      console.error('Insert error:', error)
      return NextResponse.json(
        { error: 'Failed to create post', details: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { 
        error: 'Server error', 
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// IMPORTANTE: Esto previene que la ruta se pre-renderice durante el build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'