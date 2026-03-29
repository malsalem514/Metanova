import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { InlineContactForm } from "@/components/sections/InlineContactForm";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Real Estate Development",
  description:
    "Strategic real estate development services — site analysis, feasibility studies, land optimization, and project positioning across Quebec.",
  alternates: { canonical: "/services/real-estate-development" },
};

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

const points = [
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

export default function RealEstateDevelopmentPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <ServiceDetail
        title="Real Estate Development"
        subtitle="Our Services"
        description="We support the strategic development of sites by unlocking their full potential and structuring viable, high-performing projects. Our team combines deep market knowledge with hands-on development experience to guide projects from initial concept through approvals and execution."
        heroImage="/metanova-assets/services/development/model-review.png"
        points={points}
      />
      <InlineContactForm
        heading="Let's Work Together"
        subtext="Have a site or project in mind? Let's discuss how we can help you unlock its full potential."
      />
    </>
  );
}
