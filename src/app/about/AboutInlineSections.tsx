"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

interface AboutInlineSectionsProps {
  content?: Record<string, string>;
}

const stats = [
  { target: 2022, label: "Founded", suffix: "" },
  { target: 20, label: "Years Combined Experience", suffix: "+" },
  { target: 3, label: "Sectors Served", suffix: "" },
];

export function AboutInlineSections({ content }: AboutInlineSectionsProps) {
  const cards = [
    {
      label: content?.["vision_heading"] ?? "Our Vision",
      title: "",
      text: content?.["vision_text"] ?? "To be a leading partner in structural engineering and real estate development, supporting the creation of large-scale, high-impact projects across Quebec.",
    },
    {
      label: content?.["mission_heading"] ?? "Our Mission",
      title: "",
      text: content?.["mission_text"] ?? "To deliver optimized, value-engineered solutions that enhance project viability, reduce costs, and support efficient execution—from early-stage planning to construction.",
    },
    {
      label: content?.["core_value_heading"] ?? "Core Value",
      title: "",
      text: content?.["core_value_text"] ?? "We prioritize clarity, efficiency and results-driven thinking—delivering solutions that align engineering performance with financial objectives and real-world construction constraints.",
    },
  ];

  return (
    <>
      {/* Vision / Mission / Core Value */}
      <section className="py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {cards.map((card, i) => (
              <FadeIn key={card.label} delay={i * 0.1}>
                <SpotlightCard className="h-full rounded-2xl">
                  <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#121212]/50">
                    {card.label}
                  </p>
                  {card.title && (
                    <h3
                      className="mt-4 mb-8 text-2xl font-medium leading-tight text-[#121212]"
                    >
                      {card.title}
                    </h3>
                  )}
                  <p className="mt-4 text-sm leading-relaxed text-[#121212]/70">
                    {card.text}
                  </p>
                </SpotlightCard>
              </FadeIn>
            ))}
          </div>

          {/* Stats row */}
          <FadeIn>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-[clamp(2.5rem,5vw,3.5rem)] font-medium text-[#121212]">
                    <AnimatedCounter
                      target={stat.target}
                      suffix={stat.suffix}
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

      {/* Beginnings story */}
      <section className="bg-white/60 py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#121212]/50">
                  {content?.["beginnings_overline"] ?? "Our Beginnings"}
                </p>
                <h2
                  className="mt-4 mb-8 font-medium text-[clamp(2rem,4vw,3rem)] leading-tight text-[#121212]"
                >
                  {content?.["beginnings_heading"] ?? "Two brothers, one shared vision"}
                </h2>
                <p className="text-base leading-relaxed text-[#121212]/70">
                  {content?.["beginnings_p1"] ?? "MetaNova was founded by Suddam and Muhannad Al-Salem — a structural engineer and a real estate developer — who saw an opportunity to create a firm that truly understands both sides of the construction equation."}
                </p>
                <p className="mt-6 text-base leading-relaxed text-[#121212]/70">
                  {content?.["beginnings_p2"] ?? "Where traditional engineering firms focus purely on technical compliance, and developers often lack deep structural expertise, MetaNova bridges both worlds. The result is smarter designs, faster approvals, and projects that make financial and structural sense from day one."}
                </p>
                {(content?.["beginnings_p3"]) && (
                  <p className="mt-6 text-base leading-relaxed text-[#121212]/70">
                    {content["beginnings_p3"]}
                  </p>
                )}
              </div>
            </FadeIn>
            <FadeIn delay={0.15} direction="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm">
                <Image
                  src="/metanova-assets/people/founders-portrait-new.jpg"
                  alt="MetaNova founders"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* A Practical and Strategic Approach */}
      <section className="py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <FadeIn>
            <div className="mb-12 max-w-2xl">
              <h2 className="font-medium text-[clamp(2rem,4vw,3rem)] leading-tight text-[#121212]">
                {content?.["strategic_heading"] ?? "A Practical and Strategic Approach"}
              </h2>
            </div>
          </FadeIn>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: content?.["strategic_point1_title"] ?? "Development-Oriented",
                text: content?.["strategic_point1_text"] ?? "We approach each mandate with a focus on project viability, optimization and long-term value.",
              },
              {
                title: content?.["strategic_point2_title"] ?? "Value Engineering",
                text: content?.["strategic_point2_text"] ?? "We integrate cost optimization strategies from the earliest stages of design.",
              },
              {
                title: content?.["strategic_point3_title"] ?? "Integrated Execution",
                text: content?.["strategic_point3_text"] ?? "We ensure coordination between all stakeholders to support efficient and predictable delivery.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <SpotlightCard className="h-full rounded-2xl">
                  <h3 className="text-xl font-medium text-[#121212]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#121212]/70">
                    {item.text}
                  </p>
                </SpotlightCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
