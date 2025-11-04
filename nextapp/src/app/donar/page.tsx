export default function DonarPage() {
  return (
    <main className="px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Apoya nuestra causa
      </h1>

      <p className="text-gray-700 mb-4">
        Tu contribución ayuda a financiar programas de bienestar, educación y
        salud para empleados del condominio, personal de apoyo en hogares y
        habitantes de San Mateo Tlaltenango.
      </p>

      <p className="text-gray-700 mb-8">
        Cada donativo marca una diferencia real. Agradecemos profundamente tu
        generosidad.
      </p>

      {/* Opción de donar vía Moneypool */}
      <div className="text-center mb-12">
        <a
          href="https://www.moneypool.mx/p/Z0Rp5HA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-yellow-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-yellow-600 transition"
        >
          Donar ahora con Moneypool
        </a>
      </div>

      {/* Opción de transferencia bancaria */}
      <section className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#5D84C4]">
          Donación por transferencia bancaria
        </h2>
        <p className="text-gray-700 mb-4 text-center">
          Si prefieres donar mediante una transferencia, utiliza los siguientes
          datos bancarios:
        </p>
        <div className="text-gray-800 space-y-2 text-center">
          <p>
            <strong>Patronato de Ayuda Cumbres de Santa Fe, A.C.</strong>
          </p>
          <p>
            <strong>Banco:</strong> BBVA
          </p>
          <p>
            <strong>CLABE:</strong> 012180001215739934
          </p>
        </div>
      </section>

      {/* Información para facturación */}
      <section className="text-gray-700 text-center">
        <h3 className="text-xl font-semibold mb-2">¿Necesitas factura?</h3>
        <p className="mb-2">
          Envíanos tu constancia de situación fiscal y comprobante de donación
          al correo:
        </p>
        <p className="font-medium text-[#5D84C4]">
          contacto@comunidadcumbres.org
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Te enviaremos tu factura electrónica lo antes posible. Gracias por tu
          apoyo y confianza.
        </p>
      </section>
    </main>
  );
}
