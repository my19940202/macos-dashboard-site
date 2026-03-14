import type { Metadata } from "next";
import LaunchOsBlogArticle, {
  getLaunchOsBlogCopy,
} from "@/components/LaunchOsBlogArticle";
import {
  defaultLocale,
  getAlternateLanguagePaths,
  getLocalizedPath,
} from "@/lib/i18n";

export function generateMetadata(): Metadata {
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

export default function BlogPage() {
  return <LaunchOsBlogArticle locale={defaultLocale} />;
}
