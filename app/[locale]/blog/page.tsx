import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import LaunchOsBlogArticle, {
  getLaunchOsBlogCopy,
} from "@/components/LaunchOsBlogArticle";
import {
  defaultLocale,
  getAlternateLanguagePaths,
  getLocalizedPath,
  isSecondaryLocale,
  secondaryLocales,
} from "@/lib/i18n";

type LocaleBlogPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return secondaryLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleBlogPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale === defaultLocale) {
    const copy = getLaunchOsBlogCopy(defaultLocale);

    return {
      title: copy.metadataTitle,
      description: copy.metadataDescription,
      alternates: {
        canonical: getLocalizedPath(defaultLocale, "/blog"),
        languages: getAlternateLanguagePaths("/blog"),
      },
    };
  }

  if (!isSecondaryLocale(locale)) {
    return {};
  }

  const copy = getLaunchOsBlogCopy(locale);

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    alternates: {
      canonical: getLocalizedPath(locale, "/blog"),
      languages: getAlternateLanguagePaths("/blog"),
    },
  };
}

export default async function LocaleBlogPage({ params }: LocaleBlogPageProps) {
  const { locale } = await params;

  if (locale === defaultLocale) {
    redirect("/blog");
  }

  if (!isSecondaryLocale(locale)) {
    notFound();
  }

  return <LaunchOsBlogArticle locale={locale} />;
}
