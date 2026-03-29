import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { ServicesListSection } from "./ServicesListSection";
import { loadContent } from "@/lib/content/loader";

export const metadata: Metadata = {
  title: "Services",
  description:
    "MetaNova offers structural engineering, real estate development, and project management services across Quebec and beyond.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const page = loadContent("pages/services");
  const fm = page?.frontmatter as Record<string, string> | undefined;

  return (
    <>
      <HeroSection
        title={fm?.["hero_headline"] ?? "What we do"}
        subtitle={fm?.["hero_subline"]}
        backgroundImage={fm?.["hero_image"] ?? "/metanova-assets/services/structural/field-team-sunset.png"}
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
