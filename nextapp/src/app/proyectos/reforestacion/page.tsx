import Image from "next/image";

export default function ReforestacionPage() {
  return (
    <main className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-[#5D84C4] mb-6">
        Reforestación
      </h1>
      <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-md">
        <Image
          src="/images/proyectos/reforestacion.jpg"
          alt="Reforestación"
          fill
          className="object-cover"
        />
      </div>
      <section className="text-gray-700 text-lg space-y-6">
        <p>
          La reforestación es una de nuestras iniciativas más importantes para
          preservar el entorno natural que rodea a nuestra comunidad.
        </p>
        <p>
          Organizamos jornadas de plantación de árboles, mantenimiento de áreas
          verdes y sensibilización sobre el cuidado del medio ambiente.
        </p>
        <p>
          Este proyecto no solo mejora la calidad del aire y la belleza del
          paisaje, sino que también promueve la participación comunitaria y el
          sentido de pertenencia.
        </p>
        <p className="font-semibold">
          Únete a nuestros esfuerzos por un futuro más verde.
        </p>
      </section>
    </main>
  );
}
