"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

interface ServiceItem {
  titleEn: string;
  titleFr: string;
  descriptionEn: string;
  descriptionFr: string;
  image: string;
  href: "/services/structural-engineering" | "/services/real-estate-development" | "/services/project-management-consulting";
  capabilitiesEn: string[];
  capabilitiesFr: string[];
}

const services: ServiceItem[] = [
  {
    titleEn: "Structural Engineering",
    titleFr: "Ingénierie en structure",
    descriptionEn:
      "At Metanova, structural engineering is about more than calculations — it is about delivering clarity, reducing risk, and ensuring every project is built on a solid foundation. We work closely with developers, contractors, and property owners to design safe, efficient, and code-compliant structures that align with real-world construction demands.",
    descriptionFr:
      "Chez Metanova, l'ingénierie en structure va au-delà des calculs — il s'agit de livrer de la clarté, de réduire les risques et de s'assurer que chaque projet repose sur des fondations solides. Nous travaillons étroitement avec les promoteurs, les entrepreneurs et les propriétaires pour concevoir des structures sécuritaires, efficaces et conformes aux codes, alignées avec les réalités de la construction.",
    image: "/metanova-assets/services/structural/construction-cranes.jpg",
    href: "/services/structural-engineering",
    capabilitiesEn: [
      "Structural feasibility & assessment",
      "Structural design & load calculations",
      "Concrete, steel & wood design",
      "Technical drawings & engineering documentation",
      "Code compliance & regulatory coordination",
      "Construction phase support",
    ],
    capabilitiesFr: [
      "Faisabilité et évaluation structurale",
      "Conception structurale et calculs de charges",
      "Conception en béton, acier et bois",
      "Dessins techniques et documentation d'ingénierie",
      "Conformité aux codes et coordination réglementaire",
      "Soutien en phase de construction",
    ],
  },
  {
    titleEn: "Real Estate Development",
    titleFr: "Développement immobilier",
    descriptionEn:
      "We support the strategic development of sites by unlocking their full potential and structuring viable, high-performing projects. From site analysis and feasibility studies to zoning coordination and project positioning.",
    descriptionFr:
      "Nous accompagnons le développement stratégique des sites en exploitant leur plein potentiel et en structurant des projets viables et performants. De l'analyse de site et des études de faisabilité à la coordination du zonage et au positionnement du projet.",
    image: "/metanova-assets/services/development/aerial-masterplan.jpg",
    href: "/services/real-estate-development",
    capabilitiesEn: [
      "Site analysis & development potential",
      "Feasibility studies & project structuring",
      "Land optimization & density strategies",
      "Zoning changes & approvals support",
      "Municipal & stakeholder coordination",
      "Concept development & project positioning",
    ],
    capabilitiesFr: [
      "Analyse de site et potentiel de développement",
      "Études de faisabilité et structuration de projets",
      "Optimisation foncière et stratégies de densité",
      "Soutien aux changements de zonage et approbations",
      "Coordination municipale et avec les parties prenantes",
      "Développement de concepts et positionnement de projets",
    ],
  },
  {
    titleEn: "Project Management & Development Consulting",
    titleFr: "Gestion de projets et consultation en développement",
    descriptionEn:
      "We provide end-to-end project management and development consulting for residential and mixed-use projects across Quebec. From strategic planning and zoning coordination to construction oversight, we guide projects from concept to completion with clarity, structure, and accountability.",
    descriptionFr:
      "Nous offrons une gestion de projets et une consultation en développement de bout en bout pour les projets résidentiels et à usage mixte à travers le Québec. De la planification stratégique et la coordination du zonage à la surveillance de la construction, nous guidons les projets du concept à la réalisation avec clarté, structure et responsabilité.",
    image: "/metanova-assets/services/project-management/city-overlay-hardhat.png",
    href: "/services/project-management-consulting",
    capabilitiesEn: [
      "Budgeting & financial forecasting",
      "Scheduling & milestone control",
      "Zoning amendments & municipal coordination",
      "Infrastructure planning & contractor oversight",
      "Risk management & regulatory strategy",
    ],
    capabilitiesFr: [
      "Budget et prévisions financières",
      "Planification et contrôle des jalons",
      "Modifications de zonage et coordination municipale",
      "Planification des infrastructures et supervision des entrepreneurs",
      "Gestion des risques et stratégie réglementaire",
    ],
  },
];

export function ServicesListSection() {
  const t = useTranslations("cta");
  const locale = useLocale();
  const isFr = locale === "fr";

  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="space-y-24">
          {services.map((service, index) => (
            <FadeIn key={service.titleEn}>
              <div
                className={`grid items-center gap-12 lg:grid-cols-2 ${index % 2 === 1 ? "lg:direction-rtl" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <SpotlightCard className="border-none bg-transparent p-0 hover:shadow-none hover:translate-y-0">
                    <h2
                      className="font-medium text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight text-[#121212]"
                    >
                      {isFr ? service.titleFr : service.titleEn}
                    </h2>
                    <p className="mt-6 text-base leading-relaxed text-[#121212]/70">
                      {isFr ? service.descriptionFr : service.descriptionEn}
                    </p>
                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {(isFr ? service.capabilitiesFr : service.capabilitiesEn).map((cap) => (
                        <li
                          key={cap}
                          className="flex items-start gap-2 text-sm text-[#121212]/70"
                        >
                          <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0A5592]" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={service.href}
                      className="mt-8 inline-block bg-[#121212] px-5 py-2.5 text-xs font-normal text-white transition-opacity duration-300 hover:opacity-80"
                    >
                      {t("learnMore")}
                    </Link>
                  </SpotlightCard>
                </div>
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <Image
                    src={service.image}
                    alt={isFr ? service.titleFr : service.titleEn}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
