"use client";
import React from "react";
import Image from "next/image";

type Logo = { src: string; alt: string };

type Props = {
  items: Logo[];
  ariaLabel?: string;
  autoIntervalMs?: number;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(m.matches);
    on();
    m.addEventListener?.("change", on);
    return () => m.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

export default function LogosCarousel({
  items = [],
  ariaLabel = "Logos de colaboradores",
  autoIntervalMs = 3000,
}: Props) {
  const safe = Array.isArray(items) ? items : [];
  const multi = safe.length > 1;
  const doubled = React.useMemo(() => (safe.length ? [...safe, ...safe] : []), [
    safe,
  ]);

  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Layout: menos columnas y mayor altura por breakpoint
  const [visibleCount, setVisibleCount] = React.useState(3);
  const [gap, setGap] = React.useState(16);
  const [cardW, setCardW] = React.useState(220);
  const [cardH, setCardH] = React.useState(120);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const compute = () => {
      const w = el.clientWidth;

      // Menos columnas para hacer los logos grandes
      const vCount =
        w >= 1536 ? 6 : w >= 1280 ? 6 : w >= 1024 ? 5 : w >= 768 ? 4 : 3;
      setVisibleCount(vCount);

      // Gaps moderados
      const g =
        w >= 1536 ? 24 : w >= 1280 ? 22 : w >= 1024 ? 20 : w >= 768 ? 18 : 16;
      setGap(g);

      // Alturas altas
      if (w >= 1536) setCardH(180);
      else if (w >= 1280) setCardH(168);
      else if (w >= 1024) setCardH(156);
      else if (w >= 768) setCardH(144);
      else setCardH(132);

      // Ancho por columna con mínimo alto
      const gutters = (vCount - 1) * g;
      const available = w - gutters;
      const baseW = available / vCount;
      setCardW(Math.max(200, Math.round(baseW)));
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const [idx, setIdx] = React.useState(0);
  const [withTransition, setWithTransition] = React.useState(true);

  const step = React.useCallback(
    (d = 1) => {
      if (!multi) return;
      setIdx((i) => i + d);
    },
    [multi]
  );

  const prefersReduced = usePrefersReducedMotion();
  const autoEnabled = multi && !prefersReduced;
  const [paused, setPaused] = React.useState(false);
  const timerRef = React.useRef<number | null>(null);

  const schedule = React.useCallback(() => {
    if (!autoEnabled || paused) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => step(1), autoIntervalMs);
  }, [autoEnabled, paused, step, autoIntervalMs]);

  React.useEffect(() => {
    schedule();
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [idx, schedule]);

  React.useEffect(() => {
    if (!autoEnabled) return;
    if (paused && timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    } else {
      schedule();
    }
  }, [paused, autoEnabled, schedule]);

  // Loop infinito suave
  React.useEffect(() => {
    if (!multi || doubled.length === 0) return;
    const n = safe.length;
    const total = doubled.length;
    if (idx >= total - visibleCount) {
      setWithTransition(false);
      setIdx((i) => i - n);
      requestAnimationFrame(() => setWithTransition(true));
    } else if (idx < 0) {
      setWithTransition(false);
      setIdx((i) => i + n);
      requestAnimationFrame(() => setWithTransition(true));
    }
  }, [idx, doubled.length, safe.length, multi, visibleCount]);

  const translateX = -(idx * (cardW + gap));

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!multi) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      setIdx(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setIdx(Math.max(0, safe.length - visibleCount));
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className={`flex items-center ${
            withTransition ? "transition-transform duration-500 ease-out" : ""
          }`}
          style={{
            transform: `translateX(${translateX}px)`,
            gap: `${gap}px`,
            willChange: "transform",
          }}
        >
          {doubled.map((logo, i) => (
            <div
              key={`${logo.src}-${i}`}
              className="relative flex-shrink-0 rounded-2xl bg-white border border-gray-100/60 shadow-sm"
              style={{ width: `${cardW}px`, height: `${cardH}px` }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain p-5 md:p-6"
                sizes="(min-width:1536px) 14vw, (min-width:1280px) 16vw, (min-width:1024px) 18vw, (min-width:768px) 22vw, 34vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Flechas separadas */}
      {multi && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => step(-1)}
            className="absolute -left-6 md:-left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => step(1)}
            className="absolute -right-6 md:-right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
