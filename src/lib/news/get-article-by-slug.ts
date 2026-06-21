import {
  fetchAllPublishedSlugs,
  fetchArticleBySlug,
  fetchRelatedArticles,
  searchPublishedArticles,
} from "@/lib/news/queries";

export async function getArticleBySlug(slug: string) {
  return fetchArticleBySlug(slug);
}

export async function getAllArticleSlugs() {
  return fetchAllPublishedSlugs();
}

export async function getRelatedArticles(slug: string, limit = 3) {
  return fetchRelatedArticles(slug, limit);
}

export async function searchArticles(query: string) {
  return searchPublishedArticles(query);
}
