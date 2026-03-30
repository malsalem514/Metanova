import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === "fr" ? "Politique de confidentialité" : "Privacy Policy",
    description:
      locale === "fr"
        ? "Politique de confidentialité de Metanova — comment nous collectons, utilisons et protégeons vos renseignements."
        : "Metanova's Privacy Policy — how we collect, use, and protect your information.",
    alternates: {
      canonical:
        locale === "fr" ? "/fr/confidentialite" : "/en/privacy",
      languages: {
        en: "/en/privacy",
        fr: "/fr/confidentialite",
      },
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isFr = locale === "fr";

  return (
    <div className="mx-auto max-w-[780px] px-6 py-24">
      <h1 className="text-3xl font-medium text-[#121212]">
        {isFr ? "Politique de confidentialité" : "Privacy Policy"}
      </h1>
      <p className="mt-3 text-sm text-[#121212]/50">
        {isFr ? "Dernière mise à jour : mars 2026" : "Last updated: March 2026"}
      </p>

      {isFr ? <FrenchContent /> : <EnglishContent />}
    </div>
  );
}

function EnglishContent() {
  return (
    <div className="mt-10 space-y-8 text-sm leading-relaxed text-[#121212]/80">
      <section>
        <h2 className="text-base font-medium text-[#121212]">Overview</h2>
        <p className="mt-3">
          Metanova Experts-Conseils (&ldquo;Metanova&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;) is committed to protecting your privacy. This
          policy explains how we handle information on{" "}
          <strong>metanova.ca</strong>.
        </p>
      </section>

      <section>
        <h2 className="text-base font-medium text-[#121212]">
          Cookies &amp; Tracking
        </h2>
        <p className="mt-3">
          This site does <strong>not</strong> use cookies for tracking or
          advertising. We do not use any third-party tracking scripts or
          advertising cookies.
        </p>
      </section>

      <section>
        <h2 className="text-base font-medium text-[#121212]">Analytics</h2>
        <p className="mt-3">
          We use <strong>Vercel Analytics</strong> to understand site traffic.
          Vercel Analytics is cookieless and collects no personal data — it
          uses aggregated, anonymous metrics only (page views, country-level
          geography, device type). No personally identifiable information is
          collected or stored.
        </p>
      </section>

      <section>
        <h2 className="text-base font-medium text-[#121212]">Contact Form</h2>
        <p className="mt-3">
          When you fill out our contact form, the data you provide (name, email
          address, phone number, and message) is transmitted to us by email
          only. <strong>It is not stored in any database</strong> and is not
          shared with any third party.
        </p>
      </section>

      <section>
        <h2 className="text-base font-medium text-[#121212]">
          Careers &amp; Resume Uploads
        </h2>
        <p className="mt-3">
          If you apply for a position through our careers page, your resume or
          any documents you upload are sent to us by email only and are{" "}
          <strong>not retained on our servers</strong>. We do not store
          applicant files beyond the transmission.
        </p>
      </section>

      <section>
        <h2 className="text-base font-medium text-[#121212]">
          Your Data &amp; Third Parties
        </h2>
        <p className="mt-3">
          We do not sell, rent, or share your personal information with any
          third parties for marketing or commercial purposes.
        </p>
      </section>

      <section>
        <h2 className="text-base font-medium text-[#121212]">
          Applicable Law
        </h2>
        <p className="mt-3">
          This policy is governed by the{" "}
          <em>
            Personal Information Protection and Electronic Documents Act
          </em>{" "}
          (PIPEDA) and Quebec&apos;s{" "}
          <em>Act respecting the protection of personal information in the private sector</em>{" "}
          (Law 25).
        </p>
      </section>

      <section>
        <h2 className="text-base font-medium text-[#121212]">Contact Us</h2>
        <p className="mt-3">
          For any questions regarding this policy, please contact us at{" "}
          <a
            href="mailto:info@metanova.ca"
            className="text-[#0A5592] underline underline-offset-2 hover:opacity-80"
          >
            info@metanova.ca
          </a>
          .
        </p>
      </section>
    </div>
  );
}

function FrenchContent() {
  return (
    <div className="mt-10 space-y-8 text-sm leading-relaxed text-[#121212]/80">
      <section>
        <h2 className="text-base font-medium text-[#121212]">Aperçu</h2>
        <p className="mt-3">
          Metanova Experts-Conseils (&laquo;&nbsp;Metanova&nbsp;&raquo;,
          &laquo;&nbsp;nous&nbsp;&raquo;) s&apos;engage à protéger votre vie
          privée. Cette politique explique comment nous traitons les
          renseignements sur <strong>metanova.ca</strong>.
        </p>
      </section>

      <section>
        <h2 className="text-base font-medium text-[#121212]">
          Témoins (cookies) et suivi
        </h2>
        <p className="mt-3">
          Ce site n&apos;utilise <strong>pas</strong> de témoins à des fins de
          suivi ou de publicité. Nous n&apos;utilisons aucun script de suivi
          tiers ni de témoins publicitaires.
        </p>
      </section>

      <section>
        <h2 className="text-base font-medium text-[#121212]">Analytique</h2>
        <p className="mt-3">
          Nous utilisons <strong>Vercel Analytics</strong> pour comprendre le
          trafic du site. Vercel Analytics est sans témoin et ne collecte aucune
          donnée personnelle — il utilise uniquement des métriques agrégées et
          anonymes (pages vues, géographie au niveau du pays, type
          d&apos;appareil). Aucune information personnellement identifiable
          n&apos;est collectée ou stockée.
        </p>
      </section>

      <section>
        <h2 className="text-base font-medium text-[#121212]">
          Formulaire de contact
        </h2>
        <p className="mt-3">
          Lorsque vous remplissez notre formulaire de contact, les données que
          vous fournissez (nom, adresse courriel, numéro de téléphone et
          message) nous sont transmises par courriel uniquement.{" "}
          <strong>Elles ne sont stockées dans aucune base de données</strong> et
          ne sont pas partagées avec des tiers.
        </p>
      </section>

      <section>
        <h2 className="text-base font-medium text-[#121212]">
          Carrières et téléchargement de CV
        </h2>
        <p className="mt-3">
          Si vous postulez via notre page carrières, votre CV ou tout document
          que vous téléchargez nous est envoyé par courriel uniquement et{" "}
          <strong>n&apos;est pas conservé sur nos serveurs</strong>. Nous ne
          stockons pas les fichiers des candidats au-delà de la transmission.
        </p>
      </section>

      <section>
        <h2 className="text-base font-medium text-[#121212]">
          Vos données et les tiers
        </h2>
        <p className="mt-3">
          Nous ne vendons pas, ne louons pas et ne partageons pas vos
          renseignements personnels avec des tiers à des fins commerciales ou
          de marketing.
        </p>
      </section>

      <section>
        <h2 className="text-base font-medium text-[#121212]">
          Loi applicable
        </h2>
        <p className="mt-3">
          Cette politique est régie par la{" "}
          <em>
            Loi sur la protection des renseignements personnels et les documents
            électroniques
          </em>{" "}
          (LPRPDE) et la{" "}
          <em>
            Loi sur la protection des renseignements personnels dans le secteur
            privé
          </em>{" "}
          du Québec (Loi 25).
        </p>
      </section>

      <section>
        <h2 className="text-base font-medium text-[#121212]">Nous joindre</h2>
        <p className="mt-3">
          Pour toute question concernant cette politique, veuillez nous
          contacter à{" "}
          <a
            href="mailto:info@metanova.ca"
            className="text-[#0A5592] underline underline-offset-2 hover:opacity-80"
          >
            info@metanova.ca
          </a>
          .
        </p>
      </section>
    </div>
  );
}
