// import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// Datos estáticos para el blog
const staticBlogPosts = [
  {
    id: '1',
    title: 'Proyecto de Reforestación en Comunidad',
    content: 'Hemos iniciado un ambicioso proyecto de reforestación que busca recuperar áreas verdes en nuestra comunidad. Este proyecto incluye la plantación de árboles nativos, talleres de educación ambiental y la participación activa de voluntarios locales.',
    image_urls: ['/images/hero-carousel/ProyectoReforestacion.jpg'],
    published: true,
    published_at: '2024-07-15T00:00:00Z',
    created_at: '2024-07-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'Donación de Útiles Escolares',
    content: 'Gracias a la generosidad de nuestra comunidad, hemos logrado reunir y distribuir útiles escolares para más de 200 niños en situación de vulnerabilidad. Esta iniciativa busca garantizar que todos los niños tengan acceso a las herramientas necesarias para su educación.',
    image_urls: ['/images/hero-carousel/ProyectoUtilesEscolares.jpg'],
    published: true,
    published_at: '2024-07-10T00:00:00Z',
    created_at: '2024-07-10T00:00:00Z'
  },
  {
    id: '3',
    title: 'Nueva Cancha de Básquet para Jóvenes',
    content: 'Con gran emoción anunciamos la inauguración de nuestra nueva cancha de básquet. Este espacio deportivo será un lugar de encuentro para jóvenes de la comunidad, promoviendo el deporte y la sana convivencia.',
    image_urls: ['/images/hero-carousel/ProyectoCanchaBasket.jpg'],
    published: true,
    published_at: '2024-07-05T00:00:00Z',
    created_at: '2024-07-05T00:00:00Z'
  }
];

export async function GET(request: NextRequest) {
  try {
    // const supabase = await createClient();
    // // Detectar build time de manera agnóstica a la plataforma
    // const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL && !process.env.SUPABASE_URL
    
    // if (isBuildTime) {
    //   console.log('Build time detected, returning empty data')
    //   return NextResponse.json([])
    // }

    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    
    // Filtrar datos estáticos según el parámetro published
    let filteredPosts = staticBlogPosts;
    
    if (published === 'true') {
      filteredPosts = staticBlogPosts.filter(post => post.published);
    }
    
    // let query = supabase
    //   .from('blog_posts')
    //   .select('*');
    
    // if (published === 'true') {
    //   query = query.eq('published', true);
    // }
    
    // query = query.order('created_at', { ascending: false });
    
    // const { data, error } = await query;
    
    // if (error) {
    //   console.error('Supabase error:', error)
    //   return NextResponse.json(
    //     { error: 'Database error', details: error.message },
    //     { status: 500 }
    //   )
    // }
    
    return NextResponse.json(filteredPosts);
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
    // En modo estático, no permitir crear posts
    return NextResponse.json(
      { error: 'Creación de posts no disponible en modo estático' }, 
      { status: 503 }
    );

    // // Detectar build time de manera agnóstica a la plataforma
    // const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL && !process.env.SUPABASE_URL
    
    // if (isBuildTime) {
    //   return NextResponse.json({ error: 'Not available during build' }, { status: 503 })
    // }

    // const supabase = await createClient();
    // const body = await request.json();
    // const { title, content, image_urls, published } = body;
    
    // if (!title || !content) {
    //   return NextResponse.json({ error: 'Título y contenido son obligatorios' }, { status: 400 });
    // }
    
    // const { data, error } = await supabase
    //   .from('blog_posts')
    //   .insert([{
    //     title,
    //     content,
    //     image_urls: image_urls || [],
    //     published: published || false,
    //     published_at: published ? new Date().toISOString() : null
    //   }])
    //   .select();
    
    // if (error) {
    //   console.error('Insert error:', error)
    //   return NextResponse.json(
    //     { error: 'Failed to create post', details: error.message },
    //     { status: 500 }
    //   )
    // }
    
    // return NextResponse.json(data[0]);
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