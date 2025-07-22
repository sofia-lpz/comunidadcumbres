'use client';
import React, { useState } from 'react';
import { Calendar, Users, ChevronRight, ExternalLink, MapPin } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

export default function CampaignCard({ campaign }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha por definir';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusText = (status) => {
    const statusMap = {
      'active': 'Activo',
      'upcoming': 'Próximamente',
      'completed': 'Finalizado'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'active': 'bg-green-100 text-green-800',
      'upcoming': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-gray-100 text-gray-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image */}
        <div className="h-48 bg-gray-200 relative">
          {campaign.image ? (
            <img 
              src={campaign.image} 
              alt={campaign.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400">Imagen no disponible</span>
            </div>
          )}
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
            {getStatusText(campaign.status)}
          </div>
          {campaign.featured && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-[#5D84C4] text-white">
              Destacado
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{campaign.description}</p>
          
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(campaign.created_at)}</span>
          </div>

          {campaign.category && (
            <div className="flex items-center text-sm mb-6">
              <span 
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: campaign.categoryColor ? `${campaign.categoryColor}20` : '#5D84C420',
                  color: campaign.categoryColor || '#5D84C4'
                }}
              >
                {campaign.category}
              </span>
            </div>
          )}
          
          <button className="inline-flex items-center text-[#5D84C4] font-medium hover:text-[#3A5A9B] transition-colors">
            Ver detalles <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={campaign.title}
        size="lg"
      >
        <div className="space-y-6">
          {/* Imagen en el modal */}
          {campaign.image && (
            <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src={campaign.image} 
                alt={campaign.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Estado y fecha */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
              {getStatusText(campaign.status)}
            </div>
            {campaign.featured && (
              <div className="px-4 py-2 rounded-full text-sm font-medium bg-[#5D84C4] text-white">
                ⭐ Programa Destacado
              </div>
            )}
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Creado: {formatDate(campaign.created_at)}</span>
            </div>
          </div>

          {/* Categoría */}
          {campaign.category && (
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Categoría:</span>
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: campaign.categoryColor ? `${campaign.categoryColor}20` : '#5D84C420',
                  color: campaign.categoryColor || '#5D84C4'
                }}
              >
                {campaign.category}
              </span>
            </div>
          )}

          {/* Audiencia objetivo */}
          {campaign.target_audience && (
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-gray-400" />
              <span className="text-sm text-gray-600 mr-2">Dirigido a:</span>
              <span className="text-sm font-medium">{campaign.target_audience}</span>
            </div>
          )}

          {/* Descripción completa */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Descripción</h4>
            <p className="text-gray-700 leading-relaxed">
              {campaign.full_description || campaign.description}
            </p>
          </div>

          {/* Requisitos si existen */}
          {campaign.requirements && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Requisitos</h4>
              <p className="text-gray-700 leading-relaxed">{campaign.requirements}</p>
            </div>
          )}

          {/* Botón de formulario */}
          {campaign.external_form_url && (
            <div className="border-t pt-6">
              <h4 className="text-lg font-semibold mb-3">¿Te interesa participar?</h4>
              <Button
                onClick={() => window.open(campaign.external_form_url, '_blank')}
                className="w-full sm:w-auto flex items-center justify-center"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Ir al formulario de inscripción
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}