'use client';
import { useEffect, useState } from 'react';
// import { createClient } from '@/utils/supabase/client';
import Button from '@/components/ui/Button';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_urls: string[];
  published: boolean;
  published_at?: string | null;
  created_at: string;
}

// Datos estáticos para el blog
const staticBlogPosts: BlogPost[] = [
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

export default function BlogPage() {
  // const [posts, setPosts] = useState<BlogPost[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchPosts() {
  //     try {
  //       const supabase = createClient();
  //       const { data, error } = await supabase
  //         .from('blog_posts')
  //         .select('*')
  //         .order('created_at', { ascending: false });
        
  //       if (error) throw error;
  //       setPosts(data || []);
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchPosts();
  // }, []);

  // Usar datos estáticos
  const posts = staticBlogPosts;
  const loading = false;

  const handleDeletePost = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
      // Funcionalidad deshabilitada en modo estático
      alert('Funcionalidad de eliminación deshabilitada en modo estático');
      
      // try {
      //   const supabase = createClient();
      //   const { error } = await supabase
      //     .from('blog_posts')
      //     .delete()
      //     .eq('id', id);
        
      //   if (error) throw error;
      
      // Remover del array local para simular eliminación
      // setPosts(posts.filter(post => post.id !== id));
      // } catch (error) {
      //   console.error('Error deleting post:', error);
      //   alert('Error al eliminar el post');
      // }
    }
  };

  const togglePublished = async (post: BlogPost) => {
    // Funcionalidad deshabilitada en modo estático
    alert('Funcionalidad de publicación deshabilitada en modo estático');
    
    // try {
    //   const supabase = createClient();
    //   const { error } = await supabase
    //     .from('blog_posts')
    //     .update({ 
    //       published: !post.published,
    //       published_at: !post.published ? new Date().toISOString() : null
    //     })
    //     .eq('id', post.id);
      
    //   if (error) throw error;
      
    //   setPosts(posts.map(p => 
    //     p.id === post.id 
    //       ? { ...p, published: !p.published, published_at: !p.published ? new Date().toISOString() : null }
    //       : p
    //   ));
    // } catch (error) {
    //   console.error('Error updating post:', error);
    //   alert('Error al actualizar el post');
    // }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5D84C4]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#222222]">Gestión del Blog</h1>
        <Button href="/admin/blog/create">
          Crear Nuevo Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No hay posts creados aún</p>
          <Button href="/admin/blog/create">
            Crear el primer post
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Creación
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <h3 className="text-sm font-medium text-[#222222]">{post.title}</h3>
                    <p className="text-sm text-gray-500 truncate max-w-xs">
                      {post.content.substring(0, 100)}...
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      post.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.published ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePublished(post)}
                      >
                        {post.published ? 'Despublicar' : 'Publicar'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
