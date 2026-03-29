import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { CTABanner } from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <HeroSection
        title="Designing the future, one structure at a time"
        subtitle="MetaNova brings together structural engineering, real estate development, and project management under one roof. From concept to completion, we deliver built environments that stand the test of time."
        backgroundImage="/metanova-assets/hero/construction-leadership.png"
        ctaText="Our Services"
        ctaHref="/services"
        secondaryCtaText="Contact Us"
        secondaryCtaHref="/contact"
      />
      <ServicesOverview />
      <ApproachSection />
      <CTABanner />
    </>
  );
}
