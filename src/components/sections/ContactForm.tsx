"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { ShimmerButton } from "@/components/ui/ShimmerButton";

interface ContactFormProps {
  content?: Record<string, string>;
}

export function ContactForm({ content }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          {/* Contact info */}
          <FadeIn>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#C36036]">
                {content?.["overline"] ?? "Get in Touch"}
              </p>
              <h2
                className="mt-4 mb-8 font-medium text-[clamp(2rem,4vw,3rem)] leading-tight text-[#121212]"
              >
                {content?.["heading"] ?? "Let\u2019s discuss your next project"}
              </h2>
              <p className="text-lg leading-relaxed text-[#121212]/80">
                {content?.["intro"] ?? "Whether you need structural engineering expertise, project management support, or development consulting, we\u2019re here to help bring your vision to life."}
              </p>

              <div className="mt-10 space-y-6">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#121212]">
                    Office
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#121212]/80">
                    {content?.["office_address_line1"] ?? "7005, boulevard Taschereau, Suite 305"}
                    <br />
                    {content?.["office_address_line2"] ?? "Brossard, Quebec J4Z 1A7"}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#121212]">
                    Email
                  </h3>
                  <a
                    href={`mailto:${content?.["email"] ?? "info@metanova.ca"}`}
                    className="mt-2 block text-sm text-[#C36036] transition-colors duration-300 hover:text-[#A04E2A]"
                  >
                    {content?.["email"] ?? "info@metanova.ca"}
                  </a>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#121212]">
                    Phone
                  </h3>
                  <a
                    href={`tel:${content?.["phone_raw"] ?? "+15142223444"}`}
                    className="mt-2 block text-sm text-[#C36036] transition-colors duration-300 hover:text-[#A04E2A]"
                  >
                    {content?.["phone"] ?? "+1 (514) 222-3444"}
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.15}>
            <div className="rounded-2xl border border-[#E8E0D0] bg-white p-8 shadow-sm lg:p-10">
              {submitted ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C36036]/10">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C36036"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-[#121212]">
                    Message Sent
                  </h3>
                  <p className="mt-2 text-sm text-[#121212]/80">
                    Thank you for reaching out. We&apos;ll be in touch shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-[#121212]"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        required
                        autoComplete="given-name"
                        aria-required="true"
                        className="mt-2 w-full rounded-lg border border-[#E8E0D0] bg-white px-4 py-3 text-sm text-[#121212] placeholder-[#30454C]/40 outline-none transition-all duration-300 focus:border-[#C36036] focus:ring-2 focus:ring-[#C36036]/20 focus:shadow-sm focus:shadow-[#C36036]/10"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-[#121212]"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        required
                        autoComplete="family-name"
                        aria-required="true"
                        className="mt-2 w-full rounded-lg border border-[#E8E0D0] bg-white px-4 py-3 text-sm text-[#121212] placeholder-[#30454C]/40 outline-none transition-all duration-300 focus:border-[#C36036] focus:ring-2 focus:ring-[#C36036]/20 focus:shadow-sm focus:shadow-[#C36036]/10"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#121212]"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      aria-required="true"
                      className="mt-2 w-full rounded-lg border border-[#E8E0D0] bg-white px-4 py-3 text-sm text-[#121212] placeholder-[#30454C]/40 outline-none transition-all duration-300 focus:border-[#C36036] focus:ring-2 focus:ring-[#C36036]/20 focus:shadow-sm focus:shadow-[#C36036]/10"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-[#121212]"
                    >
                      Phone{" "}
                      <span className="text-[#121212]/40">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      className="mt-2 w-full rounded-lg border border-[#E8E0D0] bg-white px-4 py-3 text-sm text-[#121212] placeholder-[#30454C]/40 outline-none transition-all duration-300 focus:border-[#C36036] focus:ring-2 focus:ring-[#C36036]/20 focus:shadow-sm focus:shadow-[#C36036]/10"
                      placeholder="+1 (514) 000-0000"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#121212]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      aria-required="true"
                      rows={5}
                      className="mt-2 w-full resize-none rounded-lg border border-[#E8E0D0] bg-white px-4 py-3 text-sm text-[#121212] placeholder-[#30454C]/40 outline-none transition-all duration-300 focus:border-[#C36036] focus:ring-2 focus:ring-[#C36036]/20 focus:shadow-sm focus:shadow-[#C36036]/10"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <ShimmerButton type="submit" className="w-full">
                    Send Message
                  </ShimmerButton>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
