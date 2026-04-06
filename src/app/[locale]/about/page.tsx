import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { AboutInlineSections } from "./AboutInlineSections";
import { WhyUsSection } from "./WhyUsSection";
import { loadContent } from "@/lib/content/loader";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Notre firme" : locale === "zh" ? "我们的公司" : "Our Firm",
    description:
      locale === "fr"
        ? "Découvrez Metanova — notre vision, notre mission et l'équipe derrière notre expertise en ingénierie en structure et en développement."
        : locale === "zh"
        ? "了解Metanova — 我们的愿景、使命，以及结构工程与开发专业团队。"
        : "Learn about Metanova — our vision, mission, and the team behind our structural engineering and development expertise.",
    openGraph: {
      title: locale === "fr" ? "Notre firme" : locale === "zh" ? "我们的公司" : "Our Firm",
      description:
        locale === "fr"
          ? "Découvrez Metanova — notre vision, notre mission et l'équipe derrière notre expertise en ingénierie en structure et en développement."
          : locale === "zh"
          ? "了解Metanova — 我们的愿景、使命，以及结构工程与开发专业团队。"
          : "Learn about Metanova — our vision, mission, and the team behind our structural engineering and development expertise.",
    },
    alternates: {
      canonical: locale === "fr" ? "/fr/a-propos" : locale === "zh" ? "/zh/about" : "/en/about",
      languages: {
        en: "/en/about",
        fr: "/fr/a-propos",
        zh: "/zh/about",
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = loadContent("pages/about", locale);
  const fm = page?.frontmatter as Record<string, string> | undefined;

  const foundersJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Metanova Experts-Conseils",
    foundingDate: "2022",
    founder: [
      { "@type": "Person", name: "Suddam Al-Salem", jobTitle: "Managing Partner, Engineering" },
      { "@type": "Person", name: "Muhannad Al-Salem", jobTitle: "Managing Partner, Development" },
    ],
  };

  return (
    <>
      <JsonLd data={foundersJsonLd} />
      <HeroSection
        title={fm?.["hero_headline"] ?? "Designing the future, one structure at a time."}
        subtitle={fm?.["hero_subline"]}
        backgroundImage={fm?.["hero_image"] ?? "/metanova-assets/hero/construction-leadership.webp"}
        videoSrc={fm?.["hero_video"] ?? "/metanova-assets/hero/home-hero-web.mp4"}
        ctaText={locale === "fr" ? "PRENDRE RENDEZ-VOUS" : locale === "zh" ? "预约咨询" : "BOOK A CALL"}
        ctaHref="/contact"
        secondaryCtaText={locale === "fr" ? "NOS SERVICES" : locale === "zh" ? "我们的服务" : "OUR SERVICES"}
        secondaryCtaHref="/services"
        stats={[
          { value: "20+", label: locale === "fr" ? "ans d'expérience" : locale === "zh" ? "年经验" : "years experience" },
          { value: "250+", label: locale === "fr" ? "projets" : locale === "zh" ? "个项目" : "projects" },
        ]}
      />
      <AboutInlineSections content={fm} />
      <ApproachSection
        overline={fm?.["approach_overline"]}
        heading={fm?.["approach_heading"]}
      />
      <WhyUsSection content={fm} />
      <ServiceAreas />
      <TeamSection />
      <CTABanner
        title={fm?.["cta_banner_heading"] ?? "Let's Talk!"}
        subtitle={fm?.["cta_banner_body"] ?? "Ready to take the first step toward realizing your dream project? Contact us today for a consultation and let's turn your vision into a reality."}
        ctaText={fm?.["cta_banner_button"] ?? "BUILD PROJECT WITH US"}
      />
    </>
  );
}
