export default function VoluntariadoPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#5D84C4]">
        Registro de Voluntariado
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Gracias por tu interés en formar parte del voluntariado del Patronato de
        Ayuda Cumbres de Santa Fe, A.C. Completa el siguiente formulario para
        registrar tu participación.
      </p>

      {/* ====== Google Form Embed ====== */}
      <div className="aspect-video w-full rounded-xl overflow-hidden">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScNezz37ExTfDAXg7V2Nm4gM5psWkAMfhmoEXpPT33QVLGSwQ/viewform?usp=publish-editor"
          width="100%"
          height="100%"
          className="border-0"
          allowFullScreen
          loading="lazy"
        >
          Cargando…
        </iframe>
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
