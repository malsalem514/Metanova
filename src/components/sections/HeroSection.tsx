"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { TextReveal } from "@/components/ui/TextReveal";
import { Button } from "@/components/ui/button";

interface HeroStat {
  value: string;
  label: string;
}

interface HeroTestimonial {
  quote: string;
  author: string;
  rating?: number;
}

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
  stats?: HeroStat[];
  testimonial?: HeroTestimonial;
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
  stats,
  testimonial,
}: HeroSectionProps) {
  const hasRightColumn = (stats && stats.length > 0) || testimonial;

  return (
    <section className="relative flex h-dvh items-end overflow-hidden">
      {/* Background: static image (always renders as base layer) */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Video: dual-source (WebM first for Chrome/Firefox, MP4 fallback), poster for LCP */}
      {videoSrc && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/metanova-assets/hero/home-hero-poster.jpg"
          className="absolute inset-0 z-[1] h-full w-full object-cover"
          aria-label="Construction site timelapse video"
        >
          <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      {overlay && (
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#0a1520]/40 via-[#0a1520]/20 to-[#0a1520]/60" />
      )}
      <div className="relative z-[3] mx-auto w-full max-w-[1240px] px-6 pb-20 pt-32">
        <div className={hasRightColumn ? "grid items-end gap-12 md:grid-cols-[1fr_auto]" : ""}>
          {/* Left column — headline, subtitle, CTAs */}
          <div>
            <TextReveal
              text={title}
              as="h1"
              className="max-w-3xl font-medium text-[clamp(2.5rem,6vw,4rem)] leading-[1.2] text-white"
            />
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                className="mt-8 max-w-xl text-lg leading-relaxed text-white/70"
              >
                {subtitle}
              </motion.p>
            )}
            {(ctaText || secondaryCtaText) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                className="mt-10 flex flex-wrap gap-4"
              >
                {ctaText && ctaHref && (
                  <Link href={ctaHref}>
                    <Button className="h-auto rounded-none bg-white px-5 py-2.5 text-xs font-normal text-[#121212] transition-opacity duration-300 hover:opacity-80">
                      {ctaText}
                    </Button>
                  </Link>
                )}
                {secondaryCtaText && secondaryCtaHref && (
                  <Link href={secondaryCtaHref}>
                    <Button
                      variant="outline"
                      className="h-auto rounded-none border-transparent bg-[#0A5592] px-5 py-2.5 text-xs font-normal text-white transition-opacity duration-300 hover:opacity-80 hover:bg-[#0A5592]"
                    >
                      {secondaryCtaText}
                    </Button>
                  </Link>
                )}
              </motion.div>
            )}
          </div>

          {/* Right column — stats + testimonial */}
          {hasRightColumn && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
              className="hidden md:block"
            >
              <div className="w-64 space-y-8">
                {stats && stats.length > 0 && (
                  <div className="flex gap-8">
                    {stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-5xl font-bold leading-none text-white">
                          {stat.value}
                        </p>
                        <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/60">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {testimonial && (
                  <div className="border-l-2 border-white/20 pl-5">
                    <p className="text-sm italic leading-relaxed text-white/70">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <p className="mt-3 text-xs font-semibold tracking-wide text-white/50">
                      {testimonial.author}
                    </p>
                    {testimonial.rating && (
                      <div className="mt-2 flex gap-0.5">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <svg key={i} className="h-3.5 w-3.5 text-[#C36036]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
