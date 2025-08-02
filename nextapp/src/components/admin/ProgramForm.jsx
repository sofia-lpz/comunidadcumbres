
'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ProgramForm({ program = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    full_description: '',
    image_url: '',
    status: 'active',
    category_id: '',
    target_audience: '',
    external_form_url: '',
    requirements: '',
    featured: false,
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Si hay un programa, cargar sus datos
    if (program) {
      setFormData({
        title: program.title || '',
        short_description: program.short_description || '',
        full_description: program.full_description || '',
        image_url: program.image_url || '',
        status: program.status || 'active',
        category_id: program.category_id || '',
        target_audience: program.target_audience || '',
        external_form_url: program.external_form_url || '',
        requirements: program.requirements || '',
        featured: program.featured || false,
      });
    }

    // Cargar categorías
    async function fetchCategories() {
      try {
        // Usar categorías estáticas en modo estático
        const staticCategories = [
          { id: '1', name: 'Educación', color: '#4F46E5' },
          { id: '2', name: 'Salud', color: '#10B981' },
          { id: '3', name: 'Cultura', color: '#F59E0B' },
          { id: '4', name: 'Infraestructura', color: '#8B5CF6' },
          { id: '5', name: 'Medio Ambiente', color: '#059669' },
          { id: '6', name: 'Voluntariado', color: '#DC2626' }
        ];
        
        setCategories(staticCategories);
        
        // const supabase = createClient();
        // const { data, error } = await supabase
        //   .from('categories')
        //   .select('*')
        //   .order('name');
          
        // if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    
    fetchCategories();
  }, [program]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Título"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Descripción Corta (para cards)
        </label>
        <textarea
          name="short_description"
          value={formData.short_description}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D84C4] focus:border-transparent text-gray-900 placeholder-gray-400 bg-white"
          placeholder="Descripción breve que aparecerá en las tarjetas..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Descripción Completa (opcional)
        </label>
        <textarea
          name="full_description"
          value={formData.full_description}
          onChange={handleChange}
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D84C4] focus:border-transparent text-gray-900 placeholder-gray-400 bg-white"
          placeholder="Descripción detallada que aparecerá en el modal..."
        />
      </div>

      <Input
        label="URL de la Imagen"
        name="image_url"
        type="url"
        value={formData.image_url}
        onChange={handleChange}
        placeholder="https://ejemplo.com/imagen.jpg"
      />

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Categoría
        </label>
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D84C4] focus:border-transparent text-gray-900 bg-white"
          required
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Público Objetivo
        </label>
        <select
          name="target_audience"
          value={formData.target_audience}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D84C4] focus:border-transparent text-gray-900 bg-white"
          required
        >
          <option value="">Seleccionar público</option>
          <option value="Empleados">Empleados del condominio</option>
          <option value="Personal doméstico">Personal de servicio doméstico</option>
          <option value="San Mateo">Pobladores de San Mateo Tlaltenango</option>
          <option value="Todos">Todos los anteriores</option>
        </select>
      </div>

      <Input
        label="URL del Formulario de Google"
        name="external_form_url"
        type="url"
        value={formData.external_form_url}
        onChange={handleChange}
        placeholder="https://forms.google.com/..."
      />

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Requisitos (opcional)
        </label>
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D84C4] focus:border-transparent text-gray-900 placeholder-gray-400 bg-white"
          placeholder="Documentos necesarios, edad mínima, etc..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Estado
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D84C4] focus:border-transparent text-gray-900 bg-white"
        >
          <option value="active">Activo</option>
          <option value="upcoming">Próximo</option>
          <option value="completed">Completado</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="mr-2 h-4 w-4 text-[#5D84C4] focus:ring-[#5D84C4] border-gray-300 rounded"
        />
        <label className="text-sm font-medium text-gray-600">
          Destacar en página principal
        </label>
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : (program ? 'Actualizar' : 'Crear')}
        </Button>
      </div>
    </form>
  );
}