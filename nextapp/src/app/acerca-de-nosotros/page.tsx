import AboutText from "@/components/about/AboutText";
import AreasGrid from "@/components/about/AreasGrid";
import Image from "next/image";
import Link from "next/link";
import Transparency from "@/components/about/Transparency";

type Proyecto = {
  id: number;
  title: string;
  description: string;
  image: string;
  href: string;
};

const proyectos: Proyecto[] = [
  {
    id: 1,
    title: "Apoyo Educativo",
    description:
      "Sesiones de tutoría y entrega de útiles escolares para niños de la comunidad.",
    image: "/images/acerca-de-nosotros/educativo.jpg",
    href: "/acerca-de-nosotros/apoyo-educativo",
  },
  {
    id: 2,
    title: "Salud Comunitaria",
    description:
      "Jornadas médicas y entrega de insumos básicos para mejorar la salud familiar.",
    image: "/images/acerca-de-nosotros/salud.jpg",
    href: "/acerca-de-nosotros/salud",
  },
  {
    id: 3,
    title: "Reforestación",
    description:
      "Plantación de árboles y mantenimiento de áreas verdes para un entorno más limpio.",
    image: "/images/acerca-de-nosotros/reforestacion.jpg",
    href: "/acerca-de-nosotros/reforestacion",
  },
  {
    id: 4,
    title: "Voluntariado",
    description:
      "Espacios donde vecinos y colaboradores participan activamente en labores sociales.",
    image: "/images/acerca-de-nosotros/voluntariado.jpg",
    href: "/acerca-de-nosotros/voluntariado",
  },
  {
    id: 5,
    title: "Mejora de Infraestructura",
    description:
      "Rehabilitación de espacios comunitarios y reparaciones de mobiliario público.",
    image: "/images/acerca-de-nosotros/infraestructura.jpg",
    href: "/acerca-de-nosotros/infraestructura",
  },
  {
    id: 6,
    title: "Programas Culturales",
    description:
      "Talleres de arte, música y deporte para fomentar el desarrollo integral.",
    image: "/images/acerca-de-nosotros/cultural.jpg",
    href: "/acerca-de-nosotros/culturales",
  },
];

export default function AboutPage() {
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
                href={proy.href}
                className="mt-4 inline-block text-[#5D84C4] font-medium hover:underline"
              >
                Más información
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* TRANSPARENCIA */}
      <section className="bg-gray-50">
        <Transparency />
      </section>
    </main>
  );
}
