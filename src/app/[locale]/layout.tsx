import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Metanova",
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
  name: "Metanova",
  url: "https://metanova.ca",
};

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
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
  );
}
