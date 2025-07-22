// En src/app/programas/[slug]/page.jsx
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

export default function ProgramDetail() {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProgram() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('programs')
          .select('*, categories(*)')
          .eq('id', slug)
          .single();
          
        if (error) throw error;
        setProgram(data);
      } catch (error) {
        console.error('Error fetching program:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (slug) {
      fetchProgram();
    }
  }, [slug]);

  if (loading) return <div className="text-center py-12">Cargando...</div>;
  if (!program) return <div className="text-center py-12">Programa no encontrado</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{program.title}</h1>
        
        {/* Aquí va el contenido detallado del programa */}
        
        {program.external_form_url && (
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="mt-6"
          >
            Inscribirme en este programa
          </Button>
        )}
        
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Inscripción"
          size="lg"
        >
          <div className="text-center">
            <p className="mb-4">Serás redirigido al formulario de inscripción externo.</p>
            <Button
              onClick={() => window.open(program.external_form_url, '_blank')}
            >
              Ir al formulario
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}