'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import CampaignCard from './CampaignCard';

interface Category {
  name: string;
  slug: string;
  color: string;
  icon: string;
}

interface Program {
  id: string;
  title: string;
  short_description: string;
  full_description?: string;
  image_url?: string;
  status: string;
  created_at: string;
  updated_at?: string;
  categories?: Category;
  target_audience?: string;
  external_form_url?: string;
  featured: boolean;
  requirements?: string;
}

interface Campaign {
  id: string;
  title: string;
  description: string;
  full_description?: string;
  image: string;
  status: string;
  href: string;
  category?: string;
  categoryColor?: string;
  target_audience?: string;
  external_form_url?: string;
  featured: boolean;
  created_at: string;
  updated_at?: string;
  requirements?: string;
}

export default function ActiveCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('programs')
          .select(`
            *,
            categories (
              name,
              slug,
              color,
              icon
            )
          `)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) throw error;

        // Transformar los datos para que coincidan con el formato esperado
        const transformedData: Campaign[] = (data as Program[]).map(program => ({
          id: program.id,
          title: program.title,
          description: program.short_description,
          full_description: program.full_description,
          image: program.image_url || "/images/default-program.svg",
          status: program.status,
          href: `/programas/${program.id}`,
          category: program.categories?.name,
          categoryColor: program.categories?.color,
          target_audience: program.target_audience,
          external_form_url: program.external_form_url,
          featured: program.featured,
          created_at: program.created_at,
          updated_at: program.updated_at,
          requirements: program.requirements
        }));

        setCampaigns(transformedData);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        // En caso de error, mostrar datos de ejemplo
        setCampaigns([
          {
            id: 'fallback-1',
            title: "Cargando programas...",
            description: "Los programas se están cargando desde la base de datos.",
            image: "/images/default-program.svg",
            status: "active",
            href: "/programas",
            featured: false,
            created_at: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5D84C4]"></div>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No hay programas activos en este momento.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {campaigns.map(campaign => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}
