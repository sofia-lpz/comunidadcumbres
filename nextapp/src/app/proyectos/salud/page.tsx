import Image from "next/image";

export default function SaludComunitariaPage() {
  return (
    <main className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-[#5D84C4] mb-6">
        Salud Comunitaria
      </h1>
      <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-md">
        <Image
          src="/images/proyectos/salud.jpg"
          alt="Salud Comunitaria"
          fill
          className="object-cover"
        />
      </div>
      <section className="text-gray-700 text-lg space-y-6">
        <p>
          El bienestar físico y mental de nuestra comunidad es una prioridad.
          Por eso, desarrollamos programas de salud accesibles para todos.
        </p>
        <p>
          Entre nuestras acciones se encuentran jornadas médicas gratuitas,
          distribución de medicamentos esenciales y talleres de prevención.
        </p>
        <p>
          Trabajamos con médicos voluntarios y especialistas para asegurar una
          atención de calidad, especialmente a quienes más lo necesitan.
        </p>
        <p className="font-semibold">
          Ayúdanos a construir una comunidad más sana y fuerte.
        </p>
      </section>
    </main>
  );
}
