'use client';
import { useState } from 'react';
import { usePrograms } from '@/hooks/usePrograms';
import { supabase } from '@/lib/supabase';
import ProgramList from '@/components/admin/ProgramList';
import ProgramForm from '@/components/admin/ProgramForm';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Plus } from 'lucide-react';

export default function AdminProgramsPage() {
  const { programs, loading, error, refetch } = usePrograms();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleCreateProgram = async (formData: any) => {
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('programs')
        .insert([formData]);

      if (error) throw error;
      
      await refetch();
      setIsModalOpen(false);
      setEditingProgram(null);
    } catch (error) {
      console.error('Error creating program:', error);
      alert('Error al crear el programa');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateProgram = async (formData: any) => {
    if (!editingProgram) return;
    
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('programs')
        .update(formData)
        .eq('id', editingProgram.id);

      if (error) throw error;
      
      await refetch();
      setIsModalOpen(false);
      setEditingProgram(null);
    } catch (error) {
      console.error('Error updating program:', error);
      alert('Error al actualizar el programa');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProgram = async (programId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este programa?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', programId);

      if (error) throw error;
      
      await refetch();
    } catch (error) {
      console.error('Error deleting program:', error);
      alert('Error al eliminar el programa');
    }
  };

  const handleEditProgram = (program: any) => {
    setEditingProgram(program);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProgram(null);
  };

  const handleSubmit = editingProgram ? handleUpdateProgram : handleCreateProgram;

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5D84C4]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#222222]">Gestión de Programas</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Programa
        </Button>
      </div>

      <ProgramList 
        programs={programs}
        onEdit={handleEditProgram}
        onDelete={handleDeleteProgram}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProgram ? 'Editar Programa' : 'Nuevo Programa'}
        size="lg"
      >
        <ProgramForm
          program={editingProgram}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}