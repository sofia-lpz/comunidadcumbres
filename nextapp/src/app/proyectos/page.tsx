// src/app/proyectos/page.tsx

import Image from "next/image";
import Link from "next/link";

type Proyecto = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const proyectos: Proyecto[] = [
  {
    id: 1,
    title: "Apoyo Educativo",
    description:
      "Sesiones de tutoría y entrega de útiles escolares para niños de la comunidad.",
    image: "/images/proyectos/educativo.jpg",
  },
  {
    id: 2,
    title: "Salud Comunitaria",
    description:
      "Jornadas médicas y entrega de insumos básicos para mejorar la salud familiar.",
    image: "/images/proyectos/salud.jpg",
  },
  {
    id: 3,
    title: "Reforestación",
    description:
      "Plantación de árboles y mantenimiento de áreas verdes para un entorno más limpio.",
    image: "/images/proyectos/reforestacion.jpg",
  },
  {
    id: 4,
    title: "Voluntariado",
    description:
      "Espacios donde vecinos y colaboradores participan activamente en labores sociales.",
    image: "/images/proyectos/voluntariado.jpg",
  },
  {
    id: 5,
    title: "Mejora de Infraestructura",
    description:
      "Rehabilitación de espacios comunitarios y reparaciones de mobiliario público.",
    image: "/images/proyectos/infraestructura.jpg",
  },
  {
    id: 6,
    title: "Programas Culturales",
    description:
      "Talleres de arte, música y deporte para fomentar el desarrollo integral.",
    image: "/images/proyectos/cultural.jpg",
  },
];

export default function ProyectosPage() {
  return (
    <main className="px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4">Nuestro trabajo</h1>
      <p className="text-gray-700 text-center text-lg mb-12">
        Conoce los programas y proyectos que desarrollamos para fortalecer
        nuestra comunidad.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {proyectos.map((proy) => (
          <article
            key={proy.id}
            className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition p-6"
          >
            <div className="relative w-full h-48 mb-4">
              <Image
                src={proy.image}
                alt={proy.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{proy.title}</h3>
            <p className="text-gray-600 flex-grow">{proy.description}</p>
            <Link
              href="/contacto"
              className="mt-4 inline-block text-[#5D84C4] font-medium hover:underline"
            >
              Más información
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
