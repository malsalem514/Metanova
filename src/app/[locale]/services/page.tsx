import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { ServicesListSection } from "./ServicesListSection";
import { loadContent } from "@/lib/content/loader";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "服务" : "Services",
    description:
      locale === "fr"
        ? "Metanova offre des services en ingénierie en structure, développement immobilier et gestion de projets à travers le Québec."
        : locale === "zh"
        ? "Metanova提供结构工程、房地产开发与工程项目管理服务，覆盖魁北克全省。"
        : "Metanova offers structural engineering, real estate development, and project management services across Quebec and beyond.",
    openGraph: {
      title: locale === "zh" ? "服务" : "Services",
      description:
        locale === "fr"
          ? "Metanova offre des services en ingénierie en structure, développement immobilier et gestion de projets à travers le Québec."
          : locale === "zh"
          ? "Metanova提供结构工程、房地产开发与工程项目管理服务，覆盖魁北克全省。"
          : "Metanova offers structural engineering, real estate development, and project management services across Quebec and beyond.",
    },
    alternates: {
      canonical: locale === "fr" ? "/fr/services" : locale === "zh" ? "/zh/services" : "/en/services",
      languages: {
        en: "/en/services",
        fr: "/fr/services",
        zh: "/zh/services",
      },
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = loadContent("pages/services", locale);
  const fm = page?.frontmatter as Record<string, string> | undefined;

  const servicesListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Metanova Services",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Structural Engineering", url: "https://metanova.ca/en/services/structural-engineering" },
      { "@type": "ListItem", position: 2, name: "Real Estate Development", url: "https://metanova.ca/en/services/real-estate-development" },
      { "@type": "ListItem", position: 3, name: "Project Management", url: "https://metanova.ca/en/services/project-management-consulting" },
    ],
  };

  return (
    <>
      <JsonLd data={servicesListJsonLd} />
      <HeroSection
        title={fm?.["hero_headline"] ?? "Our Services"}
        subtitle={fm?.["hero_subline"]}
        backgroundImage={fm?.["hero_image"] ?? "/metanova-assets/services/structural/field-team-sunset.webp"}
        videoSrc={fm?.["hero_video"]}
      />
      <ServicesListSection />
      <CTABanner
        title={fm?.["cta_banner_heading"]}
        subtitle={fm?.["cta_banner_body"]}
        ctaText={fm?.["cta_banner_button"]}
      />
    </>
  );
}
