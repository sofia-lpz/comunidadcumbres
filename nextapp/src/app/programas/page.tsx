"use client";
import React from "react";
import Link from "next/link";

export default function ProyectosPage() {
  return (
    <div className="min-h-screen py-16 px-4 container mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">
        Eventos y programas comunitarios
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Participa en nuestras actividades y colabora con el desarrollo de la
        comunidad. Aquí puedes ver los próximos eventos y registrarte en los que
        te interesen.
      </p>

      {/* Calendario de Google */}
      <div className="aspect-video max-w-4xl mx-auto mb-12">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=350cf3636fd14dd771d2aa8ed789832bbffa42e6b6a7cb7e758e1a654677be82%40group.calendar.google.com&ctz=America%2FCancun"
          style={{ border: 0 }}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>

      {/* Pregunta de participación */}
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
            summary: "Únete a la logística de nuestros eventos comunitarios.",
            details:
              "Ayuda en la organización de eventos como ferias, colectas o entregas. No se requiere experiencia previa.",
            formUrl: "https://forms.gle/X3468LBNzL2Ni63R7",
          },
          {
            title: "Donaciones en especie",
            summary: "Ayuda donando productos útiles para nuestras campañas.",
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
  );
}
