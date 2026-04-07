import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { ContactForm } from "@/components/sections/ContactForm";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { loadContent } from "@/lib/content/loader";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "联系我们" : "Contact",
    description:
      locale === "fr"
        ? "Contactez Metanova pour vos demandes en ingénierie en structure, gestion de projets ou consultation en développement."
        : locale === "zh"
        ? "联系Metanova，咨询结构工程、项目管理或开发顾问服务。"
        : "Get in touch with Metanova for structural engineering, project management, or development consulting inquiries.",
    openGraph: {
      title: locale === "zh" ? "联系我们" : "Contact",
      description:
        locale === "fr"
          ? "Contactez Metanova pour vos demandes en ingénierie en structure, gestion de projets ou consultation en développement."
          : locale === "zh"
          ? "联系Metanova，咨询结构工程、项目管理或开发顾问服务。"
          : "Get in touch with Metanova for structural engineering, project management, or development consulting inquiries.",
    },
    alternates: {
      canonical: locale === "fr" ? "/fr/contact" : locale === "zh" ? "/zh/contact" : "/en/contact",
      languages: {
        en: "/en/contact",
        fr: "/fr/contact",
        zh: "/zh/contact",
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
        backgroundImage="/metanova-assets/hero/office-montreal.webp"
        videoSrc="/metanova-assets/hero/contact-hero.mp4"
      />
      <ContactForm content={fm} />
      <CTABanner
        title={
          locale === "fr"
            ? "Vous préférez nous appeler?"
            : locale === "zh"
            ? "更喜欢电话沟通？"
            : "Prefer to call?"
        }
        subtitle={
          locale === "fr"
            ? "Notre équipe est disponible du lundi au vendredi, de 9h à 17h. Appelez-nous au +1 (514) 222-3444."
            : locale === "zh"
            ? "我们的团队周一至周五上午9点至下午5点为您服务。请致电 +1 (514) 222-3444。"
            : "Our team is available Monday to Friday, 9 AM to 5 PM. Call us at +1 (514) 222-3444."
        }
        ctaText={
          locale === "fr" ? "NOS SERVICES" : locale === "zh" ? "我们的服务" : "OUR SERVICES"
        }
        ctaHref="/services"
      />
    </>
  );
}
