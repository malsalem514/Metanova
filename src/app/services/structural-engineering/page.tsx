import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Structural Engineering",
  description:
    "Expert structural engineering services for residential, commercial, and hospitality projects. Steel, concrete, and wood structures.",
  alternates: { canonical: "/services/structural-engineering" },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Structural Engineering",
  description:
    "Comprehensive structural design and analysis services for residential, commercial, and hospitality projects.",
  provider: {
    "@type": "Organization",
    name: "MetaNova",
    url: "https://metanova.ca",
  },
  areaServed: { "@type": "State", name: "Quebec" },
  serviceType: "Structural Engineering",
};

const points = [
  {
    title: "New Construction Design",
    description:
      "Complete structural design packages for new buildings — from foundations to roof systems. We work across steel, concrete, and wood framing to find the optimal structural solution for your project's requirements and budget.",
  },
  {
    title: "Renovation & Retrofit",
    description:
      "Structural engineering for building modifications, additions, and seismic upgrades. We assess existing conditions, design reinforcements, and provide construction-ready documentation for retrofit projects.",
  },
  {
    title: "Structural Assessments",
    description:
      "Condition assessments, load capacity evaluations, and structural investigations for existing buildings. We provide clear, actionable reports that help owners make informed decisions about their properties.",
  },
  {
    title: "Foundation Engineering",
    description:
      "Design of spread footings, mat foundations, pile systems, and specialized foundation solutions. We work closely with geotechnical engineers to ensure cost-effective, safe foundation designs.",
  },
  {
    title: "Building Code Compliance",
    description:
      "Expert navigation of Canadian building codes (NBC, CNBC) and Quebec-specific regulations. We ensure your designs meet all structural requirements and facilitate smooth permit approvals.",
  },
  {
    title: "Construction Support",
    description:
      "On-site inspections, shop drawing review, and construction-phase engineering support. We stay involved through construction to ensure the built structure matches the design intent.",
  },
];

export default function StructuralEngineeringPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <ServiceDetail
        title="Structural Engineering"
        subtitle="Our Services"
        description="MetaNova's engineering division provides comprehensive structural design and analysis services. Led by licensed engineers with deep expertise in steel, concrete, and wood structures, we deliver designs that are safe, efficient, and buildable — always with an eye toward value engineering."
        heroImage="/metanova-assets/services/structural/site-inspection.jpg"
        points={points}
      />
      <CTABanner
        title="Need structural engineering for your project?"
        subtitle="From initial concept to construction support, our engineering team is ready to help."
        ctaText="Get a Quote"
      />
    </>
  );
}
