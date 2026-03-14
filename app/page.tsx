import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { defaultLocale, getHomeMetadata } from "@/lib/i18n";

export const generateMetadata = (): Metadata => getHomeMetadata(defaultLocale);

export default function Home() {
  return <HomePage locale={defaultLocale} />;
}
