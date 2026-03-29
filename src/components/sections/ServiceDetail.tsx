"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";

interface ServicePoint {
  title: string;
  description: string;
}

interface ServiceDetailProps {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  points: ServicePoint[];
  ctaText?: string;
}

export function ServiceDetail({
  title,
  subtitle,
  description,
  heroImage,
  points,
  ctaText = "Discuss Your Project",
}: ServiceDetailProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B2E37]/50 via-[#1B2E37]/30 to-[#1B2E37]/70" />
        <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 pb-16 pt-32">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#C36036]">
            {subtitle}
          </p>
          <h1
            className="mt-4 max-w-3xl font-medium text-[clamp(2.5rem,5vw,4rem)] leading-[1.2] text-white"
          >
            {title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-32">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
            <FadeIn>
              <div>
                <p className="text-lg leading-relaxed text-[#121212]/70">
                  {description}
                </p>
                <Link href="/contact" className="mt-8 inline-block">
                  <Button className="h-12 rounded-full bg-[#C36036] px-8 text-base text-white transition-all duration-300 hover:bg-[#A04E2A] hover:shadow-lg hover:shadow-[#C36036]/25 hover:scale-[1.02]">
                    {ctaText}
                  </Button>
                </Link>
              </div>
            </FadeIn>
            <div className="space-y-6">
              {points.map((point, i) => (
                <FadeIn key={point.title} delay={i * 0.08}>
                  <div className="rounded-2xl border border-[#E8E0D0] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C36036]/20 hover:shadow-md hover:shadow-[#C36036]/5">
                    <div className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C36036]/10 text-sm font-semibold text-[#C36036]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-lg font-medium text-[#121212]">
                          {point.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#121212]/70">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
