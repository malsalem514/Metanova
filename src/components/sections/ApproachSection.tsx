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
    title: "Cost Optimization",
    description:
      "We engage from the design phase to eliminate inefficiencies, simplify structural solutions and reduce construction costs. This approach delivers higher-performing, better-controlled and financially optimized projects without compromising quality or constructability.",
  },
  {
    number: "02",
    title: "Development-Driven Vision",
    description:
      "Every project is analyzed as a value-creation opportunity. We optimize site potential, validate financial viability and structure projects based on market realities and investor expectations.",
  },
  {
    number: "03",
    title: "Controlled Execution",
    description:
      "We ensure proactive and rigorous project management with constant control over timelines, costs and site challenges. This execution discipline guarantees efficient delivery with a high level of predictability and performance.",
  },
  {
    number: "04",
    title: "Strategic Adaptability",
    description:
      "We evolve with the technical, regulatory and economic constraints specific to each project. This adaptability allows us to secure projects, mitigate risks and maintain performance in complex environments.",
  },
];

const valuesFr: ValueItem[] = [
  {
    number: "01",
    title: "Optimisation des coûts",
    description:
      "Nous intervenons dès la conception afin d'éliminer les inefficiences, simplifier les solutions structurales et réduire les coûts de construction. Cette approche permet de livrer des projets plus performants, mieux contrôlés et financièrement optimisés, sans compromis sur la qualité ni la constructibilité.",
  },
  {
    number: "02",
    title: "Vision orientée développement",
    description:
      "Chaque projet est analysé comme une opportunité de création de valeur. Nous optimisons le potentiel des sites, validons la viabilité financière et structurons les projets en fonction des réalités du marché et des attentes des investisseurs.",
  },
  {
    number: "03",
    title: "Exécution maîtrisée",
    description:
      "Nous assurons une gestion proactive et rigoureuse des projets, avec un contrôle constant des échéanciers, des coûts et des enjeux de chantier. Cette discipline d'exécution garantit des projets livrés efficacement, avec un haut niveau de prévisibilité et de performance.",
  },
  {
    number: "04",
    title: "Adaptabilité stratégique",
    description:
      "Nous évoluons avec les contraintes techniques, réglementaires et économiques propres à chaque projet. Cette capacité d'adaptation nous permet de sécuriser les projets, de limiter les risques et de maintenir leur performance dans des contextes complexes.",
  },
];

const valuesZh: ValueItem[] = [
  {
    number: "01",
    title: "成本优化",
    description:
      "我们从设计阶段介入，消除低效环节，简化结构方案，降低施工成本。这一方法在不牺牲质量与可建造性的前提下，交付性能更优、管控更严、财务更优化的项目。",
  },
  {
    number: "02",
    title: "以开发为导向的愿景",
    description:
      "每个项目都被视为创造价值的机会。我们优化场地潜力，验证财务可行性，并根据市场现实与投资者预期构建项目方案。",
  },
  {
    number: "03",
    title: "精细化执行",
    description:
      "我们对项目实施主动、严格的工程项目管理，持续管控工期、成本与施工现场挑战。这种执行纪律确保项目高效交付，具备高度可预测性与高水准表现。",
  },
  {
    number: "04",
    title: "战略适应性",
    description:
      "我们随每个项目特有的技术、法规和经济约束不断调整。这种适应能力使我们能够保障项目安全推进、降低风险，并在复杂环境中维持项目绩效。",
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
                ? "Metanova intègre le génie en structure, le développement immobilier et la gestion de projets dans une approche unifiée, permettant d'intervenir en amont, de maîtriser les coûts et de maximiser la valeur des projets à chaque étape."
                : isZh
                ? "Metanova将结构工程、房地产开发与工程项目管理整合为统一方法，实现前期介入、成本管控，并在项目各阶段最大化价值。"
                : "Metanova integrates structural engineering, real estate development and project management into a unified approach, enabling early-stage involvement, cost control and value maximization at every project stage.")}
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
              ? "Une approche intégrée axée sur la maîtrise des coûts, la réduction des risques et la création de valeur durable."
              : isZh
              ? "以成本管控、风险降低与持续价值创造为核心的一体化方法。"
              : "An integrated approach focused on cost control, risk reduction and lasting value creation."}
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
