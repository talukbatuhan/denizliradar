import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const DISALLOW_PATHS = [
  "/admin",
  "/admin/",
  "/api/",
  "/auth/",
  "/auth",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW_PATHS,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: DISALLOW_PATHS,
      },
      {
        userAgent: "Googlebot-News",
        allow: ["/", "/haber/"],
        disallow: DISALLOW_PATHS,
      },
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/news-sitemap.xml`],
    host: SITE_URL.replace(/^https:\/\//, ""),
  };
}
