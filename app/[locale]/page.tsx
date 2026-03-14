import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import HomePage from "@/components/HomePage";
import {
  defaultLocale,
  getHomeMetadata,
  isSecondaryLocale,
  secondaryLocales,
} from "@/lib/i18n";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return secondaryLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale === defaultLocale) {
    return getHomeMetadata(defaultLocale);
  }

  if (!isSecondaryLocale(locale)) {
    return {};
  }

  return getHomeMetadata(locale);
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (locale === defaultLocale) {
    redirect("/");
  }

  if (!isSecondaryLocale(locale)) {
    notFound();
  }

  return <HomePage locale={locale} />;
}
