"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { routing } from "@/i18n/routing";

type Pathname = keyof typeof routing.pathnames;
import { FadeIn } from "@/components/ui/FadeIn";
import { TextReveal } from "@/components/ui/TextReveal";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function CTABanner({
  title = "Let's Talk!",
  subtitle = "Ready to take the first step toward realizing your dream project? Contact us today for a consultation and let's turn your vision into a reality.",
  ctaText = "BUILD PROJECT WITH US",
  ctaHref = "/contact",
}: CTABannerProps) {
  return (
    <section className="relative overflow-hidden py-0">
      {/* Background image with overlay */}
      <div className="relative">
        <Image
          src="/metanova-assets/hero/construction-leadership.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B2E37]/90 via-[#1B2E37]/80 to-[#1B2E37]/60" />

        <div className="relative z-10 mx-auto max-w-[1240px] px-6 py-24 md:py-32">
          <FadeIn>
            <div className="max-w-2xl">
              <TextReveal
                text={title}
                as="h2"
                className="text-[clamp(2rem,4vw,3rem)] leading-tight text-white"
              />
              <p className="mt-6 text-base leading-relaxed text-white/60">
                {subtitle}
              </p>
              <Link href={ctaHref as Pathname} className="mt-8 inline-block">
                <span className="inline-block bg-white px-6 py-3 text-xs font-medium tracking-wider text-[#121212] transition-all duration-300 hover:bg-[#0A5592] hover:text-white">
                  {ctaText}
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
