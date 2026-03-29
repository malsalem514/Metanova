import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { InlineContactForm } from "@/components/sections/InlineContactForm";
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
    name: "Metanova",
    url: "https://metanova.ca",
  },
  areaServed: { "@type": "State", name: "Quebec" },
  serviceType: "Structural Engineering",
};

const points = [
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

export default function StructuralEngineeringPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <ServiceDetail
        title="Structural Engineering"
        subtitle="Our Services"
        description="At Metanova, structural engineering is about more than calculations — it is about delivering clarity, reducing risk, and ensuring every project is built on a solid foundation. We work closely with developers, contractors, and property owners to design safe, efficient, and code-compliant structures that align with real-world construction demands. Our approach combines technical rigor with practical coordination to keep projects moving forward confidently."
        heroImage="/metanova-assets/services/structural/site-inspection.jpg"
        points={points}
      />
      <InlineContactForm
        heading="Let's Work Together"
        subtext="We're here to help you bring your construction project to life! Whether you have questions, want to discuss your ideas."
      />
    </>
  );
}
