import Link from "next/link";
import { Button } from "@/components/ui/button";

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
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#C36036] to-[#8B3A1A] p-12 md:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <h2
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight text-white"
              style={{ fontFamily: "var(--font-dm-serif-display)" }}
            >
              {title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              {subtitle}
            </p>
            <Link href={ctaHref} className="mt-8 inline-block">
              <Button className="h-12 rounded-full bg-white px-8 text-base font-semibold text-[#1B2E37] hover:bg-white/90">
                {ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
