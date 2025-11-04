"use client";

import React, { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

type CTAButton = {
  text: string;
  href: string;
  className?: string;
  primary?: boolean;
};

interface HeroProps {
  title: ReactNode;
  subtitle?: ReactNode;
  ctaButtons?: CTAButton[]; // opcional para evitar crashes
}

export default function Hero({ title, subtitle, ctaButtons = [] }: HeroProps) {
  // Imágenes locales en /public
  const backgroundImages = [
    "/images/hero-carousel/CanchaSanMateo.jpg",
    "/images/hero-carousel/ClasesTec.jpg",
    "/images/hero-carousel/EntregaDiploma.jpg",
    "/images/hero-carousel/EntregaMochilas.jpg",
    "/images/hero-carousel/EntregaMochilas2.jpg",
    "/images/hero-carousel/Reforestacion.jpg",
  ];

  // Puntos focales por breakpoint (x%, y%)
  const focalPoints = {
    default: [
      { x: "50%", y: "50%" },
      { x: "50%", y: "50%" },
      { x: "72%", y: "35%" },
      { x: "50%", y: "50%" },
      { x: "62%", y: "34%" },
      { x: "50%", y: "50%" },
    ],
    md: [
      { x: "50%", y: "50%" },
      { x: "50%", y: "50%" },
      { x: "72%", y: "40%" },
      { x: "50%", y: "50%" },
      { x: "62%", y: "40%" },
      { x: "50%", y: "50%" },
    ],
    lg: [
      { x: "50%", y: "50%" },
      { x: "50%", y: "50%" },
      { x: "72%", y: "42%" },
      { x: "50%", y: "50%" },
      { x: "62%", y: "20%" },
      { x: "50%", y: "50%" },
    ],
  } as const;

  // Detectar breakpoint en cliente
  const [bp, setBp] = useState<"default" | "md" | "lg">("default");
  useEffect(() => {
    const computeBp = () =>
      window.innerWidth >= 1024
        ? "lg"
        : window.innerWidth >= 768
        ? "md"
        : "default";
    setBp(computeBp());
    const onResize = () => setBp(computeBp());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Carrusel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setCurrentImageIndex((p) => (p + 1) % backgroundImages.length),
      5000
    );
    return () => clearInterval(id);
  }, [backgroundImages.length]);

  return (
    <div
      className="
        relative bg-[#5D84C4]
        min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh]
        py-12 md:py-20 overflow-hidden
        pb-[calc(96px+env(safe-area-inset-bottom,0px))] md:pb-0
      "
    >
      {/* Fondo con carrusel */}
      <div className="absolute inset-0">
        {backgroundImages.map((imageUrl, index) => {
          const fp = focalPoints[bp][index] ??
            focalPoints.default[index] ?? { x: "50%", y: "50%" };
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={imageUrl}
                alt={`Imagen de fondo ${index + 1}`}
                fill
                className="object-cover"
                style={{ objectPosition: `${fp.x} ${fp.y}` }}
                sizes="100vw"
                priority={index === 0}
              />
            </div>
          );
        })}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-40 -top-40 w-80 h-80 bg-[#B3A369] opacity-10 rounded-full" />
        <div className="absolute -left-20 bottom-10 w-60 h-60 bg-white opacity-5 rounded-full" />
      </div>

      {/* Contenido y CTA de escritorio (posición original) */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-left">
          <h1 className="text-[clamp(28px,8vw,40px)] md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            {title}
          </h1>

          {subtitle && (
            <p className="text-2xl md:text-3xl font-semibold leading-relaxed mb-10 text-gray-100 drop-shadow-md">
              {subtitle}
            </p>
          )}

          {/* CTAs versión escritorio (md+) */}
          {ctaButtons.length > 0 && (
            <div className="hidden md:flex flex-row gap-4 items-center">
              {ctaButtons.map((button, index) => {
                const base =
                  "inline-block py-3 px-6 rounded-md font-semibold transition-colors text-center shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white";
                const fallback = button.primary
                  ? "bg-[#CDA52A] hover:bg-[#B3A369] text-white"
                  : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300";
                const classes = `${base} ${button.className ?? fallback}`;
                return (
                  <Link key={index} href={button.href} className={classes}>
                    {button.text}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* CTAs versión móvil: fijos al borde inferior */}
      {ctaButtons.length > 0 && (
        <div className="md:hidden pointer-events-none absolute inset-x-0 bottom-6 z-10">
          <div className="container mx-auto px-4">
            <div className="pointer-events-auto mx-auto w-full flex flex-col items-stretch justify-center gap-3">
              {ctaButtons.map((button, index) => {
                const base =
                  "inline-block py-3 px-6 rounded-md font-semibold transition-colors text-center shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white max-[380px]:py-2.5 max-[380px]:text-sm";
                const fallback = button.primary
                  ? "bg-[#CDA52A] hover:bg-[#B3A369] text-white"
                  : "bg-white/90 backdrop-blur hover:bg-white text-gray-900 border border-white/60";
                const classes = `${base} ${button.className ?? fallback}`;
                return (
                  <Link key={index} href={button.href} className={classes}>
                    {button.text}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
