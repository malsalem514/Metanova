"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

interface AboutInlineSectionsProps {
  content?: Record<string, string>;
}

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

        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" className="bg-white/60 py-24 scroll-mt-20">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#121212]/50">
                  {content?.["story_overline"] ?? "OUR STORY"}
                </p>
                <h2
                  className="mt-4 mb-8 font-medium text-[clamp(2rem,4vw,3rem)] leading-tight text-[#121212]"
                >
                  {content?.["story_heading"] ?? "Engineering Expertise Driving Real Estate Development"}
                </h2>
                <p className="text-base leading-relaxed text-[#121212]/70">
                  {content?.["story_p1"] ?? ""}
                </p>
                <p className="mt-6 text-base leading-relaxed text-[#121212]/70">
                  {content?.["story_p2"] ?? ""}
                </p>
                {content?.["story_p3"] && (
                  <p className="mt-6 text-base leading-relaxed text-[#121212]/70">
                    {content["story_p3"]}
                  </p>
                )}
                {content?.["story_p4"] && (
                  <p className="mt-6 text-base leading-relaxed text-[#121212]/70">
                    {content["story_p4"]}
                  </p>
                )}
                {content?.["story_p5"] && (
                  <p className="mt-6 text-base leading-relaxed text-[#121212]/70">
                    {content["story_p5"]}
                  </p>
                )}
              </div>
            </FadeIn>
            <FadeIn delay={0.15} direction="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm">
                <Image
                  src="/metanova-assets/hero/about-our-story.jpeg"
                  alt="Metanova — Our Story"
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
