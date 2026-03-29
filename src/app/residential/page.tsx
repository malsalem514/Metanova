import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Residential Projects",
  description:
    "Explore MetaNova's residential portfolio — condominiums, single-family homes, and multi-unit developments.",
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
  return (
    <>
      <PortfolioGrid
        title="Residential"
        subtitle="Portfolio"
        description="From luxury single-family homes to large-scale condominium developments, our residential projects combine structural excellence with livability."
        heroImage="/metanova-assets/projects/residential/condo-aerial.jpg"
        items={items}
      />
      <CTABanner
        title="Planning a residential project?"
        subtitle="Whether it's a custom home or a multi-unit development, we bring the structural and development expertise to make it happen."
      />
    </>
  );
}
