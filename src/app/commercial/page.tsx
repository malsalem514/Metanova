import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { loadContent } from "@/lib/content/loader";

export const metadata: Metadata = {
  title: "Commercial Projects",
  description:
    "Explore MetaNova's commercial portfolio — office buildings, retail spaces, and mixed-use developments.",
  alternates: { canonical: "/commercial" },
};

const items = [
  { src: "/metanova-assets/projects/commercial/glass-atrium.jpg", alt: "Glass atrium commercial building" },
  { src: "/metanova-assets/projects/commercial/civic-facade.jpg", alt: "Civic building facade" },
  { src: "/metanova-assets/projects/commercial/coworking-office.jpg", alt: "Modern coworking office space" },
  { src: "/metanova-assets/projects/commercial/moody-corridor.png", alt: "Architectural corridor" },
];

export default function CommercialPage() {
  const page = loadContent("pages/commercial");
  const fm = page?.frontmatter as Record<string, string> | undefined;

  return (
    <>
      <PortfolioGrid
        title={fm?.["title"] ?? "Commercial"}
        subtitle={fm?.["subtitle"] ?? "Portfolio"}
        description={fm?.["description"] ?? "Office buildings, retail spaces, and mixed-use developments engineered for performance, flexibility, and long-term value."}
        heroImage={fm?.["hero_image"] ?? "/metanova-assets/projects/commercial/glass-atrium.jpg"}
        items={items}
      />
      <CTABanner
        title={fm?.["cta_banner_heading"] ?? "Planning a commercial development?"}
        subtitle={fm?.["cta_banner_body"]}
      />
    </>
  );
}
