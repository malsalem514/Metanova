"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-[#0C0C0C] py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          {/* Contact info */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C36036]">
              Get in Touch
            </p>
            <h2
              className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-tight text-[#F5F0EB]"
              style={{ fontFamily: "var(--font-dm-serif-display)" }}
            >
              Let&apos;s discuss your next project
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#8A8278]">
              Whether you need structural engineering expertise, project management
              support, or development consulting, we&apos;re here to help bring your
              vision to life.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F5F0EB]">
                  Office
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8A8278]">
                  7005, boulevard Taschereau, Suite 305
                  <br />
                  Brossard, Quebec J4Z 1A7
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F5F0EB]">
                  Email
                </h3>
                <a
                  href="mailto:info@metanova.ca"
                  className="mt-2 block text-sm text-[#C36036] transition-colors hover:text-[#D4724A]"
                >
                  info@metanova.ca
                </a>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F5F0EB]">
                  Phone
                </h3>
                <a
                  href="tel:+15142223444"
                  className="mt-2 block text-sm text-[#C36036] transition-colors hover:text-[#D4724A]"
                >
                  +1 (514) 222-3444
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-[#2A2520] bg-[#1A1A1A] p-8 lg:p-10">
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
                <h3 className="mt-6 text-xl font-semibold text-[#F5F0EB]">
                  Message Sent
                </h3>
                <p className="mt-2 text-sm text-[#8A8278]">
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
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#F5F0EB]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-2 w-full rounded-lg border border-[#2A2520] bg-[#0C0C0C] px-4 py-3 text-sm text-[#F5F0EB] placeholder-[#8A8278] outline-none transition-colors focus:border-[#C36036]"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#F5F0EB]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-2 w-full rounded-lg border border-[#2A2520] bg-[#0C0C0C] px-4 py-3 text-sm text-[#F5F0EB] placeholder-[#8A8278] outline-none transition-colors focus:border-[#C36036]"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-[#F5F0EB]"
                  >
                    Phone{" "}
                    <span className="text-[#8A8278]">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="mt-2 w-full rounded-lg border border-[#2A2520] bg-[#0C0C0C] px-4 py-3 text-sm text-[#F5F0EB] placeholder-[#8A8278] outline-none transition-colors focus:border-[#C36036]"
                    placeholder="+1 (514) 000-0000"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#F5F0EB]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="mt-2 w-full resize-none rounded-lg border border-[#2A2520] bg-[#0C0C0C] px-4 py-3 text-sm text-[#F5F0EB] placeholder-[#8A8278] outline-none transition-colors focus:border-[#C36036]"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <Button
                  type="submit"
                  className="h-12 w-full rounded-lg bg-[#C36036] text-base text-[#F5F0EB] hover:bg-[#D4724A]"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
