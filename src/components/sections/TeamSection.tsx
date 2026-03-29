"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";

interface TeamMember {
  name: string;
  roleEn: string;
  roleFr: string;
  image: string;
  bioEn: string;
  bioFr: string;
}

const team: TeamMember[] = [
  {
    name: "Suddam Al-Salem, ing.",
    roleEn: "Managing Partner, Engineering Division",
    roleFr: "Associ\u00e9 directeur, Division ing\u00e9nierie",
    image: "/metanova-assets/people/suddam-al-salem.jpg",
    bioEn: "A licensed structural engineer with extensive experience in building design across steel, wood, and concrete structures. Previously at NCK, Suddam brings deep technical expertise and a commitment to engineering excellence to every project Metanova undertakes.",
    bioFr: "Ing\u00e9nieur en structure agr\u00e9\u00e9 avec une vaste exp\u00e9rience en conception de b\u00e2timents en acier, bois et b\u00e9ton. Anciennement chez NCK, Suddam apporte une expertise technique approfondie et un engagement envers l\u2019excellence en ing\u00e9nierie \u00e0 chaque projet entrepris par Metanova.",
  },
  {
    name: "Muhannad Al-Salem",
    roleEn: "Managing Partner, Real Estate Development Division",
    roleFr: "Associ\u00e9 directeur, Division d\u00e9veloppement immobilier",
    image: "/metanova-assets/people/muhannad-al-salem.jpg",
    bioEn: "With over a decade of experience in real estate development and a background in architecture and construction management, Muhannad has been a licensed general contractor since 2011. He leads Metanova\u2019s development division with a hands-on, results-driven approach.",
    bioFr: "Fort de plus d\u2019une d\u00e9cennie d\u2019exp\u00e9rience en d\u00e9veloppement immobilier et d\u2019une formation en architecture et gestion de la construction, Muhannad est entrepreneur g\u00e9n\u00e9ral licenci\u00e9 depuis 2011. Il dirige la division d\u00e9veloppement de Metanova avec une approche concr\u00e8te et orient\u00e9e r\u00e9sultats.",
  },
];

export function TeamSection() {
  const locale = useLocale();
  const isFr = locale === "fr";

  return (
    <section className="bg-white/60 py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <FadeIn>
          <div className="mb-16 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#121212]/50">
              {isFr ? "Direction" : "Leadership"}
            </p>
            <h2
              className="mt-4 mb-8 font-medium text-[clamp(2rem,4vw,3rem)] leading-tight text-[#121212]"
            >
              {isFr ? "Rencontrez les fondateurs" : "Meet the founders"}
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
                  <h3 className="text-2xl font-medium text-[#121212]">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#121212]/60">
                    {isFr ? member.roleFr : member.roleEn}
                  </p>
                  <p className="mt-6 text-sm leading-loose text-[#121212]/70">
                    {isFr ? member.bioFr : member.bioEn}
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
