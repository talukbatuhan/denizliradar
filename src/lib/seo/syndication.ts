import {
  escapeXml,
  toNewsPublicationDate,
  toRssPubDate,
} from "@/lib/seo/xml-utils";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export type SyndicationArticle = {
  slug: string;
  title: string;
  excerpt: string | null;
  published_at: string;
};

export function buildRssFeed(articles: SyndicationArticle[]): string {
  const items = articles
    .map((article) => {
      const link = absoluteUrl(`/haber/${article.slug}`);
      const description = article.excerpt ?? article.title;

      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${toRssPubDate(article.published_at)}</pubDate>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>tr</language>
    <lastBuildDate>${toRssPubDate(new Date().toISOString())}</lastBuildDate>
    <atom:link href="${escapeXml(absoluteUrl("/feed.xml"))}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}

export function buildGoogleNewsSitemap(articles: SyndicationArticle[]): string {
  const urls = articles
    .map((article) => {
      const link = absoluteUrl(`/haber/${article.slug}`);

      return `  <url>
    <loc>${escapeXml(link)}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(SITE_NAME)}</news:name>
        <news:language>tr</news:language>
      </news:publication>
      <news:publication_date>${toNewsPublicationDate(article.published_at)}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
    </news:news>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;
}
