import Image from "next/image";
import Hero from "@/components/home/Hero.jsx";
import ActiveCampaigns from "@/components/home/ActivieCampaingns.jsx";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero 
        title="Patronato de Ayuda Cumbres de Santa Fe, A.C." 
        subtitle="Transformando vidas a través del apoyo comunitario"
        ctaButtons={[
          { text: "Quiero ayudar", href: "/como-aportar", primary: true },
          { text: "Solicitar apoyo", href: "/programas", primary: false },
          { text: "Conoce nuestras actividades", href: "/proyectos", primary: false }
        ]}
      />
      
      {/* Featured Campaigns/Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Programas</h2>
          <ActiveCampaigns />
        </div>
      </section>
      
      {/* Impact Statistics */}
      
      
      {/* Testimonios Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Testimonios</h2>
          {/* Testimonial cards would go here */}
        </div>
      </section>
    </div>
  );
}