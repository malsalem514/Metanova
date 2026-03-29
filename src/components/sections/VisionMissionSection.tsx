"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const pillars = [
  {
    label: "Our Vision",
    text: "To be a leading partner in structural engineering and real estate development, supporting the creation of large-scale, high-impact projects across Quebec.",
  },
  {
    label: "Our Mission",
    text: "To deliver optimized, value-engineered solutions that enhance project viability, reduce costs, and support efficient execution—from early-stage planning to construction.",
  },
  {
    label: "Core Value",
    text: "We prioritize clarity, efficiency and results-driven thinking—delivering solutions that align engineering performance with financial objectives and real-world construction constraints.",
  },
];

export function VisionMissionSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid gap-12 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <FadeIn key={pillar.label} delay={i * 0.1}>
              <div>
                <h3 className="text-[20px] font-medium leading-tight text-[#121212]">
                  {pillar.label}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.4] text-[#121212]/80">
                  {pillar.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
