import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { AboutInlineSections } from "./AboutInlineSections";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about MetaNova — our vision, mission, and the team behind our structural engineering and development expertise.",
};

export default function AboutPage() {
  return (
    <>
      <HeroSection
        title="Built on expertise, driven by vision"
        subtitle="Founded in 2022, MetaNova was created to bridge the gap between engineering precision and development pragmatism."
        backgroundImage="/metanova-assets/hero/night-cranes-skyline.jpg"
      />
      <AboutInlineSections />
      <ApproachSection />
      <TeamSection />
      <CTABanner
        title="Want to work with us?"
        subtitle="We're always looking for challenging projects and great partners. Let's talk."
      />
    </>
  );
}
