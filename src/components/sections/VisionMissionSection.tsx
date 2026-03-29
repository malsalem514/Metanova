"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const pillars = [
  {
    label: "Our Vision",
    text: "To be the trusted engineering partner for developers across Greater Montreal.",
  },
  {
    label: "Our Mission",
    text: "To deliver structurally sound, code-compliant solutions that protect timelines, control costs, and support successful project execution.",
  },
  {
    label: "Core Value",
    text: "We value transparency, efficiency, and practical problem-solving \u2014 delivering engineering solutions that align with both construction realities and business objectives.",
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
