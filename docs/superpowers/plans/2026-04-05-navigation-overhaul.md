# Navigation Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat white mobile menu with a sliding drawer (parallax push, services accordion, structural watermark) and add a desktop services hover dropdown.

**Architecture:** The Header component is rewritten to use framer-motion (`motion/react`) for the drawer, overlay, staggered links, and accordion. The locale layout wraps page content in a div that receives a CSS transform when the drawer is open, communicated via a CSS class on the `<html>` element. The desktop dropdown uses a hover-intent pattern with a timeout to prevent flicker.

**Tech Stack:** Next.js 16 App Router, motion/react (framer-motion), Tailwind CSS 4, next-intl

**Spec:** `docs/superpowers/specs/2026-04-05-navigation-overhaul-design.md`

---

### File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/layout/Header.tsx` | Rewrite | Mobile drawer + desktop dropdown + all animations |
| `src/app/[locale]/layout.tsx` | Modify | Wrap `<main>` + `<Footer>` in a pushable container div |
| `messages/en.json` | Modify | Add `nav.structuralEngineering`, `nav.realEstateDevelopment`, `nav.projectManagement` |
| `messages/fr.json` | Modify | Same keys in French |

---

### Task 1: Add service sub-item i18n keys

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/fr.json`

- [ ] **Step 1: Add nav keys for service sub-items in English**

In `messages/en.json`, change the `nav` object from:
```json
"nav": {
  "home": "Home",
  "about": "About",
  "services": "Services",
  "contact": "Contact",
  "careers": "Careers"
},
```
to:
```json
"nav": {
  "home": "Home",
  "about": "About",
  "services": "Services",
  "structuralEngineering": "Structural Engineering",
  "realEstateDevelopment": "Real Estate Development",
  "projectManagement": "Project Management",
  "contact": "Contact",
  "careers": "Careers"
},
```

- [ ] **Step 2: Add nav keys for service sub-items in French**

In `messages/fr.json`, change the `nav` object from:
```json
"nav": {
  "home": "Accueil",
  "about": "Notre firme",
  "services": "Services",
  "contact": "Contact",
  "careers": "Carrières"
},
```
to:
```json
"nav": {
  "home": "Accueil",
  "about": "Notre firme",
  "services": "Services",
  "structuralEngineering": "Ingénierie en structure",
  "realEstateDevelopment": "Développement immobilier",
  "projectManagement": "Gestion de projets",
  "contact": "Contact",
  "careers": "Carrières"
},
```

- [ ] **Step 3: Verify build passes**

```bash
cd /Users/musaalsalem/Projects/MusaOS/metanova-vercel && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add messages/en.json messages/fr.json
git commit -m "feat(i18n): add service sub-item nav keys for menu dropdown"
```

---

### Task 2: Add parallax push wrapper to locale layout

**Files:**
- Modify: `src/app/[locale]/layout.tsx`

The mobile drawer needs to push the page content left. We wrap `<Header>`, `<main>`, and `<Footer>` in a div with id `page-content` that can be transformed. The drawer will add/remove a CSS class on `<html>` to trigger the transform via CSS (simpler than React state bridging between server and client components).

- [ ] **Step 1: Add the push wrapper and CSS**

In `src/app/[locale]/layout.tsx`, change the return JSX from:

```tsx
    <NextIntlClientProvider messages={messages}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[#121212] focus:shadow-lg"
      >
        {locale === "fr" ? "Aller au contenu principal" : "Skip to main content"}
      </a>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={webSiteJsonLd} />
      <Header />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </NextIntlClientProvider>
```

to:

```tsx
    <NextIntlClientProvider messages={messages}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[#121212] focus:shadow-lg"
      >
        {locale === "fr" ? "Aller au contenu principal" : "Skip to main content"}
      </a>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={webSiteJsonLd} />
      <Header />
      <div id="page-push-container" className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-left">
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </div>
      <Analytics />
      <SpeedInsights />
    </NextIntlClientProvider>
```

- [ ] **Step 2: Add the CSS for the push state**

In `src/app/globals.css`, add at the end (before the `@media (prefers-reduced-motion)` block):

```css
/* Mobile drawer push effect */
html.drawer-open #page-push-container {
  transform: translateX(-15%) scale(0.92);
  border-radius: 16px;
  overflow: hidden;
}

html.drawer-open body {
  overflow: hidden;
}

@media (prefers-reduced-motion: reduce) {
  html.drawer-open #page-push-container {
    transform: none;
    border-radius: 0;
  }
}
```

- [ ] **Step 3: Verify build passes**

```bash
cd /Users/musaalsalem/Projects/MusaOS/metanova-vercel && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/app/\[locale\]/layout.tsx src/app/globals.css
git commit -m "feat: add parallax push container for mobile drawer"
```

---

### Task 3: Rewrite Header with mobile drawer and desktop dropdown

**Files:**
- Modify: `src/components/layout/Header.tsx`

This is the main task. The full replacement code for Header.tsx:

- [ ] **Step 1: Replace Header.tsx with the new implementation**

Replace the entire contents of `src/components/layout/Header.tsx` with:

```tsx
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

// Structural truss watermark SVG for the drawer background
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

  // Toggle drawer open/close + push effect via CSS class on <html>
  const openDrawer = useCallback(() => {
    setMobileOpen(true);
    document.documentElement.classList.add("drawer-open");
  }, []);

  const closeDrawer = useCallback(() => {
    setMobileOpen(false);
    setServicesExpanded(false);
    document.documentElement.classList.remove("drawer-open");
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!mobileOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen, closeDrawer]);

  // Desktop dropdown hover handlers
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
          {/* Logo */}
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

                  {/* Hover bridge */}
                  {desktopDropdownOpen && (
                    <div className="absolute left-0 top-full h-2 w-full" />
                  )}

                  {/* Desktop dropdown */}
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

      {/* Mobile drawer overlay */}
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

      {/* Mobile drawer */}
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
            {/* Close button */}
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

            {/* Nav links with stagger */}
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

                    {/* Services accordion */}
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

            {/* Bottom section */}
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

            {/* Structural watermark */}
            <TrussWatermark />
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd /Users/musaalsalem/Projects/MusaOS/metanova-vercel && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: sliding drawer mobile menu + desktop services dropdown

- Right-side drawer with parallax push effect on page content
- Services accordion with numbered sub-items (01, 02, 03)
- Structural truss SVG watermark in drawer background
- Staggered link animations on open
- Desktop hover dropdown for Services with hover bridge
- Escape key and backdrop tap to close
- Accessible: aria-expanded, aria-modal, role=dialog
- prefers-reduced-motion support via CSS"
```

---

### Task 4: Visual testing and polish

- [ ] **Step 1: Start dev server**

```bash
cd /Users/musaalsalem/Projects/MusaOS/metanova-vercel && npm run dev
```

- [ ] **Step 2: Test mobile drawer**

Open browser at `http://localhost:3000/fr` with device toolbar (375px width):
- [ ] Hamburger opens drawer from right
- [ ] Page content pushes left with scale(0.92) effect
- [ ] Links stagger in with animation
- [ ] Services accordion expands/collapses with chevron rotation
- [ ] Service sub-items navigate to correct pages
- [ ] "Services" text navigates to `/services`
- [ ] Language switcher works
- [ ] Backdrop tap closes drawer
- [ ] Escape key closes drawer
- [ ] Drawer close animates out smoothly
- [ ] Test on both `/fr` and `/en`

- [ ] **Step 3: Test desktop dropdown**

Open browser at full width (1200px+):
- [ ] Hovering "Services" shows dropdown with 3 sub-items
- [ ] Clicking "Services" navigates to `/services`
- [ ] Sub-items navigate to correct pages
- [ ] Dropdown fades in/out smoothly
- [ ] Moving mouse from link to dropdown doesn't close it (hover bridge)
- [ ] Dropdown disappears after mouse leaves

- [ ] **Step 4: Test reduced motion**

In browser DevTools, enable "prefers-reduced-motion: reduce":
- [ ] Drawer appears without parallax push
- [ ] Links appear without stagger animation

- [ ] **Step 5: Push and deploy**

```bash
git push origin main
```
