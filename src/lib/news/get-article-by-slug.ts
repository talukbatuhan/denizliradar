import { allArticles } from "@/lib/constants/placeholder-news";
import type { NewsItem } from "@/lib/constants/placeholder-news";

export function getArticleBySlug(slug: string): NewsItem | undefined {
  return allArticles.find((article) => article.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return allArticles.map((article) => article.slug);
}

export function getRelatedArticles(slug: string, limit = 3): NewsItem[] {
  const current = getArticleBySlug(slug);
  if (!current) return allArticles.slice(0, limit);

  return allArticles
    .filter(
      (article) =>
        article.slug !== slug && article.category === current.category,
    )
    .slice(0, limit);
}

export function searchArticles(query: string): NewsItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return allArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(normalized) ||
      article.category.toLowerCase().includes(normalized) ||
      article.excerpt?.toLowerCase().includes(normalized),
  );
}
