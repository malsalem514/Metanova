"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#2A2520] bg-[#0C0C0C]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/metanova-assets/brand/logo-wordmark-white.svg"
            alt="MetaNova"
            width={160}
            height={32}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-[#8A8278] transition-colors hover:text-[#F5F0EB]"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="ml-2">
            <Button className="bg-[#C36036] text-[#F5F0EB] hover:bg-[#D4724A]">
              Get in Touch
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#F5F0EB] md:hidden"
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
        <nav className="border-t border-[#2A2520] bg-[#0C0C0C] px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-base text-[#8A8278] transition-colors hover:text-[#F5F0EB]"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="mt-2 block">
            <Button className="w-full bg-[#C36036] text-[#F5F0EB] hover:bg-[#D4724A]">
              Get in Touch
            </Button>
          </Link>
        </nav>
      )}
    </header>
  );
}
