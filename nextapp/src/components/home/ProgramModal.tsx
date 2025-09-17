"use client";
import React from "react";
import Image from "next/image";
import { Slide } from "@/types/home";
import useResettableAuto from "@/hooks/useResettableAuto";

type Props = {
  isOpen: boolean;
  slide: Slide | null;
  onClose: () => void;
};

export default function ProgramModal({ isOpen, slide, onClose }: Props) {
  const gallery = slide?.gallery ?? [];
  const [photoIdx, setPhotoIdx] = React.useState(0);

  React.useEffect(() => {
    if (isOpen) setPhotoIdx(0);
  }, [isOpen]);

  const enabled = isOpen && gallery.length > 1;
  const nextPhoto = React.useCallback(() => {
    if (gallery.length > 1) {
      setPhotoIdx((p) => (p + 1) % gallery.length);
    }
  }, [gallery.length]);

  const { schedule, bindHover } = useResettableAuto(nextPhoto, 5000, {
    deps: [photoIdx, gallery.length, isOpen],
    enabled,
  });

  // teclado
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (!gallery.length) return;
      if (e.key === "ArrowRight") {
        setPhotoIdx((p) => (p + 1) % gallery.length);
        schedule();
      }
      if (e.key === "ArrowLeft") {
        setPhotoIdx((p) => (p - 1 + gallery.length) % gallery.length);
        schedule();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gallery.length, isOpen, onClose, schedule]);

  if (!isOpen || !slide) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
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
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          ✕
        </button>

        {/* Título + descripción */}
        <h3 className="text-2xl md:text-3xl font-bold text-[#2B3B66] mb-2">
          {slide.title}
        </h3>
        <p className="text-gray-700 mb-4 md:mb-6">{slide.longText}</p>

        {/* Carrusel de fotos */}
        <div
          className="relative w-full overflow-hidden rounded-xl"
          {...bindHover}
        >
          <div className="relative w-full aspect-[4/3] bg-gray-100">
            <Image
              key={gallery[photoIdx] || "img"}
              src={gallery[photoIdx] || "/images/placeholder.jpg"}
              alt={`${slide.title} - foto ${photoIdx + 1}`}
              fill
              className="object-cover"
              sizes="(min-width:1024px) 800px, 100vw"
              priority
            />
          </div>

          {/* Flechas */}
          {gallery.length > 1 && (
            <>
              <button
                onClick={() => {
                  setPhotoIdx((p) => (p - 1 + gallery.length) % gallery.length);
                  schedule();
                }}
                aria-label="Foto anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-10 h-10 shadow border border-gray-200"
              >
                ‹
              </button>
              <button
                onClick={() => {
                  setPhotoIdx((p) => (p + 1) % gallery.length);
                  schedule();
                }}
                aria-label="Siguiente foto"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-10 h-10 shadow border border-gray-200"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Dots + Thumbs */}
        {gallery.length > 1 && (
          <>
            <div className="mt-3 flex justify-center gap-2">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPhotoIdx(i);
                    schedule();
                  }}
                  aria-label={`Ir a foto ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === photoIdx ? "w-6 bg-gray-800" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 gap-2">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPhotoIdx(i);
                    schedule();
                  }}
                  className={`relative w-full aspect-[4/3] overflow-hidden rounded-md border ${
                    i === photoIdx ? "border-[#2B3B66]" : "border-transparent"
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
  );
}
