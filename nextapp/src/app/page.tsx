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
        title={
          <>
            Patronato de Ayuda
            <br />
            Cumbres de Santa Fe, A.C.
          </>
        }
        subtitle="Transformando vidas a través del apoyo comunitario"
        ctaButtons={[
          { text: "Quiero ayudar", href: "/como-aportar", primary: true },
          {
            text: "Programa educativo",
            href: "/programa-educativo",
            primary: false,
            className: "bg-yellow-400 hover:bg-yellow-500 text-black",
          },
          {
            text: "Actividades de la Comunidad",
            href: "/programas",
            primary: false,
          },
        ]}
      />

      <section className="px-6 py-12 max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-4">¿Cómo aportar?</h1>
        <p className="text-gray-700 text-center text-lg">
          Tú también puedes formar parte de nuestra misión. Elige la forma que
          más te convenga:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sección Donaciones */}
          <section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
            <h2 className="text-2xl font-semibold text-[#5D84C4] mb-2">
              Donaciones
            </h2>
            <p className="text-gray-600 flex-grow mb-6">
              Con tu donación ayudas a financiar programas de educación, salud y
              desarrollo comunitario. Cada aporte, grande o pequeño, tiene un
              impacto real.
            </p>
            <Link
              href="/donar"
              className="mt-auto inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-md font-semibold text-center transition"
            >
              Donar ahora
            </Link>
          </section>

          {/* Sección Voluntariado */}
          <section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
            <h2 className="text-2xl font-semibold text-[#5D84C4] mb-2">
              Voluntariado
            </h2>
            <p className="text-gray-600 flex-grow mb-6">
              Únete como voluntario y colabora en proyectos presenciales:
              tutorías, jornadas médicas, reforestación y más. ¡Tu tiempo y
              talento son muy valiosos!
            </p>
            <Link
              href="/voluntariado"
              className="mt-auto inline-block bg-[#5D84C4] hover:bg-opacity-90 text-white px-5 py-3 rounded-md font-semibold text-center transition"
            >
              Registrarme
            </Link>
          </section>
        </div>
      </section>

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
                  Proporcionamos útiles escolares completos a niños y jóvenes de
                  familias, asegurando que tengan las herramientas necesarias
                  para su educación y desarrollo académico.
                </p>

                {/* Estadísticas rápidas */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center bg-white/10 rounded-lg py-3">
                    <div className="text-2xl font-bold text-white">+100</div>
                    <div className="text-white/80 text-sm">
                      Mochilas entregadas
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="space-y-4">
                  <Link
                    href="/inscribirse"
                    className="w-full inline-flex items-center justify-center px-8 py-4 bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <span className="mr-3"> REGÍSTRATE AHORA</span>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
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

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Nuevo título */}
          <h2 className="text-3xl font-bold text-center mb-4">
            Participa en nuestros próximos programas y eventos
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Consulta el calendario y encuentra oportunidades para involucrarte.
          </p>

          {/* Calendario de Google embebido */}
          <div className="mb-12 aspect-video max-w-4xl mx-auto">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=350cf3636fd14dd771d2aa8ed789832bbffa42e6b6a7cb7e758e1a654677be82%40group.calendar.google.com&ctz=America%2FCancun"
              style={{ border: 0 }}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>

          {/* Pregunta y tarjetas */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-4">
              ¿Te interesa participar en alguno de los programas?
            </h3>
          </div>

          {/* Grid de tarjetas */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Voluntariado Escolar",
                summary:
                  "Apoya a niños y jóvenes en tareas y actividades educativas.",
                details:
                  "Participa como mentor académico, acompaña en talleres y comparte tu experiencia. Se requiere disponibilidad semanal.",
                formUrl: "https://forms.gle/X3468LBNzL2Ni63R7",
              },
              {
                title: "Apoyo en eventos",
                summary:
                  "Únete a la logística de nuestros eventos comunitarios.",
                details:
                  "Ayuda en la organización de eventos como ferias, colectas o entregas. No se requiere experiencia previa.",
                formUrl: "https://forms.gle/X3468LBNzL2Ni63R7",
              },
              {
                title: "Donaciones en especie",
                summary:
                  "Ayuda donando productos útiles para nuestras campañas.",
                details:
                  "Puedes aportar útiles escolares, alimentos no perecederos, ropa y más. Nosotros coordinamos la recolección.",
                formUrl: "https://forms.gle/X3468LBNzL2Ni63R7",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-lg"
              >
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-gray-600 mb-4">{item.summary}</p>
                <details className="mb-4">
                  <summary className="cursor-pointer text-blue-600 hover:underline">
                    Ver más detalles
                  </summary>
                  <p className="mt-2 text-sm text-gray-500">{item.details}</p>
                </details>
                <a
                  href={item.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center bg-[#ef4444] hover:bg-[#dc2626] text-white font-semibold py-2 px-4 rounded-lg transition-all"
                >
                  Inscribirme
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Cards Section - New CARE.org style */}
      <ImpactCards />
    </div>
  );
}
