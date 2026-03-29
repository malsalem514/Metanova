"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";

interface PortfolioItem {
  src: string;
  alt: string;
}

interface PortfolioGridProps {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  items: PortfolioItem[];
}

export function PortfolioGrid({
  title,
  subtitle,
  description,
  heroImage,
  items,
}: PortfolioGridProps) {
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
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            {description}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-32">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {items.map((item, i) => (
              <FadeIn key={item.src} delay={(i % 3) * 0.1}>
                <div className="group mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-[#E8E0D0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#C36036]/5">
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={600}
                      height={i % 3 === 0 ? 800 : i % 3 === 1 ? 600 : 450}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#1B2E37]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="p-4 text-sm font-medium text-white">{item.alt}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
