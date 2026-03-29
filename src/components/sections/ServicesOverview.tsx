import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Structural Engineering",
    description:
      "Expert structural design and analysis for residential, commercial, and hospitality projects. Steel, concrete, and wood structures engineered to the highest standards.",
    image: "/metanova-assets/services/structural/field-team-sunset.png",
    href: "/services/structural-engineering",
  },
  {
    title: "Real Estate Development",
    description:
      "From feasibility studies to project delivery, we bring a developer's perspective to every stage. Strategic site analysis, financial modeling, and execution.",
    image: "/metanova-assets/services/development/model-review.png",
    href: "/services",
  },
  {
    title: "Project Management",
    description:
      "End-to-end project oversight ensuring quality, timeline, and budget targets are met. Coordination across all disciplines from concept to completion.",
    image: "/metanova-assets/services/project-management/city-overlay-hardhat.png",
    href: "/services/project-management-consulting",
  },
];

export function ServicesOverview() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#C36036]">
            What We Do
          </p>
          <h2
            className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-tight text-[#1B2E37]"
            style={{ fontFamily: "var(--font-dm-serif-display)" }}
          >
            Integrated expertise across engineering, development, and management
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group overflow-hidden rounded-2xl border border-[#DBE2E6] bg-[#F3F6F7] transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-85"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#1B2E37]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#30454C]/70">
                  {service.description}
                </p>
                <p className="mt-4 text-sm font-medium text-[#C36036] transition-colors group-hover:text-[#A04E2A]">
                  Learn more &rarr;
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
