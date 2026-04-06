import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { ServicesListSection } from "./ServicesListSection";
import { loadContent } from "@/lib/content/loader";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Services" : "Services",
    description:
      locale === "fr"
        ? "Metanova offre des services en ingénierie en structure, développement immobilier et gestion de projets à travers le Québec."
        : "Metanova offers structural engineering, real estate development, and project management services across Quebec and beyond.",
    alternates: {
      canonical: locale === "fr" ? "/fr/services" : "/en/services",
      languages: {
        en: "/en/services",
        fr: "/fr/services",
      },
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = loadContent("pages/services", locale);
  const fm = page?.frontmatter as Record<string, string> | undefined;

  return (
    <>
      <HeroSection
        title={fm?.["hero_headline"] ?? "Our Services"}
        subtitle={fm?.["hero_subline"]}
        backgroundImage={fm?.["hero_image"] ?? "/metanova-assets/services/structural/field-team-sunset.png"}
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
