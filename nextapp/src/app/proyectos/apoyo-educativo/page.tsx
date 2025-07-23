import Image from "next/image";

export default function ApoyoEducativoPage() {
  return (
    <main className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-[#5D84C4] mb-6">
        Apoyo Educativo
      </h1>
      <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-md">
        <Image
          src="/images/proyectos/educativo.jpg"
          alt="Apoyo Educativo"
          fill
          className="object-cover"
        />
      </div>
      <section className="text-gray-700 text-lg space-y-6">
        <p>
          El programa de Apoyo Educativo tiene como objetivo brindar
          herramientas académicas y materiales escolares a niños y jóvenes de la
          comunidad, especialmente aquellos en situación de vulnerabilidad.
        </p>
        <p>
          A través de sesiones de tutoría, reforzamiento escolar y la entrega de
          útiles, buscamos fomentar la continuidad educativa y motivar a los
          estudiantes a alcanzar su máximo potencial.
        </p>
        <p>
          Colaboramos con voluntarios, escuelas y familias para garantizar una
          atención personalizada y de calidad.
        </p>
        <p className="font-semibold">
          ¡Únete a esta causa y transforma el futuro de nuestra comunidad!
        </p>
      </section>
    </main>
  );
}
