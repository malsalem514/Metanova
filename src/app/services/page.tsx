import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Services",
  description:
    "MetaNova offers structural engineering, real estate development, and project management services across Quebec and beyond.",
};

const services = [
  {
    title: "Structural Engineering",
    description:
      "Complete structural design and analysis services for new construction, renovations, and assessments. Our team of licensed engineers works across steel, concrete, and wood structures to deliver safe, efficient, and code-compliant designs.",
    image: "/metanova-assets/services/structural/site-inspection.jpg",
    href: "/services/structural-engineering",
    capabilities: [
      "Structural design for new buildings",
      "Renovation and retrofit engineering",
      "Structural assessments and inspections",
      "Foundation design",
      "Steel, concrete, and wood structures",
      "Building code compliance review",
    ],
  },
  {
    title: "Project Management & Development Consulting",
    description:
      "From pre-construction planning through project closeout, we provide hands-on project management and development consulting that keeps your project on time, on budget, and on target.",
    image: "/metanova-assets/services/project-management/city-overlay-hardhat.png",
    href: "/services/project-management-consulting",
    capabilities: [
      "Pre-construction planning",
      "Budget and schedule management",
      "Contractor coordination",
      "Risk assessment and mitigation",
      "Feasibility studies",
      "Development consulting",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <HeroSection
        title="What we do"
        subtitle="Integrated services that cover every stage of the building lifecycle — from first sketch to final inspection."
        backgroundImage="/metanova-assets/services/structural/field-team-sunset.png"
      />

      <section className="bg-[#0C0C0C] py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid items-center gap-12 lg:grid-cols-2 ${index % 2 === 1 ? "lg:direction-rtl" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <h2
                    className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight text-[#F5F0EB]"
                    style={{ fontFamily: "var(--font-dm-serif-display)" }}
                  >
                    {service.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[#8A8278]">
                    {service.description}
                  </p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {service.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-start gap-2 text-sm text-[#8A8278]"
                      >
                        <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#C36036]" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.href}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#C36036] transition-colors hover:text-[#D4724A]"
                  >
                    Learn more &rarr;
                  </Link>
                </div>
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
