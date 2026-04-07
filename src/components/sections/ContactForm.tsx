"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";
import { ShimmerButton } from "@/components/ui/ShimmerButton";

interface ContactFormProps {
  content?: Record<string, string>;
}

export function ContactForm({ content }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const t = useTranslations("contact");
  const tCta = useTranslations("cta");
  const locale = useLocale();
  const isFr = locale === "fr";
  const isZh = locale === "zh";

  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          {/* Contact info */}
          <FadeIn>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#121212]/50">
                {content?.["overline"] ?? (isFr ? "CONTACTEZ-NOUS" : isZh ? "联系我们" : "Get in Touch")}
              </p>
              <h2
                className="mt-4 mb-8 font-medium text-[clamp(2rem,4vw,3rem)] leading-tight text-[#121212]"
              >
                {content?.["heading"] ?? (isFr ? "Contactez-nous" : isZh ? "洽谈您的项目" : "Let\u2019s discuss your next project")}
              </h2>
              <p className="text-lg leading-relaxed text-[#121212]/80">
                {content?.["intro"] ?? (isFr
                  ? "Nous serions ravis de vous entendre! Que vous ayez un nouveau projet en t\u00eate, que vous ayez besoin d\u2019une consultation d\u2019expert ou que vous souhaitiez simplement en savoir plus sur notre travail, notre \u00e9quipe est pr\u00eate \u00e0 vous aider."
                  : isZh
                  ? "无论您需要结构工程专业知识、工程项目管理支持，还是房地产开发咨询，我们都在这里帮您将愿景变为现实。"
                  : "Whether you need structural engineering expertise, project management support, or development consulting, we\u2019re here to help bring your vision to life.")}
              </p>

              <div className="mt-10 space-y-6">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#121212]">
                    {isFr ? "Bureau" : isZh ? "办公室" : "Office"}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#121212]/80">
                    {content?.["office_address_line1"] ?? "7005, boulevard Taschereau, Suite 305"}
                    <br />
                    {content?.["office_address_line2"] ?? "Brossard, Quebec J4Z 1A7"}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#121212]">
                    {t("email")}
                  </h3>
                  <a
                    href={`mailto:${content?.["email"] ?? "info@metanova.ca"}`}
                    className="mt-2 block text-sm text-[#121212] underline transition-colors duration-300 hover:text-[#121212]/60"
                  >
                    {content?.["email"] ?? "info@metanova.ca"}
                  </a>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#121212]">
                    {t("phone")}
                  </h3>
                  <a
                    href={`tel:${content?.["phone_raw"] ?? "+15142223444"}`}
                    className="mt-2 block text-sm text-[#121212] underline transition-colors duration-300 hover:text-[#121212]/60"
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
                    setError("");
                    setSending(true);
                    try {
                      const formData = new FormData(e.currentTarget);
                      formData.append("source", "contact");
                      const res = await fetch("/api/contact", { method: "POST", body: formData });
                      const data = await res.json();
                      if (!res.ok) {
                        console.error("Contact form error:", data);
                        throw new Error(data.details?.message ?? data.error ?? "Failed to send");
                      }
                      setSubmitted(true);
                    } catch {
                      setError(isFr ? "Erreur lors de l'envoi. Veuillez réessayer." : isZh ? "发送失败，请重试。" : "Failed to send. Please try again.");
                    } finally {
                      setSending(false);
                    }
                  }}
                  className="space-y-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-[#121212]"
                      >
                        {t("firstName")}
                      </label>
                      <input
                        type="text"
                        id="first-name"
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
                        htmlFor="last-name"
                        className="block text-sm font-medium text-[#121212]"
                      >
                        {t("lastName")}
                      </label>
                      <input
                        type="text"
                        id="last-name"
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
                      htmlFor="email"
                      className="block text-sm font-medium text-[#121212]"
                    >
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      id="email"
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
                      htmlFor="phone"
                      className="block text-sm font-medium text-[#121212]"
                    >
                      {t("phone")}{" "}
                      <span className="text-[#121212]/40">({isFr ? "optionnel" : isZh ? "选填" : "optional"})</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      className="mt-2 w-full rounded-lg border border-[#E8E0D0] bg-white px-4 py-3 text-sm text-[#121212] placeholder-[#30454C]/40 outline-none transition-all duration-300 focus:border-[#0A5592] focus:ring-2 focus:ring-[#0A5592]/20 focus:shadow-sm focus:shadow-[#0A5592]/10"
                      placeholder="+1 (514) 000-0000"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-attachment"
                      className="block text-sm font-medium text-[#121212]"
                    >
                      {isFr ? "Pièce jointe" : isZh ? "附件" : "Attachment"}{" "}
                      <span className="text-[#121212]/40">({isFr ? "optionnel" : isZh ? "选填" : "optional"})</span>
                    </label>
                    <div className="mt-2">
                      <label
                        htmlFor="contact-attachment"
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#E8E0D0] bg-[#F5F0E6]/50 px-4 py-4 text-sm text-[#121212]/60 transition-all duration-300 hover:border-[#0A5592]/40 hover:bg-[#0A5592]/5"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                        </svg>
                        {isFr ? "Téléverser un fichier (PDF, DOC, images)" : isZh ? "上传文件（PDF、DOC、图片）" : "Upload a file (PDF, DOC, images)"}
                      </label>
                      <input
                        type="file"
                        id="contact-attachment"
                        name="attachment"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
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
                      htmlFor="message"
                      className="block text-sm font-medium text-[#121212]"
                    >
                      {t("message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      aria-required="true"
                      rows={5}
                      className="mt-2 w-full resize-none rounded-lg border border-[#E8E0D0] bg-white px-4 py-3 text-sm text-[#121212] placeholder-[#30454C]/40 outline-none transition-all duration-300 focus:border-[#0A5592] focus:ring-2 focus:ring-[#0A5592]/20 focus:shadow-sm focus:shadow-[#0A5592]/10"
                      placeholder={isFr ? "Parlez-nous de votre projet..." : isZh ? "请介绍您的项目..." : "Tell us about your project..."}
                    />
                  </div>
                  <ShimmerButton type="submit" className="w-full" disabled={sending}>
                    {sending ? (isFr ? "Envoi en cours..." : isZh ? "发送中..." : "Sending...") : tCta("sendMessage")}
                  </ShimmerButton>
                  {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </div>
                  )}
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
