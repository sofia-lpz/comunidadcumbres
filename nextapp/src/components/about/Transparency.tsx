const Transparency = () => {
  return (
    <section className="py-12 text-center">
      <h2 className="text-3xl font-bold mb-6">Transparencia</h2>
      <p className="mb-4 text-gray-700">
        Consulta nuestro reporte anual para conocer el impacto de nuestras
        acciones.
      </p>
      <a
        href="/docs/reporte-anual-2023.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600 transition"
      >
        Ver reporte anual (PDF)
      </a>
    </section>
  );
};

export default Transparency;
