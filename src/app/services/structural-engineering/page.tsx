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
    title: "Structural Design and Analysis",
    description:
      "Creating safe and efficient structures using advanced engineering techniques.",
  },
  {
    title: "Building Assessments and Inspections",
    description:
      "Evaluating existing buildings for safety, compliance, and structural integrity.",
  },
  {
    title: "Renovation and Modernization",
    description:
      "Strengthening and optimizing structures to meet modern standards.",
  },
  {
    title: "Value Engineering",
    description:
      "Optimizing materials and design for cost-effective solutions without compromising safety.",
  },
  {
    title: "Construction Support and Advice",
    description:
      "Providing engineering guidance throughout the building process.",
  },
  {
    title: "Site Support and Construction Supervision",
    description:
      "On-site presence and supervision to ensure the built structure matches the design intent and quality standards.",
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
