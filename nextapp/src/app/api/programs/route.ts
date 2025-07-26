import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    // Detectar build time de manera agnóstica a la plataforma
    const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL && !process.env.SUPABASE_URL
    
    if (isBuildTime) {
      console.log('Build time detected, returning empty programs')
      return NextResponse.json([])
    }

    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const status = searchParams.get('status');
    const categoryId = searchParams.get('category_id');
    
    let query = supabase
      .from('programs')
      .select('*, categories(name, slug, color, icon)');
    
    if (featured === 'true') {
      query = query.eq('featured', true);
    }
    
    if (status) {
      query = query.eq('status', status);
    }
    
    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }
    
    query = query.order('created_at', { ascending: false });
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
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
    const { 
      title, 
      short_description, 
      full_description, 
      image_url, 
      status, 
      category_id, 
      target_audience, 
      external_form_url, 
      requirements, 
      featured 
    } = body;
    
    if (!title || !short_description || !category_id) {
      return NextResponse.json({ 
        error: 'Título, descripción corta y categoría son obligatorios' 
      }, { status: 400 });
    }
    
    const { data, error } = await supabase
      .from('programs')
      .insert([{
        title,
        short_description,
        full_description,
        image_url,
        status: status || 'active',
        category_id,
        target_audience,
        external_form_url,
        requirements,
        featured: featured || false
      }])
      .select('*, categories(name, slug, color, icon)');
    
    if (error) throw error;
    
    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Detectar build time de manera agnóstica a la plataforma
    const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL && !process.env.SUPABASE_URL
    
    if (isBuildTime) {
      return NextResponse.json({ error: 'Not available during build' }, { status: 503 })
    }

    const supabase = await createClient();
    const body = await request.json();
    const { 
      id,
      title, 
      short_description, 
      full_description, 
      image_url, 
      status, 
      category_id, 
      target_audience, 
      external_form_url, 
      requirements, 
      featured 
    } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'ID del programa es obligatorio' }, { status: 400 });
    }
    
    if (!title || !short_description || !category_id) {
      return NextResponse.json({ 
        error: 'Título, descripción corta y categoría son obligatorios' 
      }, { status: 400 });
    }
    
    const { data, error } = await supabase
      .from('programs')
      .update({
        title,
        short_description,
        full_description,
        image_url,
        status,
        category_id,
        target_audience,
        external_form_url,
        requirements,
        featured
      })
      .eq('id', id)
      .select('*, categories(name, slug, color, icon)');
    
    if (error) throw error;
    
    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Programa no encontrado' }, { status: 404 });
    }
    
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error updating program:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Detectar build time de manera agnóstica a la plataforma
    const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL && !process.env.SUPABASE_URL
    
    if (isBuildTime) {
      return NextResponse.json({ error: 'Not available during build' }, { status: 503 })
    }

    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID del programa es obligatorio' }, { status: 400 });
    }
    
    const { error } = await supabase
      .from('programs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return NextResponse.json({ message: 'Programa eliminado exitosamente' });
  } catch (error) {
    console.error('Error deleting program:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// IMPORTANTE: Esto previene que la ruta se pre-renderice durante el build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'