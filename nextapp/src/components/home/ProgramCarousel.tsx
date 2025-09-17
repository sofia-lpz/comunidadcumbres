"use client";
import React from "react";
import Image from "next/image";
import { Slide } from "@/types/home";
import useResettableAuto from "@/hooks/useResettableAuto";

type Props = {
  slides: Slide[];
  onOpen: (idx: number) => void;
};

export default function ProgramCarousel({ slides, onOpen }: Props) {
  const [current, setCurrent] = React.useState(0);

  const next = React.useCallback(
    () => setCurrent((p) => (p + 1) % slides.length),
    [slides.length]
  );
  const prev = React.useCallback(
    () => setCurrent((p) => (p - 1 + slides.length) % slides.length),
    [slides.length]
  );

  const { schedule, clear, bindHover } = useResettableAuto(next, 6000, {
    deps: [current, slides.length],
    enabled: true,
  });

  const goTo = (i: number) => {
    setCurrent(i);
    schedule();
  };

  return (
    <div
      className="relative max-w-7xl mx-auto overflow-hidden rounded-2xl"
      {...bindHover}
    >
      {/* Track */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${current * (100 / slides.length)}%)`,
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
                      onClick={() => onOpen(idx)}
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
                    priority={idx === current}
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
        onClick={() => {
          prev();
          schedule();
        }}
        aria-label="Slide anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur px-3 py-2 rounded-full border border-white/30 shadow"
      >
        ‹
      </button>
      <button
        onClick={() => {
          next();
          schedule();
        }}
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
            onClick={() => goTo(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
