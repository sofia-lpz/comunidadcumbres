
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Program } from '@/types/program';

export function usePrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('programs')
        .select('*, categories(name, slug, color, icon)')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      setError('Error al cargar programas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return { programs, loading, error, refetch: fetchPrograms };
}