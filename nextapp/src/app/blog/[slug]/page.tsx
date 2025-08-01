'use client';
// import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
// import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_urls: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
}

// Datos estáticos para posts individuales
const staticBlogPosts: { [key: string]: BlogPost } = {
  '1': {
    id: '1',
    title: 'Proyecto de Reforestación en Comunidad',
    content: 'Hemos iniciado un ambicioso proyecto de reforestación que busca recuperar áreas verdes en nuestra comunidad. Este proyecto incluye la plantación de árboles nativos, talleres de educación ambiental y la participación activa de voluntarios locales.\n\nEl proyecto comenzó hace tres meses con una evaluación exhaustiva de las áreas que requerían reforestación. Identificamos zonas que habían sufrido deforestación debido a diversos factores ambientales y humanos.\n\nHasta la fecha, hemos logrado plantar más de 500 árboles de especies nativas como encinos, pinos y cedros. Cada árbol plantado representa la esperanza de un futuro más verde para nuestra comunidad.\n\nAdemás de la plantación, hemos implementado talleres educativos para niños y jóvenes, enseñándoles sobre la importancia de cuidar el medio ambiente y cómo pueden contribuir a la conservación de los recursos naturales.',
    image_urls: ['/images/hero-carousel/ProyectoReforestacion.jpg'],
    published: true,
    published_at: '2024-07-15T00:00:00Z',
    created_at: '2024-07-15T00:00:00Z'
  },
  '2': {
    id: '2',
    title: 'Donación de Útiles Escolares',
    content: 'Gracias a la generosidad de nuestra comunidad, hemos logrado reunir y distribuir útiles escolares para más de 200 niños en situación de vulnerabilidad. Esta iniciativa busca garantizar que todos los niños tengan acceso a las herramientas necesarias para su educación.\n\nLa campaña de recolección duró dos meses, durante los cuales recibimos donaciones de cuadernos, lápices, colores, mochilas y otros materiales escolares esenciales.\n\nLa distribución se realizó en coordinación con las escuelas locales, asegurándonos de que los útiles llegaran directamente a los estudiantes que más los necesitaban.\n\nEsta iniciativa no solo proporciona herramientas educativas, sino que también envía un mensaje de apoyo y esperanza a las familias de nuestra comunidad.',
    image_urls: ['/images/hero-carousel/ProyectoUtilesEscolares.jpg'],
    published: true,
    published_at: '2024-07-10T00:00:00Z',
    created_at: '2024-07-10T00:00:00Z'
  },
  '3': {
    id: '3',
    title: 'Nueva Cancha de Básquet para Jóvenes',
    content: 'Con gran emoción anunciamos la inauguración de nuestra nueva cancha de básquet. Este espacio deportivo será un lugar de encuentro para jóvenes de la comunidad, promoviendo el deporte y la sana convivencia.\n\nEl proyecto se realizó gracias al apoyo incondicional de voluntarios y las generosas donaciones de la comunidad. Durante seis meses, trabajamos incansablemente para construir esta infraestructura deportiva.\n\nLa cancha no solo servirá para la práctica del básquetbol, sino que también será utilizada para otros deportes y actividades comunitarias. Hemos programado torneos mensuales y clases de entrenamiento gratuitas para jóvenes de todas las edades.\n\nEste proyecto representa nuestro compromiso con el desarrollo integral de los jóvenes de la comunidad, proporcionándoles un espacio seguro y saludable para su crecimiento personal y social.',
    image_urls: ['/images/hero-carousel/ProyectoCanchaBasket.jpg'],
    published: true,
    published_at: '2024-07-05T00:00:00Z',
    created_at: '2024-07-05T00:00:00Z'
  }
};

export default function BlogPostPage() {
  const params = useParams();
  // const [post, setPost] = useState<BlogPost | null>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchPost() {
  //     try {
  //       const supabase = createClient();
  //       const { data, error } = await supabase
  //         .from('blog_posts')
  //         .select('*')
  //         .eq('id', params.slug)
  //         .eq('published', true)
  //         .single();
        
  //       if (error) throw error;
  //       setPost(data);
  //     } catch (error) {
  //       console.error('Error fetching post:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   if (params.slug) {
  //     fetchPost();
  //   }
  // }, [params.slug]);

  // Usar datos estáticos
  const post = staticBlogPosts[params.slug as string] || null;
  const loading = false;

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5D84C4]"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Post no encontrado</h1>
        <p className="text-gray-600">El post que buscas no existe o no está publicado.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen">
      {/* Header Section - Similar to CARE design */}
      <div className="bg-gradient-to-r from-[#5D84C4] to-[#4A90E2] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Content */}
            <div className="space-y-6">
              {/* Breadcrumb */}
              <nav className="text-sm">
                <span className="opacity-75">INICIO</span>
                <span className="mx-2">•</span>
                <span className="opacity-75">BLOG</span>
                <span className="mx-2">•</span>
                <span>PUBLICACIÓN</span>
              </nav>

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                {post.title}
              </h1>

              {/* Date */}
              <div className="flex items-center space-x-4 text-lg">
                <span className="opacity-90">
                  {formatDate(post.published_at || post.created_at)}
                </span>
              </div>

              {/* Share Section */}
              <div className="flex items-center space-x-4">
                <span className="text-sm opacity-75">Compartir</span>
                <div className="flex space-x-2">
                  <button className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.624 5.367 11.99 11.988 11.99s11.99-5.366 11.99-11.99C24.007 5.367 18.641.001 12.017.001zM8.449 16.988c-1.414 0-2.559-1.145-2.559-2.559V9.57c0-1.414 1.145-2.559 2.559-2.559s2.559 1.145 2.559 2.559v4.859c0 1.414-1.145 2.559-2.559 2.559z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right side - Main Image */}
            <div className="lg:order-last">
              {post.image_urls && post.image_urls.length > 0 && (
                <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={post.image_urls[0]}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Content with proper formatting */}
          <div 
            className="text-gray-700 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ 
              __html: post.content.replace(/\n/g, '<br>') 
            }}
          />

          {/* Additional Images */}
          {post.image_urls && post.image_urls.length > 1 && (
            <div className="mt-12 space-y-8">
              {post.image_urls.slice(1, 3).map((imageUrl, index) => (
                <div key={index} className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={imageUrl}
                    alt={`${post.title} - Imagen ${index + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back to Blog Button */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <a 
            href="/blog"
            className="inline-flex items-center text-[#5D84C4] hover:text-[#4A90E2] font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Blog
          </a>
        </div>
      </div>
    </main>
  );
}
