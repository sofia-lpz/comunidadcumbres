// import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// Datos estáticos para programas
const staticPrograms = [
  {
    id: '1',
    title: 'Apoyo Educativo',
    short_description: 'Programa de becas y útiles escolares para estudiantes de escasos recursos',
    full_description: 'Nuestro programa de apoyo educativo brinda becas escolares, útiles y materiales educativos a niños y jóvenes en situación de vulnerabilidad económica.',
    image_url: '/images/hero-carousel/ProyectoUtilesEscolares.jpg',
    status: 'active',
    category_id: '1',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    target_audience: 'Niños y jóvenes de 6 a 18 años',
    featured: true,
    requirements: 'Comprobante de ingresos, identificación oficial',
    categories: {
      id: '1',
      name: 'Educación',
      slug: 'educacion',
      color: '#4F46E5',
      icon: '📚'
    }
  },
  {
    id: '2',
    title: 'Programa de Salud Comunitaria',
    short_description: 'Atención médica básica y campañas de prevención para la comunidad',
    full_description: 'Ofrecemos servicios de salud básica, chequeos médicos gratuitos y campañas de prevención de enfermedades.',
    image_url: '/images/default-program.svg',
    status: 'active',
    category_id: '2',
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
    target_audience: 'Toda la comunidad',
    featured: true,
    requirements: 'Registro previo, identificación',
    categories: {
      id: '2',
      name: 'Salud',
      slug: 'salud',
      color: '#10B981',
      icon: '🏥'
    }
  },
  {
    id: '3',
    title: 'Actividades Culturales',
    short_description: 'Talleres de arte, música y actividades culturales para todas las edades',
    full_description: 'Promovemos el desarrollo cultural a través de talleres de arte, música, danza y otras actividades culturales.',
    image_url: '/images/default-program.svg',
    status: 'active',
    category_id: '3',
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2024-03-01T00:00:00Z',
    target_audience: 'Niños, jóvenes y adultos',
    featured: false,
    requirements: 'Inscripción previa',
    categories: {
      id: '3',
      name: 'Cultura',
      slug: 'cultura',
      color: '#F59E0B',
      icon: '🎨'
    }
  },
  {
    id: '4',
    title: 'Proyecto de Infraestructura',
    short_description: 'Mejoramiento de espacios comunitarios y construcción de infraestructura básica',
    full_description: 'Trabajamos en la mejora de espacios públicos, construcción de canchas deportivas y otros proyectos de infraestructura.',
    image_url: '/images/hero-carousel/ProyectoCanchaBasket.jpg',
    status: 'active',
    category_id: '4',
    created_at: '2024-04-01T00:00:00Z',
    updated_at: '2024-04-01T00:00:00Z',
    target_audience: 'Toda la comunidad',
    featured: true,
    requirements: 'Propuesta comunitaria',
    categories: {
      id: '4',
      name: 'Infraestructura',
      slug: 'infraestructura',
      color: '#8B5CF6',
      icon: '🏗️'
    }
  },
  {
    id: '5',
    title: 'Reforestación y Medio Ambiente',
    short_description: 'Proyectos de reforestación y cuidado del medio ambiente',
    full_description: 'Desarrollamos proyectos de reforestación, limpieza de espacios naturales y educación ambiental.',
    image_url: '/images/hero-carousel/ProyectoReforestacion.jpg',
    status: 'active',
    category_id: '5',
    created_at: '2024-05-01T00:00:00Z',
    updated_at: '2024-05-01T00:00:00Z',
    target_audience: 'Voluntarios y comunidad en general',
    featured: true,
    requirements: 'Disponibilidad de tiempo, equipo básico',
    categories: {
      id: '5',
      name: 'Medio Ambiente',
      slug: 'medio-ambiente',
      color: '#059669',
      icon: '🌱'
    }
  },
  {
    id: '6',
    title: 'Voluntariado Comunitario',
    short_description: 'Programa de voluntariado para apoyar diversas causas sociales',
    full_description: 'Únete a nuestro programa de voluntariado y contribuye al desarrollo de tu comunidad.',
    image_url: '/images/default-program.svg',
    status: 'active',
    category_id: '6',
    created_at: '2024-06-01T00:00:00Z',
    updated_at: '2024-06-01T00:00:00Z',
    target_audience: 'Jóvenes y adultos',
    featured: false,
    requirements: 'Compromiso de tiempo, disponibilidad',
    categories: {
      id: '6',
      name: 'Voluntariado',
      slug: 'voluntariado',
      color: '#DC2626',
      icon: '🤝'
    }
  }
];

export async function GET(request: NextRequest) {
  try {
    // const supabase = await createClient();
    // // Detectar build time de manera agnóstica a la plataforma
    // const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL && !process.env.SUPABASE_URL
    
    // if (isBuildTime) {
    //   console.log('Build time detected, returning empty programs')
    //   return NextResponse.json([])
    // }

    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const status = searchParams.get('status');
    const categoryId = searchParams.get('category_id');
    
    // Filtrar datos estáticos según los parámetros
    let filteredPrograms = staticPrograms;
    
    if (featured === 'true') {
      filteredPrograms = filteredPrograms.filter(program => program.featured);
    }
    
    if (status) {
      filteredPrograms = filteredPrograms.filter(program => program.status === status);
    }
    
    // El filtro por categoryId se podría implementar si es necesario
    // if (categoryId) {
    //   filteredPrograms = filteredPrograms.filter(program => program.category_id === categoryId);
    // }
    
    // let query = supabase
    //   .from('programs')
    //   .select('*, categories(name, slug, color, icon)');
    
    // if (featured === 'true') {
    //   query = query.eq('featured', true);
    // }
    
    // if (status) {
    //   query = query.eq('status', status);
    // }
    
    // if (categoryId) {
    //   query = query.eq('category_id', categoryId);
    // }
    
    // query = query.order('created_at', { ascending: false });
    
    // const { data, error } = await query;
    
    // if (error) throw error;
    
    return NextResponse.json(filteredPrograms);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // En modo estático, no permitir crear programas
    return NextResponse.json(
      { error: 'Creación de programas no disponible en modo estático' }, 
      { status: 503 }
    );

    // // Detectar build time de manera agnóstica a la plataforma
    // const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL && !process.env.SUPABASE_URL
    
    // if (isBuildTime) {
    //   return NextResponse.json({ error: 'Not available during build' }, { status: 503 })
    // }

    // const supabase = await createClient();
    // const body = await request.json();
    // const { 
    //   title, 
    //   short_description, 
    //   full_description, 
    //   image_url, 
    //   status, 
    //   category_id, 
    //   target_audience, 
    //   external_form_url, 
    //   requirements, 
    //   featured 
    // } = body;
    
    // if (!title || !short_description || !category_id) {
    //   return NextResponse.json({ 
    //     error: 'Título, descripción corta y categoría son obligatorios' 
    //   }, { status: 400 });
    // }
    
    // const { data, error } = await supabase
    //   .from('programs')
    //   .insert([{
    //     title,
    //     short_description,
    //     full_description,
    //     image_url,
    //     status: status || 'active',
    //     category_id,
    //     target_audience,
    //     external_form_url,
    //     requirements,
    //     featured: featured || false
    //   }])
    //   .select('*, categories(name, slug, color, icon)');
    
    // if (error) throw error;
    
    // return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // En modo estático, no permitir actualizar programas
    return NextResponse.json(
      { error: 'Actualización de programas no disponible en modo estático' }, 
      { status: 503 }
    );

    // // Detectar build time de manera agnóstica a la plataforma
    // const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL && !process.env.SUPABASE_URL
    
    // if (isBuildTime) {
    //   return NextResponse.json({ error: 'Not available during build' }, { status: 503 })
    // }

    // const supabase = await createClient();
    // const body = await request.json();
    // const { 
    //   id,
    //   title, 
    //   short_description, 
    //   full_description, 
    //   image_url, 
    //   status, 
    //   category_id, 
    //   target_audience, 
    //   external_form_url, 
    //   requirements, 
    //   featured 
    // } = body;
    
    // if (!id) {
    //   return NextResponse.json({ error: 'ID del programa es obligatorio' }, { status: 400 });
    // }
    
    // if (!title || !short_description || !category_id) {
    //   return NextResponse.json({ 
    //     error: 'Título, descripción corta y categoría son obligatorios' 
    //   }, { status: 400 });
    // }
    
    // const { data, error } = await supabase
    //   .from('programs')
    //   .update({
    //     title,
    //     short_description,
    //     full_description,
    //     image_url,
    //     status,
    //     category_id,
    //     target_audience,
    //     external_form_url,
    //     requirements,
    //     featured
    //   })
    //   .eq('id', id)
    //   .select('*, categories(name, slug, color, icon)');
    
    // if (error) throw error;
    
    // if (!data || data.length === 0) {
    //   return NextResponse.json({ error: 'Programa no encontrado' }, { status: 404 });
    // }
    
    // return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error updating program:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // En modo estático, no permitir eliminar programas
    return NextResponse.json(
      { error: 'Eliminación de programas no disponible en modo estático' }, 
      { status: 503 }
    );

    // // Detectar build time de manera agnóstica a la plataforma
    // const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL && !process.env.SUPABASE_URL
    
    // if (isBuildTime) {
    //   return NextResponse.json({ error: 'Not available during build' }, { status: 503 })
    // }

    // const supabase = await createClient();
    // const { searchParams } = new URL(request.url);
    // const id = searchParams.get('id');
    
    // if (!id) {
    //   return NextResponse.json({ error: 'ID del programa es obligatorio' }, { status: 400 });
    // }
    
    // const { error } = await supabase
    //   .from('programs')
    //   .delete()
    //   .eq('id', id);
    
    // if (error) throw error;
    
    // return NextResponse.json({ message: 'Programa eliminado exitosamente' });
  } catch (error) {
    console.error('Error deleting program:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// IMPORTANTE: Esto previene que la ruta se pre-renderice durante el build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'