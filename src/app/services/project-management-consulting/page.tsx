import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Project Management & Consulting",
  description:
    "End-to-end project management and development consulting services. From feasibility studies to project closeout.",
};

const points = [
  {
    title: "Pre-Construction Planning",
    description:
      "Strategic planning that sets projects up for success. Scope definition, preliminary budgeting, scheduling, and procurement strategy — all before breaking ground.",
  },
  {
    title: "Budget & Schedule Management",
    description:
      "Rigorous cost control and timeline management throughout the project lifecycle. We track every dollar and every deadline, with regular reporting and proactive issue resolution.",
  },
  {
    title: "Contractor Coordination",
    description:
      "Seamless coordination between architects, engineers, general contractors, and trades. We manage the interfaces so you don't have to, ensuring all parties are aligned and accountable.",
  },
  {
    title: "Feasibility Studies",
    description:
      "Comprehensive project feasibility analysis covering technical requirements, regulatory constraints, market conditions, and financial viability. Data-driven decisions from day one.",
  },
  {
    title: "Risk Assessment",
    description:
      "Systematic identification and mitigation of project risks — from permitting delays to supply chain disruptions. We plan for the unexpected so you're never caught off guard.",
  },
  {
    title: "Development Consulting",
    description:
      "Strategic advisory for real estate developers covering site selection, highest-and-best-use analysis, project positioning, and stakeholder management. Development thinking applied to every decision.",
  },
];

export default function ProjectManagementPage() {
  return (
    <>
      <ServiceDetail
        title="Project Management & Consulting"
        subtitle="Our Services"
        description="MetaNova's development division brings over a decade of hands-on project management and real estate development experience. We manage the complexity so you can focus on the big picture — confident that timelines, budgets, and quality targets are being met."
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
