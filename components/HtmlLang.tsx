"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  defaultLocale,
  getHtmlLang,
  isSecondaryLocale,
  type Locale,
} from "@/lib/i18n";

export default function HtmlLang() {
  const pathname = usePathname();

  useEffect(() => {
    const firstSegment = pathname.split("/")[1] ?? "";
    const locale: Locale = isSecondaryLocale(firstSegment)
      ? firstSegment
      : defaultLocale;

    document.documentElement.lang = getHtmlLang(locale);
  }, [pathname]);

  return null;
}
