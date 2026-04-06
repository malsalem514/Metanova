import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { InlineContactForm } from "@/components/sections/InlineContactForm";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Développement immobilier" : locale === "zh" ? "房地产开发" : "Real Estate Development",
    description:
      locale === "fr"
        ? "Services stratégiques de développement immobilier — analyse de site, études de faisabilité, optimisation foncière et positionnement de projets à travers le Québec."
        : locale === "zh"
        ? "战略性房地产开发服务 — 场地分析、可行性研究、土地优化及魁北克全省项目定位。"
        : "Strategic real estate development services — site analysis, feasibility studies, land optimization, and project positioning across Quebec.",
    alternates: {
      canonical: locale === "fr" ? "/fr/services/developpement-immobilier" : locale === "zh" ? "/zh/services/real-estate-development" : "/en/services/real-estate-development",
      languages: {
        en: "/en/services/real-estate-development",
        fr: "/fr/services/developpement-immobilier",
        zh: "/zh/services/real-estate-development",
      },
    },
  };
}

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Real Estate Development",
  description:
    "Strategic real estate development consulting — from site analysis and feasibility studies to project structuring and stakeholder coordination.",
  provider: {
    "@type": "Organization",
    name: "Metanova",
    url: "https://metanova.ca",
  },
  areaServed: { "@type": "State", name: "Quebec" },
  serviceType: "Real Estate Development",
};

const pointsEn = [
  {
    title: "Site Analysis & Development Potential",
    description:
      "We assess sites to identify their full development potential, evaluating zoning, density, access, and market positioning to inform strategic decisions.",
  },
  {
    title: "Feasibility Studies & Project Structuring",
    description:
      "We conduct detailed feasibility analyses covering financial viability, regulatory requirements, and market conditions to structure projects for success.",
  },
  {
    title: "Land Optimization & Density Strategies",
    description:
      "We develop strategies to maximize land use and density, balancing regulatory constraints with financial objectives to unlock the highest project value.",
  },
  {
    title: "Support in Zoning Changes & Approvals",
    description:
      "We guide projects through zoning amendments, variance applications, and municipal approval processes to keep development timelines on track.",
  },
  {
    title: "Coordination with Municipalities & Stakeholders",
    description:
      "We manage relationships with municipal authorities, community stakeholders, and regulatory bodies to ensure smooth project advancement.",
  },
  {
    title: "Concept Development & Project Positioning",
    description:
      "We help shape project concepts and market positioning to align with investor objectives, community needs, and long-term value creation.",
  },
];

const pointsFr = [
  {
    title: "Analyse de site et potentiel de développement",
    description:
      "Nous évaluons les sites pour identifier leur plein potentiel de développement, en analysant le zonage, la densité, l'accès et le positionnement de marché pour éclairer les décisions stratégiques.",
  },
  {
    title: "Études de faisabilité et structuration de projets",
    description:
      "Nous réalisons des analyses de faisabilité détaillées couvrant la viabilité financière, les exigences réglementaires et les conditions du marché pour structurer les projets de façon optimale.",
  },
  {
    title: "Optimisation foncière et stratégies de densité",
    description:
      "Nous élaborons des stratégies pour maximiser l'utilisation du terrain et la densité, en équilibrant les contraintes réglementaires avec les objectifs financiers pour maximiser la valeur du projet.",
  },
  {
    title: "Soutien aux changements de zonage et approbations",
    description:
      "Nous accompagnons les projets à travers les modifications de zonage, les demandes de dérogation et les processus d'approbation municipale pour maintenir les échéanciers de développement.",
  },
  {
    title: "Coordination avec les municipalités et parties prenantes",
    description:
      "Nous gérons les relations avec les autorités municipales, les parties prenantes communautaires et les organismes réglementaires pour assurer l'avancement fluide des projets.",
  },
  {
    title: "Développement de concepts et positionnement de projets",
    description:
      "Nous aidons à façonner les concepts de projets et le positionnement de marché pour s'aligner avec les objectifs des investisseurs, les besoins de la communauté et la création de valeur à long terme.",
  },
];

const pointsZh = [
  {
    title: "场地分析与开发潜力",
    description:
      "我们评估场地，识别其全部开发潜力，分析用地规划、密度、通达性和市场定位，为战略决策提供依据。",
  },
  {
    title: "可行性研究与项目架构",
    description:
      "我们进行详细的可行性分析，涵盖财务可行性、法规要求和市场条件，以优化方式构建项目架构。",
  },
  {
    title: "土地优化与密度策略",
    description:
      "我们制定最大化土地使用率和密度的策略，在法规约束与财务目标之间取得平衡，挖掘项目最高价值。",
  },
  {
    title: "用地规划变更与审批支持",
    description:
      "我们引导项目完成用地规划修订、差异申请及市政审批流程，确保开发时间表顺利推进。",
  },
  {
    title: "市政及利益相关方协调",
    description:
      "我们管理与市政机构、社区利益相关方及监管部门的关系，确保项目顺利推进。",
  },
  {
    title: "概念开发与项目定位",
    description:
      "我们协助塑造项目概念与市场定位，使其与投资者目标、社区需求及长期价值创造相契合。",
  },
];

export default async function RealEstateDevelopmentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isFr = locale === "fr";
  const isZh = locale === "zh";

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <ServiceDetail
        title={isFr ? "Développement immobilier" : isZh ? "房地产开发" : "Real Estate Development"}
        subtitle={isFr ? "Nos services" : isZh ? "我们的服务" : "Our Services"}
        description={
          isFr
            ? "Nous accompagnons le développement stratégique des sites en exploitant leur plein potentiel et en structurant des projets viables et performants. Notre équipe combine une connaissance approfondie du marché avec une expérience concrète en développement pour guider les projets du concept initial jusqu'aux approbations et à l'exécution."
            : isZh
            ? "我们支持场地的战略性开发，挖掘其全部潜力，并构建可行、高绩效的项目方案。我们的团队将深厚的市场知识与实际的开发经验相结合，引导项目从初步概念经审批直至执行落地。"
            : "We support the strategic development of sites by unlocking their full potential and structuring viable, high-performing projects. Our team combines deep market knowledge with hands-on development experience to guide projects from initial concept through approvals and execution."
        }
        heroImage="/metanova-assets/services/development/model-review.webp"
        videoSrc="/metanova-assets/hero/realestate-hero.mp4"
        points={isFr ? pointsFr : isZh ? pointsZh : pointsEn}
      />
      <InlineContactForm
        heading={isFr ? "Travaillons ensemble" : isZh ? "洽谈您的项目" : "Let's Work Together"}
        subtext={
          isFr
            ? "Vous avez un site ou un projet en tête? Discutons de la façon dont nous pouvons vous aider à exploiter son plein potentiel."
            : isZh
            ? "有意向的场地或项目？让我们讨论如何帮您挖掘其全部潜力。"
            : "Have a site or project in mind? Let's discuss how we can help you unlock its full potential."
        }
      />
    </>
  );
}
