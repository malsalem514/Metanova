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
      label: content?.["vision_label"] ?? "Vision",
      title: content?.["vision_title"] ?? "Redefining how structures are designed and delivered",
      text: content?.["vision_text"] ?? "We envision a construction industry where engineering excellence and development acumen work in concert, producing buildings that are structurally superior, economically optimized, and built to last.",
    },
    {
      label: content?.["mission_label"] ?? "Mission",
      title: content?.["mission_title"] ?? "Engineering that serves the bottom line",
      text: content?.["mission_text"] ?? "To deliver structural engineering and project management services that combine technical rigor with real-world development thinking, ensuring every project maximizes value for its stakeholders.",
    },
    {
      label: content?.["core_value_label"] ?? "Core Value",
      title: content?.["core_value_title"] ?? "Integrity in every detail",
      text: content?.["core_value_text"] ?? "From the calculations behind our designs to the relationships we build with clients, integrity is the foundation of everything we do. We say what we mean, deliver what we promise, and stand behind our work.",
    },
  ];

  return (
    <>
      {/* Vision / Mission / Core Value */}
      <section className="py-32">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {cards.map((card, i) => (
              <FadeIn key={card.label} delay={i * 0.1}>
                <SpotlightCard className="h-full rounded-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#C36036]">
                    {card.label}
                  </p>
                  <h3
                    className="mt-4 mb-8 text-2xl leading-tight text-[#1B2E37]"
                    style={{ fontFamily: "var(--font-dm-serif-display)" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#30454C]/80">
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
                  <div className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-[#1B2E37]">
                    <AnimatedCounter
                      target={stat.target}
                      suffix={stat.suffix}
                      duration={stat.target > 100 ? 2.5 : 2}
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium text-[#30454C]/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Beginnings story */}
      <section className="bg-white/60 py-32">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#C36036]">
                  {content?.["beginnings_overline"] ?? "Our Beginnings"}
                </p>
                <h2
                  className="mt-4 mb-8 text-[clamp(2rem,4vw,3rem)] leading-tight text-[#1B2E37]"
                  style={{ fontFamily: "var(--font-dm-serif-display)" }}
                >
                  {content?.["beginnings_heading"] ?? "Two brothers, one shared vision"}
                </h2>
                <p className="text-base leading-relaxed text-[#30454C]/80">
                  {content?.["beginnings_p1"] ?? "MetaNova was founded by Suddam and Muhannad Al-Salem — a structural engineer and a real estate developer — who saw an opportunity to create a firm that truly understands both sides of the construction equation."}
                </p>
                <p className="mt-6 text-base leading-relaxed text-[#30454C]/80">
                  {content?.["beginnings_p2"] ?? "Where traditional engineering firms focus purely on technical compliance, and developers often lack deep structural expertise, MetaNova bridges both worlds. The result is smarter designs, faster approvals, and projects that make financial and structural sense from day one."}
                </p>
                <p className="mt-6 text-base leading-relaxed text-[#30454C]/80">
                  {content?.["beginnings_p3"] ?? "Based in Brossard, Quebec, MetaNova serves clients across the Greater Montreal area and beyond, with a growing portfolio spanning residential, hospitality, and commercial sectors."}
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15} direction="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm">
                <Image
                  src="/metanova-assets/people/founders-portrait.jpg"
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
    </>
  );
}
