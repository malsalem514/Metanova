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
    title: locale === "fr" ? "Développement immobilier" : "Real Estate Development",
    description:
      locale === "fr"
        ? "Services stratégiques de développement immobilier — analyse de site, études de faisabilité, optimisation foncière et positionnement de projets à travers le Québec."
        : "Strategic real estate development services — site analysis, feasibility studies, land optimization, and project positioning across Quebec.",
    alternates: {
      canonical: locale === "fr" ? "/fr/services/developpement-immobilier" : "/en/services/real-estate-development",
      languages: {
        en: "/en/services/real-estate-development",
        fr: "/fr/services/developpement-immobilier",
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

export default async function RealEstateDevelopmentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isFr = locale === "fr";

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <ServiceDetail
        title={isFr ? "Développement immobilier" : "Real Estate Development"}
        subtitle={isFr ? "Nos services" : "Our Services"}
        description={
          isFr
            ? "Nous accompagnons le développement stratégique des sites en exploitant leur plein potentiel et en structurant des projets viables et performants. Notre équipe combine une connaissance approfondie du marché avec une expérience concrète en développement pour guider les projets du concept initial jusqu'aux approbations et à l'exécution."
            : "We support the strategic development of sites by unlocking their full potential and structuring viable, high-performing projects. Our team combines deep market knowledge with hands-on development experience to guide projects from initial concept through approvals and execution."
        }
        heroImage="/metanova-assets/services/development/model-review.png"
        points={isFr ? pointsFr : pointsEn}
      />
      <InlineContactForm
        heading={isFr ? "Travaillons ensemble" : "Let's Work Together"}
        subtext={
          isFr
            ? "Vous avez un site ou un projet en tête? Discutons de la façon dont nous pouvons vous aider à exploiter son plein potentiel."
            : "Have a site or project in mind? Let's discuss how we can help you unlock its full potential."
        }
      />
    </>
  );
}
