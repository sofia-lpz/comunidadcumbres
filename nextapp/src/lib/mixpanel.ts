import mixpanel from "mixpanel-browser";

// Token de Mixpanel
const MIXPANEL_TOKEN = "66ca6821960461d3316a3e17d5f55ad8";

// Bandera para verificar si ya está inicializado
let isInitialized = false;

export const initMixpanel = () => {
  if (typeof window === "undefined") return; // No ejecutar en el servidor
  
  if (isInitialized) return; // No inicializar más de una vez

  mixpanel.init(MIXPANEL_TOKEN, {
    autocapture: true,
    record_sessions_percent: 100,
    track_pageview: true,
    persistence: "localStorage",
    debug: process.env.NODE_ENV === "development",
  });

  isInitialized = true;
};

// Funciones helper para tracking de precisión (opcional)
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  mixpanel.track(eventName, properties);
};

export const identifyUser = (userId: string, traits?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  mixpanel.identify(userId);
  if (traits) {
    mixpanel.people.set(traits);
  }
};

export const resetUser = () => {
  if (typeof window === "undefined") return;
  mixpanel.reset();
};

export default mixpanel;
