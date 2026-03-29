"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
import { TextReveal } from "@/components/ui/TextReveal";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function CTABanner({
  title = "Ready to start your next project?",
  subtitle = "Let's discuss how MetaNova can bring your vision to life with expert engineering and development services.",
  ctaText = "Contact Us",
  ctaHref = "/contact",
}: CTABannerProps) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#C36036] to-[#8B3A1A] p-12 md:p-16">
            <BackgroundBeams />
            <div className="relative z-10 max-w-2xl">
              <TextReveal
                text={title}
                as="h2"
                className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight text-white"
              />
              <p className="mt-6 text-lg leading-relaxed text-white/75">
                {subtitle}
              </p>
              <Link href={ctaHref} className="mt-8 inline-block">
                <ShimmerButton className="bg-white text-[#1B2E37] font-semibold hover:bg-white/90 hover:shadow-black/10">
                  {ctaText}
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
