import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { ServicesListSection } from "./ServicesListSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "MetaNova offers structural engineering, real estate development, and project management services across Quebec and beyond.",
};

export default function ServicesPage() {
  return (
    <>
      <HeroSection
        title="What we do"
        subtitle="Integrated services that cover every stage of the building lifecycle — from first sketch to final inspection."
        backgroundImage="/metanova-assets/services/structural/field-team-sunset.png"
      />
      <ServicesListSection />
      <CTABanner />
    </>
  );
}
