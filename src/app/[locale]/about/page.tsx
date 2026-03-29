import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { AboutInlineSections } from "./AboutInlineSections";
import { loadContent } from "@/lib/content/loader";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Notre firme" : "About",
    description:
      locale === "fr"
        ? "Découvrez Metanova — notre vision, notre mission et l'équipe derrière notre expertise en ingénierie en structure et en développement."
        : "Learn about Metanova — our vision, mission, and the team behind our structural engineering and development expertise.",
    alternates: {
      canonical: locale === "fr" ? "/fr/a-propos" : "/en/about",
      languages: {
        en: "/en/about",
        fr: "/fr/a-propos",
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = loadContent("pages/about", locale);
  const fm = page?.frontmatter as Record<string, string> | undefined;

  return (
    <>
      <HeroSection
        title={fm?.["hero_headline"] ?? "About us"}
        subtitle={fm?.["hero_subline"]}
        backgroundImage={fm?.["hero_image"] ?? "/metanova-assets/hero/montreal-cranes-sunset.jpeg"}
      />
      <AboutInlineSections content={fm} />
      <ApproachSection />
      <TeamSection />
      <CTABanner
        title={fm?.["cta_banner_heading"] ?? "Let's Talk!"}
        subtitle={fm?.["cta_banner_body"] ?? "Ready to take the first step toward realizing your dream project? Contact us today for a consultation and let's turn your vision into a reality."}
        ctaText={fm?.["cta_banner_button"] ?? "BUILD PROJECT WITH US"}
      />
    </>
  );
}
