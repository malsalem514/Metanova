"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

type NavHref = "/" | "/about" | "/services" | "/contact" | "/careers";

const navLinks: { href: NavHref; labelKey: "home" | "about" | "services" | "contact" | "careers" }[] = [
  { href: "/", labelKey: "home" },
  { href: "/about", labelKey: "about" },
  { href: "/services", labelKey: "services" },
  { href: "/careers", labelKey: "careers" },
  { href: "/contact", labelKey: "contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("nav");
  const tLang = useTranslations("lang");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "fr" : "en";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Always start transparent + white, switch to dark only on scroll
  const useDarkNav = scrolled;
  // Size: compact only when scrolled (not on initial load of no-hero pages)
  const isCompact = scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        useDarkNav
          ? "bg-[#F5F0E6]/95 backdrop-blur-xl shadow-sm shadow-[#54341F]/5"
          : "bg-transparent"
      }`}
    >
      <div
        className="mx-auto flex items-center justify-between transition-all duration-500"
        style={{
          padding: isCompact ? "12px 50px" : "24px 50px",
          maxWidth: "1440px",
        }}
      >
        {/* Logo -- color version on light bg, white on dark hero */}
        <Link href="/" className="flex items-center transition-all duration-500">
          <Image
            src={
              useDarkNav
                ? "/metanova-assets/brand/logo-color-new.svg"
                : "/metanova-assets/brand/logo-white-new.svg"
            }
            alt="Metanova"
            width={180}
            height={73}
            priority
            className="transition-all duration-500"
            style={{ width: isCompact ? 150 : 180, height: "auto" }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${
                useDarkNav
                  ? "text-[#121212] hover:text-[#0A5592]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {t(link.labelKey)}
            </Link>
          ))}

          {/* Language switcher */}
          <Link
            href={pathname as NavHref}
            locale={otherLocale}
            className={`text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300 border-l pl-4 ${
              useDarkNav
                ? "text-[#0A5592] hover:text-[#121212] border-[#121212]/20"
                : "text-white hover:text-white/70 border-white/30"
            }`}
          >
            {tLang("switch")}
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#0A5592] md:hidden ${
            useDarkNav ? "text-[#121212]" : "text-white"
          }`}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-[#E8E0D0] bg-[#F5F0E6] px-[50px] py-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-xs font-medium uppercase tracking-[0.15em] text-[#121212] transition-colors duration-300 hover:text-[#0A5592]"
            >
              {t(link.labelKey)}
            </Link>
          ))}
          {/* Mobile language switcher */}
          <Link
            href={pathname as NavHref}
            locale={otherLocale}
            onClick={() => setMobileOpen(false)}
            className="block py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#0A5592] transition-colors duration-300 hover:text-[#121212] border-t border-[#E8E0D0] mt-3 pt-6"
          >
            {tLang("switch")}
          </Link>
        </nav>
      )}
    </header>
  );
}
