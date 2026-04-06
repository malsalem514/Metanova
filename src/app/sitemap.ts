import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://metanova.ca";

  const pages = [
    { en: "/en", fr: "/fr", zh: "/zh", priority: 1, changeFrequency: "monthly" as const },
    { en: "/en/about", fr: "/fr/a-propos", zh: "/zh/about", priority: 0.8, changeFrequency: "monthly" as const },
    { en: "/en/services", fr: "/fr/services", zh: "/zh/services", priority: 0.8, changeFrequency: "monthly" as const },
    { en: "/en/services/structural-engineering", fr: "/fr/services/ingenierie-structurale", zh: "/zh/services/structural-engineering", priority: 0.7, changeFrequency: "monthly" as const },
    { en: "/en/services/real-estate-development", fr: "/fr/services/developpement-immobilier", zh: "/zh/services/real-estate-development", priority: 0.7, changeFrequency: "monthly" as const },
    { en: "/en/services/project-management-consulting", fr: "/fr/services/gestion-de-projet", zh: "/zh/services/project-management-consulting", priority: 0.7, changeFrequency: "monthly" as const },
    { en: "/en/contact", fr: "/fr/contact", zh: "/zh/contact", priority: 0.5, changeFrequency: "yearly" as const },
    { en: "/en/careers", fr: "/fr/carrieres", zh: "/zh/careers", priority: 0.6, changeFrequency: "monthly" as const },
    { en: "/en/privacy", fr: "/fr/confidentialite", zh: "/zh/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const localeKeys = ["fr", "en", "zh"] as const;

  return pages.flatMap((page) =>
    localeKeys.map((loc) => ({
      url: `${baseUrl}${page[loc]}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          en: `${baseUrl}${page.en}`,
          fr: `${baseUrl}${page.fr}`,
          zh: `${baseUrl}${page.zh}`,
          "x-default": `${baseUrl}${page.fr}`,
        },
      },
    })),
  );
}
