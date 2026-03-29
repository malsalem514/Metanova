import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  company: [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services/structural-engineering", label: "Structural Engineering" },
    { href: "/services/project-management-consulting", label: "Project Management" },
  ],
  portfolio: [
    { href: "/residential", label: "Residential" },
    { href: "/hospitality", label: "Hospitality" },
    { href: "/commercial", label: "Commercial" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#1B2E37]">
      <div className="mx-auto max-w-[1240px] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/metanova-assets/brand/logo-wordmark-white.svg"
              alt="MetaNova"
              width={140}
              height={28}
            />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Designing the future, one structure at a time.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/60">
              <p>7005, boulevard Taschereau, Suite 305</p>
              <p>Brossard, Quebec J4Z 1A7</p>
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
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
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

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.services.map((link) => (
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

          {/* Portfolio */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
              Portfolio
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.portfolio.map((link) => (
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
            &copy; {new Date().getFullYear()} Metanova Experts-Conseils. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Brossard, Quebec, Canada
          </p>
        </div>
      </div>
    </footer>
  );
}
