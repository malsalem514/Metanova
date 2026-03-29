"use client";

import { useLocale } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

interface ValueItem {
  number: string;
  title: string;
  description: string;
}

const valuesEn: ValueItem[] = [
  {
    number: "01",
    title: "Value Engineering",
    description:
      "We integrate value engineering from the earliest stages to optimize design, reduce costs and improve overall project performance\u2014without compromising quality or constructability.",
  },
  {
    number: "02",
    title: "Development-Driven Thinking",
    description:
      "We approach each project with a development perspective, focusing on site optimization, project viability and alignment with market and investment objectives.",
  },
  {
    number: "03",
    title: "Efficient Execution",
    description:
      "We prioritize coordination and clarity to ensure smooth project delivery, maintaining control over timelines, costs and construction realities.",
  },
  {
    number: "04",
    title: "Adaptability",
    description:
      "Our solutions evolve with project constraints, regulatory requirements and market conditions\u2014ensuring flexibility and long-term success.",
  },
];

const valuesFr: ValueItem[] = [
  {
    number: "01",
    title: "Ing\u00e9nierie de valeur",
    description:
      "Nous int\u00e9grons l\u2019ing\u00e9nierie de valeur d\u00e8s les premi\u00e8res \u00e9tapes afin d\u2019optimiser la conception, r\u00e9duire les co\u00fbts et am\u00e9liorer la performance globale du projet \u2014 sans compromettre la qualit\u00e9 ni la constructibilit\u00e9.",
  },
  {
    number: "02",
    title: "Vision orient\u00e9e d\u00e9veloppement",
    description:
      "Nous abordons chaque projet avec une perspective de d\u00e9veloppement, en mettant l\u2019accent sur l\u2019optimisation des sites, la viabilit\u00e9 des projets et l\u2019alignement avec les objectifs du march\u00e9 et des investisseurs.",
  },
  {
    number: "03",
    title: "Ex\u00e9cution efficace",
    description:
      "Nous privil\u00e9gions la coordination et la clart\u00e9 pour assurer une livraison fluide des projets, en maintenant le contr\u00f4le sur les \u00e9ch\u00e9anciers, les co\u00fbts et les r\u00e9alit\u00e9s de construction.",
  },
  {
    number: "04",
    title: "Adaptabilit\u00e9",
    description:
      "Nos solutions \u00e9voluent en fonction des contraintes du projet, des exigences r\u00e9glementaires et des conditions du march\u00e9 \u2014 assurant flexibilit\u00e9 et succ\u00e8s \u00e0 long terme.",
  },
];

interface StatItem {
  target: number;
  suffix: string;
  labelEn: string;
  labelFr: string;
  prefix: string;
}

const stats: StatItem[] = [
  { target: 2022, suffix: "", labelEn: "Founded", labelFr: "Fond\u00e9e", prefix: "" },
  { target: 20, suffix: "+", labelEn: "Years Combined Experience", labelFr: "Ann\u00e9es d\u2019exp\u00e9rience combin\u00e9e", prefix: "" },
  { target: 50, suffix: "+", labelEn: "Projects Delivered", labelFr: "Projets livr\u00e9s", prefix: "" },
];

interface ApproachSectionProps {
  overline?: string;
  heading?: string;
}

export function ApproachSection({ overline, heading }: ApproachSectionProps) {
  const locale = useLocale();
  const isFr = locale === "fr";
  const values = isFr ? valuesFr : valuesEn;

  return (
    <section className="bg-white/60 py-14">
      <div className="mx-auto max-w-[1240px] px-6">
        <FadeIn>
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#121212]/50">
              {overline ?? (isFr ? "Notre approche" : "Our Approach")}
            </p>
            <h2
              className="mt-3 mb-4 text-2xl font-medium leading-tight text-[#121212]"
            >
              {heading ?? (isFr
                ? "Metanova combine la rigueur de l\u2019ing\u00e9nierie \u00e0 une vision de d\u00e9veloppement afin de livrer des projets non seulement r\u00e9alisables, mais \u00e9galement viables financi\u00e8rement et optimis\u00e9s \u00e0 chaque \u00e9tape."
                : "Metanova combines engineering precision with development strategy to deliver projects that are not only buildable, but financially viable and optimized at every stage.")}
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
          {values.map((value, i) => (
            <FadeIn key={value.number} delay={i * 0.08}>
              <div className="flex gap-4 py-3">
                <span className="text-xs font-medium text-[#121212]/30 pt-0.5">
                  {value.number}
                </span>
                <div>
                  <h3 className="text-base font-medium text-[#121212]">
                    {value.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#121212]/60">
                    {value.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Commitment */}
        <FadeIn>
          <p className="mt-10 max-w-3xl text-sm italic leading-relaxed text-[#121212]/60">
            {isFr
              ? "Assurer l\u2019excellence, la satisfaction du client et le succ\u00e8s du projet gr\u00e2ce \u00e0 un contr\u00f4le qualit\u00e9 rigoureux, une communication transparente et un engagement \u00e0 livrer des r\u00e9sultats qui d\u00e9passent les attentes."
              : "Ensuring excellence, client satisfaction, and project success through rigorous quality control, transparent communication, and a commitment to delivering results that exceed expectations."}
          </p>
        </FadeIn>

        {/* Stats */}
        <FadeIn>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.labelEn} className="text-center">
                <div className="text-[clamp(2rem,4vw,3rem)] font-medium text-[#121212]">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    duration={stat.target > 100 ? 2.5 : 2}
                  />
                </div>
                <p className="mt-1 text-sm font-medium text-[#121212]/70">
                  {isFr ? stat.labelFr : stat.labelEn}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
