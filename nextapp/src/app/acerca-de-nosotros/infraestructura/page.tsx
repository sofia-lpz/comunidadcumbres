import Image from "next/image";

export default function MejoraInfraestructuraPage() {
  return (
    <main className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-[#5D84C4] mb-6">
        Mejora de Infraestructura
      </h1>
      <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-md">
        <Image
          src="/images/proyectos/infraestructura.jpg"
          alt="Mejora de Infraestructura"
          fill
          className="object-cover"
        />
      </div>
      <section className="text-gray-700 text-lg space-y-6">
        <p>
          Este programa busca mejorar los espacios comunitarios a través de la
          rehabilitación de áreas comunes, reparación de mobiliario urbano y
          mantenimiento de instalaciones clave.
        </p>
        <p>
          Gracias al trabajo conjunto con voluntarios y donadores, logramos que
          las zonas de uso común estén en condiciones óptimas para todos los
          habitantes de San Mateo Tlaltenango y Cumbres de Santa Fe.
        </p>
        <p>
          Mejorar la infraestructura es invertir en la dignidad, seguridad y
          bienestar de la comunidad.
        </p>
        <p className="font-semibold">
          Ayúdanos a seguir construyendo un mejor entorno para todos.
        </p>
      </section>
    </main>
  );
}
