import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mac 应用启动台",
    short_name: "启动台",
    description: "在 Web 中以 macOS 风格展示并启动你的常用应用。",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#233db3",
    theme_color: "#233db3",
    icons: [
      {
        src: "/pwa-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/pwa-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    categories: ["productivity", "utilities"],
    lang: "zh-CN",
  };
}
