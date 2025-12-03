"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/mixpanel";

// Mapeo de rutas a nombres legibles
const pageNames: Record<string, string> = {
  "/": "Home",
  "/donar": "Donar",
  "/voluntariado": "Voluntariado",
  "/programas": "Programas",
  "/programa-educativo": "Programa Educativo",
  "/acerca-de-nosotros": "Acerca de Nosotros",
  "/como-aportar": "Cómo Aportar",
  "/contacto": "Contacto",
  "/eventos": "Eventos",
  "/faqs": "FAQs",
  "/inscribirse": "Inscribirse",
  "/privacidad": "Privacidad",
  "/terminos": "Términos",
  "/ubicacion": "Ubicación",
};

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      const pageName = pageNames[pathname] || pathname;
      trackPageView(pageName, {
        path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
