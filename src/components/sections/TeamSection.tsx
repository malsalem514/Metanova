import Image from "next/image";

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
    <section className="bg-[#0C0C0C] py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-16 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#C36036]">
            Leadership
          </p>
          <h2
            className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-tight text-[#F5F0EB]"
            style={{ fontFamily: "var(--font-dm-serif-display)" }}
          >
            Meet the founders
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {team.map((member) => (
            <article key={member.name} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/80 to-transparent" />
              </div>
              <div className="mt-6">
                <h3 className="text-2xl font-semibold text-[#F5F0EB]">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#C36036]">
                  {member.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#8A8278]">
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
