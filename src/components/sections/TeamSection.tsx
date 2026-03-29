"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";

const team = [
  {
    name: "Suddam Al-Salem, ing.",
    role: "Managing Partner, Engineering Division",
    image: "/metanova-assets/people/suddam-al-salem.jpg",
    bio: "A licensed structural engineer with extensive experience in building design across steel, wood, and concrete structures. Previously at NCK, Suddam brings deep technical expertise and a commitment to engineering excellence to every project MetaNova undertakes.",
  },
  {
    name: "Muhannad Al-Salem",
    role: "Managing Partner, Real Estate Development Division",
    image: "/metanova-assets/people/muhannad-al-salem.jpg",
    bio: "With over a decade of experience in real estate development and a background in architecture and construction management, Muhannad has been a licensed general contractor since 2011. He leads MetaNova's development division with a hands-on, results-driven approach.",
  },
];

export function TeamSection() {
  return (
    <section className="bg-white/60 py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <FadeIn>
          <div className="mb-16 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#C36036]">
              Leadership
            </p>
            <h2
              className="mt-4 mb-8 text-[clamp(2rem,4vw,3rem)] leading-tight text-[#1B2E37]"
              style={{ fontFamily: "var(--font-dm-serif-display)" }}
            >
              Meet the founders
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-12 md:grid-cols-2">
          {team.map((member, i) => (
            <FadeIn key={member.name} delay={i * 0.15}>
              <article className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-sm">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B2E37]/60 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-40" />
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold text-[#1B2E37]">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#C36036]">
                    {member.role}
                  </p>
                  <p className="mt-6 text-sm leading-loose text-[#30454C]/80">
                    {member.bio}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
