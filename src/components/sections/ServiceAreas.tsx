"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const areas = [
  "Montérégie",
  "Montréal",
  "South Shore",
  "Laval",
  "Greater Montreal Area",
  "Across Québec",
];

export function ServiceAreas() {
  return (
    <section className="bg-[#F5F0E8] py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#121212]/50">
              Where We Work
            </p>
            <h2 className="mt-4 font-medium text-[clamp(2rem,4vw,3rem)] leading-tight text-[#121212]">
              Service Areas
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#121212]/70">
              At Metanova, we understand the importance of an environment
              conducive to development. We proudly serve the Greater Montreal
              Area.
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-wrap gap-3">
          {areas.map((area, i) => (
            <FadeIn key={area} delay={i * 0.07}>
              <span className="inline-block rounded-none border border-[#121212]/20 bg-white px-5 py-2.5 text-sm font-medium text-[#121212] transition-colors duration-200 hover:border-[#0A5592] hover:text-[#0A5592]">
                {area}
              </span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
