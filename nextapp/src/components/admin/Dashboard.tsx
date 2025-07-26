'use client';
import { Users, BookOpen, Calendar, TrendingUp } from 'lucide-react';

interface DashboardProps {
  stats: {
    totalPrograms: number;
    activePrograms: number;
    totalPosts: number;
    publishedPosts: number;
  };
}

export default function Dashboard({ stats }: DashboardProps) {
  const cards = [
    {
      title: 'Programas Totales',
      value: stats.totalPrograms,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Programas Activos',
      value: stats.activePrograms,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Posts del Blog',
      value: stats.totalPosts,
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Posts Publicados',
      value: stats.publishedPosts,
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#222222]">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Bienvenido al panel de administración del Patronato Cumbres
        </p>
      </div>

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-[#222222]">
                    {card.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${card.bgColor}`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-[#222222] mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/programs/create"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#5D84C4] hover:bg-gray-50 transition-colors text-center"
          >
            <Calendar className="w-8 h-8 text-[#5D84C4] mx-auto mb-2" />
            <p className="font-medium text-[#222222]">Crear Programa</p>
            <p className="text-sm text-gray-500">Añadir nuevo programa</p>
          </a>
          
          <a
            href="/admin/blog/create"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#5D84C4] hover:bg-gray-50 transition-colors text-center"
          >
            <BookOpen className="w-8 h-8 text-[#5D84C4] mx-auto mb-2" />
            <p className="font-medium text-[#222222]">Crear Post</p>
            <p className="text-sm text-gray-500">Añadir nueva publicación</p>
          </a>
          
          <a
            href="/"
            target="_blank"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#5D84C4] hover:bg-gray-50 transition-colors text-center"
          >
            <TrendingUp className="w-8 h-8 text-[#5D84C4] mx-auto mb-2" />
            <p className="font-medium text-[#222222]">Ver Sitio</p>
            <p className="text-sm text-gray-500">Visitar página principal</p>
          </a>
        </div>
      </div>

      {/* Información del proyecto */}
      <div className="bg-gradient-to-r from-[#5D84C4] to-[#CDA52A] rounded-lg p-6 text-white">
        <h2 className="text-lg font-semibold mb-2">
          Portal Patronato Cumbres de Santa Fe
        </h2>
        <p className="text-blue-100 mb-4">
          Conectando a nuestra comunidad con programas de apoyo y desarrollo social.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium">Beneficiarios:</p>
            <p className="text-blue-200">Empleados, personal doméstico, San Mateo</p>
          </div>
          <div>
            <p className="font-medium">Programas:</p>
            <p className="text-blue-200">Educación, salud, comunitarios</p>
          </div>
          <div>
            <p className="font-medium">Tecnología:</p>
            <p className="text-blue-200">Next.js + Supabase + AWS Amplify</p>
          </div>
        </div>
      </div>
    </div>
  );
}