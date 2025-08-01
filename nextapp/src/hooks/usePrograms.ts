
import { useState, useEffect } from 'react';
// import { createClient } from '@/utils/supabase/client';
import { Program } from '@/types/program';

// Datos estáticos de ejemplo
const staticPrograms: Program[] = [
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
  // Agregar más programas según sea necesario
];

export function usePrograms() {
  // const [programs, setPrograms] = useState<Program[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // const fetchPrograms = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const supabase = createClient();
  //     const { data, error } = await supabase
  //       .from('programs')
  //       .select('*, categories(name, slug, color, icon)')
  //       .order('created_at', { ascending: false });
        
  //     if (error) throw error;
  //     setPrograms(data || []);
  //   } catch (error) {
  //     setError('Error al cargar programas');
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchPrograms();
  // }, []);

  // Retornar datos estáticos
  const programs = staticPrograms;
  const loading = false;
  const error = null;

  const refetch = () => {
    // No hacer nada en modo estático
    console.log('Refetch llamado - usando datos estáticos');
  };

  return { programs, loading, error, refetch };
}