"use client";

import { Link } from "@/i18n/navigation";
import type { routing } from "@/i18n/routing";

type Pathname = keyof typeof routing.pathnames;
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
  title = "Let's Talk!",
  subtitle = "Ready to take the first step toward realizing your dream project? Contact us today for a consultation and let's turn your vision into a reality.",
  ctaText = "BUILD PROJECT WITH US",
  ctaHref = "/contact",
}: CTABannerProps) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A5592] to-[#8B3A1A] p-12 md:p-16">
            <BackgroundBeams />
            <div className="relative z-10 max-w-2xl">
              <TextReveal
                text={title}
                as="h2"
                className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight text-white"
              />
              <p className="mt-8 text-lg leading-relaxed text-white/75">
                {subtitle}
              </p>
              <Link href={ctaHref as Pathname} className="mt-8 inline-block">
                <ShimmerButton className="bg-white text-[#121212] font-normal">
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
