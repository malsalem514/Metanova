import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { InlineContactForm } from "@/components/sections/InlineContactForm";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { loadContent } from "@/lib/content/loader";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Carrières" : "Careers",
    description:
      locale === "fr"
        ? "Joignez l'équipe Metanova — nous recherchons des ingénieurs en structure, gestionnaires de projets et professionnels du développement passionnés."
        : "Join the Metanova team — we're looking for passionate structural engineers, project managers, and development professionals.",
    alternates: {
      canonical: locale === "fr" ? "/fr/carrieres" : "/en/careers",
      languages: {
        en: "/en/careers",
        fr: "/fr/carrieres",
      },
    },
  };
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = loadContent("pages/careers", locale);
  const fm = page?.frontmatter as Record<string, string> | undefined;

  const points = [
    fm?.["point1"] ?? "",
    fm?.["point2"] ?? "",
    fm?.["point3"] ?? "",
  ];

  return (
    <>
      <HeroSection
        title={fm?.["hero_headline"] ?? "Join our team"}
        subtitle={fm?.["hero_subline"]}
        backgroundImage={fm?.["hero_image"] ?? "/metanova-assets/services/structural/field-team-sunset.png"}
        videoSrc="/metanova-assets/hero/careers-hero.mp4"
      />

      <section className="bg-[#F5F0E6] py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0A5592]">
              {fm?.["overline"] ?? "CAREERS"}
            </p>
            <h2 className="mt-4 font-medium text-[clamp(2rem,4vw,3rem)] leading-tight text-[#121212]">
              {fm?.["section_heading"] ?? "Build your career at Metanova"}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#121212]/70">
              {fm?.["section_body"]}
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h3 className="mt-16 text-xs font-semibold uppercase tracking-[0.2em] text-[#121212]/50">
              {fm?.["why_heading"] ?? "Why Metanova"}
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {points.map((point, i) => (
                <SpotlightCard key={i}>
                  <div className="flex gap-4">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0A5592]/10">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0A5592"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p className="text-sm leading-relaxed text-[#121212]/80">{point}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <InlineContactForm
        heading={fm?.["form_heading"]}
        subtext={fm?.["form_subtext"]}
      />
    </>
  );
}
