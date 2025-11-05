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
  ctaButtons?: CTAButton[];
}

type ImgOverride = {
  position?: { default?: string; md?: string; lg?: string };
  fit?: "cover" | "contain";
  brightness?: number;
  scale?: number;
};

export default function Hero({ title, subtitle, ctaButtons = [] }: HeroProps) {
  const backgroundImages = [
    "/images/hero-carousel/imagen1.jpeg",
    "/images/hero-carousel/imagen2.jpeg",
    "/images/hero-carousel/imagen3.jpeg",
    "/images/hero-carousel/imagen4.jpg",
    "/images/hero-carousel/imagen5.jpg",
    "/images/hero-carousel/imagen6.jpg",
    "/images/hero-carousel/imagen7.jpg",
    "/images/hero-carousel/imagen8.jpg",
    "/images/hero-carousel/imagen9.jpg",
  ];

  const overridesInitial: Record<number, ImgOverride> = {
    2: { position: { default: "50% 30%", md: "50% 28%", lg: "50% 33%" } }, 
    3: { position: { default: "50% 70%", md: "50% 72%", lg: "50% 38%" } },
    4: { position: { default: "50% 30%", md: "50% 28%", lg: "50% 54%" } },
    8: { position: { default: "50% 60%", md: "50% 62%", lg: "50% 26%" } },
  };

  const focalPoints = {
    default: Array(9).fill({ x: "50%", y: "50%" }),
    md: Array(9).fill({ x: "50%", y: "50%" }),
    lg: Array(9).fill({ x: "50%", y: "50%" }),
  } as const;

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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setCurrentImageIndex((p) => (p + 1) % backgroundImages.length),
      5000
    );
    return () => clearInterval(id);
  }, [backgroundImages.length]);

  const overrides = overridesInitial;

  return (
    <div
      className="
        relative bg-[#5D84C4]
        min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh]
        py-12 md:py-20 overflow-hidden
        pb-[calc(96px+env(safe-area-inset-bottom,0px))]
        flex flex-col justify-between
      "
    >
      {/* Fondo con carrusel */}
      <div className="absolute inset-0">
        {backgroundImages.map((imageUrl, index) => {
          const fp = focalPoints[bp][index] ?? { x: "50%", y: "50%" };
          const ov = overrides[index];
          const objectPosition =
            ov?.position?.[bp] ?? ov?.position?.default ?? `${fp.x} ${fp.y}`;

          const fitClass =
            ov?.fit === "contain" ? "object-contain" : "object-cover";

          const styleExt: React.CSSProperties = {
            objectPosition,
            filter: ov?.brightness ? `brightness(${ov.brightness})` : undefined,
            transform: ov?.scale ? `scale(${ov.scale})` : undefined,
            transformOrigin: ov?.scale ? "center" : undefined,
          };

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
                className={fitClass}
                style={styleExt}
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

      {/* Contenido principal */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-left">
          <h1 className="text-[clamp(28px,8vw,40px)] md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            {title}
          </h1>

          {subtitle && (
            <p className="text-2xl md:text-3xl font-semibold leading-relaxed text-gray-100 drop-shadow-md">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* CTAs inferiores: más grandes solo en escritorio */}
      {ctaButtons.length > 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 md:bottom-10 z-10">
          <div className="container mx-auto px-4">
            <div className="pointer-events-auto mx-auto w-full max-w-5xl flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3 md:gap-6">
              {ctaButtons.map((button, index) => {
                const base =
                  "inline-block rounded-md font-semibold text-center shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white " +
                  "max-[380px]:py-2.5 max-[380px]:text-sm";
                const sizeClasses =
                  "py-3 px-6 text-base md:py-5 md:px-10 md:text-lg md:rounded-lg";
                const fallback = button.primary
                  ? "bg-[#CDA52A] hover:bg-[#B3A369] text-white"
                  : "bg-white/90 backdrop-blur hover:bg-white text-gray-900 border border-white/60";
                const classes = `${base} ${sizeClasses} ${button.className ??
                  fallback}`;
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
