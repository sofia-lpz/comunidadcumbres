"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ImpactCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
  overlayPosition: "left" | "right" | "bottom-left" | "bottom-right";
}

const impactCards: ImpactCard[] = [
  {
    id: "1",
    title: "Somos eficientes.",
    subtitle:
      "Tu donación tiene más impacto cuando la das al Patronato Cumbres",
    description:
      "90% del dinero que el Patronato Cumbres gasta va hacia nuestro trabajo que salva vidas y transforma comunidades.",
    image: "/images/hero-carousel/ProyectoUtilesEscolares.jpg",
    href: "/como-aportar",
    overlayPosition: "left",
  },
  {
    id: "2",
    title: "Llegamos lejos.",
    subtitle:
      "Somos una de las organizaciones comunitarias más importantes de la región",
    description:
      "Trabajamos en múltiples comunidades, llevando esperanza y desarrollo a familias que más lo necesitan.",
    image: "/images/hero-carousel/ProyectoReforestacion.jpg",
    href: "/acerca-de-nosotros",
    overlayPosition: "right",
  },
  {
    id: "3",
    title: "Construimos futuro.",
    subtitle: "Cada proyecto es un paso hacia el desarrollo comunitario",
    description:
      "Desde infraestructura hasta educación, cada iniciativa está diseñada para crear un impacto duradero en la comunidad.",
    image: "/images/hero-carousel/ProyectoCanchaBasket.jpg",
    href: "/programas",
    overlayPosition: "bottom-left",
  },
  {
    id: "4",
    title: "Transformamos vidas.",
    subtitle: "Juntos, cada día, cambiamos el futuro de nuestra comunidad",
    description:
      "A través de nuestros programas integrales, brindamos oportunidades reales de crecimiento y bienestar a familias enteras.",
    image: "/images/hero-carousel/ProyectoUtilesEscolares.jpg",
    href: "/voluntariado",
    overlayPosition: "bottom-right",
  },
];

export default function ImpactCards() {
  const getOverlayClasses = (position: string) => {
    const baseClasses = "absolute z-10 text-white p-6 md:p-8 lg:p-12";

    switch (position) {
      case "left":
        return `${baseClasses} left-0 top-0 bottom-0 w-full lg:w-3/5 flex flex-col justify-center bg-gradient-to-r from-black/85 via-black/60 to-transparent`;
      case "right":
        return `${baseClasses} right-0 top-0 bottom-0 w-full lg:w-3/5 flex flex-col justify-center bg-gradient-to-l from-black/85 via-black/60 to-transparent text-right lg:items-end`;
      case "bottom-left":
        return `${baseClasses} left-0 bottom-0 right-0 lg:right-1/3 bg-gradient-to-t from-black/90 via-black/70 to-transparent`;
      case "bottom-right":
        return `${baseClasses} right-0 bottom-0 left-0 lg:left-1/3 bg-gradient-to-t from-black/90 via-black/70 to-transparent text-right lg:text-right`;
      default:
        return `${baseClasses} left-0 bottom-0 right-0 bg-gradient-to-t from-black/80 to-transparent`;
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Cards Grid - Simplificadas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {impactCards.map((card, index) => (
            <Link
              key={card.id}
              href={card.href}
              className={`group relative block overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] ${
                index < 2 ? "h-96 lg:h-[520px]" : "h-80 lg:h-[420px]"
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                />
              </div>

              {/* Overlay with Content */}
              <div className={getOverlayClasses(card.overlayPosition)}>
                <div
                  className={
                    card.overlayPosition === "right" ? "lg:text-right" : ""
                  }
                >
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-base md:text-lg lg:text-xl font-semibold mb-3 lg:mb-4 opacity-95 leading-snug">
                    {card.subtitle}
                  </p>
                  <p className="text-sm md:text-base opacity-90 leading-relaxed max-w-md">
                    {card.description}
                  </p>

                  {/* Hover indicator */}
                  <div
                    className={`mt-4 lg:mt-6 inline-flex items-center text-white font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 ${
                      card.overlayPosition === "right"
                        ? "lg:flex-row-reverse"
                        : ""
                    }`}
                  >
                    <span
                      className={
                        card.overlayPosition === "right" ? "ml-2" : "mr-2"
                      }
                    >
                      Conoce más
                    </span>
                    <svg
                      className={`w-5 h-5 transform group-hover:${
                        card.overlayPosition === "right"
                          ? "-translate-x-1"
                          : "translate-x-1"
                      } transition-transform`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={
                          card.overlayPosition === "right"
                            ? "M7 16l-4-4m0 0l4-4m-4 4h18"
                            : "M17 8l4 4m0 0l-4 4m4-4H3"
                        }
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
