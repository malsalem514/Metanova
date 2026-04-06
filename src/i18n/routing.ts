import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en", "zh"],
  defaultLocale: "fr",
  localePrefix: "always",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/about": {
      en: "/about",
      fr: "/a-propos",
      zh: "/about",
    },
    "/services": "/services",
    "/services/structural-engineering": {
      en: "/services/structural-engineering",
      fr: "/services/ingenierie-structurale",
      zh: "/services/structural-engineering",
    },
    "/services/real-estate-development": {
      en: "/services/real-estate-development",
      fr: "/services/developpement-immobilier",
      zh: "/services/real-estate-development",
    },
    "/services/project-management-consulting": {
      en: "/services/project-management-consulting",
      fr: "/services/gestion-de-projet",
      zh: "/services/project-management-consulting",
    },
    "/contact": "/contact",
    "/careers": {
      en: "/careers",
      fr: "/carrieres",
      zh: "/careers",
    },
    "/privacy": {
      en: "/privacy",
      fr: "/confidentialite",
      zh: "/privacy",
    },
  },
});
