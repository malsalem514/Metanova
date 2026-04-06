import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { loadContent } from "@/lib/content/loader";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Contact" : "Contact",
    description:
      locale === "fr"
        ? "Contactez Metanova pour vos demandes en ingénierie en structure, gestion de projets ou consultation en développement."
        : "Get in touch with Metanova for structural engineering, project management, or development consulting inquiries.",
    alternates: {
      canonical: locale === "fr" ? "/fr/contact" : "/en/contact",
      languages: {
        en: "/en/contact",
        fr: "/fr/contact",
      },
    },
  };
}

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

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = loadContent("pages/contact", locale);
  const fm = page?.frontmatter as Record<string, string> | undefined;

  return (
    <>
      <JsonLd data={localBusinessJsonLd} />
      <HeroSection
        title={fm?.["heading"] ?? "Contact us"}
        subtitle={fm?.["intro"]}
        backgroundImage="/metanova-assets/hero/office-montreal.webp"
      />
      <ContactForm content={fm} />
    </>
  );
}
