"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/residential", label: "Residential" },
  { href: "/hospitality", label: "Hospitality" },
  { href: "/commercial", label: "Commercial" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasHero, setHasHero] = useState(true);

  useEffect(() => {
    // Detect if page has a dark hero section — if not, use dark nav immediately
    const heroEl = document.querySelector("[data-hero]");
    if (!heroEl) setHasHero(false);

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Colors: dark text when scrolled OR when page has no hero (light bg pages)
  const useDarkNav = scrolled || !hasHero;
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
        {/* Logo — color version on light bg, white on dark hero */}
        <Link href="/" className="flex items-center transition-all duration-500">
          <Image
            src={
              useDarkNav
                ? "/metanova-assets/brand/logo-wordmark-color.svg"
                : "/metanova-assets/brand/logo-wordmark-white.svg"
            }
            alt="MetaNova"
            width={isCompact ? 150 : 180}
            height={isCompact ? 40 : 73}
            priority
            className="transition-all duration-500"
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
              {link.label}
            </Link>
          ))}
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
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
