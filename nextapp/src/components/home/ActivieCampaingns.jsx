import React from 'react';
import CampaignCard from './CampaignCard';

export default function ActiveCampaigns() {

/* Ejemplo api o ppsible fetch
    const response = await fetch('https://your-api.com/campaigns');
    const campaigns = await response.json();
*/
  // Esto sera remplazado por datos reales de la API
  const campaigns = [
    {
      id: 1,
      title: "Útiles Escolares",
      description: "Entrega de útiles escolares para hijos de empleados del condominio",
      image: "/images/utiles.jpg",
      status: "active",
      href: "/programas/utiles-escolares",
    },
    {
      id: 2,
      title: "Clases de Inglés",
      description: "Clases gratuitas de inglés para empleados y habitantes de San Mateo",
      image: "/images/ingles.jpg",
      status: "active",
      href: "/programas/clases-ingles",
    },
    {
      id: 3,
      title: "Exámenes de la Vista",
      description: "Evaluaciones y entrega de anteojos para empleados",
      image: "/images/vista.jpg",
      status: "upcoming",
      href: "/programas/examenes-vista",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {campaigns.map(campaign => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}