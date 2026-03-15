/** @type {import('next-sitemap').IConfig} */
const siteUrl =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://maclaunchpad.aizeten.me";

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
    };
  },
};
