'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { createClient } from '@/utils/supabase/client';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

interface FormData {
  title: string;
  content: string;
  image_urls: string[];
  published: boolean;
}

export default function CreateBlogPost() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    image_urls: [''],
    published: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = 'checked' in target ? target.checked : false;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUrlChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      image_urls: prev.image_urls.map((url, i) => i === index ? value : url)
    }));
  };

  const addImageUrl = () => {
    if (formData.image_urls.length < 3) {
      setFormData(prev => ({
        ...prev,
        image_urls: [...prev.image_urls, '']
      }));
    }
  };

  const removeImageUrl = (index: number) => {
    if (formData.image_urls.length > 1) {
      setFormData(prev => ({
        ...prev,
        image_urls: prev.image_urls.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('Funcionalidad deshabilitada en modo estático');

    // En modo estático, solo mostrar mensaje y redirigir
    setTimeout(() => {
      setLoading(false);
      setError('Creación de posts no disponible en modo estático');
    }, 1000);

    // try {
    //   // Filter out empty image URLs
    //   const filteredImageUrls = formData.image_urls.filter(url => url.trim() !== '');
      
    //   const postData = {
    //     title: formData.title,
    //     content: formData.content,
    //     image_urls: filteredImageUrls,
    //     published: formData.published,
    //     published_at: formData.published ? new Date().toISOString() : null
    //   };

    //   const supabase = createClient();
    //   const { data, error } = await supabase
    //     .from('blog_posts')
    //     .insert([postData]);

    //   if (error) throw error;

    //   router.push('/admin/blog');
    // } catch (error) {
    //   console.error('Error creating post:', error);
    //   setError('Error al crear el post');
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#222222]">Crear Nuevo Post</h1>
        <Button variant="ghost" onClick={() => router.back()}>
          ← Volver
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Título del Post"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Introduce el título del post..."
          required
        />

        {/* Multiple Image URLs Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Imágenes (máximo 3)
            </label>
            {formData.image_urls.length < 3 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addImageUrl}
                className="text-[#5D84C4] hover:text-[#4A90E2]"
              >
                + Agregar imagen
              </Button>
            )}
          </div>
          
          {formData.image_urls.map((url, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <Input
                  label={`URL de la Imagen ${index + 1}${index === 0 ? ' (Principal)' : ''}`}
                  name={`image_url_${index}`}
                  type="url"
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
              {formData.image_urls.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeImageUrl(index)}
                  className="text-red-600 hover:text-red-800 mb-2"
                >
                  ✕
                </Button>
              )}
            </div>
          ))}
          
          <p className="text-xs text-gray-500">
            La primera imagen será la imagen principal que aparece en el header. 
            Las demás aparecerán dentro del contenido del post.
          </p>
        </div>

        <Textarea
          label="Contenido"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Escribe el contenido del post..."
          rows={10}
          required
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            className="mr-2 h-4 w-4 text-[#5D84C4] focus:ring-[#5D84C4] border-gray-300 rounded"
          />
          <label className="text-sm font-medium text-gray-600">
            Publicar inmediatamente
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear Post'}
          </Button>
        </div>
      </form>
    </div>
  );
}
