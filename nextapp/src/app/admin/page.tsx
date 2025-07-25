'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Dashboard from '@/components/admin/Dashboard';

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalPrograms: 0,
    activePrograms: 0,
    totalPosts: 0,
    publishedPosts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        
        const supabase = createClient();
        
        // Obtener estadísticas de programas
        const { data: programs, error: programsError } = await supabase
          .from('programs')
          .select('status');
        
        if (programsError) throw programsError;

        // Obtener estadísticas del blog
        const { data: posts, error: postsError } = await supabase
          .from('blog_posts')
          .select('published');
        
        if (postsError) throw postsError;

        setStats({
          totalPrograms: programs?.length || 0,
          activePrograms: programs?.filter(p => p.status === 'active').length || 0,
          totalPosts: posts?.length || 0,
          publishedPosts: posts?.filter(p => p.published).length || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5D84C4]"></div>
      </div>
    );
  }

  return <Dashboard stats={stats} />;
}