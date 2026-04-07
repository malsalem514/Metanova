"use client";

import { FadeIn } from "@/components/ui/FadeIn";

interface WhyUsSectionProps {
  content?: Record<string, string>;
}

export function WhyUsSection({ content }: WhyUsSectionProps) {
  const items = [
    { title: content?.["whyus_1_title"] ?? "", text: content?.["whyus_1_text"] ?? "" },
    { title: content?.["whyus_2_title"] ?? "", text: content?.["whyus_2_text"] ?? "" },
    { title: content?.["whyus_3_title"] ?? "", text: content?.["whyus_3_text"] ?? "" },
    { title: content?.["whyus_4_title"] ?? "", text: content?.["whyus_4_text"] ?? "" },
    { title: content?.["whyus_5_title"] ?? "", text: content?.["whyus_5_text"] ?? "" },
    { title: content?.["whyus_6_title"] ?? "", text: content?.["whyus_6_text"] ?? "" },
  ];

  return (
    <section id="why-us" className="py-24 scroll-mt-20">
      <div className="mx-auto max-w-[1240px] px-6">
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#121212]/50">
              {content?.["whyus_overline"] ?? "WHY METANOVA"}
            </p>
            <h2 className="mt-4 mb-6 font-medium text-[clamp(2rem,4vw,3rem)] leading-tight text-[#121212]">
              {content?.["whyus_heading"] ?? "Why Metanova"}
            </h2>
            <p className="text-base leading-relaxed text-[#121212]/70">
              {content?.["whyus_intro"] ?? ""}
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="flex gap-4 rounded-2xl border border-[#E8E0D0] bg-white p-6">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0A5592]/10 text-xs font-semibold text-[#0A5592]">
                  {String(i + 1)}
                </span>
                <div>
                  <h3 className="text-base font-medium text-[#121212]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#121212]/60">
                    {item.text}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
