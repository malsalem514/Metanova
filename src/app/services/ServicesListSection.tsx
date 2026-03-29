"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const services = [
  {
    title: "Structural Engineering",
    description:
      "At Metanova, structural engineering is about more than calculations — it is about delivering clarity, reducing risk, and ensuring every project is built on a solid foundation. We work closely with developers, contractors, and property owners to design safe, efficient, and code-compliant structures that align with real-world construction demands.",
    image: "/metanova-assets/services/structural/site-inspection.jpg",
    href: "/services/structural-engineering",
    capabilities: [
      "Structural feasibility & assessment",
      "Structural design & load calculations",
      "Concrete, steel & wood design",
      "Technical drawings & engineering documentation",
      "Code compliance & regulatory coordination",
      "Construction phase support",
    ],
  },
  {
    title: "Real Estate Development",
    description:
      "We support the strategic development of sites by unlocking their full potential and structuring viable, high-performing projects. From site analysis and feasibility studies to zoning coordination and project positioning.",
    image: "/metanova-assets/services/development/model-review.png",
    href: "/services/real-estate-development",
    capabilities: [
      "Site analysis & development potential",
      "Feasibility studies & project structuring",
      "Land optimization & density strategies",
      "Zoning changes & approvals support",
      "Municipal & stakeholder coordination",
      "Concept development & project positioning",
    ],
  },
  {
    title: "Project Management & Development Consulting",
    description:
      "We provide end-to-end project management and development consulting for residential and mixed-use projects across Quebec. From strategic planning and zoning coordination to construction oversight, we guide projects from concept to completion with clarity, structure, and accountability.",
    image: "/metanova-assets/services/project-management/city-overlay-hardhat.png",
    href: "/services/project-management-consulting",
    capabilities: [
      "Budgeting & financial forecasting",
      "Scheduling & milestone control",
      "Zoning amendments & municipal coordination",
      "Infrastructure planning & contractor oversight",
      "Risk management & regulatory strategy",
    ],
  },
];

export function ServicesListSection() {
  return (
    <section className="py-24">
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
                      className="font-medium text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight text-[#121212]"
                    >
                      {service.title}
                    </h2>
                    <p className="mt-6 text-base leading-relaxed text-[#121212]/70">
                      {service.description}
                    </p>
                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {service.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-start gap-2 text-sm text-[#121212]/70"
                        >
                          <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0A5592]" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={service.href}
                      className="mt-8 inline-block bg-[#121212] px-5 py-2.5 text-xs font-normal text-white transition-opacity duration-300 hover:opacity-80"
                    >
                      Learn more
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
