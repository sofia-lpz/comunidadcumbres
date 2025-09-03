import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero({ title, subtitle, ctaButtons }) {
  // Imágenes locales en la carpeta public
  const backgroundImages = [
    "/images/hero-carousel/ProyectoCanchaBasket.jpg",
    "/images/hero-carousel/ProyectoReforestacion.jpg",
    "/images/hero-carousel/ProyectoUtilesEscolares.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="relative bg-[#5D84C4] py-12 md:py-20 overflow-hidden">
      {/* Background image carousel */}
      <div className="absolute inset-0">
        {backgroundImages.map((imageUrl, index) => (
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
              sizes="100vw"
              priority={index === 0}
            />
          </div>
        ))}
        {/* Overlay sutil para mantener legibilidad del texto */}
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      {/* Background design elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 w-80 h-80 bg-[#B3A369] opacity-10 rounded-full"></div>
        <div className="absolute -left-20 bottom-10 w-60 h-60 bg-white opacity-5 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            {title}
          </h1>

          {/* Subtítulo con mayor peso y tamaño */}
          <p className="text-2xl md:text-3xl font-semibold leading-relaxed mb-10 text-gray-100 drop-shadow-md">
            {subtitle}
          </p>

          {/* Contenedor de botones mejorado para móvil */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {ctaButtons.map((button, index) => (
              <Link
                key={index}
                href={button.href}
                className={`inline-block py-3 px-6 rounded-md font-medium transition-colors text-center min-w-fit shadow-lg ${
                  button.primary
                    ? "bg-[#CDA52A] hover:bg-[#B3A369] text-white"
                    : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300"
                }`}
              >
                {button.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
