const values = [
  {
    number: "01",
    title: "Value Engineering",
    description:
      "We optimize every project for cost-effectiveness without compromising structural integrity or design intent. Smart solutions that maximize your investment.",
  },
  {
    number: "02",
    title: "Development Thinking",
    description:
      "With deep roots in real estate development, we bring a business-minded approach to engineering. Every decision considers buildability, timeline, and ROI.",
  },
  {
    number: "03",
    title: "Precision Execution",
    description:
      "From initial concept to final inspection, we maintain rigorous quality control and clear communication. No surprises, no delays, no excuses.",
  },
  {
    number: "04",
    title: "Adaptability",
    description:
      "Construction is dynamic. We respond quickly to field conditions, design changes, and regulatory requirements while keeping your project on track.",
  },
];

export function ApproachSection() {
  return (
    <section className="bg-[#1A1A1A] py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-16 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#C36036]">
            Our Approach
          </p>
          <h2
            className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-tight text-[#F5F0EB]"
            style={{ fontFamily: "var(--font-dm-serif-display)" }}
          >
            Building with purpose, engineering with precision
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-[#2A2520] bg-[#2A2520] md:grid-cols-2">
          {values.map((value) => (
            <div
              key={value.number}
              className="bg-[#1A1A1A] p-8 transition-colors hover:bg-[#222222] lg:p-10"
            >
              <span className="text-sm font-medium text-[#C36036]">
                {value.number}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-[#F5F0EB]">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#8A8278]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
