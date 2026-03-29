import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://metanova.ca"),
  title: {
    default: "MetaNova \u2014 Structural Engineering & Development",
    template: "%s | MetaNova",
  },
  description:
    "Structural engineering, real estate development and project management across Quebec.",
  keywords: [
    "structural engineering",
    "real estate development",
    "project management",
    "Quebec",
    "construction",
    "MetaNova",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "MetaNova",
    images: [
      {
        url: "/metanova-assets/hero/construction-leadership.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MetaNova",
  legalName: "Metanova Experts-Conseils",
  url: "https://metanova.ca",
  logo: "https://metanova.ca/metanova-assets/brand/logo-wordmark-color.svg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "7005 Taschereau Blvd #305",
    addressLocality: "Brossard",
    addressRegion: "QC",
    postalCode: "J4Z 1A7",
    addressCountry: "CA",
  },
  telephone: "+15142223444",
  email: "info@metanova.ca",
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MetaNova",
  url: "https://metanova.ca",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        plusJakartaSans.variable,
        ibmPlexMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[#121212] focus:shadow-lg"
        >
          Skip to main content
        </a>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={webSiteJsonLd} />
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
