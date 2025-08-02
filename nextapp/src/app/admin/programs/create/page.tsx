'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { createClient } from '@/utils/supabase/client';
import ProgramForm from '@/components/admin/ProgramForm';

export default function CreateProgramPage() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: any) => {
    setSubmitting(true);
    try {
      // Funcionalidad deshabilitada en modo estático
      alert('Creación de programas deshabilitada en modo estático');
      
      // const supabase = createClient();
      // const { error } = await supabase
      //   .from('programs')
      //   .insert([formData]);

      // if (error) throw error;
      
      // router.push('/admin/programs');
    } catch (error) {
      console.error('Error creating program:', error);
      alert('Error al crear el programa');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/programs');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#222222]">Crear Nuevo Programa</h1>
        <p className="text-gray-600 mt-2">
          Completa la información del programa que quieres añadir al portal.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <ProgramForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
