"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const values = [
  {
    number: "01",
    title: "Value Engineering",
    description:
      "We integrate value engineering from the earliest stages to optimize design, reduce costs and improve overall project performance—without compromising quality or constructability.",
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
      "Our solutions evolve with project constraints, regulatory requirements and market conditions—ensuring flexibility and long-term success.",
  },
];

const stats = [
  { target: 2022, suffix: "", label: "Founded", prefix: "" },
  { target: 20, suffix: "+", label: "Years Combined Experience", prefix: "" },
  { target: 50, suffix: "+", label: "Projects Delivered", prefix: "" },
];

interface ApproachSectionProps {
  overline?: string;
  heading?: string;
}

export function ApproachSection({ overline, heading }: ApproachSectionProps) {
  return (
    <section className="bg-white/60 py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <FadeIn>
          <div className="mb-16 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#121212]/50">
              {overline ?? "Our Approach"}
            </p>
            <h2
              className="mt-4 mb-8 font-medium text-[clamp(2rem,4vw,3rem)] leading-tight text-[#121212]"
            >
              {heading ?? "A Strategic Approach to Engineering and Development"}
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          {values.map((value, i) => (
            <FadeIn key={value.number} delay={i * 0.1}>
              <SpotlightCard className="h-full">
                <span className="text-sm font-medium text-[#121212]/40">
                  {value.number}
                </span>
                <h3 className="mt-3 text-xl font-medium text-[#121212]">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#121212]/70">
                  {value.description}
                </p>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>

        {/* Stats */}
        <FadeIn>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[clamp(2.5rem,5vw,3.5rem)] font-medium text-[#121212]">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    duration={stat.target > 100 ? 2.5 : 2}
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-[#121212]/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
