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
      "We engage from the earliest design stages to eliminate inefficiencies, simplify structural systems and reduce construction costs. This results in more efficient, financially optimized projects without compromising quality or constructability.",
  },
  {
    number: "02",
    title: "Development-Driven Vision",
    description:
      "Each project is approached as a value-creation opportunity. We assess site potential, validate financial viability and structure projects in alignment with market conditions and investor objectives.",
  },
  {
    number: "03",
    title: "Controlled Execution",
    description:
      "We ensure rigorous and proactive project management, maintaining continuous control over timelines, costs and site conditions. This disciplined execution delivers predictable outcomes and consistent performance.",
  },
  {
    number: "04",
    title: "Strategic Adaptability",
    description:
      "We adapt to the technical, regulatory and economic realities of each project. This flexibility allows us to mitigate risks, secure project viability and maintain performance in complex environments.",
  },
];

const valuesFr: ValueItem[] = [
  {
    number: "01",
    title: "Optimisation des coûts",
    description:
      "Nous intervenons dès les premières étapes de conception afin d'éliminer les inefficiences, simplifier les systèmes et réduire les coûts de réalisation. Cette approche permet d'obtenir des projets plus performants et financièrement optimisés, sans compromis sur la qualité ni la constructibilité.",
  },
  {
    number: "02",
    title: "Vision orientée développement",
    description:
      "Chaque projet est analysé comme une opportunité de création de valeur. Nous évaluons le potentiel du site, validons la viabilité financière et structurons les projets en fonction des réalités du marché et des objectifs des investisseurs.",
  },
  {
    number: "03",
    title: "Exécution maîtrisée",
    description:
      "Nous assurons une gestion de projets rigoureuse et proactive, avec un contrôle constant des échéanciers, des coûts et des enjeux de chantier. Cette discipline d'exécution permet d'assurer des livrables efficaces, prévisibles et performants.",
  },
  {
    number: "04",
    title: "Adaptabilité stratégique",
    description:
      "Nous nous adaptons aux contraintes techniques, réglementaires et économiques propres à chaque projet. Cette flexibilité permet de réduire les risques, sécuriser les projets et maintenir leur performance dans des environnements complexes.",
  },
];

const valuesZh: ValueItem[] = [
  {
    number: "01",
    title: "价值工程",
    description:
      "我们从设计最早期阶段介入，消除低效环节，简化结构系统，降低施工成本。在不牺牲质量与可建造性的前提下，交付更高效、财务更优化的项目。",
  },
  {
    number: "02",
    title: "以开发为导向的愿景",
    description:
      "每个项目都被视为创造价值的机会。我们评估场地潜力，验证财务可行性，并根据市场条件与投资者目标构建项目方案。",
  },
  {
    number: "03",
    title: "精细化执行",
    description:
      "我们确保严格、主动的项目管理，持续管控工期、成本与施工现场条件。这种纪律化执行交付可预测的成果和稳定的绩效表现。",
  },
  {
    number: "04",
    title: "战略适应性",
    description:
      "我们适应每个项目特有的技术、法规和经济现实。这种灵活性使我们能够降低风险、保障项目可行性，并在复杂环境中维持绩效。",
  },
];

interface StatItem {
  target: number;
  suffix: string;
  labelEn: string;
  labelFr: string;
  labelZh: string;
  prefix: string;
}

const stats: StatItem[] = [
  { target: 2022, suffix: "", labelEn: "Founded", labelFr: "Fond\u00e9e", labelZh: "成立年份", prefix: "" },
  { target: 20, suffix: "+", labelEn: "Years Combined Experience", labelFr: "Ann\u00e9es d\u2019exp\u00e9rience combin\u00e9e", labelZh: "年综合经验", prefix: "" },
  { target: 250, suffix: "+", labelEn: "Projects Delivered", labelFr: "Projets livr\u00e9s", labelZh: "已交付项目", prefix: "" },
];

interface ApproachSectionProps {
  overline?: string;
  heading?: string;
}

export function ApproachSection({ overline, heading }: ApproachSectionProps) {
  const locale = useLocale();
  const isFr = locale === "fr";
  const isZh = locale === "zh";
  const values = isFr ? valuesFr : isZh ? valuesZh : valuesEn;

  return (
    <section className="bg-white/60 py-14">
      <div className="mx-auto max-w-[1240px] px-6">
        <FadeIn>
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#121212]/50">
              {overline ?? (isFr ? "Notre approche" : isZh ? "我们的方法" : "Our Approach")}
            </p>
            <h2
              className="mt-3 mb-4 text-2xl font-medium leading-tight text-[#121212]"
            >
              {heading ?? (isFr
                ? "Metanova intègre l'ingénierie en structure, le développement immobilier et la gestion de projets dans une approche unifiée, permettant une intervention dès les premières phases, une maîtrise rigoureuse des coûts et une création de valeur à chaque étape du développement."
                : isZh
                ? "Metanova将结构工程、房地产开发与工程项目管理整合为统一方法，实现早期介入、严格成本管控，并在整个开发过程中持续创造价值。"
                : "Metanova integrates structural engineering, real estate development and project management into a unified approach, enabling early-stage involvement, disciplined cost control and value creation throughout the entire development process.")}
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
              ? "Une approche intégrée axée sur la maîtrise des coûts, la réduction des risques et la création de valeur à long terme."
              : isZh
              ? "以成本管控、风险降低与长期价值创造为核心的一体化方法。"
              : "An integrated approach focused on cost control, risk mitigation and long-term value creation."}
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
                  {isFr ? stat.labelFr : isZh ? stat.labelZh : stat.labelEn}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
