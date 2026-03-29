import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Project Management & Consulting",
  description:
    "End-to-end project management and development consulting services. From feasibility studies to project closeout.",
  alternates: { canonical: "/services/project-management-consulting" },
};

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

const points = [
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

export default function ProjectManagementPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <ServiceDetail
        title="Project Management & Development Consulting"
        subtitle="Our Services"
        description="We provide end-to-end project management and development consulting for residential and mixed-use projects across Quebec. From strategic planning and zoning coordination to construction oversight, we guide projects from concept to completion with clarity, structure, and accountability."
        heroImage="/metanova-assets/services/project-management/city-overlay-hardhat.png"
        points={points}
      />
      <CTABanner
        title="Looking for project management support?"
        subtitle="Let us take the complexity off your plate. Reach out to discuss your project needs."
        ctaText="Start a Conversation"
      />
    </>
  );
}
