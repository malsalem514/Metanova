import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://metanova.ca";

  const pages = [
    { en: "/en", fr: "/fr", priority: 1, changeFrequency: "monthly" as const },
    { en: "/en/about", fr: "/fr/a-propos", priority: 0.8, changeFrequency: "monthly" as const },
    { en: "/en/services", fr: "/fr/services", priority: 0.8, changeFrequency: "monthly" as const },
    { en: "/en/services/structural-engineering", fr: "/fr/services/ingenierie-structurale", priority: 0.7, changeFrequency: "monthly" as const },
    { en: "/en/services/real-estate-development", fr: "/fr/services/developpement-immobilier", priority: 0.7, changeFrequency: "monthly" as const },
    { en: "/en/services/project-management-consulting", fr: "/fr/services/gestion-de-projet", priority: 0.7, changeFrequency: "monthly" as const },
    { en: "/en/contact", fr: "/fr/contact", priority: 0.5, changeFrequency: "yearly" as const },
    { en: "/en/careers", fr: "/fr/carrieres", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  return pages.flatMap((page) => [
    {
      url: `${baseUrl}${page.fr}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          en: `${baseUrl}${page.en}`,
          fr: `${baseUrl}${page.fr}`,
        },
      },
    },
    {
      url: `${baseUrl}${page.en}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          en: `${baseUrl}${page.en}`,
          fr: `${baseUrl}${page.fr}`,
        },
      },
    },
  ]);
}
