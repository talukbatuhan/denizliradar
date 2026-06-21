import { fetchFeedArticles } from "@/lib/news/queries";
import { buildRssFeed } from "@/lib/seo/syndication";

export const revalidate = 3600;

export async function GET() {
  const articles = await fetchFeedArticles(50);
  const xml = buildRssFeed(articles);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
