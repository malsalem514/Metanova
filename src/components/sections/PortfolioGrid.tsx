import Image from "next/image";

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
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/60 to-[#0C0C0C]/30" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-16 pt-32">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#C36036]">
            {subtitle}
          </p>
          <h1
            className="mt-4 max-w-3xl text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] text-[#F5F0EB]"
            style={{ fontFamily: "var(--font-dm-serif-display)" }}
          >
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#8A8278]">
            {description}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-[#0C0C0C] py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {items.map((item, i) => (
              <div
                key={item.src}
                className="mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-[#2A2520] transition-all duration-300 hover:border-[#C36036]/30 hover:shadow-xl hover:shadow-[#C36036]/5"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={i % 3 === 0 ? 800 : i % 3 === 1 ? 600 : 450}
                  className="w-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
