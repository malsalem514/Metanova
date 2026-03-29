"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";

const cards = [
  {
    label: "Vision",
    title: "Redefining how structures are designed and delivered",
    text: "We envision a construction industry where engineering excellence and development acumen work in concert, producing buildings that are structurally superior, economically optimized, and built to last.",
  },
  {
    label: "Mission",
    title: "Engineering that serves the bottom line",
    text: "To deliver structural engineering and project management services that combine technical rigor with real-world development thinking, ensuring every project maximizes value for its stakeholders.",
  },
  {
    label: "Core Value",
    title: "Integrity in every detail",
    text: "From the calculations behind our designs to the relationships we build with clients, integrity is the foundation of everything we do. We say what we mean, deliver what we promise, and stand behind our work.",
  },
];

export function AboutInlineSections() {
  return (
    <>
      {/* Vision / Mission / Core Value */}
      <section className="bg-white py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {cards.map((card, i) => (
              <FadeIn key={card.label} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-[#DBE2E6] bg-[#F3F6F7] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-black/5">
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#C36036]">
                    {card.label}
                  </p>
                  <h3
                    className="mt-4 mb-6 text-2xl leading-tight text-[#1B2E37]"
                    style={{ fontFamily: "var(--font-dm-serif-display)" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#30454C]/60">
                    {card.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Beginnings story */}
      <section className="bg-[#F3F6F7] py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#C36036]">
                  Our Beginnings
                </p>
                <h2
                  className="mt-4 mb-6 text-[clamp(2rem,4vw,3rem)] leading-tight text-[#1B2E37]"
                  style={{ fontFamily: "var(--font-dm-serif-display)" }}
                >
                  Two brothers, one shared vision
                </h2>
                <p className="text-base leading-relaxed text-[#30454C]/60">
                  MetaNova was founded by Suddam and Muhannad Al-Salem — a structural
                  engineer and a real estate developer — who saw an opportunity to create
                  a firm that truly understands both sides of the construction equation.
                </p>
                <p className="mt-4 text-base leading-relaxed text-[#30454C]/60">
                  Where traditional engineering firms focus purely on technical compliance,
                  and developers often lack deep structural expertise, MetaNova bridges
                  both worlds. The result is smarter designs, faster approvals, and
                  projects that make financial and structural sense from day one.
                </p>
                <p className="mt-4 text-base leading-relaxed text-[#30454C]/60">
                  Based in Brossard, Quebec, MetaNova serves clients across the Greater
                  Montreal area and beyond, with a growing portfolio spanning residential,
                  hospitality, and commercial sectors.
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
