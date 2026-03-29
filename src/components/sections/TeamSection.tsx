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
    bioEn: "Suddam Al-Salem is a structural engineer specializing in buildings, steel, wood and concrete. With several years' experience acquired with one of the most renowned companies in the field of structural engineering, NCK, Suddam Al-Salem has worked on projects of varying scope and complexity. As a project manager, he has developed comprehensive expertise in design, project management and site inspection, enabling him to master all the technical and organizational aspects of a project.",
    bioFr: "Suddam Al-Salem est un ing\u00e9nieur en structure sp\u00e9cialis\u00e9 dans les b\u00e2timents en acier, bois et b\u00e9ton. Fort de plusieurs ann\u00e9es d\u2019exp\u00e9rience acquises aupr\u00e8s de l\u2019une des firmes les plus renomm\u00e9es en ing\u00e9nierie structurale, NCK, il a travaill\u00e9 sur des projets de port\u00e9es et complexit\u00e9s vari\u00e9es. En tant que charg\u00e9 de projets, il a d\u00e9velopp\u00e9 une expertise compl\u00e8te en conception, gestion de projets et inspection de chantier.",
  },
  {
    name: "Muhannad Al-Salem",
    roleEn: "Managing Partner, Real Estate Development Division",
    roleFr: "Associ\u00e9 directeur, Division d\u00e9veloppement immobilier",
    image: "/metanova-assets/people/muhannad-al-salem.jpg",
    bioEn: "With over a decade of experience in real estate development, Muhannad has played a key role in the planning, structuring and execution of major projects across Quebec. His background in architecture and construction management, combined with eight years of experience as a general contractor, provides him with a comprehensive understanding of the entire development lifecycle. Since 2011, he has worked closely with municipalities, leading zoning change processes and securing project approvals, while collaborating with investors to structure financially viable, high-impact developments.",
    bioFr: "Fort de plus de dix ans d\u2019exp\u00e9rience en d\u00e9veloppement immobilier, Muhannad joue un r\u00f4le cl\u00e9 dans la planification, la structuration et la r\u00e9alisation de projets d\u2019envergure \u00e0 travers le Qu\u00e9bec. Son parcours en architecture et en gestion de la construction, combin\u00e9 \u00e0 huit ann\u00e9es d\u2019exp\u00e9rience comme entrepreneur g\u00e9n\u00e9ral, lui conf\u00e8re une compr\u00e9hension compl\u00e8te de l\u2019ensemble du cycle de d\u00e9veloppement. Depuis 2011, il collabore \u00e9troitement avec les municipalit\u00e9s, pilotant les d\u00e9marches de changement de zonage et l\u2019obtention des autorisations.",
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
              {isFr ? "L'équipe de direction" : "Executive team"}
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
