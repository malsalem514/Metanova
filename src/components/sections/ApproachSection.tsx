"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const values = [
  {
    number: "01",
    title: "Value Engineering",
    description:
      "We optimize every project for cost-effectiveness without compromising structural integrity or design intent. Smart solutions that maximize your investment.",
  },
  {
    number: "02",
    title: "Development Thinking",
    description:
      "With deep roots in real estate development, we bring a business-minded approach to engineering. Every decision considers buildability, timeline, and ROI.",
  },
  {
    number: "03",
    title: "Precision Execution",
    description:
      "From initial concept to final inspection, we maintain rigorous quality control and clear communication. No surprises, no delays, no excuses.",
  },
  {
    number: "04",
    title: "Adaptability",
    description:
      "Construction is dynamic. We respond quickly to field conditions, design changes, and regulatory requirements while keeping your project on track.",
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
    <section className="bg-white/60 py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <FadeIn>
          <div className="mb-16 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#C36036]">
              {overline ?? "Our Approach"}
            </p>
            <h2
              className="mt-4 mb-8 font-medium text-[clamp(2rem,4vw,3rem)] leading-tight text-[#121212]"
            >
              {heading ?? "Building with purpose, engineering with precision"}
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          {values.map((value, i) => (
            <FadeIn key={value.number} delay={i * 0.1}>
              <SpotlightCard className="h-full">
                <span className="text-sm font-medium text-[#C36036]">
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
