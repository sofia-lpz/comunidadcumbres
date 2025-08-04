"use client";
import React from "react";

export default function ProgramaEducativoPage() {
  return (
    <div className="min-h-screen py-16 px-4 container mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">
        Programa Educativo Comunitario
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Participa en nuestras clases semanales enfocadas en desarrollo académico
        y personal.
      </p>

      {/* Calendario */}
      <div className="aspect-video max-w-4xl mx-auto mb-12">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=23ba6b19fa700cb0b29cd40e33b6258e3266245dfb2ca839cbdb6188f1915244%40group.calendar.google.com&ctz=America%2FCancun"
          style={{ border: 0 }}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>

      {/* Sección de registro general */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h3 className="text-2xl font-bold mb-4">
          ¿Te gustaría inscribirte a nuestras clases?
        </h3>
        <p className="text-gray-600 mb-6">
          Completa el siguiente formulario para registrarte en uno o más de
          nuestros programas educativos. Es rápido y sencillo.
        </p>
        <a
          href="https://forms.gle/msiTAGhDTnsGBtmWA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#ef4444] hover:bg-[#dc2626] text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
        >
          Registrarme a las clases
        </a>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          {
            title: "Clases de Inglés",
            description:
              "Mejora tus habilidades en comprensión auditiva, vocabulario y conversación en inglés. Nivel básico a intermedio.",
            zoomLink: "https://zoom.us/j/ID_ingles",
            driveLink:
              "https://drive.google.com/drive/folders/16uPGVeIj5E31y9xx8RIjESn26BcpzYFZ?usp=drive_link",
          },
          {
            title: "Clases de Computación",
            description:
              "Aprende desde el uso básico de computadoras hasta herramientas como Word, Excel y presentaciones.",
            zoomLink: "https://zoom.us/j/ID_computacion",
            driveLink:
              "https://drive.google.com/drive/folders/1eg9DM8taXh-BogQXUQUnG2mwwExXuxo4?usp=drive_link",
          },
          {
            title: "Clases de Finanzas Personales",
            description:
              "Desarrolla hábitos financieros saludables: ahorro, presupuesto, y manejo responsable del dinero.",
            zoomLink: "https://zoom.us/j/ID_finanzas",
            driveLink:
              "https://drive.google.com/drive/folders/1tuxChoWeozYDj2z8R6G_rxto8FFxGIU3?usp=drive_link",
          },
        ].map((programa, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-lg"
          >
            <h2 className="text-xl font-bold mb-2">{programa.title}</h2>
            <details>
              <summary className="cursor-pointer text-blue-600 hover:underline mb-2">
                Ver detalles
              </summary>
              <p className="text-gray-600 mt-2 mb-4">{programa.description}</p>
              <div className="flex flex-col gap-2">
                <a
                  href={programa.zoomLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white text-center px-4 py-2 rounded-lg"
                >
                  Unirse por Zoom
                </a>
                <a
                  href={programa.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-gray-900 text-white text-center px-4 py-2 rounded-lg"
                >
                  Ver clases grabadas
                </a>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
