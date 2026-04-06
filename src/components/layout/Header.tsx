"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "motion/react";

type NavHref = "/" | "/about" | "/services" | "/contact" | "/careers";
type ServiceHref =
  | "/services/structural-engineering"
  | "/services/real-estate-development"
  | "/services/project-management-consulting";

const navLinks: { href: NavHref; labelKey: string }[] = [
  { href: "/", labelKey: "home" },
  { href: "/about", labelKey: "about" },
  { href: "/services", labelKey: "services" },
  { href: "/careers", labelKey: "careers" },
  { href: "/contact", labelKey: "contact" },
];

const serviceSubLinks: { href: ServiceHref; labelKey: string; index: string }[] = [
  { href: "/services/structural-engineering", labelKey: "structuralEngineering", index: "01" },
  { href: "/services/real-estate-development", labelKey: "realEstateDevelopment", index: "02" },
  { href: "/services/project-management-consulting", labelKey: "projectManagement", index: "03" },
];

function TrussWatermark() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -right-[30px] bottom-20 opacity-[0.035]"
      style={{ transform: "rotate(-12deg)" }}
      width="220"
      height="180"
      viewBox="0 0 220 180"
      fill="none"
      stroke="#1B2E37"
      strokeWidth="0.8"
    >
      <line x1="10" y1="160" x2="210" y2="160" />
      <line x1="10" y1="20" x2="210" y2="20" />
      <line x1="10" y1="20" x2="10" y2="160" />
      <line x1="210" y1="20" x2="210" y2="160" />
      <line x1="10" y1="20" x2="70" y2="160" />
      <line x1="70" y1="160" x2="70" y2="20" />
      <line x1="70" y1="20" x2="140" y2="160" />
      <line x1="140" y1="160" x2="140" y2="20" />
      <line x1="140" y1="20" x2="210" y2="160" />
      <line x1="10" y1="90" x2="210" y2="90" />
    </svg>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = useTranslations("nav");
  const tLang = useTranslations("lang");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "fr" : "en";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openDrawer = useCallback(() => {
    setMobileOpen(true);
    document.documentElement.classList.add("drawer-open");
  }, []);

  const closeDrawer = useCallback(() => {
    setMobileOpen(false);
    setServicesExpanded(false);
    document.documentElement.classList.remove("drawer-open");
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen, closeDrawer]);

  const openDropdown = useCallback(() => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
    setDesktopDropdownOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => {
      setDesktopDropdownOpen(false);
    }, 150);
  }, []);

  const useDarkNav = scrolled || mobileOpen;
  const isCompact = scrolled;

  return (
    <>
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

          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) =>
              link.labelKey === "services" ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                >
                  <Link
                    href={link.href}
                    className={`text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${
                      useDarkNav
                        ? "text-[#121212] hover:text-[#0A5592]"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {t(link.labelKey)}
                  </Link>

                  {desktopDropdownOpen && (
                    <div className="absolute left-0 top-full h-2 w-full" />
                  )}

                  <AnimatePresence>
                    {desktopDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 top-[calc(100%+8px)] w-[260px] rounded-lg border border-[#E8E0D0] bg-white p-2 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                      >
                        {serviceSubLinks.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href as NavHref}
                            className="block rounded-md px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-[#121212] transition-colors duration-200 hover:bg-[rgba(10,85,146,0.05)] hover:text-[#0A5592]"
                          >
                            {t(sub.labelKey)}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
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
              ),
            )}

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

          <button
            onClick={mobileOpen ? closeDrawer : openDrawer}
            className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#0A5592] md:hidden ${
              useDarkNav ? "text-[#121212]" : "text-white"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
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
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black/30 md:hidden"
            onClick={closeDrawer}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 z-50 flex h-full w-[85%] max-w-[400px] flex-col bg-[#F5F0E6] px-7 py-8 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="mb-10 flex justify-end">
              <button
                onClick={closeDrawer}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-[#121212] transition-colors hover:text-[#0A5592] focus-visible:ring-2 focus-visible:ring-[#0A5592]"
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1">
              {navLinks.map((link, i) =>
                link.labelKey === "services" ? (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.4, ease: "easeOut" }}
                    className="mb-2"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        onClick={closeDrawer}
                        className="block py-3 text-xl font-medium text-[#121212] transition-colors hover:text-[#0A5592]"
                      >
                        {t(link.labelKey)}
                      </Link>
                      <button
                        onClick={() => setServicesExpanded(!servicesExpanded)}
                        className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-[#0A5592]/5"
                        aria-label={servicesExpanded ? "Collapse services" : "Expand services"}
                        aria-expanded={servicesExpanded}
                      >
                        <motion.svg
                          animate={{ rotate: servicesExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0A5592"
                          strokeWidth="2.5"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </motion.svg>
                      </button>
                    </div>

                    <AnimatePresence>
                      {servicesExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pb-2">
                            {serviceSubLinks.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href as NavHref}
                                onClick={closeDrawer}
                                className="flex items-center gap-2.5 rounded-lg bg-[rgba(10,85,146,0.04)] px-4 py-3 text-sm text-[#121212]/70 transition-colors hover:text-[#0A5592]"
                              >
                                <span className="text-[11px] font-semibold text-[#0A5592]/50">
                                  {sub.index}
                                </span>
                                {t(sub.labelKey)}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.4, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeDrawer}
                      className="block py-3 text-xl font-medium text-[#121212] transition-colors hover:text-[#0A5592]"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </motion.div>
                ),
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex items-center justify-between border-t border-[#E8E0D0] pt-5"
            >
              <Link
                href={pathname as NavHref}
                locale={otherLocale}
                onClick={closeDrawer}
                className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#0A5592] transition-colors hover:text-[#121212]"
              >
                {tLang("switch")}
              </Link>
              <span className="text-xs text-[#121212]/40">info@metanova.ca</span>
            </motion.div>

            <TrussWatermark />
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
