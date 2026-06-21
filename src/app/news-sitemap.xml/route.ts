import { fetchNewsSitemapArticles } from "@/lib/news/queries";
import { buildGoogleNewsSitemap } from "@/lib/seo/syndication";

export const revalidate = 1800;

export async function GET() {
  const articles = await fetchNewsSitemapArticles({
    maxAgeHours: 48,
    limit: 1000,
  });
  const xml = buildGoogleNewsSitemap(articles);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=300",
    },
  });
}
