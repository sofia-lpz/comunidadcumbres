// src/app/contacto/page.tsx

export default function ContactoPage() {
  return (
    <main className="px-6 py-12 max-w-4xl mx-auto space-y-12">
      <section className="text-center">
        <h1 className="text-3xl font-bold mb-4">Contáctanos</h1>
        <p className="text-gray-600">
          Si tienes preguntas, sugerencias o deseas colaborar con nosotros, no
          dudes en escribirnos.
        </p>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-gray-800">
            <strong>Teléfono:</strong> +52 (55) 6912 2028
          </p>
          <p className="text-gray-800">
            <strong>Correo electrónico:</strong> info@patronatocumbres.org
          </p>
          <p className="text-gray-800">
            <strong>Dirección:</strong> Avenida de los Poetas 100, Cumbres de
            Santa Fe, Ciudad de México.
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mensaje
            </label>
            <textarea
              rows={5}
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Escribe tu mensaje..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition-colors"
          >
            Enviar mensaje
          </button>
        </form>
      </section>
    </main>
  );
}
