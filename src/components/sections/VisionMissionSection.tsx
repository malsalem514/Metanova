"use client";

import { useLocale } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";

const pillarsEn = [
  {
    label: "Our Vision",
    text: "To be a leading partner in structural engineering and real estate development, supporting the creation of large-scale, high-impact projects across Quebec.",
  },
  {
    label: "Our Mission",
    text: "To deliver optimized, value-engineered solutions that enhance project viability, reduce costs, and support efficient execution\u2014from early-stage planning to construction.",
  },
  {
    label: "Core Value",
    text: "We prioritize clarity, efficiency and results-driven thinking\u2014delivering solutions that align engineering performance with financial objectives and real-world construction constraints.",
  },
];

const pillarsFr = [
  {
    label: "Notre vision",
    text: "\u00catre un partenaire de premier plan en ing\u00e9nierie en structure et en d\u00e9veloppement immobilier, contribuant \u00e0 la r\u00e9alisation de projets d\u2019envergure \u00e0 fort impact \u00e0 travers le Qu\u00e9bec.",
  },
  {
    label: "Notre mission",
    text: "Offrir des solutions optimis\u00e9es, fond\u00e9es sur l\u2019analyse d\u2019optimisation des co\u00fbts, afin d\u2019am\u00e9liorer la viabilit\u00e9 des projets, r\u00e9duire les co\u00fbts et soutenir une ex\u00e9cution efficace \u2014 de la planification initiale jusqu\u2019\u00e0 la construction.",
  },
  {
    label: "Nos valeurs",
    text: "Nous privil\u00e9gions la clart\u00e9, l\u2019efficacit\u00e9 et une approche orient\u00e9e r\u00e9sultats, en proposant des solutions qui alignent la performance en structure avec les objectifs financiers et les r\u00e9alit\u00e9s du chantier.",
  },
];

export function VisionMissionSection() {
  const locale = useLocale();
  const pillars = locale === "fr" ? pillarsFr : pillarsEn;

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
