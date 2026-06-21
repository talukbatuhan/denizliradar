import type { MetadataRoute } from "next";
import { categorySlugs } from "@/lib/news/category-config";
import { fetchSitemapArticles } from "@/lib/news/queries";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await fetchSitemapArticles();

  const homeEntry: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "always",
    priority: 1,
  };

  const categoryEntries: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.8,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/haber/${article.slug}`,
    lastModified: new Date(article.updated_at),
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [homeEntry, ...categoryEntries, ...articleEntries];
}
