import Image from "next/image";

export default function ProgramasCulturalesPage() {
  return (
    <main className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-[#5D84C4] mb-6">
        Programas Culturales
      </h1>
      <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-md">
        <Image
          src="/images/proyectos/cultural.jpg"
          alt="Programas Culturales"
          fill
          className="object-cover"
        />
      </div>
      <section className="text-gray-700 text-lg space-y-6">
        <p>
          Nuestros Programas Culturales fomentan el desarrollo integral de
          niños, jóvenes y adultos a través del arte, la música, el deporte y
          otras expresiones creativas.
        </p>
        <p>
          Impulsamos actividades que fortalecen la identidad, el trabajo en
          equipo y la creatividad, contribuyendo a una comunidad más unida y
          empática.
        </p>
        <p>
          Estos talleres son impartidos por expertos y voluntarios comprometidos
          con el crecimiento personal y colectivo de nuestros participantes.
        </p>
        <p className="font-semibold">
          Participar en la cultura también es transformar vidas. ¡Súmate!
        </p>
      </section>
    </main>
  );
}
