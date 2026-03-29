"use client";

import { useLocale } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";

const areas = [
  "Mont\u00e9r\u00e9gie",
  "Montr\u00e9al",
  "South Shore",
  "Laval",
  "Greater Montreal Area",
  "Across Qu\u00e9bec",
];

const areasFr = [
  "Mont\u00e9r\u00e9gie",
  "Montr\u00e9al",
  "Rive-Sud",
  "Laval",
  "Grand Montr\u00e9al",
  "\u00c0 travers le Qu\u00e9bec",
];

export function ServiceAreas() {
  const locale = useLocale();
  const isFr = locale === "fr";
  const areaList = isFr ? areasFr : areas;

  return (
    <section className="bg-[#F5F0E8] py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#121212]/50">
              {isFr ? "O\u00f9 nous intervenons" : "Where We Work"}
            </p>
            <h2 className="mt-4 font-medium text-[clamp(2rem,4vw,3rem)] leading-tight text-[#121212]">
              {isFr ? "Zones de service" : "Service Areas"}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#121212]/70">
              {isFr
                ? "Chez Metanova, nous comprenons l\u2019importance d\u2019un environnement propice au d\u00e9veloppement. Nous desservons fi\u00e8rement le Grand Montr\u00e9al."
                : "At Metanova, we understand the importance of an environment conducive to development. We proudly serve the Greater Montreal Area."}
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-wrap gap-3">
          {areaList.map((area, i) => (
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
