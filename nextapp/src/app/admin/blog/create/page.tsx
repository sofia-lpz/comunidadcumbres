'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

interface FormData {
  title: string;
  content: string;
  image_url: string;
  published: boolean;
}

export default function CreateBlogPost() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    image_url: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const postData = {
        ...formData,
        published_at: formData.published ? new Date().toISOString() : null
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData]);

      if (error) throw error;

      router.push('/admin/blog');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Error al crear el post');
    } finally {
      setLoading(false);
    }
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

        <Input
          label="URL de la Imagen (opcional)"
          name="image_url"
          type="url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
        />

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
