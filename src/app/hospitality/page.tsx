import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { loadContent } from "@/lib/content/loader";

export const metadata: Metadata = {
  title: "Hospitality Projects",
  description:
    "Explore MetaNova's hospitality portfolio — hotels, resorts, and leisure facilities.",
  alternates: { canonical: "/hospitality" },
};

const items = [
  { src: "/metanova-assets/projects/hospitality/resort-pool-night.jpg", alt: "Resort pool at night" },
  { src: "/metanova-assets/projects/hospitality/lakefront-lodge.jpg", alt: "Lakefront lodge" },
  { src: "/metanova-assets/projects/hospitality/resort-pool-day.jpg", alt: "Resort pool during the day" },
  { src: "/metanova-assets/projects/hospitality/sauna-interior.jpg", alt: "Luxury sauna interior" },
];

export default function HospitalityPage() {
  const page = loadContent("pages/hospitality");
  const fm = page?.frontmatter as Record<string, string> | undefined;

  return (
    <>
      <PortfolioGrid
        title={fm?.["title"] ?? "Hospitality"}
        subtitle={fm?.["subtitle"] ?? "Portfolio"}
        description={fm?.["description"] ?? "Hotels, resorts, and leisure facilities that balance guest experience with structural performance and operational efficiency."}
        heroImage={fm?.["hero_image"] ?? "/metanova-assets/projects/hospitality/resort-pool-night.jpg"}
        items={items}
      />
      <CTABanner
        title={fm?.["cta_banner_heading"] ?? "Building a hospitality venue?"}
        subtitle={fm?.["cta_banner_body"]}
      />
    </>
  );
}
