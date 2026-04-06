"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { useVideoAutoplay } from "@/hooks/useVideoAutoplay";

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
  videoSrc?: string;
}

export function ServiceDetail({
  title,
  subtitle,
  description,
  heroImage,
  points,
  ctaText = "Discuss Your Project",
  videoSrc,
}: ServiceDetailProps) {
  const videoRef = useVideoAutoplay();

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
        {videoSrc && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={videoSrc.replace('.mp4', '-poster.jpg')}
            className="absolute inset-0 z-[1] h-full w-full object-cover"
            aria-label={`${title} video`}
          >
            <source src={videoSrc} type="video/mp4" />
            <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
          </video>
        )}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#1B2E37]/50 via-[#1B2E37]/30 to-[#1B2E37]/70" />
        <div className="relative z-[3] mx-auto w-full max-w-[1240px] px-6 pb-16 pt-32">
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#121212]/50">
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
      <section className="py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
            <FadeIn>
              <div>
                <p className="text-lg leading-relaxed text-[#121212]/70">
                  {description}
                </p>
                <Link href={"/contact" as const} className="mt-8 inline-block">
                  <Button className="h-auto rounded-none bg-[#0A5592] px-5 py-2.5 text-xs font-normal text-white transition-opacity duration-300 hover:opacity-80">
                    {ctaText}
                  </Button>
                </Link>
              </div>
            </FadeIn>
            <div className="space-y-6">
              {points.map((point, i) => (
                <FadeIn key={point.title} delay={i * 0.08}>
                  <div className="rounded-2xl border border-[#E8E0D0] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0A5592]/20 hover:shadow-md hover:shadow-[#0A5592]/5">
                    <div className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#121212]/5 text-sm font-semibold text-[#121212]/60">
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
