const AboutText = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Sobre el Patronato
      </h2>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">Historia y propósito</h3>
        <p className="text-gray-700">
          El Patronato de Ayuda Cumbres de Santa Fe A.C. es una iniciativa
          social fondeada por vecinos del condominio, cuyo objetivo principal es
          apoyar a los empleados del condominio, colaboradores del hogar y
          habitantes del ejido de San Mateo Tlaltenango mediante programas de
          bienestar, educación y salud.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">Misión</h3>
        <p className="text-gray-700">
          Facilitar el desarrollo integral de los beneficiarios mediante
          proyectos de apoyo educativo, de salud y comunitarios, conectando los
          recursos y buena voluntad de los aportantes con las necesidades reales
          de la comunidad.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-2">Visión</h3>
        <p className="text-gray-700">
          Ser un referente de colaboración vecinal que fortalezca el tejido
          social a través de programas sostenibles, inclusivos y de impacto
          directo en la calidad de vida de los beneficiarios.
        </p>
      </div>
    </section>
  );
};

export default AboutText;
