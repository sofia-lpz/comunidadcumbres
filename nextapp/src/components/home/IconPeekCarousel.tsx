"use client";
import React from "react";
import Image from "next/image";
import useResettableAuto from "@/hooks/useResettableAuto";
import { IconBlock } from "@/types/home";

type Props = { items: IconBlock[] };

export default function IconPeekCarousel({ items }: Props) {
  // clones
  const itemsPeek = React.useMemo(() => {
    const first = items[0];
    const last = items[items.length - 1];
    return [last, ...items, first];
  }, [items]);

  const [index, setIndex] = React.useState(1);
  const [withTransition, setWithTransition] = React.useState(true);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [cardW, setCardW] = React.useState(0);
  const GAP_PX = 24;

  React.useEffect(() => {
    const compute = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const ratio = w >= 1024 ? 0.4 : w >= 768 ? 0.55 : 0.85;
      setCardW(w * ratio);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const next = React.useCallback(() => setIndex((i) => i + 1), []);
  const prev = React.useCallback(() => setIndex((i) => i - 1), []);

  const { schedule, bindHover } = useResettableAuto(next, 4500, {
    deps: [index],
    enabled: true,
  });

  const containerW = containerRef.current?.clientWidth ?? 0;
  const centerOffset = (containerW - cardW) / 2;
  const translateX = -index * (cardW + GAP_PX) + centerOffset;

  const handleTransitionEnd = () => {
    if (index === itemsPeek.length - 1) {
      setWithTransition(false);
      setIndex(1);
      requestAnimationFrame(() => setWithTransition(true));
    }
    if (index === 0) {
      setWithTransition(false);
      setIndex(itemsPeek.length - 2);
      requestAnimationFrame(() => setWithTransition(true));
    }
  };

  const goReal = (realIdx: number) => {
    setIndex(realIdx + 1);
    schedule();
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden" {...bindHover}>
      {/* Track */}
      <div
        className={`flex items-stretch gap-6 ${
          withTransition ? "transition-transform duration-500 ease-out" : ""
        }`}
        style={{ transform: `translateX(${translateX}px)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {itemsPeek.map((b, i) => {
          const isActive = i === index && i !== 0 && i !== itemsPeek.length - 1;
          return (
            <div
              key={`${b.key}-${i}`}
              className={`flex-shrink-0 bg-white/90 border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col items-center text-center transition-all duration-300 ${
                isActive ? "scale-100 opacity-100" : "scale-95 opacity-80"
              }`}
              style={{ width: cardW || undefined }}
            >
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
                {b.title}
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

              <p className="text-gray-700 leading-relaxed">{b.text}</p>
            </div>
          );
        })}
      </div>

      {/* Flechas */}
      <button
        onClick={() => {
          prev();
          schedule();
        }}
        aria-label="Anterior"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 w-9 h-9 rounded-full shadow transition"
      >
        ‹
      </button>
      <button
        onClick={() => {
          next();
          schedule();
        }}
        aria-label="Siguiente"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 w-9 h-9 rounded-full shadow transition"
      >
        ›
      </button>

      {/* Indicadores */}
      <div className="mt-6 flex justify-center gap-2">
        {items.map((_, realIdx) => {
          const activeReal = index === realIdx + 1;
          return (
            <button
              key={realIdx}
              onClick={() => goReal(realIdx)}
              aria-label={`Ir a ${realIdx + 1}`}
              className={`h-2 rounded-full transition-all ${
                activeReal ? "w-6 bg-gray-800" : "w-2 bg-gray-300"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
