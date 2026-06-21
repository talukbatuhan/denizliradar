import type { ArticleRow, CategoryRow } from "@/lib/types/database";
import type { CategorySectionData, NewsItem } from "@/lib/types/news";

function getCategoryFromRow(
  row: ArticleRow,
): CategoryRow | null {
  if (!row.categories) return null;
  return Array.isArray(row.categories) ? row.categories[0] ?? null : row.categories;
}

function formatPublishedDate(iso: string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function mapArticleRowToNewsItem(row: ArticleRow): NewsItem {
  const category = getCategoryFromRow(row);
  const publishedAtISO = row.published_at ?? row.created_at;
  const content = Array.isArray(row.content) ? row.content : [];

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? undefined,
    category: category?.name ?? "Gündem",
    href: `/haber/${row.slug}`,
    imageUrl: row.cover_image_url,
    publishedAt: formatPublishedDate(publishedAtISO),
    publishedAtISO,
    updatedAtISO: row.updated_at,
    readTimeMinutes: row.read_time_minutes,
    content,
  };
}

export function mapTurkiyeSection(
  featured: ArticleRow | null,
  secondary: ArticleRow[],
): CategorySectionData {
  return {
    categoryLabel: "TÜRKİYE",
    categoryHref: "/turkiye",
    featured: featured ? mapArticleRowToNewsItem(featured) : null,
    secondary: secondary.map(mapArticleRowToNewsItem),
  };
}

export function slugify(value: string): string {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
