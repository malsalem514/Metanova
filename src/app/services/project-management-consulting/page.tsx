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
    name: "MetaNova",
    url: "https://metanova.ca",
  },
  areaServed: { "@type": "State", name: "Quebec" },
  serviceType: "Project Management",
};

const points = [
  {
    title: "Strategic Planning and Feasibility",
    description:
      "Market studies, financial analyses, feasibility assessments, and regulatory navigation to ensure every project starts on a solid foundation.",
  },
  {
    title: "Project Management and Coordination",
    description:
      "End-to-end oversight from land acquisition to construction completion, with full stakeholder coordination to keep timelines and budgets on track.",
  },
  {
    title: "Sustainable and Innovative Development",
    description:
      "Responsible land use practices, sustainability integration, and meaningful community engagement to deliver projects that stand the test of time.",
  },
  {
    title: "Site Selection and Land Acquisition",
    description:
      "Identifying and securing the right sites for development through rigorous market analysis and due diligence.",
  },
  {
    title: "Feasibility Studies and Market Analysis",
    description:
      "Comprehensive financial and market assessments to validate project viability before commitment.",
  },
  {
    title: "Regulatory Compliance and Zoning Support",
    description:
      "Expert navigation of municipal regulations, zoning requirements, and permitting processes across Quebec.",
  },
  {
    title: "Project Financing and Investment Strategies",
    description:
      "Structuring financing solutions and investment strategies that align with project goals and stakeholder expectations.",
  },
  {
    title: "Master Planning and Urban Integration",
    description:
      "Holistic master planning that integrates seamlessly with urban fabric and community needs.",
  },
  {
    title: "Development and Construction Oversight",
    description:
      "Active oversight throughout the development and construction phases to ensure quality, compliance, and delivery on commitments.",
  },
  {
    title: "Stakeholder Engagement and Public Consultation",
    description:
      "Proactive engagement with communities, municipalities, and stakeholders to build consensus and support for development projects.",
  },
];

export default function ProjectManagementPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <ServiceDetail
        title="Real Estate Development"
        subtitle="Our Services"
        description="MetaNova's development division brings strategic vision and hands-on expertise to every real estate project. From initial feasibility through construction completion, we navigate complexity so you can focus on results — confident that every decision is grounded in market insight, regulatory knowledge, and responsible development principles."
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
