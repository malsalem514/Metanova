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
    title: locale === "fr" ? "Ingénierie en structure" : locale === "zh" ? "结构工程" : "Structural Engineering",
    description:
      locale === "fr"
        ? "Services d'ingénierie en structure pour projets résidentiels, commerciaux et hôteliers. Structures en acier, béton et bois."
        : locale === "zh"
        ? "为住宅、商业及酒店项目提供专业结构工程服务。钢结构、混凝土及木结构。"
        : "Expert structural engineering services for residential, commercial, and hospitality projects. Steel, concrete, and wood structures.",
    alternates: {
      canonical: locale === "fr" ? "/fr/services/ingenierie-structurale" : locale === "zh" ? "/zh/services/structural-engineering" : "/en/services/structural-engineering",
      languages: {
        en: "/en/services/structural-engineering",
        fr: "/fr/services/ingenierie-structurale",
        zh: "/zh/services/structural-engineering",
      },
    },
  };
}

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Structural Engineering",
  description:
    "Comprehensive structural design and analysis services for residential, commercial, and hospitality projects.",
  provider: {
    "@type": "Organization",
    name: "Metanova",
    url: "https://metanova.ca",
  },
  areaServed: { "@type": "State", name: "Quebec" },
  serviceType: "Structural Engineering",
};

const pointsEn = [
  {
    title: "Structural Feasibility & Assessment",
    description:
      "We evaluate site conditions, building requirements, and structural constraints to determine the most efficient and cost-effective structural approach for your project.",
  },
  {
    title: "Structural Design & Load Calculations",
    description:
      "Our team performs detailed structural analysis and load calculations to ensure safety, durability, and regulatory compliance.",
  },
  {
    title: "Concrete, Steel & Wood Design",
    description:
      "We design structural systems tailored to each project's scope, whether reinforced concrete foundations, steel framing systems, or engineered wood structures.",
  },
  {
    title: "Technical Drawings & Engineering Documentation",
    description:
      "We produce permit-ready drawings, structural plans, and detailed technical documentation to support seamless construction execution.",
  },
  {
    title: "Code Compliance & Regulatory Coordination",
    description:
      "We ensure full compliance with Quebec building codes and municipal regulations, reducing delays during approval and inspection processes.",
  },
  {
    title: "Construction Phase Support",
    description:
      "We collaborate with contractors during construction to review structural elements, address site challenges, and maintain engineering integrity throughout execution.",
  },
];

const pointsFr = [
  {
    title: "Faisabilité et évaluation structurale",
    description:
      "Nous évaluons les conditions du site, les exigences du bâtiment et les contraintes structurales pour déterminer l'approche la plus efficace et économique pour votre projet.",
  },
  {
    title: "Conception structurale et calculs de charges",
    description:
      "Notre équipe réalise des analyses structurales détaillées et des calculs de charges pour assurer la sécurité, la durabilité et la conformité réglementaire.",
  },
  {
    title: "Conception en béton, acier et bois",
    description:
      "Nous concevons des systèmes structuraux adaptés à la portée de chaque projet, qu'il s'agisse de fondations en béton armé, de structures en acier ou de structures en bois d'œuvre.",
  },
  {
    title: "Dessins techniques et documentation d'ingénierie",
    description:
      "Nous produisons des dessins prêts pour les permis, des plans structuraux et une documentation technique détaillée pour soutenir une exécution fluide de la construction.",
  },
  {
    title: "Conformité aux codes et coordination réglementaire",
    description:
      "Nous assurons la pleine conformité avec les codes du bâtiment du Québec et les règlements municipaux, réduisant les délais lors des processus d'approbation et d'inspection.",
  },
  {
    title: "Soutien en phase de construction",
    description:
      "Nous collaborons avec les entrepreneurs pendant la construction pour réviser les éléments structuraux, résoudre les défis de chantier et maintenir l'intégrité de l'ingénierie tout au long de l'exécution.",
  },
];

const pointsZh = [
  {
    title: "结构可行性与评估",
    description:
      "我们评估场地条件、建筑要求及结构约束，为您的项目确定最高效、最具成本效益的结构方案。",
  },
  {
    title: "结构设计与荷载计算",
    description:
      "我们的团队进行详细的结构分析与荷载计算，确保安全性、耐久性及规范合规。",
  },
  {
    title: "混凝土、钢结构与木结构设计",
    description:
      "我们根据每个项目的规模量身设计结构体系，无论是钢筋混凝土基础、钢框架体系还是工程木结构。",
  },
  {
    title: "技术图纸与工程文件",
    description:
      "我们制作可直接用于申请许可的图纸、结构施工图及详细技术文件，支持施工的顺畅推进。",
  },
  {
    title: "规范合规与监管协调",
    description:
      "我们确保全面符合魁北克建筑规范及市政法规，减少审批和检查流程中的延误。",
  },
  {
    title: "施工阶段支持",
    description:
      "我们在施工期间与承包商协作，审查结构构件，解决施工现场问题，全程维护工程完整性。",
  },
];

export default async function StructuralEngineeringPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isFr = locale === "fr";
  const isZh = locale === "zh";

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <ServiceDetail
        title={isFr ? "Ingénierie en structure" : isZh ? "结构工程" : "Structural Engineering"}
        subtitle={isFr ? "Nos services" : isZh ? "我们的服务" : "Our Services"}
        description={
          isFr
            ? "Chez Metanova, l'ingénierie en structure va au-delà des calculs — il s'agit de livrer de la clarté, de réduire les risques et de s'assurer que chaque projet repose sur des fondations solides. Nous travaillons étroitement avec les promoteurs, les entrepreneurs et les propriétaires pour concevoir des structures sécuritaires, efficaces et conformes aux codes, alignées avec les réalités de la construction. Notre approche combine rigueur technique et coordination pratique pour faire avancer les projets avec confiance."
            : isZh
            ? "在Metanova，结构工程不仅仅是计算 — 而是提供清晰方向、降低风险，并确保每个项目都建立在坚实的基础之上。我们与开发商、承包商和业主紧密合作，设计安全、高效、符合规范的结构，以满足现实施工需求。我们的方法将严谨的技术与实际协调相结合，让项目充满信心地推进。"
            : "At Metanova, structural engineering is about more than calculations — it is about delivering clarity, reducing risk, and ensuring every project is built on a solid foundation. We work closely with developers, contractors, and property owners to design safe, efficient, and code-compliant structures that align with real-world construction demands. Our approach combines technical rigor with practical coordination to keep projects moving forward confidently."
        }
        heroImage="/metanova-assets/services/structural/site-inspection.jpg"
        videoSrc="/metanova-assets/hero/structural-hero.mp4"
        points={isFr ? pointsFr : isZh ? pointsZh : pointsEn}
      />
      <InlineContactForm
        heading={isFr ? "Travaillons ensemble" : isZh ? "洽谈您的项目" : "Let's Work Together"}
        subtext={
          isFr
            ? "Nous sommes là pour vous aider à réaliser votre projet de construction! Que vous ayez des questions ou que vous souhaitiez discuter de vos idées."
            : isZh
            ? "我们随时准备帮您实现建设项目！无论您有疑问还是想讨论您的想法。"
            : "We're here to help you bring your construction project to life! Whether you have questions, want to discuss your ideas."
        }
      />
    </>
  );
}
