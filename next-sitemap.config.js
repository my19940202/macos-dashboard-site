/** @type {import('next-sitemap').IConfig} */
const siteUrl =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://maclaunchpad.aizeten.me";

const localizedHomePaths = new Set(["/", "/en", "/ja"]);
const homeAlternateRefs = [
  {
    href: `${siteUrl}/`,
    hreflang: "zh-CN",
  },
  {
    href: `${siteUrl}/en`,
    hreflang: "en",
  },
  {
    href: `${siteUrl}/ja`,
    hreflang: "ja",
  },
  {
    href: `${siteUrl}/`,
    hreflang: "x-default",
  },
];

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/404", "/500"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  transform: async (config, path) => {
    const isHomePage = path === "/";

    return {
      loc: path,
      changefreq: isHomePage ? "daily" : "weekly",
      priority: isHomePage ? 1.0 : 0.7,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: localizedHomePaths.has(path)
        ? homeAlternateRefs
        : config.alternateRefs ?? [],
    };
  },
};
