"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

interface ServiceItem {
  titleEn: string;
  titleFr: string;
  titleZh: string;
  descriptionEn: string;
  descriptionFr: string;
  descriptionZh: string;
  image: string;
  href: "/services/structural-engineering" | "/services/real-estate-development" | "/services/project-management-consulting";
  capabilitiesEn: string[];
  capabilitiesFr: string[];
  capabilitiesZh: string[];
}

const services: ServiceItem[] = [
  {
    titleEn: "Structural Engineering",
    titleFr: "Ingénierie en structure",
    titleZh: "结构工程",
    descriptionEn:
      "At Metanova, structural engineering is about more than calculations — it is about delivering clarity, reducing risk, and ensuring every project is built on a solid foundation. We work closely with developers, contractors, and property owners to design safe, efficient, and code-compliant structures that align with real-world construction demands.",
    descriptionFr:
      "Chez Metanova, l'ingénierie en structure va au-delà des calculs — il s'agit de livrer de la clarté, de réduire les risques et de s'assurer que chaque projet repose sur des fondations solides. Nous travaillons étroitement avec les promoteurs, les entrepreneurs et les propriétaires pour concevoir des structures sécuritaires, efficaces et conformes aux codes, alignées avec les réalités de la construction.",
    descriptionZh:
      "在Metanova，结构工程不仅仅是计算 — 而是提供清晰方向、降低风险，并确保每个项目都建立在坚实的基础之上。我们与开发商、承包商和业主紧密合作，设计安全、高效、符合规范的结构，以满足现实施工需求。",
    image: "/metanova-assets/services/structural/construction-cranes.webp",
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
    capabilitiesZh: [
      "结构可行性与评估",
      "结构设计与荷载计算",
      "混凝土、钢结构与木结构设计",
      "技术图纸与工程文件",
      "规范合规与监管协调",
      "施工阶段支持",
    ],
  },
  {
    titleEn: "Real Estate Development",
    titleFr: "Développement immobilier",
    titleZh: "房地产开发",
    descriptionEn:
      "We support the strategic development of sites by unlocking their full potential and structuring viable, high-performing projects. From site analysis and feasibility studies to zoning coordination and project positioning.",
    descriptionFr:
      "Nous accompagnons le développement stratégique des sites en exploitant leur plein potentiel et en structurant des projets viables et performants. De l'analyse de site et des études de faisabilité à la coordination du zonage et au positionnement du projet.",
    descriptionZh:
      "我们支持场地的战略性开发，挖掘其全部潜力，并构建可行、高绩效的项目方案。从场地分析、可行性研究到用地规划协调与项目定位，全程陪伴。",
    image: "/metanova-assets/services/development/aerial-masterplan.webp",
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
    capabilitiesZh: [
      "场地分析与开发潜力",
      "可行性研究与项目架构",
      "土地优化与密度策略",
      "用地规划变更与审批支持",
      "市政及利益相关方协调",
      "概念开发与项目定位",
    ],
  },
  {
    titleEn: "Project Management & Development Consulting",
    titleFr: "Gestion de projets et consultation en développement",
    titleZh: "工程项目管理与开发咨询",
    descriptionEn:
      "We provide end-to-end project management and development consulting for residential and mixed-use projects across Quebec. From strategic planning and zoning coordination to construction oversight, we guide projects from concept to completion with clarity, structure, and accountability.",
    descriptionFr:
      "Nous offrons une gestion de projets et une consultation en développement de bout en bout pour les projets résidentiels et à usage mixte à travers le Québec. De la planification stratégique et la coordination du zonage à la surveillance de la construction, nous guidons les projets du concept à la réalisation avec clarté, structure et responsabilité.",
    descriptionZh:
      "我们为魁北克各地的住宅及综合用途项目提供全程工程项目管理与开发咨询服务。从战略规划、用地规划协调到施工监督，我们以清晰、有序、负责任的方式引导项目从概念走向竣工。",
    image: "/metanova-assets/services/project-management/city-overlay-hardhat.webp",
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
    capabilitiesZh: [
      "预算编制与财务预测",
      "进度排期与里程碑管控",
      "用地规划修订与市政协调",
      "基础设施规划与承包商监督",
      "风险管理与监管策略",
    ],
  },
];

export function ServicesListSection() {
  const t = useTranslations("cta");
  const locale = useLocale();
  const isFr = locale === "fr";
  const isZh = locale === "zh";

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
                      {isFr ? service.titleFr : isZh ? service.titleZh : service.titleEn}
                    </h2>
                    <p className="mt-6 text-base leading-relaxed text-[#121212]/70">
                      {isFr ? service.descriptionFr : isZh ? service.descriptionZh : service.descriptionEn}
                    </p>
                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {(isFr ? service.capabilitiesFr : isZh ? service.capabilitiesZh : service.capabilitiesEn).map((cap) => (
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
                    alt={isFr ? service.titleFr : isZh ? service.titleZh : service.titleEn}
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
