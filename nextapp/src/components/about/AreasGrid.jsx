import AreaCard from "./AreaCard";

export default function AreasGrid() {
  const areas = [
    {
      id: 1,
      title: "Empleados del condominio",
      description:
        "Programas dedicados al personal que labora en Cumbres de Santa Fe, incluyendo útiles escolares, exámenes médicos y apoyo educativo.",
      image: "/images/empleados.jpg",
    },
    {
      id: 2,
      title: "Personal de apoyo en hogares",
      description:
        "Iniciativas para trabajadoras y trabajadores domésticos, como clases gratuitas y entrega de anteojos.",
      image: "/images/apoyo-domestico.jpg",
    },
    {
      id: 3,
      title: "Habitantes de San Mateo Tlaltenango",
      description:
        "Proyectos de reforestación, mejora de instalaciones comunales y donación de ropa o bicicletas.",
      image: "/images/san-mateo.jpg",
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Áreas de Acción</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {areas.map((area) => (
          <AreaCard key={area.id} area={area} />
        ))}
      </div>
    </section>
  );
}
