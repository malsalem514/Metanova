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
          <p className="text-xs text-white/40">
            {tFooter("location")}
          </p>
        </div>
      </div>
    </footer>
  );
}
