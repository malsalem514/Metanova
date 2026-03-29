import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
    "/services": "/services",
    "/services/structural-engineering": {
      en: "/services/structural-engineering",
      fr: "/services/ingenierie-structurale",
    },
    "/services/real-estate-development": {
      en: "/services/real-estate-development",
      fr: "/services/developpement-immobilier",
    },
    "/services/project-management-consulting": {
      en: "/services/project-management-consulting",
      fr: "/services/gestion-de-projet",
    },
    "/contact": "/contact",
  },
});
