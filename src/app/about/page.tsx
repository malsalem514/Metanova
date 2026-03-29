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
        title={fm?.["hero_headline"] ?? "Built on expertise, driven by vision"}
        subtitle={fm?.["hero_subline"]}
        backgroundImage={fm?.["hero_image"] ?? "/metanova-assets/hero/montreal-cranes-sunset.jpeg"}
      />
      <AboutInlineSections content={fm} />
      <ApproachSection />
      <TeamSection />
      <CTABanner
        title={fm?.["cta_banner_heading"] ?? "Want to work with us?"}
        subtitle={fm?.["cta_banner_body"] ?? "We're always looking for challenging projects and great partners. Let's talk."}
      />
    </>
  );
}
