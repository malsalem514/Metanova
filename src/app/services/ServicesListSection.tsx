"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

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

export function ServicesListSection() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="space-y-24">
          {services.map((service, index) => (
            <FadeIn key={service.title}>
              <div
                className={`grid items-center gap-12 lg:grid-cols-2 ${index % 2 === 1 ? "lg:direction-rtl" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <SpotlightCard className="border-none bg-transparent p-0 hover:shadow-none hover:translate-y-0">
                    <h2
                      className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight text-[#1B2E37]"
                      style={{ fontFamily: "var(--font-dm-serif-display)" }}
                    >
                      {service.title}
                    </h2>
                    <p className="mt-6 text-base leading-relaxed text-[#30454C]/80">
                      {service.description}
                    </p>
                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {service.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-start gap-2 text-sm text-[#30454C]/80"
                        >
                          <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#C36036]" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={service.href}
                      className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#C36036] transition-colors duration-300 hover:text-[#A04E2A]"
                    >
                      Learn more &rarr;
                    </Link>
                  </SpotlightCard>
                </div>
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
