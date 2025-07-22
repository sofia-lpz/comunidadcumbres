import Link from "next/link";

export default function ComoAportarPage() {
  return (
    <main className="px-6 py-12 max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center mb-4">¿Cómo aportar?</h1>
      <p className="text-gray-700 text-center text-lg">
        Tú también puedes formar parte de nuestra misión. Elige la forma que más
        te convenga:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sección Donaciones */}
        <section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="text-2xl font-semibold text-[#5D84C4] mb-2">
            Donaciones
          </h2>
          <p className="text-gray-600 flex-grow mb-6">
            Con tu donación ayudas a financiar programas de educación, salud y
            desarrollo comunitario. Cada aporte, grande o pequeño, tiene un
            impacto real.
          </p>
          <Link
            href="/donar"
            className="mt-auto inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-md font-semibold text-center transition"
          >
            Donar ahora
          </Link>
        </section>

        {/* Sección Voluntariado */}
        <section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="text-2xl font-semibold text-[#5D84C4] mb-2">
            Voluntariado
          </h2>
          <p className="text-gray-600 flex-grow mb-6">
            Únete como voluntario y colabora en proyectos presenciales:
            tutorías, jornadas médicas, reforestación y más. ¡Tu tiempo y
            talento son muy valiosos!
          </p>
          <Link
            href="/voluntariado"
            className="mt-auto inline-block bg-[#5D84C4] hover:bg-opacity-90 text-white px-5 py-3 rounded-md font-semibold text-center transition"
          >
            Registrarme
          </Link>
        </section>
      </div>
    </main>
  );
}
