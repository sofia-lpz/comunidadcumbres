'use client';
import { Edit, Trash2, ExternalLink, Star } from 'lucide-react';
import Button from '@/components/ui/Button';

interface Program {
  id: string;
  title: string;
  short_description: string;
  status: 'active' | 'upcoming' | 'completed';
  target_audience: string;
  external_form_url?: string;
  featured: boolean;
  created_at: string;
  categories?: {
    name: string;
    color: string;
  };
}

interface ProgramListProps {
  programs: Program[];
  onEdit: (program: Program) => void;
  onDelete: (programId: string) => void;
}

export default function ProgramList({ programs, onEdit, onDelete }: ProgramListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'upcoming':
        return 'Próximo';
      case 'completed':
        return 'Completado';
      default:
        return status;
    }
  };

  if (programs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay programas</h3>
        <p className="text-gray-600">Comienza creando tu primer programa</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Programa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Público
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {programs.map((program) => (
              <tr key={program.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="text-sm font-medium text-gray-900">
                          {program.title}
                        </h3>
                        {program.featured && (
                          <Star className="w-4 h-4 text-yellow-500 ml-2" fill="currentColor" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {program.short_description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(program.status)}`}>
                    {getStatusText(program.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {program.target_audience}
                </td>
                <td className="px-6 py-4">
                  {program.categories && (
                    <span 
                      className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white"
                      style={{ backgroundColor: program.categories.color }}
                    >
                      {program.categories.name}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {program.external_form_url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(program.external_form_url, '_blank')}
                        title="Abrir formulario"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(program)}
                      title="Editar programa"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(program.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Eliminar programa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}