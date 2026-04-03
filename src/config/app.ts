export const APP_CONFIG = {
  name: "Bella Nails",
  tagline: "Tus uñas, nuestra pasión",
  description: "Tu espacio de belleza y cuidado personal. Diseños únicos de manicura que reflejan tu estilo.",
  version: "1.0.0",
  author: "Bella Nails Team",
  
  // Default theme colors (can be overridden by admin settings)
  defaultTheme: {
    primary: "#d4849a",
    secondary: "#f5f0e8", 
    accent: "#c4677e",
  },
  
  // Contact defaults
  defaultContact: {
    whatsapp: "5491112345678",
    whatsappMessage: "Buenas, estoy interesado en sacar una cita con",
    location: "Buenos Aires, Argentina",
  },
  
  // Features
  features: {
    emailVerification: true,
    adminPanel: true,
    gallery: true,
    appointments: true,
    customBranding: true,
  },
  
  // Security
  security: {
    requireEmailVerification: true,
    adminOnlyRegistration: true,
  },
} as const;