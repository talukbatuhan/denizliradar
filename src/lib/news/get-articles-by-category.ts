import {
  fetchArticlesByCategory,
  fetchMostReadArticles,
  fetchRecentlyAddedArticles,
} from "@/lib/news/queries";
import type { CategorySlug } from "@/lib/news/category-config";
import { getCategoryConfig, isValidCategorySlug } from "@/lib/news/category-config";

export async function getArticlesByCategory(slug: CategorySlug) {
  return fetchArticlesByCategory(slug);
}

export async function getMostReadArticles(limit = 5) {
  return fetchMostReadArticles(limit);
}

export async function getRecentlyAddedArticles(limit = 5) {
  return fetchRecentlyAddedArticles(limit);
}

export async function getCategoryMetadata(slug: string) {
  if (!isValidCategorySlug(slug)) return null;

  const config = getCategoryConfig(slug);
  if (!config) return null;

  const articles = await getArticlesByCategory(slug);

  return {
    ...config,
    slug,
    articleCount: articles.length,
  };
}
