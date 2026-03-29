"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";

export function EditorialSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* Left column - large text */}
          <FadeIn>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#C36036]">
                Our Story
              </p>
              <p className="mt-6 text-[18px] leading-[1.6] text-[#121212]/80">
                MetaNova was founded by two brothers — a structural engineer and
                a real estate developer — who saw an opportunity to create a firm
                that truly understands both sides of the construction equation.
                Where traditional engineering firms focus purely on technical
                compliance, and developers often lack deep structural expertise,
                MetaNova bridges both worlds. The result is smarter designs,
                faster approvals, and projects that make financial and structural
                sense from day one.
              </p>
              <p className="mt-6 text-[18px] leading-[1.6] text-[#121212]/80">
                Based in Brossard, Quebec, MetaNova serves clients across the
                Greater Montreal area and beyond, with a growing portfolio
                spanning residential, hospitality, and commercial sectors.
              </p>
            </div>
          </FadeIn>

          {/* Right column - two stacked images */}
          <FadeIn delay={0.15}>
            <div className="space-y-6">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/metanova-assets/people/founders-portrait.jpg"
                  alt="MetaNova founders"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src="/metanova-assets/hero/construction-leadership.png"
                  alt="Montreal aerial city view"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
