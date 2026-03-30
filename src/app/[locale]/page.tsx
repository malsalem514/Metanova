import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { VisionMissionSection } from "@/components/sections/VisionMissionSection";
import { EditorialSection } from "@/components/sections/EditorialSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { loadContent } from "@/lib/content/loader";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  return {
    title: {
      absolute: isFr
        ? "Metanova — Ingénierie en structure & Développement"
        : "Metanova — Structural Engineering & Development",
    },
    description: isFr
      ? "Metanova offre des services en ingénierie en structure, développement immobilier et gestion de projets à travers le Québec."
      : "Structural engineering, real estate development and project management across Quebec.",
    alternates: {
      canonical: isFr ? "/fr" : "/en",
      languages: { en: "/en", fr: "/fr" },
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = loadContent("pages/home", locale);
  const fm = page?.frontmatter as Record<string, string> | undefined;

  return (
    <>
      <HeroSection
        title={fm?.["hero_headline"] ?? "Designing the future, one structure at a time"}
        subtitle={fm?.["hero_subline"] ?? ""}
        backgroundImage={fm?.["hero_image"] ?? "/metanova-assets/hero/construction-leadership.png"}
        videoSrc={fm?.["hero_video"] ?? "/metanova-assets/hero/home-hero-web.mp4"}
        ctaText={fm?.["cta_primary"] ?? "BOOK A CALL"}
        ctaHref={fm?.["cta_primary_href"] ?? "/contact"}
        secondaryCtaText={fm?.["cta_secondary"] ?? "OUR SERVICES"}
        secondaryCtaHref={fm?.["cta_secondary_href"] ?? "/services"}
      />
      <VisionMissionSection />
      <EditorialSection />
      <ServicesOverview
        overline={fm?.["services_overline"]}
        heading={fm?.["services_heading"]}
      />
      <ApproachSection
        overline={fm?.["approach_overline"]}
        heading={fm?.["approach_heading"]}
      />
      <ServiceAreas />
    </>
  );
}
