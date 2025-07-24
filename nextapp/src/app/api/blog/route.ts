import { NextRequest, NextResponse } from 'next/server';

// Importar dinámicamente supabase para evitar errores durante el build
let supabase: any = null;

async function getSupabaseClient() {
  if (!supabase) {
    try {
      const { supabase: client } = await import('@/lib/supabase');
      supabase = client;
    } catch (error) {
      console.error('Error inicializando Supabase:', error);
      throw new Error('Database connection failed');
    }
  }
  return supabase;
}

export async function GET(request: NextRequest) {
  try {
    const client = await getSupabaseClient();
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    
    let query = client
      .from('blog_posts')
      .select('*');
    
    if (published === 'true') {
      query = query.eq('published', true);
    }
    
    query = query.order('created_at', { ascending: false });
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await getSupabaseClient();
    const body = await request.json();
    const { title, content, image_urls, published } = body;
    
    if (!title || !content) {
      return NextResponse.json({ error: 'Título y contenido son obligatorios' }, { status: 400 });
    }
    
    const { data, error } = await client
      .from('blog_posts')
      .insert([{
        title,
        content,
        image_urls: image_urls || [],
        published: published || false,
        published_at: published ? new Date().toISOString() : null
      }])
      .select();
    
    if (error) throw error;
    
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}