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
    <section className="bg-[#F3F6F7] py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#C36036]">
            Our Approach
          </p>
          <h2
            className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-tight text-[#1B2E37]"
            style={{ fontFamily: "var(--font-dm-serif-display)" }}
          >
            Building with purpose, engineering with precision
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-[#DBE2E6] bg-[#DBE2E6] md:grid-cols-2">
          {values.map((value) => (
            <div
              key={value.number}
              className="bg-white p-8 transition-colors hover:bg-[#F3F6F7] lg:p-10"
            >
              <span className="text-sm font-medium text-[#C36036]">
                {value.number}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-[#1B2E37]">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#30454C]/70">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
