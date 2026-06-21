import type { MetadataRoute } from "next";
import { categorySlugs } from "@/lib/news/category-config";
import { fetchSitemapData } from "@/lib/news/queries";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { articles, categoryLastModified } = await fetchSitemapData();
  const latestArticleUpdate = articles[0]?.updated_at;

  const homeEntry: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified: latestArticleUpdate ? new Date(latestArticleUpdate) : new Date(),
    changeFrequency: "always",
    priority: 1,
  };

  const categoryEntries: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: categoryLastModified[slug]
      ? new Date(categoryLastModified[slug])
      : new Date(),
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
