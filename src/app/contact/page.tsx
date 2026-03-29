import type { Metadata } from "next";
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
    <div className="pt-16">
      <JsonLd data={localBusinessJsonLd} />
      <ContactForm content={fm} />
    </div>
  );
}
