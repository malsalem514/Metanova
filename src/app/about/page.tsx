import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { AboutInlineSections } from "./AboutInlineSections";
import { loadContent } from "@/lib/content/loader";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about MetaNova — our vision, mission, and the team behind our structural engineering and development expertise.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const page = loadContent("pages/about");
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
