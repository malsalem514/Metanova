import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { CTABanner } from "@/components/sections/CTABanner";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about MetaNova — our vision, mission, and the team behind our structural engineering and development expertise.",
};

export default function AboutPage() {
  return (
    <>
      <HeroSection
        title="Built on expertise, driven by vision"
        subtitle="Founded in 2022, MetaNova was created to bridge the gap between engineering precision and development pragmatism."
        backgroundImage="/metanova-assets/hero/night-cranes-skyline.jpg"
      />

      {/* Vision / Mission / Core Value */}
      <section className="bg-white py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-[#DBE2E6] bg-[#F3F6F7] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#C36036]">
                Vision
              </p>
              <h3
                className="mt-4 text-2xl leading-tight text-[#1B2E37]"
                style={{ fontFamily: "var(--font-dm-serif-display)" }}
              >
                Redefining how structures are designed and delivered
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#30454C]/70">
                We envision a construction industry where engineering excellence and
                development acumen work in concert, producing buildings that are
                structurally superior, economically optimized, and built to last.
              </p>
            </div>
            <div className="rounded-2xl border border-[#DBE2E6] bg-[#F3F6F7] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#C36036]">
                Mission
              </p>
              <h3
                className="mt-4 text-2xl leading-tight text-[#1B2E37]"
                style={{ fontFamily: "var(--font-dm-serif-display)" }}
              >
                Engineering that serves the bottom line
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#30454C]/70">
                To deliver structural engineering and project management services
                that combine technical rigor with real-world development thinking,
                ensuring every project maximizes value for its stakeholders.
              </p>
            </div>
            <div className="rounded-2xl border border-[#DBE2E6] bg-[#F3F6F7] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#C36036]">
                Core Value
              </p>
              <h3
                className="mt-4 text-2xl leading-tight text-[#1B2E37]"
                style={{ fontFamily: "var(--font-dm-serif-display)" }}
              >
                Integrity in every detail
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#30454C]/70">
                From the calculations behind our designs to the relationships we
                build with clients, integrity is the foundation of everything we
                do. We say what we mean, deliver what we promise, and stand behind
                our work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beginnings story */}
      <section className="bg-[#F3F6F7] py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#C36036]">
                Our Beginnings
              </p>
              <h2
                className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-tight text-[#1B2E37]"
                style={{ fontFamily: "var(--font-dm-serif-display)" }}
              >
                Two brothers, one shared vision
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#30454C]/70">
                MetaNova was founded by Suddam and Muhannad Al-Salem — a structural
                engineer and a real estate developer — who saw an opportunity to create
                a firm that truly understands both sides of the construction equation.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#30454C]/70">
                Where traditional engineering firms focus purely on technical compliance,
                and developers often lack deep structural expertise, MetaNova bridges
                both worlds. The result is smarter designs, faster approvals, and
                projects that make financial and structural sense from day one.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#30454C]/70">
                Based in Brossard, Quebec, MetaNova serves clients across the Greater
                Montreal area and beyond, with a growing portfolio spanning residential,
                hospitality, and commercial sectors.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/metanova-assets/people/founders-portrait.jpg"
                alt="MetaNova founders"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <ApproachSection />
      <TeamSection />
      <CTABanner
        title="Want to work with us?"
        subtitle="We're always looking for challenging projects and great partners. Let's talk."
      />
    </>
  );
}
