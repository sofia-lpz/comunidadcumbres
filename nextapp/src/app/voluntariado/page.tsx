export default function VoluntariadoPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#5D84C4]">
        Registro de Voluntariado
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Gracias por tu interés en formar parte del voluntariado del Patronato de
        Ayuda Cumbres de Santa Fe, A.C. Próximamente podrás completar tu
        registro directamente desde esta página.
      </p>

      {/* ====== Espacio reservado para el Google Form ====== */}
      <div className="aspect-video w-full bg-gray-100 border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400">
        <span className="text-center px-4">
          Aquí se insertará el formulario de Google Forms
        </span>
      </div>

      {/* ====== Información de contacto opcional ====== */}
      <div className="mt-10 text-center text-gray-600 text-sm">
        <p>
          Si tienes dudas o deseas recibir más información, puedes escribirnos a{" "}
          <a
            href="mailto:contacto@comunidadcumbres.org"
            className="text-[#5D84C4] font-semibold hover:underline"
          >
            contacto@comunidadcumbres.org
          </a>
        </p>
      </div>
    </main>
  );
}
