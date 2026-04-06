"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");

  const companyLinks = [
    { href: "/about" as const, labelKey: "about" as const },
    { href: "/services" as const, labelKey: "services" as const },
    { href: "/careers" as const, labelKey: "careers" as const },
    { href: "/contact" as const, labelKey: "contact" as const },
  ];

  const serviceLinks = [
    { href: "/services/structural-engineering" as const, label: tFooter("structuralEngineering") },
    { href: "/services/real-estate-development" as const, label: tFooter("realEstateDevelopment") },
    { href: "/services/project-management-consulting" as const, label: tFooter("projectManagement") },
  ];

  return (
    <footer className="bg-[#1B2E37]">
      <div className="border-t border-[#2A3F47]" />
      <div className="mx-auto max-w-[1240px] px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/metanova-assets/brand/logo-white-new.svg"
              alt="Metanova"
              width={140}
              height={28}
            />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {tFooter("tagline")}
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/60">
              <p>{tFooter("address1")}</p>
              <p>{tFooter("address2")}</p>
              <p className="mt-3">
                <a href="mailto:info@metanova.ca" className="transition-colors hover:text-white">
                  info@metanova.ca
                </a>
              </p>
              <p>
                <a href="tel:+15142223444" className="transition-colors hover:text-white">
                  +1 (514) 222-3444
                </a>
              </p>
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
                  {tFooter("hours")}
                </p>
                <p className="mt-2">{tFooter("hoursValue")}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.linkedin.com/company/metanova-experts-conseils"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 transition-colors hover:bg-[#0A5592] hover:text-white"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
              {tFooter("company")}
            </h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {tNav(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
              {tFooter("services")}
            </h3>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {tFooter("legalName")}. {tFooter("copyright")}
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <p>{tFooter("location")}</p>
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              {tFooter("privacyPolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
