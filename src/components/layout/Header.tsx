"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#E8E0D0] bg-[#F5F0E6]/95 shadow-sm shadow-[#54341F]/8 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={
              scrolled
                ? "/metanova-assets/brand/logo-wordmark-color.svg"
                : "/metanova-assets/brand/logo-wordmark-white.svg"
            }
            alt="MetaNova"
            width={160}
            height={32}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-[#30454C] hover:text-[#C36036]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="ml-2">
            <Button className="rounded-full bg-[#C36036] px-6 text-white transition-all duration-300 hover:bg-[#A04E2A] hover:shadow-lg hover:shadow-[#C36036]/20 hover:scale-[1.02]">
              Get in Touch
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`flex h-10 w-10 items-center justify-center rounded-lg md:hidden ${
            scrolled ? "text-[#30454C]" : "text-white"
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
        <nav className="border-t border-[#E8E0D0] bg-[#F5F0E6] px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-base font-medium text-[#30454C] transition-colors duration-300 hover:text-[#C36036]"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="mt-2 block">
            <Button className="w-full rounded-full bg-[#C36036] text-white hover:bg-[#A04E2A]">
              Get in Touch
            </Button>
          </Link>
        </nav>
      )}
    </header>
  );
}
