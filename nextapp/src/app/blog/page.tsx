'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_urls: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('published_at', { ascending: false });
        
        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5D84C4]"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#5D84C4] to-[#4A90E2] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <nav className="text-sm mb-4">
              <span className="opacity-75">INICIO</span>
              <span className="mx-2">•</span>
              <span>BLOG</span>
            </nav>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Nuestro Blog
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Historias de impacto, noticias y actualizaciones de nuestros programas comunitarios
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No hay publicaciones disponibles</h2>
            <p className="text-gray-600">Vuelve pronto para ver nuestras últimas noticias e historias.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Post Image */}
                {post.image_urls && post.image_urls.length > 0 && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.image_urls[0]}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}

                {/* Post Content */}
                <div className="p-6">
                  {/* Date */}
                  <p className="text-sm text-[#5D84C4] font-medium mb-2">
                    {formatDate(post.published_at || post.created_at)}
                  </p>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Content Preview */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {truncateContent(post.content)}
                  </p>

                  {/* Read More Link */}
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-[#5D84C4] hover:text-[#4A90E2] font-medium transition-colors"
                  >
                    Leer más
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
