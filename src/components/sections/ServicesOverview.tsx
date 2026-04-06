"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

type ServiceHref = "/services/structural-engineering" | "/services/real-estate-development" | "/services/project-management-consulting";

interface ServiceCardData {
  titleEn: string;
  titleFr: string;
  descriptionEn: string;
  descriptionFr: string;
  image: string;
  href: ServiceHref;
}

const services: ServiceCardData[] = [
  {
    titleEn: "Structural Engineering",
    titleFr: "Ingénierie en structure",
    descriptionEn:
      "Expert structural design and analysis for residential, commercial, and hospitality projects. Steel, concrete, and wood structures engineered to the highest standards.",
    descriptionFr:
      "Conception et analyse structurale experte pour projets résidentiels, commerciaux et hôteliers. Structures en acier, béton et bois conçues selon les normes les plus élevées.",
    image: "/metanova-assets/hero/construction-leadership.webp",
    href: "/services/structural-engineering",
  },
  {
    titleEn: "Real Estate Development",
    titleFr: "Développement immobilier",
    descriptionEn:
      "From feasibility studies to project delivery, we bring a developer's perspective to every stage. Strategic site analysis, financial modeling, and execution.",
    descriptionFr:
      "Des études de faisabilité à la livraison du projet, nous apportons une perspective de développement à chaque étape. Analyse stratégique de site, modélisation financière et exécution.",
    image: "/metanova-assets/services/development/site-model-overview.webp",
    href: "/services/real-estate-development",
  },
  {
    titleEn: "Project Management",
    titleFr: "Gestion de projets",
    descriptionEn:
      "End-to-end project oversight ensuring quality, timeline, and budget targets are met. Coordination across all disciplines from concept to completion.",
    descriptionFr:
      "Supervision de projet de bout en bout assurant le respect de la qualité, des échéanciers et des budgets. Coordination de toutes les disciplines du concept à la réalisation.",
    image: "/metanova-assets/services/project-management/timeline-interface.webp",
    href: "/services/project-management-consulting",
  },
];

interface ServicesOverviewProps {
  overline?: string;
  heading?: string;
}

export function ServicesOverview({ overline, heading }: ServicesOverviewProps) {
  const t = useTranslations("cta");
  const locale = useLocale();
  const isFr = locale === "fr";

  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <FadeIn>
          <div className="mb-16 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#121212]/50">
              {overline ?? "OUR SERVICE"}
            </p>
            <h2
              className="mt-4 mb-8 font-medium text-[clamp(2rem,4vw,3rem)] leading-tight text-[#121212]"
            >
              {heading ?? "Comprehensive Engineering, Development and Project management, from planning to completion"}
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <FadeIn key={service.titleEn} delay={i * 0.1}>
              <Link href={service.href} className="group block">
                <SpotlightCard className="h-full rounded-2xl p-0">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
                    <Image
                      src={service.image}
                      alt={isFr ? service.titleFr : service.titleEn}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-medium text-[#121212]">
                      {isFr ? service.titleFr : service.titleEn}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#121212]/70">
                      {isFr ? service.descriptionFr : service.descriptionEn}
                    </p>
                    <span className="mt-4 inline-block bg-[#121212] px-5 py-2.5 text-xs font-normal text-white transition-opacity duration-300 group-hover:opacity-80">
                      {t("learnMore")}
                    </span>
                  </div>
                </SpotlightCard>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
