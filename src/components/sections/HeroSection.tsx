"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { TextReveal } from "@/components/ui/TextReveal";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  overlay?: boolean;
  videoSrc?: string;
}

export function HeroSection({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  overlay = true,
  videoSrc,
}: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[85dvh] items-end overflow-hidden">
      {/* Background: static image (always renders as base layer) */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Video overlays the image when provided — preload="none" so video doesn't block LCP */}
      {videoSrc && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={backgroundImage}
          className="absolute inset-0 z-[1] h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      {overlay && (
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#1B2E37]/70 via-[#1B2E37]/50 to-[#1B2E37]/80" />
      )}
      <div className="relative z-[3] mx-auto w-full max-w-[1240px] px-6 pb-20 pt-32">
        <TextReveal
          text={title}
          as="h1"
          className="max-w-3xl font-heading text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] tracking-tight text-white"
        />
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
          >
            {subtitle}
          </motion.p>
        )}
        {(ctaText || secondaryCtaText) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            className="mt-8 flex flex-wrap gap-4"
          >
            {ctaText && ctaHref && (
              <Link href={ctaHref}>
                <Button className="h-12 rounded-full bg-[#C36036] px-8 text-base text-white transition-all duration-300 hover:bg-[#A04E2A] hover:shadow-lg hover:shadow-[#C36036]/25 hover:scale-[1.02]">
                  {ctaText}
                </Button>
              </Link>
            )}
            {secondaryCtaText && secondaryCtaHref && (
              <Link href={secondaryCtaHref}>
                <Button
                  variant="outline"
                  className="h-12 rounded-full border-white/30 px-8 text-base text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
                >
                  {secondaryCtaText}
                </Button>
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
