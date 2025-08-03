"use client";
// import { useEffect, useState } from "react";
// import { createClient } from '@/utils/supabase/client';
import Image from "next/image";
import Link from "next/link";

import Hero from "@/components/home/Hero.jsx";
import ActiveCampaigns from "@/components/home/ActiveCampaigns";
import ImpactCards from "@/components/home/ImpactCards";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_urls: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
}



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
          {
            text: "Conoce nuestras actividades",
            href: "/proyectos",
            primary: false,
          },
        ]}
      />

      {/* Featured Program Registration - Programa Mochilas Escolares */}
      <section className="py-20 bg-gradient-to-r from-[#5D84C4] to-[#5D84C4]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            
            {/* Contenido del texto - Lado izquierdo */}
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Programa Mochilas Escolares
                </h2>
                <p className="text-xl text-white/95 mb-8 leading-relaxed">
                  Proporcionamos útiles escolares completos a niños y jóvenes de familias, 
                  asegurando que tengan las herramientas necesarias para su educación y desarrollo académico.
                </p>
                
                {/* Estadísticas rápidas */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center bg-white/10 rounded-lg py-3">
                    <div className="text-2xl font-bold text-white">+100</div>
                    <div className="text-white/80 text-sm">Mochilas entregadas</div>
                  </div>
                  
                </div>

                {/* Botones de acción */}
                <div className="space-y-4">
                  <Link 
                    href="/inscribirse"
                    className="w-full inline-flex items-center justify-center px-8 py-4 bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <span className="mr-3"> REGÍSTRATE AHORA</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link 
                    href="/programas"
                    className="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
                  >
                    Ver más programas
                  </Link>
                </div>
              </div>
            </div>

            {/* Imagen - Lado derecho */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://contagiandovoluntad.org/img/portfolio/portfolio-MochilasYanga.png"
                  alt="Programa Mochilas Escolares"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Overlay decorativo */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Programas Disponibles
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Conoce todos nuestros programas activos y cómo puedes participar en el desarrollo de tu comunidad.
          </p>
          
        </div>
      </section>

      {/* Impact Cards Section - New CARE.org style */}
      <ImpactCards />
    </div>
  );
}
