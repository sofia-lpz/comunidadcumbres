"use client"; // Necesario para usar React.useState

import React from "react"; // Necesario para el estado
import dynamic from "next/dynamic"; // Para cargar el modal dinámicamente
import AboutText from "@/components/about/AboutText";
import AreasGrid from "@/components/about/AreasGrid";
import Image from "next/image";
import Transparency from "@/components/about/Transparency";
import { slides } from "@/data/home/slides";

// Importamos dinámicamente el modal, igual que en la página de inicio
const ProgramModal = dynamic(() => import("@/components/home/ProgramModal"), {
  ssr: false,
});

export default function AboutPage() {
  // Estado para saber qué programa/modal está abierto
  const [openProgramIdx, setOpenProgramIdx] = React.useState<number | null>(
    null
  );

  return (
    <main className="flex flex-col">
      {/* SOBRE EL PATRONATO */}
      <section className="bg-white">
        <AboutText />
      </section>

      {/* ÁREAS DE ACCIÓN */}
      <section className="bg-gray-50">
        <AreasGrid />
      </section>

      {/* PROYECTOS */}
      <section className="bg-white px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Nuestro trabajo</h2>
        <p className="text-gray-700 text-center text-lg mb-12">
          Conoce los programas y proyectos que desarrollamos para fortalecer
          nuestra comunidad.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Añadimos 'idx' al map para saber qué programa abrir */}
          {slides.map((slide, idx) => (
            <article
              key={slide.title}
              className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition p-6 h-full"
            >
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{slide.title}</h3>
              <p className="text-gray-600 flex-grow">{slide.description}</p>

              {/* Cambiamos el Link por un button con onClick */}
              <button
                onClick={() => setOpenProgramIdx(idx)}
                className="mt-4 inline-block text-[#5D84C4] font-medium hover:underline text-left"
              >
                Más información
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* TRANSPARENCIA */}
      <section className="bg-gray-50">
        <Transparency />
      </section>

      {/* Renderizamos el Modal */}
      {/* Pasamos la información del slide seleccionado y la función para cerrarlo */}
      <ProgramModal
        isOpen={openProgramIdx !== null}
        slide={openProgramIdx !== null ? slides[openProgramIdx] : null}
        onClose={() => setOpenProgramIdx(null)}
      />
    </main>
  );
}
