import { HeroSection } from "@/components/sections/HeroSection";
import { VisionMissionSection } from "@/components/sections/VisionMissionSection";
import { EditorialSection } from "@/components/sections/EditorialSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { loadContent } from "@/lib/content/loader";

export default function Home() {
  const page = loadContent("pages/home");
  const fm = page?.frontmatter as Record<string, string> | undefined;

  return (
    <>
      <HeroSection
        title={fm?.["hero_headline"] ?? "Designing the future, one structure at a time"}
        subtitle={fm?.["hero_subline"] ?? ""}
        backgroundImage={fm?.["hero_image"] ?? "/metanova-assets/hero/construction-leadership.png"}
        videoSrc={fm?.["hero_video"] ?? "/metanova-assets/hero/home-hero-web.mp4"}
        ctaText={fm?.["cta_primary"] ?? "BOOK A CALL"}
        ctaHref={fm?.["cta_primary_href"] ?? "/contact"}
        secondaryCtaText={fm?.["cta_secondary"] ?? "OUR SERVICES"}
        secondaryCtaHref={fm?.["cta_secondary_href"] ?? "/services"}
        stats={[
          { value: "20+", label: "Projects" },
          { value: "5+", label: "Cities" },
        ]}
        testimonial={{
          quote: "MetaNova brought real engineering depth to our development. They understood both the structure and the business.",
          author: "Client, Montreal",
          rating: 5,
        }}
      />
      <VisionMissionSection />
      <EditorialSection />
      <ServicesOverview
        overline={fm?.["services_overline"]}
        heading={fm?.["services_heading"]}
      />
      <ApproachSection
        overline={fm?.["approach_overline"]}
        heading={fm?.["approach_heading"]}
      />
      <CTABanner
        title={fm?.["cta_banner_heading"]}
        subtitle={fm?.["cta_banner_body"]}
        ctaText={fm?.["cta_banner_button"]}
      />
    </>
  );
}
