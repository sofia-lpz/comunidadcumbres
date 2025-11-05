import Image from "next/image";

type Area = {
  id: number;
  title: string;
  description: string;
  image: string;
  objectPosition?: string;
};

const AreasGrid = () => {
  const areas: Area[] = [
    {
      id: 1,
      title: "Empleados del condominio",
      description:
        "Programas dedicados al personal que labora en Cumbres de Santa Fe, incluyendo útiles escolares, exámenes médicos y apoyo educativo.",
      image: "/images/accion/empleados.jpeg",
      objectPosition: "center 35%",
    },
    {
      id: 2,
      title: "Personal de apoyo en hogares",
      description:
        "Iniciativas para trabajadoras y trabajadores domésticos, como clases gratuitas y entrega de anteojos.",
      image: "/images/accion/apoyo-domestico.jpg",
    },
    {
      id: 3,
      title: "Habitantes de San Mateo Tlaltenango",
      description:
        "Mejoras en instalaciones comunales mediante la renovación de espacios públicos, áreas recreativas y centros comunitarios.",
      image: "/images/accion/san-mateo.jpg",
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Áreas de Acción</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {areas.map((area) => (
          <article
            key={area.id}
            className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition p-6"
          >
            {/* Responsive image block */}
            <div className="relative w-full aspect-[16/9] mb-4 overflow-hidden rounded-xl">
              <Image
                src={area.image}
                alt={area.title}
                fill
                className="object-cover"
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                // Fine-tune the crop for this card only
                style={
                  area.objectPosition
                    ? { objectPosition: area.objectPosition }
                    : undefined
                }
                priority={area.id === 1}
              />
            </div>

            <h3 className="text-xl font-semibold mb-2">{area.title}</h3>
            <p className="text-gray-600 flex-grow">{area.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AreasGrid;
