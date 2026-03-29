import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { loadContent } from "@/lib/content/loader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with MetaNova for structural engineering, project management, or development consulting inquiries.",
  alternates: { canonical: "/contact" },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "Metanova Experts-Conseils",
  url: "https://metanova.ca",
  telephone: "+15142223444",
  email: "info@metanova.ca",
  address: {
    "@type": "PostalAddress",
    streetAddress: "7005 Taschereau Blvd #305",
    addressLocality: "Brossard",
    addressRegion: "QC",
    postalCode: "J4Z 1A7",
    addressCountry: "CA",
  },
  areaServed: {
    "@type": "State",
    name: "Quebec",
  },
};

export default function ContactPage() {
  const page = loadContent("pages/contact");
  const fm = page?.frontmatter as Record<string, string> | undefined;

  return (
    <>
      <JsonLd data={localBusinessJsonLd} />
      <HeroSection
        title="Let's build something together"
        subtitle="Whether you have a new project in mind, need expert consultation, or want to learn more about our work — we're here to help."
        backgroundImage="/metanova-assets/projects/commercial/glass-atrium.jpg"
        ctaText="Call us"
        ctaHref="tel:+15142223444"
      />
      <ContactForm content={fm} />
    </>
  );
}
