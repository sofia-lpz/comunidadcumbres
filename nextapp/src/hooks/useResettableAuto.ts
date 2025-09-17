"use client";
import React from "react";

type Options = {
  deps?: React.DependencyList;
  enabled?: boolean;
};

/**
 * Auto-advance con setTimeout reiniciable:
 * - schedule(): programa el siguiente tick
 * - clear(): limpia el timeout
 * - bindHover: { onMouseEnter, onMouseLeave } para pausar/reanudar al hover
 * - respeta visibilitychange (pausa cuando la pestaña está oculta)
 */
export default function useResettableAuto(
  tick: () => void,
  delay: number,
  { deps = [], enabled = true }: Options = {}
) {
  const tRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = React.useCallback(() => {
    if (tRef.current) clearTimeout(tRef.current);
    tRef.current = null;
  }, []);

  const schedule = React.useCallback(() => {
    if (!enabled) return;
    clear();
    tRef.current = setTimeout(() => {
      tick();
    }, delay);
  }, [tick, delay, clear, enabled]);

  // (re)programar cuando cambian deps
  React.useEffect(() => {
    if (!enabled) {
      clear();
      return;
    }
    schedule();
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, schedule, clear, ...(deps ?? [])]);

  // visibilitychange
  React.useEffect(() => {
    const onVis = () => {
      if (!enabled) return;
      if (document.hidden) clear();
      else schedule();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [enabled, schedule, clear]);

  // Helpers para hover
  const bindHover = {
    onMouseEnter: clear,
    onMouseLeave: schedule,
  } as const;

  return { schedule, clear, bindHover };
}