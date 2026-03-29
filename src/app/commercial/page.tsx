import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Commercial Projects",
  description:
    "Explore MetaNova's commercial portfolio — office buildings, retail spaces, and mixed-use developments.",
};

const items = [
  { src: "/metanova-assets/projects/commercial/glass-atrium.jpg", alt: "Glass atrium commercial building" },
  { src: "/metanova-assets/projects/commercial/civic-facade.jpg", alt: "Civic building facade" },
  { src: "/metanova-assets/projects/commercial/coworking-office.jpg", alt: "Modern coworking office space" },
  { src: "/metanova-assets/projects/commercial/moody-corridor.png", alt: "Architectural corridor" },
];

export default function CommercialPage() {
  return (
    <>
      <PortfolioGrid
        title="Commercial"
        subtitle="Portfolio"
        description="Office buildings, retail spaces, and mixed-use developments engineered for performance, flexibility, and long-term value."
        heroImage="/metanova-assets/projects/commercial/glass-atrium.jpg"
        items={items}
      />
      <CTABanner
        title="Planning a commercial development?"
        subtitle="From office towers to retail complexes, we deliver structural solutions that support your business objectives."
      />
    </>
  );
}
