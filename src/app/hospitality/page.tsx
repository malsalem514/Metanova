import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Hospitality Projects",
  description:
    "Explore MetaNova's hospitality portfolio — hotels, resorts, and leisure facilities.",
};

const items = [
  { src: "/metanova-assets/projects/hospitality/resort-pool-night.jpg", alt: "Resort pool at night" },
  { src: "/metanova-assets/projects/hospitality/lakefront-lodge.jpg", alt: "Lakefront lodge" },
  { src: "/metanova-assets/projects/hospitality/resort-pool-day.jpg", alt: "Resort pool during the day" },
  { src: "/metanova-assets/projects/hospitality/sauna-interior.jpg", alt: "Luxury sauna interior" },
];

export default function HospitalityPage() {
  return (
    <>
      <PortfolioGrid
        title="Hospitality"
        subtitle="Portfolio"
        description="Hotels, resorts, and leisure facilities that balance guest experience with structural performance and operational efficiency."
        heroImage="/metanova-assets/projects/hospitality/resort-pool-night.jpg"
        items={items}
      />
      <CTABanner
        title="Building a hospitality venue?"
        subtitle="Our team understands the unique structural and operational demands of hotels, resorts, and leisure facilities."
      />
    </>
  );
}
