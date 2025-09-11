"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import Hero from "@/components/home/Hero";

export default function Home() {
  /* ===================== Carrusel de Programas (6 bloques) ===================== */
  const slides = [
    {
      title: "Apadrina un niño: Programa de entrega de útiles escolares",
      description:
        "Apoyamos la educación de los hijos de nuestros colaboradores entregando útiles escolares para que inicien el ciclo con las herramientas necesarias para su aprendizaje y desarrollo.",
      image: "/images/carrusel-programas/mochilas/main1.JPG",
      longText:
        "En el Patronato de Cumbres creemos que la educación abre puertas y construye futuro. Por eso, nos unimos para entregar útiles escolares a los hijos de nuestros colaboradores. Con este apoyo, buscamos que cada niño inicie el ciclo con ilusión, confianza y las herramientas necesarias para aprender. Juntos, sembramos oportunidades que transforman vidas.",
      gallery: [
        "/images/carrusel-programas/mochilas/2.jpeg",
        "/images/carrusel-programas/mochilas/3.jpg",
      ],
    },
    {
      title: "Programa de Educación para empleados",
      description:
        "En colaboración con el Tecnológico de Monterrey, ofrecemos clases y talleres a nuestros colaboradores y sus familias para fortalecer sus habilidades y mejorar su calidad de vida.",
      image: "/images/carrusel-programas/educacion/main1.jpg",
      longText:
        "La educación es la base para crecer y abrir nuevas oportunidades. A través de una valiosa colaboración con el Tecnológico de Monterrey impulsamos un programa de clases y talleres para todos las personas que laboran en Cumbres y sus familias. Con el apoyo de alumnos de servicio social, brindamos herramientas prácticas que fortalecen habilidades y mejoran la calidad de vida. Juntos, construimos una comunidad que aprende y progresa.",
      gallery: [
        "/images/programas/educacion/1.jpg",
        "/images/programas/educacion/2.jpg",
        "/images/programas/educacion/3.jpg",
      ],
    },
    {
      title: "Programa de Excelencia Académica",
      description:
        "Celebramos y reconocemos el esfuerzo de los hijos de nuestros colaboradores con los mejores promedios, motivándolos a construir un futuro lleno de oportunidades.",
      image: "/images/carrusel-programas/excelencia/main1.jpg",
      longText:
        "Reconocer el esfuerzo abre camino a nuevos sueños. Celebramos a los hijos de nuestros colaboradores que alcanzan los mejores promedios. Este programa de excelencia académica honra su dedicación y motiva a seguir construyendo un futuro lleno de oportunidades. Juntos, aplaudimos su talento y compromiso.",
      gallery: [
        "/images/carrusel-programas/excelencia/2.jpg",
        "/images/carrusel-programas/excelencia/3.jpg",
      ],
    },
    {
      title: "Semana de la salud",
      description:
        "Cuidamos el bienestar de nuestros colaboradores ofreciendo estudios de laboratorio y exámenes de la vista gratuitos para prevenir y atender la salud a tiempo.",
      image: "/images/carrusel-programas/salud/main1.jpg",
      longText:
        "El cuidado de la salud es la base del bienestar. Ofrecemos a nuestros colaboradores estudios de laboratorio y exámenes de la vista gratuitos. Con este programa buscamos prevenir, detectar y atender a tiempo, brindando tranquilidad y mejor calidad de vida. Juntos, cuidamos lo más valioso: la salud de nuestra comunidad.",
      gallery: [
        "/images/carrusel-programas/salud/2.jpg",
        "/images/carrusel-programas/salud/3.jpg",
      ],
    },
    {
      title: "Apoyo a la comunidad de San Mateo",
      description:
        "Fortalecemos a la comunidad de San Mateo mediante la remodelación de un kínder y la rehabilitación de espacios deportivos, creando mejores oportunidades para niños y jóvenes.",
      image: "/images/carrusel-programas/san-mateo/main1.jpg",
      longText:
        "Creemos en el poder de la comunidad para transformar vidas. Desde el Patronato de Cumbres hemos remodelado y equipado un kínder vecinal y rehabilitado la cancha de basquetbol, brindando a San Mateo educación en condiciones dignas y espacios recreativos para sus jóvenes. Juntos, fortalecemos la comunidad, y abrimos oportunidades para un mejor futuro.",
      gallery: [
        "/images/carrusel-programas/san-mateo/2.jpg",
        "/images/carrusel-programas/san-mateo/3.jpeg",
      ],
    },
    {
      title: "Programa de Reforestación",
      description:
        "Realizamos jornadas de reforestación para embellecer nuestras áreas verdes, fortalecer los lazos vecinales y fomentar la convivencia en la comunidad.",
      image: "/images/carrusel-programas/reforestacion/main1.jpg",
      longText:
        "Cuidar nuestro entorno también significa cuidar nuestra comunidad. Impulsamos jornadas de reforestación en las áreas verdes del condominio. Este programa no solo embellece nuestro espacio, también fortalece los lazos entre vecinos y fomenta la convivencia. Juntos, cultivamos naturaleza y comunidad.",
      gallery: [
        "/images/carrusel-programas/reforestacion/2.jpg",
        "/images/carrusel-programas/reforestacion/3.jpg",
      ],
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

  /* ===== Modal de Programa: estado + carrusel de fotos ===== */
  const [openProgramIdx, setOpenProgramIdx] = React.useState<number | null>(
    null
  );
  const [photoIdx, setPhotoIdx] = React.useState(0);

  const openProgram = (idx: number) => {
    setOpenProgramIdx(idx);
    setPhotoIdx(0);
  };
  const closeProgram = () => setOpenProgramIdx(null);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProgram();
      if (openProgramIdx !== null && slides[openProgramIdx]?.gallery?.length) {
        const total = slides[openProgramIdx].gallery!.length;
        if (e.key === "ArrowRight") setPhotoIdx((p) => (p + 1) % total);
        if (e.key === "ArrowLeft") setPhotoIdx((p) => (p - 1 + total) % total);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openProgramIdx, slides]);

  /* ===================== Íconos (infinite peek) ===================== */
  const iconBlocks = [
    {
      key: "mano",
      title: "Patronato de Ayuda Cumbres de Santa Fe",
      icon: "/images/icons/mano.png",
      alt: "Solidaridad",
      text:
        "El Patronato de Ayuda Cumbres de Santa Fe A.C. es una iniciativa social impulsada y financiada por vecinos del condominio. Su objetivo principal es brindar apoyo a los empleados del condominio, colaboradores del hogar y habitantes del ejido de San Mateo Tlaltenango a través de programas enfocados en bienestar, educación y salud.",
    },
    {
      key: "mision",
      title: "Misión",
      icon: "/images/icons/mision.png",
      alt: "Misión",
      text:
        "Facilitar el desarrollo integral de nuestros beneficiarios mediante programas de educación, salud y apoyo comunitario, vinculando los recursos y la solidaridad de los aportantes con las necesidades reales de la comunidad.",
    },
    {
      key: "vision",
      title: "Visión",
      icon: "/images/icons/vision.png",
      alt: "Visión",
      text:
        "Ser un referente de colaboración vecinal que fortalezca el tejido social mediante programas sostenibles, inclusivos y con impacto real en la calidad de vida de los beneficiarios.",
    },
    {
      key: "apoyo",
      title: "Apoyo",
      icon: "/images/icons/apoyo-colaboradores.png",
      alt: "Colaboración",
      text:
        "Gracias a nuestros vecinos solidarios, hoy transformamos vidas. Súmate tú también y hagamos juntos una comunidad más fuerte y unida.",
    },
  ];

  const iconItems = React.useMemo(() => {
    const first = iconBlocks[0];
    const last = iconBlocks[iconBlocks.length - 1];
    return [last, ...iconBlocks, first];
  }, [iconBlocks]);

  const [iconIndex, setIconIndex] = React.useState(1);
  const [withTransition, setWithTransition] = React.useState(true);

  const iconContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [cardW, setCardW] = React.useState(0);
  const GAP_PX = 24;

  React.useEffect(() => {
    const compute = () => {
      if (!iconContainerRef.current) return;
      const w = iconContainerRef.current.clientWidth;
      const ratio = w >= 1024 ? 0.4 : w >= 768 ? 0.55 : 0.85;
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

  /* ===================== Beneficiarios (¿A quién llega nuestra ayuda?) ===================== */
  const beneficiariesBlocks = [
    {
      key: "b1",
      src: "/images/beneficiarios/benef1.png",
      alt: "Beneficiario 1",
    },
    {
      key: "b2",
      src: "/images/beneficiarios/benef2.png",
      alt: "Beneficiario 2",
    },
    {
      key: "b3",
      src: "/images/beneficiarios/benef3.png",
      alt: "Beneficiario 3",
    },
    {
      key: "b4",
      src: "/images/beneficiarios/benef4.png",
      alt: "Beneficiario 4",
    },
  ];

  const beneficiariesItems = React.useMemo(() => {
    const first = beneficiariesBlocks[0];
    const last = beneficiariesBlocks[beneficiariesBlocks.length - 1];
    return [last, ...beneficiariesBlocks, first];
  }, [beneficiariesBlocks]);

  const [beneIndex, setBeneIndex] = React.useState(1);
  const [beneWithTransition, setBeneWithTransition] = React.useState(true);

  const beneContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [beneCardW, setBeneCardW] = React.useState(0);
  const BENE_GAP = 24;

  React.useEffect(() => {
    const compute = () => {
      if (!beneContainerRef.current) return;
      const w = beneContainerRef.current.clientWidth;
      const ratio = w >= 1024 ? 0.46 : w >= 768 ? 0.62 : 0.88;
      setBeneCardW(w * ratio);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const goBene = (i: number) => setBeneIndex(i);
  const nextBene = () => goBene(beneIndex + 1);
  const prevBene = () => goBene(beneIndex - 1);

  const beneContainerW = beneContainerRef.current?.clientWidth ?? 0;
  const beneCenterOffset = (beneContainerW - beneCardW) / 2;
  const beneTranslateX = -beneIndex * (beneCardW + BENE_GAP) + beneCenterOffset;

  const handleBeneTransitionEnd = () => {
    if (beneIndex === beneficiariesItems.length - 1) {
      setBeneWithTransition(false);
      setBeneIndex(1);
      requestAnimationFrame(() => setBeneWithTransition(true));
    }
    if (beneIndex === 0) {
      setBeneWithTransition(false);
      setBeneIndex(beneficiariesItems.length - 2);
      requestAnimationFrame(() => setBeneWithTransition(true));
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

      {/* ===================== ¿A quién llega nuestra ayuda? ===================== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div ref={beneContainerRef} className="relative overflow-hidden">
            <div
              className={`flex items-stretch gap-6 ${
                beneWithTransition
                  ? "transition-transform duration-500 ease-out"
                  : ""
              }`}
              style={{ transform: `translateX(${beneTranslateX}px)` }}
              onTransitionEnd={handleBeneTransitionEnd}
            >
              {beneficiariesItems.map((b, i) => {
                const isActive =
                  i === beneIndex &&
                  i !== 0 &&
                  i !== beneficiariesItems.length - 1;
                return (
                  <div
                    key={`${b.key}-${i}`}
                    className={`flex-shrink-0 transition-all duration-300 ${
                      isActive ? "scale-100 opacity-100" : "scale-95 opacity-80"
                    }`}
                    style={{ width: beneCardW || undefined }}
                  >
                    <div className="relative w-full max-h-[400px] flex justify-center items-center">
                      <Image
                        src={b.src}
                        alt={b.alt}
                        width={600}
                        height={800}
                        className="object-contain w-full h-auto max-h-[400px]"
                        priority={i === 1}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Flechas */}
            <button
              onClick={prevBene}
              aria-label="Anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 w-9 h-9 rounded-full shadow transition"
            >
              ‹
            </button>
            <button
              onClick={nextBene}
              aria-label="Siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 w-9 h-9 rounded-full shadow transition"
            >
              ›
            </button>

            {/* Indicadores */}
            <div className="mt-6 flex justify-center gap-2">
              {beneficiariesBlocks.map((_, realIdx) => {
                const activeReal = beneIndex === realIdx + 1;
                return (
                  <button
                    key={realIdx}
                    onClick={() => goBene(realIdx + 1)}
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

                        {/* Botón Más información */}
                        <div className="mt-8">
                          <button
                            onClick={() => openProgram(idx)}
                            className="inline-flex items-center gap-2 bg-white text-[#2B3B66] hover:bg-gray-100 px-5 py-3 rounded-md font-semibold transition"
                          >
                            Más información
                          </button>
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

      {/* ========= Modal de Programa (solo carrusel + info) ========= */}
      {openProgramIdx !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          onClick={closeProgram}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Contenido */}
          <div
            className="relative z-[71] bg-white rounded-2xl shadow-2xl w-[95vw] max-w-5xl max-h-[85vh] overflow-auto p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cerrar */}
            <button
              onClick={closeProgram}
              aria-label="Cerrar"
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              ✕
            </button>

            {/* Título + descripción */}
            <h3 className="text-2xl md:text-3xl font-bold text-[#2B3B66] mb-2">
              {slides[openProgramIdx].title}
            </h3>
            <p className="text-gray-700 mb-4 md:mb-6">
              {slides[openProgramIdx].longText}
            </p>

            {/* Carrusel de fotos */}
            <div className="relative w-full overflow-hidden rounded-xl">
              <div className="relative w-full aspect-[4/3] bg-gray-100">
                <Image
                  key={slides[openProgramIdx].gallery?.[photoIdx] || "img"}
                  src={
                    slides[openProgramIdx].gallery?.[photoIdx] ||
                    "/images/placeholder.jpg"
                  }
                  alt={`${slides[openProgramIdx].title} - foto ${photoIdx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 800px, 100vw"
                  priority
                />
              </div>

              {/* Flechas */}
              {slides[openProgramIdx].gallery &&
                slides[openProgramIdx].gallery.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setPhotoIdx(
                          (p) =>
                            (p - 1 + slides[openProgramIdx].gallery!.length) %
                            slides[openProgramIdx].gallery!.length
                        )
                      }
                      aria-label="Foto anterior"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-10 h-10 shadow border border-gray-200"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() =>
                        setPhotoIdx(
                          (p) =>
                            (p + 1) % slides[openProgramIdx].gallery!.length
                        )
                      }
                      aria-label="Siguiente foto"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-10 h-10 shadow border border-gray-200"
                    >
                      ›
                    </button>
                  </>
                )}
            </div>

            {/* Dots + Thumbs */}
            {slides[openProgramIdx].gallery &&
              slides[openProgramIdx].gallery.length > 1 && (
                <>
                  <div className="mt-3 flex justify-center gap-2">
                    {slides[openProgramIdx].gallery!.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPhotoIdx(i)}
                        aria-label={`Ir a foto ${i + 1}`}
                        className={`h-2 rounded-full transition-all ${
                          i === photoIdx ? "w-6 bg-gray-800" : "w-2 bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {slides[openProgramIdx].gallery!.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setPhotoIdx(i)}
                        className={`relative w-full aspect-[4/3] overflow-hidden rounded-md border ${
                          i === photoIdx
                            ? "border-[#2B3B66]"
                            : "border-transparent"
                        }`}
                        aria-label={`Seleccionar foto ${i + 1}`}
                      >
                        <Image
                          src={src}
                          alt={`thumb ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
          </div>
        </div>
      )}

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

      {/* ===================== Íconos con infinite peek (AL FINAL) ===================== */}
      <section className="relative py-16">
        {/* Fondo con foto + VELO TRANSLÚCIDO */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/manitas.jpeg"
            alt="Fondo Patronato"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/60 pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
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
                    className={`flex-shrink-0 bg-white/90 border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col items-center text-center transition-all duration-300 ${
                      isActive ? "scale-100 opacity-100" : "scale-95 opacity-80"
                    }`}
                    style={{ width: cardW || undefined }}
                  >
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
                      {"title" in b ? (b as any).title : ""}
                    </h3>

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

                    <p className="text-gray-700 leading-relaxed">
                      {(b as any).text}
                    </p>
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

            {/* Indicadores */}
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
    </div>
  );
}
