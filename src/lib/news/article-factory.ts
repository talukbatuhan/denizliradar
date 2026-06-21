import type { NewsItem } from "@/lib/types/news";

type ArticleInput = {
  id: string;
  slug: string;
  title: string;
  category: string;
  imageUrl: string;
  excerpt?: string;
  hoursAgo?: number;
  readTimeMinutes?: number;
  content?: string[];
};

function formatPublishedDate(date: Date): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function createArticle(input: ArticleInput): NewsItem {
  const published = new Date();
  published.setHours(published.getHours() - (input.hoursAgo ?? 2));

  return {
    id: input.id,
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    category: input.category,
    href: `/haber/${input.slug}`,
    imageUrl: input.imageUrl,
    publishedAt: formatPublishedDate(published),
    publishedAtISO: published.toISOString(),
    readTimeMinutes: input.readTimeMinutes ?? 3,
    content: input.content,
  };
}
