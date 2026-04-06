import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Gestion de projets et consultation" : locale === "zh" ? "工程项目管理与咨询" : "Project Management & Consulting",
    description:
      locale === "fr"
        ? "Services de gestion de projets et de consultation en développement de bout en bout. Des études de faisabilité à la clôture du projet."
        : locale === "zh"
        ? "全程工程项目管理与开发咨询服务。从可行性研究到项目收尾。"
        : "End-to-end project management and development consulting services. From feasibility studies to project closeout.",
    alternates: {
      canonical: locale === "fr" ? "/fr/services/gestion-de-projet" : locale === "zh" ? "/zh/services/project-management-consulting" : "/en/services/project-management-consulting",
      languages: {
        en: "/en/services/project-management-consulting",
        fr: "/fr/services/gestion-de-projet",
        zh: "/zh/services/project-management-consulting",
      },
    },
  };
}

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Project Management & Development Consulting",
  description:
    "End-to-end project management and development consulting for residential and mixed-use projects across Quebec.",
  provider: {
    "@type": "Organization",
    name: "Metanova",
    url: "https://metanova.ca",
  },
  areaServed: { "@type": "State", name: "Quebec" },
  serviceType: "Project Management",
};

const pointsEn = [
  {
    title: "Budgeting & Financial Forecasting",
    description:
      "We develop detailed project budgets and financial forecasts to keep your investment on track from planning through delivery.",
  },
  {
    title: "Scheduling & Milestone Control",
    description:
      "We build rigorous project schedules and manage milestones to ensure timely delivery without compromising quality.",
  },
  {
    title: "Zoning Amendments & Municipal Coordination",
    description:
      "We navigate zoning amendments, municipal processes, and regulatory requirements to move projects forward efficiently.",
  },
  {
    title: "Infrastructure Planning & Contractor Oversight",
    description:
      "We plan infrastructure needs and provide active oversight of contractors throughout the construction phase.",
  },
  {
    title: "Risk Management & Regulatory Strategy",
    description:
      "We identify and mitigate project risks early, aligning regulatory strategy with project goals to reduce delays and exposure.",
  },
];

const pointsFr = [
  {
    title: "Budget et prévisions financières",
    description:
      "Nous élaborons des budgets de projet détaillés et des prévisions financières pour assurer le bon déroulement de votre investissement, de la planification à la livraison.",
  },
  {
    title: "Planification et contrôle des jalons",
    description:
      "Nous élaborons des échéanciers de projet rigoureux et gérons les jalons pour assurer une livraison dans les délais prévus sans compromettre la qualité.",
  },
  {
    title: "Modifications de zonage et coordination municipale",
    description:
      "Nous accompagnons les projets à travers les modifications de zonage, les processus municipaux et les exigences réglementaires pour les faire avancer efficacement.",
  },
  {
    title: "Planification des infrastructures et supervision des entrepreneurs",
    description:
      "Nous planifions les besoins en infrastructures et assurons une supervision active des entrepreneurs tout au long de la phase de construction.",
  },
  {
    title: "Gestion des risques et stratégie réglementaire",
    description:
      "Nous identifions et atténuons les risques de projet tôt, en alignant la stratégie réglementaire avec les objectifs du projet pour réduire les délais et les risques.",
  },
];

const pointsZh = [
  {
    title: "预算编制与财务预测",
    description:
      "我们制定详细的项目预算与财务预测，确保您的投资从规划到交付始终处于正轨。",
  },
  {
    title: "进度排期与里程碑管控",
    description:
      "我们制定严格的项目进度计划，管理里程碑节点，确保在不影响质量的前提下按时交付。",
  },
  {
    title: "用地规划修订与市政协调",
    description:
      "我们协助项目完成用地规划修订、市政流程及法规要求，高效推进项目进展。",
  },
  {
    title: "基础设施规划与承包商监督",
    description:
      "我们规划基础设施需求，并在整个施工阶段对承包商实施积极监督。",
  },
  {
    title: "风险管理与监管策略",
    description:
      "我们尽早识别并降低项目风险，将监管策略与项目目标相协调，以减少延误和风险暴露。",
  },
];

export default async function ProjectManagementPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isFr = locale === "fr";
  const isZh = locale === "zh";

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <ServiceDetail
        title={isFr ? "Gestion de projets et consultation en développement" : isZh ? "工程项目管理与开发咨询" : "Project Management & Development Consulting"}
        subtitle={isFr ? "Nos services" : isZh ? "我们的服务" : "Our Services"}
        description={
          isFr
            ? "Nous offrons une gestion de projets et une consultation en développement de bout en bout pour les projets résidentiels et à usage mixte à travers le Québec. De la planification stratégique et la coordination du zonage à la surveillance de la construction, nous guidons les projets du concept à la réalisation avec clarté, structure et responsabilité."
            : isZh
            ? "我们为魁北克各地的住宅及综合用途项目提供全程工程项目管理与开发咨询服务。从战略规划、用地规划协调到施工监督，我们以清晰、有序、负责任的方式引导项目从概念走向竣工。"
            : "We provide end-to-end project management and development consulting for residential and mixed-use projects across Quebec. From strategic planning and zoning coordination to construction oversight, we guide projects from concept to completion with clarity, structure, and accountability."
        }
        heroImage="/metanova-assets/services/project-management/city-overlay-hardhat.webp"
        videoSrc="/metanova-assets/hero/project-mgmt-hero.mp4"
        points={isFr ? pointsFr : isZh ? pointsZh : pointsEn}
      />
      <CTABanner
        title={
          isFr
            ? "Vous cherchez du soutien en gestion de projets?"
            : isZh
            ? "需要工程项目管理支持？"
            : "Looking for project management support?"
        }
        subtitle={
          isFr
            ? "Laissez-nous alléger la complexité. Contactez-nous pour discuter de vos besoins de projet."
            : isZh
            ? "让我们为您化繁为简。联系我们，讨论您的项目需求。"
            : "Let us take the complexity off your plate. Reach out to discuss your project needs."
        }
        ctaText={isFr ? "Démarrer une conversation" : isZh ? "开始对话" : "Start a Conversation"}
      />
    </>
  );
}
