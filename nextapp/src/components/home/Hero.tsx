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
  ctaButtons: CTAButton[];
}

export default function Hero({ title, subtitle, ctaButtons }: HeroProps) {
  // Imágenes locales en /public
  const backgroundImages = [
    "/images/hero-carousel/CanchaSanMateo.jpg",
    "/images/hero-carousel/ClasesTec.jpg",
    "/images/hero-carousel/EntregaDiploma.jpg", // <- problemática 1
    "/images/hero-carousel/EntregaMochilas.jpg",
    "/images/hero-carousel/EntregaMochilas2.jpg", // <- problemática 2
    "/images/hero-carousel/Reforestacion.jpg",
  ];

  /**
   * Puntos focales por breakpoint (x%, y%)
   * default: <768px, md: ≥768px, lg: ≥1024px
   * Solo toqué EntregaDiploma (idx 2) y EntregaMochilas2 (idx 4).
   */
  const focalPoints = {
    default: [
      { x: "50%", y: "50%" }, // CanchaSanMateo
      { x: "50%", y: "50%" }, // ClasesTec
      { x: "72%", y: "35%" }, // EntregaDiploma (móvil: sube para no cortar cabeza)
      { x: "50%", y: "50%" }, // EntregaMochilas
      { x: "62%", y: "34%" }, // EntregaMochilas2 (móvil: un poco arriba)
      { x: "50%", y: "50%" }, // Reforestacion
    ],
    md: [
      { x: "50%", y: "50%" },
      { x: "50%", y: "50%" },
      { x: "72%", y: "40%" }, // tablet
      { x: "50%", y: "50%" },
      { x: "62%", y: "40%" }, // tablet
      { x: "50%", y: "50%" },
    ],
    lg: [
      { x: "50%", y: "50%" },
      { x: "50%", y: "50%" },
      { x: "72%", y: "42%" }, // desktop ancho
      { x: "50%", y: "50%" },
      { x: "62%", y: "20%" }, // desktop ancho
      { x: "50%", y: "50%" },
    ],
  } as const;

  // Detectar breakpoint en cliente
  const [bp, setBp] = useState<"default" | "md" | "lg">("default");
  useEffect(() => {
    const computeBp = () => {
      const w = window.innerWidth;
      if (w >= 1024) return "lg";
      if (w >= 768) return "md";
      return "default";
    };
    setBp(computeBp());
    const onResize = () => setBp(computeBp());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Carrusel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length),
      5000
    );
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="relative bg-[#5D84C4] min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] py-12 md:py-20 overflow-hidden">
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
        {/* Overlay para legibilidad */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-40 -top-40 w-80 h-80 bg-[#B3A369] opacity-10 rounded-full"></div>
        <div className="absolute -left-20 bottom-10 w-60 h-60 bg-white opacity-5 rounded-full"></div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            {title}
          </h1>

          {subtitle && (
            <p className="text-2xl md:text-3xl font-semibold leading-relaxed mb-10 text-gray-100 drop-shadow-md">
              {subtitle}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {ctaButtons.map((button, index) => {
              const base =
                "inline-block py-3 px-6 rounded-md font-medium transition-colors text-center min-w-fit shadow-lg";

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
        </div>
      </div>
    </div>
  );
}
