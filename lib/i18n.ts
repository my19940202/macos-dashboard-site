import type { Metadata } from "next";

export const siteUrl =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://maclaunchpad.aizeten.me";

export const defaultLocale = "zh";
export const secondaryLocales = ["en", "ja"] as const;
export const locales = [defaultLocale, ...secondaryLocales] as const;

export type Locale = (typeof locales)[number];
export type SecondaryLocale = (typeof secondaryLocales)[number];

export type LaunchPadMessages = {
  searchAriaLabel: string;
  searchPlaceholder: string;
  unsupportedAppMessage: string;
  pageIndicatorLabelTemplate: string;
};

export type PwaInstallMessages = {
  installing: string;
  installed: string;
  install: string;
};

type LocaleMessages = {
  metadata: {
    title: string;
    description: string;
    applicationName: string;
  };
  launchPad: LaunchPadMessages;
  pwaInstall: PwaInstallMessages;
};

const dictionaries: Record<Locale, LocaleMessages> = {
  zh: {
    metadata: {
      title: "Mac 应用启动台",
      description: "在 Web 中以 macOS 风格展示并启动你的常用应用。",
      applicationName: "Mac 应用启动台",
    },
    launchPad: {
      searchAriaLabel: "搜索应用",
      searchPlaceholder: "搜索应用",
      unsupportedAppMessage: "该应用暂不支持直接打开",
      pageIndicatorLabelTemplate: "第 {page} 页",
    },
    pwaInstall: {
      installing: "安装中...",
      installed: "已安装",
      install: "安装到本地",
    },
  },
  en: {
    metadata: {
      title: "Mac App Launchpad",
      description: "Launch your favorite macOS apps in a web-based dashboard.",
      applicationName: "Mac App Launchpad",
    },
    launchPad: {
      searchAriaLabel: "Search applications",
      searchPlaceholder: "Search applications",
      unsupportedAppMessage: "This app does not support direct launch yet.",
      pageIndicatorLabelTemplate: "Page {page}",
    },
    pwaInstall: {
      installing: "Installing...",
      installed: "Installed",
      install: "Install app",
    },
  },
  ja: {
    metadata: {
      title: "Mac アプリ起動台",
      description: "macOS アプリを Web 上のダッシュボードから素早く起動します。",
      applicationName: "Mac アプリ起動台",
    },
    launchPad: {
      searchAriaLabel: "アプリを検索",
      searchPlaceholder: "アプリを検索",
      unsupportedAppMessage: "このアプリはまだ直接起動に対応していません。",
      pageIndicatorLabelTemplate: "{page}ページ",
    },
    pwaInstall: {
      installing: "インストール中...",
      installed: "インストール済み",
      install: "アプリをインストール",
    },
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function isSecondaryLocale(value: string): value is SecondaryLocale {
  return secondaryLocales.includes(value as SecondaryLocale);
}

export function getMessages(locale: Locale): LocaleMessages {
  return dictionaries[locale];
}

export function getHtmlLang(locale: Locale): string {
  switch (locale) {
    case "en":
      return "en";
    case "ja":
      return "ja";
    default:
      return "zh-CN";
  }
}

export function getLocalizedPath(locale: Locale, pathname = "/"): string {
  const normalizedPath =
    pathname === "/" ? "" : pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (locale === defaultLocale) {
    return normalizedPath || "/";
  }

  return `/${locale}${normalizedPath}`;
}

export function getAlternateLanguagePaths(pathname = "/"): Record<string, string> {
  return {
    "zh-CN": getLocalizedPath("zh", pathname),
    en: getLocalizedPath("en", pathname),
    ja: getLocalizedPath("ja", pathname),
    "x-default": getLocalizedPath("zh", pathname),
  };
}

export function getHomeMetadata(locale: Locale): Metadata {
  const { metadata } = getMessages(locale);
  const canonicalPath = getLocalizedPath(locale, "/");

  return {
    title: metadata.title,
    description: metadata.description,
    applicationName: metadata.applicationName,
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: metadata.applicationName,
    },
    alternates: {
      canonical: canonicalPath,
      languages: getAlternateLanguagePaths("/"),
    },
  };
}
