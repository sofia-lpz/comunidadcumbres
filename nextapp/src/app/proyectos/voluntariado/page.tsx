import Image from "next/image";
import Link from "next/link";

export default function VoluntariadoPage() {
  return (
    <main className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-[#5D84C4] mb-6">
        Voluntariado
      </h1>
      <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-md">
        <Image
          src="/images/proyectos/voluntariado.jpg"
          alt="Voluntariado"
          fill
          className="object-cover"
        />
      </div>
      <section className="text-gray-700 text-lg space-y-6">
        <p>
          Nuestro programa de voluntariado promueve la participación activa de
          vecinos, colaboradores y personas comprometidas con el bienestar
          social.
        </p>
        <p>
          Los voluntarios forman parte fundamental de nuestras iniciativas,
          desde actividades educativas hasta jornadas comunitarias,
          administrativas o logísticas.
        </p>
        <p>
          Gracias a su compromiso, podemos llegar más lejos y atender más
          necesidades en la comunidad.
        </p>
        <p className="font-semibold">
          ¡Tú también puedes formar parte del cambio!
        </p>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            ¿Te gustaría unirte como voluntario?
          </h2>
          <Link
            href="/voluntariado"
            className="inline-block bg-[#5D84C4] hover:bg-[#4669a1] text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Registrarme como voluntario
          </Link>
        </div>
      </section>
    </main>
  );
}
