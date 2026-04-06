import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;

  const aboutPaths: Record<string, string> = {
    fr: "/fr/a-propos",
    en: "/en/about",
    zh: "/zh/about",
  };

  redirect(aboutPaths[locale] ?? "/fr/a-propos");
}
