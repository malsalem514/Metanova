import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { loadContent } from "@/lib/content/loader";

export const metadata: Metadata = {
  title: "Residential Projects",
  description:
    "Explore MetaNova's residential portfolio — condominiums, single-family homes, and multi-unit developments.",
  alternates: { canonical: "/residential" },
};

const items = [
  { src: "/metanova-assets/projects/residential/condo-aerial.jpg", alt: "Aerial view of condominium development" },
  { src: "/metanova-assets/projects/residential/luxury-house-pool.jpg", alt: "Luxury residence with pool" },
  { src: "/metanova-assets/projects/residential/modern-living-room.jpg", alt: "Modern living room interior" },
  { src: "/metanova-assets/projects/residential/modern-dining-interior.jpg", alt: "Contemporary dining area" },
  { src: "/metanova-assets/projects/residential/home-office.jpg", alt: "Home office space" },
  { src: "/metanova-assets/projects/residential/open-plan-living-room.jpg", alt: "Open plan living room" },
  { src: "/metanova-assets/projects/residential/suburban-overview.png", alt: "Suburban residential overview" },
];

export default function ResidentialPage() {
  const page = loadContent("pages/residential");
  const fm = page?.frontmatter as Record<string, string> | undefined;

  return (
    <>
      <PortfolioGrid
        title={fm?.["title"] ?? "Residential"}
        subtitle={fm?.["subtitle"] ?? "Portfolio"}
        description={fm?.["description"] ?? "From luxury single-family homes to large-scale condominium developments, our residential projects combine structural excellence with livability."}
        heroImage={fm?.["hero_image"] ?? "/metanova-assets/projects/residential/condo-aerial.jpg"}
        items={items}
      />
      <CTABanner
        title={fm?.["cta_banner_heading"] ?? "Planning a residential project?"}
        subtitle={fm?.["cta_banner_body"]}
      />
    </>
  );
}
