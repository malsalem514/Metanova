"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";
import { ShimmerButton } from "@/components/ui/ShimmerButton";

interface InlineContactFormProps {
  heading?: string;
  subtext?: string;
}

export function InlineContactForm({
  heading = "Let's Work Together",
  subtext = "We're here to help you bring your construction project to life! Whether you have questions, want to discuss your ideas.",
}: InlineContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const t = useTranslations("contact");
  const tCta = useTranslations("cta");
  const locale = useLocale();
  const isFr = locale === "fr";
  const isZh = locale === "zh";

  return (
    <section className="bg-white/60 py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <FadeIn>
          <div className="mb-10 max-w-2xl">
            <h2 className="font-medium text-[clamp(2rem,4vw,3rem)] leading-tight text-[#121212]">
              {heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#121212]/70">
              {subtext}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-[#E8E0D0] bg-white p-8 shadow-sm lg:p-10">
            {submitted ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0A5592]/10">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0A5592"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#121212]">
                  {isFr ? "Message envoy\u00e9" : isZh ? "消息已发送" : "Message Sent"}
                </h3>
                <p className="mt-2 text-sm text-[#121212]/80">
                  {isFr
                    ? "Merci de nous avoir contact\u00e9s. Nous vous r\u00e9pondrons sous peu."
                    : isZh
                    ? "感谢您的联系，我们将尽快回复您。"
                    : "Thank you for reaching out. We'll be in touch shortly."}
                </p>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSending(true);
                  try {
                    const formData = new FormData(e.currentTarget);
                    formData.append("source", "careers");
                    await fetch("/api/contact", { method: "POST", body: formData });
                    setSubmitted(true);
                  } catch {
                    alert(isFr ? "Erreur lors de l'envoi. Veuillez réessayer." : isZh ? "发送失败，请重试。" : "Failed to send. Please try again.");
                  } finally {
                    setSending(false);
                  }
                }}
                className="space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="inline-first-name"
                      className="block text-sm font-medium text-[#121212]"
                    >
                      {t("firstName")}
                    </label>
                    <input
                      type="text"
                      id="inline-first-name"
                      name="first-name"
                      required
                      autoComplete="given-name"
                      aria-required="true"
                      className="mt-2 w-full rounded-lg border border-[#E8E0D0] bg-white px-4 py-3 text-sm text-[#121212] placeholder-[#30454C]/40 outline-none transition-all duration-300 focus:border-[#0A5592] focus:ring-2 focus:ring-[#0A5592]/20 focus:shadow-sm focus:shadow-[#0A5592]/10"
                      placeholder={t("firstName")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="inline-last-name"
                      className="block text-sm font-medium text-[#121212]"
                    >
                      {t("lastName")}
                    </label>
                    <input
                      type="text"
                      id="inline-last-name"
                      name="last-name"
                      required
                      autoComplete="family-name"
                      aria-required="true"
                      className="mt-2 w-full rounded-lg border border-[#E8E0D0] bg-white px-4 py-3 text-sm text-[#121212] placeholder-[#30454C]/40 outline-none transition-all duration-300 focus:border-[#0A5592] focus:ring-2 focus:ring-[#0A5592]/20 focus:shadow-sm focus:shadow-[#0A5592]/10"
                      placeholder={t("lastName")}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="inline-email"
                    className="block text-sm font-medium text-[#121212]"
                  >
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    id="inline-email"
                    name="email"
                    required
                    autoComplete="email"
                    aria-required="true"
                    className="mt-2 w-full rounded-lg border border-[#E8E0D0] bg-white px-4 py-3 text-sm text-[#121212] placeholder-[#30454C]/40 outline-none transition-all duration-300 focus:border-[#0A5592] focus:ring-2 focus:ring-[#0A5592]/20 focus:shadow-sm focus:shadow-[#0A5592]/10"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="inline-phone"
                    className="block text-sm font-medium text-[#121212]"
                  >
                    {t("phone")}{" "}
                    <span className="text-[#121212]/40">({isFr ? "optionnel" : isZh ? "选填" : "optional"})</span>
                  </label>
                  <input
                    type="tel"
                    id="inline-phone"
                    name="phone"
                    autoComplete="tel"
                    className="mt-2 w-full rounded-lg border border-[#E8E0D0] bg-white px-4 py-3 text-sm text-[#121212] placeholder-[#30454C]/40 outline-none transition-all duration-300 focus:border-[#0A5592] focus:ring-2 focus:ring-[#0A5592]/20 focus:shadow-sm focus:shadow-[#0A5592]/10"
                    placeholder="+1 (514) 000-0000"
                  />
                </div>
                <div>
                  <label
                    htmlFor="inline-resume"
                    className="block text-sm font-medium text-[#121212]"
                  >
                    {isFr ? "CV / Résumé" : isZh ? "简历 / CV" : "Resume / CV"}{" "}
                    <span className="text-[#121212]/40">({isFr ? "optionnel" : isZh ? "选填" : "optional"})</span>
                  </label>
                  <div className="mt-2">
                    <label
                      htmlFor="inline-resume"
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#E8E0D0] bg-[#F5F0E6]/50 px-4 py-4 text-sm text-[#121212]/60 transition-all duration-300 hover:border-[#0A5592]/40 hover:bg-[#0A5592]/5"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                      </svg>
                      {isFr ? "Téléverser un fichier (PDF, DOC)" : isZh ? "上传文件（PDF、DOC）" : "Upload a file (PDF, DOC)"}
                    </label>
                    <input
                      type="file"
                      id="inline-resume"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      className="sr-only"
                      onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                    />
                    {fileName && (
                      <p className="mt-2 text-xs text-[#0A5592]">
                        ✓ {fileName}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="inline-message"
                    className="block text-sm font-medium text-[#121212]"
                  >
                    {t("message")}
                  </label>
                  <textarea
                    id="inline-message"
                    name="message"
                    required
                    aria-required="true"
                    rows={5}
                    className="mt-2 w-full resize-none rounded-lg border border-[#E8E0D0] bg-white px-4 py-3 text-sm text-[#121212] placeholder-[#30454C]/40 outline-none transition-all duration-300 focus:border-[#0A5592] focus:ring-2 focus:ring-[#0A5592]/20 focus:shadow-sm focus:shadow-[#0A5592]/10"
                    placeholder={isFr ? "Parlez-nous de votre projet..." : isZh ? "请介绍您的项目..." : "Tell us about your project..."}
                  />
                </div>
                <ShimmerButton type="submit" className="w-full" disabled={sending}>
                  {sending ? (isFr ? "Envoi en cours..." : isZh ? "发送中..." : "Sending...") : tCta("submit")}
                </ShimmerButton>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
