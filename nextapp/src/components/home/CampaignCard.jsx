import React from 'react';
import Link from 'next/link';
import { Calendar, Users, ChevronRight } from 'lucide-react';

export default function CampaignCard({ campaign }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Image placeholder */}
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
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
          campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {campaign.status === 'active' ? 'Activo' : 'Próximamente'}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
        <p className="text-gray-600 mb-4">{campaign.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Fecha por definir</span>
        </div>
        
        <Link 
          href={campaign.href}
          className="inline-flex items-center text-[#5D84C4] font-medium hover:text-[#3A5A9B] transition-colors"
        >
          Más información <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}