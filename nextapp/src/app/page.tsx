"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import Hero from "@/components/home/Hero.jsx";

export default function Home() {
  /* ===================== Carrusel de Programas (6 bloques) ===================== */
  const slides = [
    {
      title: "Apadrina un niño: Programa de entrega de útiles escolares",
      description:
        "En el Patronato de Cumbres creemos que la educación abre puertas y construye futuro. Por eso, nos unimos para entregar útiles escolares a los hijos de nuestros colaboradores. Con este apoyo, buscamos que cada niño inicie el ciclo con ilusión, confianza y las herramientas necesarias para aprender. Juntos, sembramos oportunidades que transforman vidas.",
      statNumber: "+100",
      statLabel: "Mochilas entregadas",
      image:
        "https://contagiandovoluntad.org/img/portfolio/portfolio-MochilasYanga.png",
    },
    {
      title: "Programa de Educación para empleados",
      description:
        "La educación es la base para crecer y abrir nuevas oportunidades. A través de una valiosa colaboración con el Tecnológico de Monterrey impulsamos un programa de clases y talleres para todas las personas que laboran en Cumbres y sus familias. Con el apoyo de alumnos de servicio social, brindamos herramientas prácticas que fortalecen habilidades y mejoran la calidad de vida. Juntos, construimos una comunidad que aprende y progresa.",
      statNumber: "+40",
      statLabel: "Talleres y clases",
      image: "/images/hero-carousel/ProyectoUtilesEscolares.jpg",
    },
    {
      title: "Programa de Excelencia Académica",
      description:
        "Reconocer el esfuerzo abre camino a nuevos sueños. Celebramos a los hijos de nuestros colaboradores que alcanzan los mejores promedios. Este programa de excelencia académica honra su dedicación y motiva a seguir construyendo un futuro lleno de oportunidades. Juntos, aplaudimos su talento y compromiso.",
      statNumber: "★",
      statLabel: "Alumnos reconocidos",
      image: "/images/hero-carousel/ProyectoCanchaBasket.jpg",
    },
    {
      title: "Semana de la salud",
      description:
        "El cuidado de la salud es la base del bienestar. Ofrecemos a nuestros colaboradores estudios de laboratorio y exámenes de la vista gratuitos. Con este programa buscamos prevenir, detectar y atender a tiempo, brindando tranquilidad y mejor calidad de vida. Juntos, cuidamos lo más valioso: la salud de nuestra comunidad.",
      statNumber: "100%",
      statLabel: "Chequeos gratuitos",
      image: "/images/hero-carousel/ProyectoReforestacion.jpg",
    },
    {
      title: "Programas de Apoyo comunidad de San Mateo",
      description:
        "Creemos en el poder de la comunidad para transformar vidas. Desde el Patronato de Cumbres hemos remodelado y equipado un kínder vecinal y rehabilitado la cancha de basquetbol, brindando a San Mateo educación en condiciones dignas y espacios recreativos para sus jóvenes. Juntos, fortalecemos la comunidad y abrimos oportunidades para un mejor futuro.",
      statNumber: "+2",
      statLabel: "Espacios rehabilitados",
      image: "/images/hero-carousel/ProyectoCanchaBasket.jpg",
    },
    {
      title: "Programa de Reforestación",
      description:
        "Cuidar nuestro entorno también significa cuidar nuestra comunidad. Impulsamos jornadas de reforestación en las áreas verdes del condominio. Este programa no solo embellece nuestro espacio, también fortalece los lazos entre vecinos y fomenta la convivencia. Juntos, cultivamos naturaleza y comunidad.",
      statNumber: "↑",
      statLabel: "Árboles y áreas verdes",
      image: "/images/hero-carousel/ProyectoUtilesEscolares.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const AUTO_MS = 6000;

  const next = React.useCallback(
    () => setCurrentSlide((p) => (p + 1) % slides.length),
    [slides.length]
  );
  const prev = React.useCallback(
    () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length),
    [slides.length]
  );

  React.useEffect(() => {
    const id = setInterval(next, AUTO_MS);
    return () => clearInterval(id);
  }, [next]);

  /* ===================== Sección Íconos (carrusel infinito con peek) ===================== */
  const iconBlocks = [
    {
      key: "mano", // mano con corazón → texto general
      icon: "/images/icons/mano.png",
      alt: "Solidaridad",
      text:
        "El Patronato de Ayuda Cumbres de Santa Fe A.C. es una iniciativa social impulsada y financiada por vecinos del condominio. Su objetivo principal es brindar apoyo a los empleados del condominio, colaboradores del hogar y habitantes del ejido de San Mateo Tlaltenango a través de programas enfocados en bienestar, educación y salud.",
    },
    {
      key: "mision", // objetivo con flecha
      icon: "/images/icons/mision.png",
      alt: "Misión",
      text:
        "Facilitar el desarrollo integral de nuestros beneficiarios mediante programas de educación, salud y apoyo comunitario, vinculando los recursos y la solidaridad de los aportantes con las necesidades reales de la comunidad.",
    },
    {
      key: "vision", // ojo
      icon: "/images/icons/vision.png",
      alt: "Visión",
      text:
        "Ser un referente de colaboración vecinal que fortalezca el tejido social mediante programas sostenibles, inclusivos y con impacto real en la calidad de vida de los beneficiarios.",
    },
    {
      key: "apoyo", // manos estrechadas
      icon: "/images/icons/apoyo-colaboradores.png",
      alt: "Colaboración",
      text:
        "Gracias a nuestros vecinos solidarios, hoy transformamos vidas. Súmate tú también y hagamos juntos una comunidad más fuerte y unida.",
    },
  ];

  // Clones para loop infinito: [last, ...real, first]
  const iconItems = React.useMemo(() => {
    const first = iconBlocks[0];
    const last = iconBlocks[iconBlocks.length - 1];
    return [last, ...iconBlocks, first];
  }, [iconBlocks]);

  // Comenzar en el primer real (la mano) → índice 1
  const [iconIndex, setIconIndex] = React.useState(1);
  const [withTransition, setWithTransition] = React.useState(true);

  const iconContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [cardW, setCardW] = React.useState(0);
  const GAP_PX = 24; // gap-6

  React.useEffect(() => {
    const compute = () => {
      if (!iconContainerRef.current) return;
      const w = iconContainerRef.current.clientWidth;
      const ratio = w >= 1024 ? 0.4 : w >= 768 ? 0.55 : 0.85; // lg/md/sm
      setCardW(w * ratio);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const goIcon = (i: number) => setIconIndex(i);
  const nextIcon = () => goIcon(iconIndex + 1);
  const prevIcon = () => goIcon(iconIndex - 1);

  const containerW = iconContainerRef.current?.clientWidth ?? 0;
  const centerOffset = (containerW - cardW) / 2;
  const iconTranslateX = -iconIndex * (cardW + GAP_PX) + centerOffset;

  const handleIconTransitionEnd = () => {
    if (iconIndex === iconItems.length - 1) {
      setWithTransition(false);
      setIconIndex(1);
      requestAnimationFrame(() => setWithTransition(true));
    }
    if (iconIndex === 0) {
      setWithTransition(false);
      setIconIndex(iconItems.length - 2);
      requestAnimationFrame(() => setWithTransition(true));
    }
  };

  return (
    <div className="min-h-screen">
      {/* ===================== Hero ===================== */}
      <Hero
        title={
          <>
            Patronato de Ayuda
            <br />
            Cumbres de Santa Fe, A.C.
          </>
        }
        subtitle="Vecinos unidos, comunidades más fuertes."
        ctaButtons={[
          {
            text: "Soy vecino y quiero donar",
            href: "#como-aportar",
            className:
              "bg-[#5D84C4] hover:bg-[#4A6DA6] text-white px-6 py-3 rounded-md font-semibold transition-colors",
          },
          {
            text: "Soy empleado y quiero ser beneficiario",
            href: "/programa-educativo",
            className:
              "bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md font-semibold transition-colors",
          },
        ]}
      />

      {/* ===================== Sección Íconos (carrusel infinito con peek) ===================== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div ref={iconContainerRef} className="relative overflow-hidden">
            {/* Track */}
            <div
              className={`flex items-stretch gap-6 ${
                withTransition
                  ? "transition-transform duration-500 ease-out"
                  : ""
              }`}
              style={{ transform: `translateX(${iconTranslateX}px)` }}
              onTransitionEnd={handleIconTransitionEnd}
            >
              {iconItems.map((b, i) => {
                const isActive =
                  i === iconIndex && i !== 0 && i !== iconItems.length - 1;
                return (
                  <div
                    key={`${b.key}-${i}`}
                    className={`flex-shrink-0 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col items-center text-center transition-all duration-300 ${
                      isActive ? "scale-100 opacity-100" : "scale-95 opacity-70"
                    }`}
                    style={{ width: cardW || undefined }}
                  >
                    <div className="w-28 h-28 mb-5 relative">
                      <Image
                        src={b.icon}
                        alt={b.alt}
                        fill
                        className="object-contain"
                        sizes="112px"
                        priority={i === 1}
                      />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{b.text}</p>
                  </div>
                );
              })}
            </div>

            {/* Flechas */}
            <button
              onClick={prevIcon}
              aria-label="Anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 w-9 h-9 rounded-full shadow transition"
            >
              ‹
            </button>
            <button
              onClick={nextIcon}
              aria-label="Siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 w-9 h-9 rounded-full shadow transition"
            >
              ›
            </button>

            {/* Indicadores (solo reales) */}
            <div className="mt-6 flex justify-center gap-2">
              {iconBlocks.map((_, realIdx) => {
                const activeReal = iconIndex === realIdx + 1;
                return (
                  <button
                    key={realIdx}
                    onClick={() => goIcon(realIdx + 1)}
                    aria-label={`Ir a ${realIdx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      activeReal ? "w-6 bg-gray-800" : "w-2 bg-gray-300"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Carrusel de Programas ===================== */}
      <section className="py-20 bg-gradient-to-r from-[#5D84C4] to-[#5D84C4]">
        <div className="container mx-auto px-4">
          <div className="relative max-w-7xl mx-auto overflow-hidden rounded-2xl">
            {/* Track */}
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                width: `${slides.length * 100}%`,
                transform: `translateX(-${currentSlide *
                  (100 / slides.length)}%)`,
              }}
            >
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className="w-full"
                  style={{ width: `${100 / slides.length}%` }}
                >
                  {/* Igual altura entre texto e imagen */}
                  <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                    {/* Texto */}
                    <div className="h-full">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 h-full flex flex-col">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                          {slide.title}
                        </h2>
                        <p className="text-lg md:text-xl text-white/95 leading-relaxed">
                          {slide.description}
                        </p>

                        {/* Estadística rápida */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                          <div className="text-center bg-white/10 rounded-lg py-3">
                            <div className="text-2xl font-bold text-white">
                              {slide.statNumber}
                            </div>
                            <div className="text-white/80 text-sm">
                              {slide.statLabel}
                            </div>
                          </div>
                        </div>

                        <div className="mt-auto" />
                      </div>
                    </div>

                    {/* Imagen */}
                    <div className="relative h-full">
                      <div className="relative h-full min-h-[420px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          priority={idx === currentSlide}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
                      </div>

                      {/* Decorativos */}
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
                      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Flechas */}
            <button
              onClick={prev}
              aria-label="Slide anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur px-3 py-2 rounded-full border border-white/30 shadow"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Siguiente slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur px-3 py-2 rounded-full border border-white/30 shadow"
            >
              ›
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Ir al slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide ? "w-6 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Calendario ===================== */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Participa en nuestros próximos programas y eventos
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Consulta el calendario y encuentra oportunidades para involucrarte.
          </p>

          <div className="mb-12 aspect-video max-w-4xl mx-auto">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=350cf3636fd14dd771d2aa8ed789832bbffa42e6b6a7cb7e758e1a654677be82%40group.calendar.google.com&ctz=America%2FCancun"
              style={{ border: 0 }}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>
        </div>
      </section> */}

      {/* ===================== ¿Cómo aportar? ===================== */}
      <section
        id="como-aportar"
        className="px-6 py-12 max-w-6xl mx-auto space-y-8 scroll-mt-24"
      >
        <h2 className="text-4xl font-bold text-center mb-4">¿Cómo aportar?</h2>
        <p className="text-gray-700 text-center text-lg">
          Tú también puedes formar parte de nuestra misión. Elige la forma que
          más te convenga:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Donaciones */}
          <section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
            <h3 className="text-2xl font-semibold text-[#5D84C4] mb-2">
              Donaciones
            </h3>
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

          {/* Voluntariado */}
          <section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
            <h3 className="text-2xl font-semibold text-[#5D84C4] mb-2">
              Voluntariado
            </h3>
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
      </section>
    </div>
  );
}
