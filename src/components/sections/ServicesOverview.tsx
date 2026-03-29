"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const services = [
  {
    title: "Structural Engineering",
    description:
      "Expert structural design and analysis for residential, commercial, and hospitality projects. Steel, concrete, and wood structures engineered to the highest standards.",
    image: "/metanova-assets/services/structural/field-team-sunset.png",
    href: "/services/structural-engineering",
  },
  {
    title: "Real Estate Development",
    description:
      "From feasibility studies to project delivery, we bring a developer's perspective to every stage. Strategic site analysis, financial modeling, and execution.",
    image: "/metanova-assets/services/development/model-review.png",
    href: "/services/real-estate-development",
  },
  {
    title: "Project Management",
    description:
      "End-to-end project oversight ensuring quality, timeline, and budget targets are met. Coordination across all disciplines from concept to completion.",
    image: "/metanova-assets/services/project-management/city-overlay-hardhat.png",
    href: "/services/project-management-consulting",
  },
];

interface ServicesOverviewProps {
  overline?: string;
  heading?: string;
}

export function ServicesOverview({ overline, heading }: ServicesOverviewProps) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <FadeIn>
          <div className="mb-16 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#121212]/50">
              {overline ?? "OUR SERVICE"}
            </p>
            <h2
              className="mt-4 mb-8 font-medium text-[clamp(2rem,4vw,3rem)] leading-tight text-[#121212]"
            >
              {heading ?? "Comprehensive Engineering, Development and Project management, from planning to completion"}
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.1}>
              <Link href={service.href} className="group block">
                <SpotlightCard className="h-full rounded-2xl p-0">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-medium text-[#121212]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#121212]/70">
                      {service.description}
                    </p>
                    <span className="mt-4 inline-block bg-[#121212] px-5 py-2.5 text-xs font-normal text-white transition-opacity duration-300 group-hover:opacity-80">
                      Learn more
                    </span>
                  </div>
                </SpotlightCard>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
