import mixpanel from "mixpanel-browser";

// Token de Mixpanel
const MIXPANEL_TOKEN = "66ca6821960461d3316a3e17d5f55ad8";

// Bandera para verificar si ya está inicializado
let isInitialized = false;

// Función para verificar si Mixpanel está inicializado
export const isMixpanelReady = () => isInitialized;

// Función helper para ejecutar solo si está inicializado
const safeTrack = (callback: () => void) => {
  if (typeof window === "undefined") return;
  if (!isInitialized) {
    // Si no está inicializado, intentar inicializar primero
    initMixpanel();
    // Si aún no está inicializado, salir
    if (!isInitialized) return;
  }
  try {
    callback();
  } catch (error) {
    console.warn("Mixpanel tracking error:", error);
  }
};

export const initMixpanel = () => {
  if (typeof window === "undefined") return;
  
  if (isInitialized) return;

  try {
    mixpanel.init(MIXPANEL_TOKEN, {
      autocapture: true,
      record_sessions_percent: 100,
      track_pageview: true,
      persistence: "localStorage",
      debug: process.env.NODE_ENV === "development",
    });

    isInitialized = true;
  } catch (error) {
    console.warn("Mixpanel initialization error:", error);
  }
};

// ============================================
// EVENTOS GENÉRICOS
// ============================================

/**
 * Trackea cualquier evento custom
 * Útil para: MIXPANEL_TOP_EVENTS, MIXPANEL_AGGREGATE_EVENT_COUNTS
 */
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  safeTrack(() => mixpanel.track(eventName, properties));
};

// ============================================
// EVENTOS DE NAVEGACIÓN
// Para: MIXPANEL_QUERY_FUNNEL (embudo de conversión)
// ============================================

/**
 * Trackea visita a página específica
 * Uso: Medir qué páginas son más visitadas
 */
export const trackPageView = (pageName: string, properties?: Record<string, unknown>) => {
  safeTrack(() => mixpanel.track("Page View", {
    page_name: pageName,
    url: window.location.href,
    referrer: document.referrer,
    ...properties,
  }));
};

/**
 * Trackea click en botón importante
 * Uso: Medir engagement con CTAs
 */
export const trackButtonClick = (buttonName: string, location: string, properties?: Record<string, unknown>) => {
  safeTrack(() => mixpanel.track("Button Click", {
    button_name: buttonName,
    location: location,
    url: window.location.href,
    ...properties,
  }));
};

// ============================================
// EVENTOS DE DONACIÓN (FUNNEL DE CONVERSIÓN)
// Para: MIXPANEL_QUERY_FUNNEL - Embudo: Vista → Inicio → Completado
// ============================================

/**
 * Paso 1: Usuario ve la página de donar
 */
export const trackDonationPageView = () => {
  safeTrack(() => mixpanel.track("Donation Page Viewed", {
    timestamp: new Date().toISOString(),
  }));
};

/**
 * Paso 2: Usuario inicia proceso de donación
 */
export const trackDonationStarted = (amount?: number, method?: string) => {
  safeTrack(() => mixpanel.track("Donation Started", {
    amount: amount,
    payment_method: method,
    timestamp: new Date().toISOString(),
  }));
};

/**
 * Paso 3: Donación completada exitosamente
 * Útil para: MIXPANEL_QUERY_NUMERIC_SUM (total donado)
 */
export const trackDonationCompleted = (amount: number, method: string, donorType: "one-time" | "recurring") => {
  safeTrack(() => {
    mixpanel.track("Donation Completed", {
      amount: amount,
      payment_method: method,
      donor_type: donorType,
      currency: "MXN",
      timestamp: new Date().toISOString(),
    });
    
    // Incrementar total donado en el perfil del usuario
    mixpanel.people.increment("total_donated", amount);
    mixpanel.people.increment("donation_count", 1);
  });
};

/**
 * Donación abandonada
 */
export const trackDonationAbandoned = (step: string, amount?: number) => {
  safeTrack(() => mixpanel.track("Donation Abandoned", {
    abandoned_at_step: step,
    intended_amount: amount,
    timestamp: new Date().toISOString(),
  }));
};

// ============================================
// EVENTOS DE VOLUNTARIADO (FUNNEL)
// Para: MIXPANEL_LIST_COHORTS - Crear cohort "Voluntarios"
// ============================================

/**
 * Usuario ve página de voluntariado
 */
export const trackVolunteerPageView = () => {
  safeTrack(() => mixpanel.track("Volunteer Page Viewed", {
    timestamp: new Date().toISOString(),
  }));
};

/**
 * Usuario inicia inscripción de voluntariado
 */
export const trackVolunteerSignupStarted = () => {
  safeTrack(() => mixpanel.track("Volunteer Signup Started", {
    timestamp: new Date().toISOString(),
  }));
};

/**
 * Usuario completa inscripción de voluntariado
 * Este evento lo puedes usar para crear un COHORT de voluntarios
 */
export const trackVolunteerSignupCompleted = (skills?: string[], availability?: string) => {
  safeTrack(() => {
    mixpanel.track("Volunteer Signup Completed", {
      skills: skills,
      availability: availability,
      timestamp: new Date().toISOString(),
    });
    
    // Marcar al usuario como voluntario
    mixpanel.people.set({
      is_volunteer: true,
      volunteer_signup_date: new Date().toISOString(),
    });
  });
};

// ============================================
// EVENTOS DE PROGRAMAS
// Para: MIXPANEL_QUERY_SEGMENTATION (por programa)
// ============================================

/**
 * Usuario ve detalles de un programa
 */
export const trackProgramViewed = (programName: string, programCategory?: string) => {
  safeTrack(() => mixpanel.track("Program Viewed", {
    program_name: programName,
    program_category: programCategory,
    timestamp: new Date().toISOString(),
  }));
};

/**
 * Usuario se inscribe a un programa
 */
export const trackProgramEnrollment = (programName: string, beneficiaryType?: string) => {
  safeTrack(() => mixpanel.track("Program Enrollment", {
    program_name: programName,
    beneficiary_type: beneficiaryType,
    timestamp: new Date().toISOString(),
  }));
};

// ============================================
// EVENTOS DE CONTACTO/ENGAGEMENT
// Para: MIXPANEL_QUERY_RETENTION_REPORT
// ============================================

/**
 * Usuario envía formulario de contacto
 */
export const trackContactFormSubmitted = (subject?: string) => {
  safeTrack(() => mixpanel.track("Contact Form Submitted", {
    subject: subject,
    timestamp: new Date().toISOString(),
  }));
};

/**
 * Usuario se suscribe al newsletter
 */
export const trackNewsletterSignup = (source: string) => {
  safeTrack(() => {
    mixpanel.track("Newsletter Signup", {
      source: source,
      timestamp: new Date().toISOString(),
    });
    
    mixpanel.people.set({
      is_newsletter_subscriber: true,
      newsletter_signup_date: new Date().toISOString(),
    });
  });
};

/**
 * Usuario comparte contenido en redes sociales
 */
export const trackSocialShare = (platform: string, contentType: string, contentName?: string) => {
  safeTrack(() => mixpanel.track("Social Share", {
    platform: platform,
    content_type: contentType,
    content_name: contentName,
    timestamp: new Date().toISOString(),
  }));
};

// ============================================
// EVENTOS DE EVENTOS/CAMPAÑAS
// Para: MIXPANEL_AGGREGATE_EVENTS
// ============================================

/**
 * Usuario ve un evento/campaña
 */
export const trackCampaignViewed = (campaignName: string, campaignType?: string) => {
  safeTrack(() => mixpanel.track("Campaign Viewed", {
    campaign_name: campaignName,
    campaign_type: campaignType,
    timestamp: new Date().toISOString(),
  }));
};

/**
 * Usuario se registra a un evento
 */
export const trackEventRegistration = (eventName: string, eventDate?: string) => {
  safeTrack(() => mixpanel.track("Event Registration", {
    event_name: eventName,
    event_date: eventDate,
    timestamp: new Date().toISOString(),
  }));
};

// ============================================
// IDENTIFICACIÓN DE USUARIOS
// Para: MIXPANEL_QUERY_PROFILES, MIXPANEL_LIST_COHORTS
// ============================================

/**
 * Identifica a un usuario (cuando se loguea o se registra)
 * Esto permite crear COHORTS basados en propiedades del usuario
 */
export const identifyUser = (userId: string, traits?: Record<string, unknown>) => {
  safeTrack(() => {
    mixpanel.identify(userId);
    if (traits) {
      mixpanel.people.set({
        ...traits,
        last_seen: new Date().toISOString(),
      });
    }
  });
};

/**
 * Actualiza propiedades del usuario
 */
export const updateUserProfile = (properties: Record<string, unknown>) => {
  safeTrack(() => mixpanel.people.set(properties));
};

/**
 * Resetea el usuario (logout)
 */
export const resetUser = () => {
  safeTrack(() => mixpanel.reset());
};

// ============================================
// TRACKING DE ERRORES
// Para: Debugging y mejora de UX
// ============================================

/**
 * Trackea errores en formularios o procesos
 */
export const trackError = (errorType: string, errorMessage: string, context?: string) => {
  safeTrack(() => mixpanel.track("Error Occurred", {
    error_type: errorType,
    error_message: errorMessage,
    context: context,
    url: window.location.href,
    timestamp: new Date().toISOString(),
  }));
};

export default mixpanel;
