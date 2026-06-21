import { createAnonClient } from "@/lib/supabase/anon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { mapArticleRowToNewsItem, mapTurkiyeSection } from "@/lib/news/map-article";
import type {
  ArticleRow,
  ArticleStatus,
  CategoryRow,
  HomepageSlot,
} from "@/lib/types/database";
import type { CategorySectionData, NewsItem } from "@/lib/types/news";
import type { CategorySlug } from "@/lib/news/category-config";
import { getCategoryConfig } from "@/lib/news/category-config";

const ARTICLE_SELECT = `
  *,
  categories (
    id,
    slug,
    label,
    name,
    sort_order
  )
`;

function mapRows(rows: ArticleRow[] | null): NewsItem[] {
  if (!rows) return [];
  return rows.map(mapArticleRowToNewsItem);
}

export async function fetchCategories(): Promise<CategoryRow[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("fetchCategories:", error.message);
    return [];
  }

  return data ?? [];
}

export async function fetchPublishedArticles(options?: {
  limit?: number;
  homepageSlot?: HomepageSlot;
  categorySlug?: CategorySlug;
  orderBy?: "published_at" | "view_count";
}): Promise<NewsItem[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createAnonClient();
  let query = supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("status", "published")
    .order(options?.orderBy ?? "published_at", { ascending: false });

  if (options?.homepageSlot) {
    query = query.eq("homepage_slot", options.homepageSlot);
  }

  if (options?.categorySlug) {
    const config = getCategoryConfig(options.categorySlug);
    if (config) {
      const categories = await fetchCategories();
      const category = categories.find((item) => item.slug === options.categorySlug);
      if (category) {
        query = query.eq("category_id", category.id);
      }
    }
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("fetchPublishedArticles:", error.message);
    return [];
  }

  return mapRows(data as ArticleRow[]);
}

export async function fetchArticleBySlug(slug: string): Promise<NewsItem | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("fetchArticleBySlug:", error.message);
    return null;
  }

  if (!data) return null;
  return mapArticleRowToNewsItem(data as ArticleRow);
}

export async function fetchAllPublishedSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("articles")
    .select("slug")
    .eq("status", "published");

  if (error) {
    console.error("fetchAllPublishedSlugs:", error.message);
    return [];
  }

  return (data ?? []).map((row) => row.slug);
}

export type SitemapArticle = {
  slug: string;
  updated_at: string;
};

export async function fetchSitemapArticles(): Promise<SitemapArticle[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("articles")
    .select("slug, updated_at")
    .eq("status", "published")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("fetchSitemapArticles:", error.message);
    return [];
  }

  return data ?? [];
}

export async function fetchArticlesByCategory(
  categorySlug: CategorySlug,
): Promise<NewsItem[]> {
  return fetchPublishedArticles({
    categorySlug,
    orderBy: "published_at",
  });
}

export async function fetchRelatedArticles(
  slug: string,
  limit = 3,
): Promise<NewsItem[]> {
  const current = await fetchArticleBySlug(slug);
  if (!current) {
    return fetchPublishedArticles({ limit });
  }

  if (!isSupabaseConfigured()) return [];

  const supabase = createAnonClient();
  const categories = await fetchCategories();
  const category = categories.find((item) => item.name === current.category);

  if (!category) {
    return fetchPublishedArticles({ limit });
  }

  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("status", "published")
    .eq("category_id", category.id)
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("fetchRelatedArticles:", error.message);
    return [];
  }

  return mapRows(data as ArticleRow[]);
}

export async function searchPublishedArticles(query: string): Promise<NewsItem[]> {
  const normalized = query.trim();
  if (!normalized || !isSupabaseConfigured()) return [];

  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("status", "published")
    .or(`title.ilike.%${normalized}%,excerpt.ilike.%${normalized}%`)
    .order("published_at", { ascending: false })
    .limit(12);

  if (error) {
    console.error("searchPublishedArticles:", error.message);
    return [];
  }

  return mapRows(data as ArticleRow[]);
}

export async function fetchMostReadArticles(limit = 5): Promise<NewsItem[]> {
  return fetchPublishedArticles({ limit, orderBy: "view_count" });
}

export async function fetchRecentlyAddedArticles(limit = 5): Promise<NewsItem[]> {
  return fetchPublishedArticles({ limit, orderBy: "published_at" });
}

export async function fetchTopStories(limit = 4): Promise<NewsItem[]> {
  return fetchPublishedArticles({ homepageSlot: "top_story", limit });
}

export async function fetchSideStories(limit = 3): Promise<NewsItem[]> {
  return fetchPublishedArticles({ homepageSlot: "side_story", limit });
}

export async function fetchGridNews(limit = 9): Promise<NewsItem[]> {
  return fetchPublishedArticles({ homepageSlot: "grid", limit });
}

export async function fetchTurkiyeCategorySection(): Promise<CategorySectionData> {
  if (!isSupabaseConfigured()) {
    return mapTurkiyeSection(null, []);
  }

  const supabase = createAnonClient();
  const [featuredResult, secondaryResult] = await Promise.all([
    supabase
      .from("articles")
      .select(ARTICLE_SELECT)
      .eq("status", "published")
      .eq("homepage_slot", "turkiye_featured")
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("articles")
      .select(ARTICLE_SELECT)
      .eq("status", "published")
      .eq("homepage_slot", "turkiye_secondary")
      .order("published_at", { ascending: false })
      .limit(4),
  ]);

  if (featuredResult.error) {
    console.error("fetchTurkiyeCategorySection featured:", featuredResult.error.message);
  }
  if (secondaryResult.error) {
    console.error("fetchTurkiyeCategorySection secondary:", secondaryResult.error.message);
  }

  return mapTurkiyeSection(
    (featuredResult.data as ArticleRow | null) ?? null,
    (secondaryResult.data as ArticleRow[] | null) ?? [],
  );
}

export async function fetchPopularArticles(limit = 3): Promise<NewsItem[]> {
  return fetchMostReadArticles(limit);
}

export type AdminArticleRow = ArticleRow;

export async function fetchAdminArticles(options?: {
  status?: ArticleStatus;
}): Promise<AdminArticleRow[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  let query = supabase
    .from("articles")
    .select(`${ARTICLE_SELECT}`)
    .order("updated_at", { ascending: false });

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("fetchAdminArticles:", error.message);
    return [];
  }

  return (data as AdminArticleRow[]) ?? [];
}

export async function fetchAdminArticleById(
  id: string,
): Promise<AdminArticleRow | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("fetchAdminArticleById:", error.message);
    return null;
  }

  return (data as AdminArticleRow | null) ?? null;
}

export async function getCurrentEditorProfile() {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("getCurrentEditorProfile:", error.message);
    return null;
  }

  return data;
}

export type ArticleFormInput = {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string[];
  categoryId: string;
  coverImageUrl: string;
  status: ArticleStatus;
  readTimeMinutes: number;
  homepageSlot: HomepageSlot | null;
};

export async function saveArticle(input: ArticleFormInput) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Oturum bulunamadı." };
  }

  const payload: Record<string, unknown> = {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt || null,
    content: input.content,
    category_id: input.categoryId,
    cover_image_url: input.coverImageUrl,
    status: input.status,
    read_time_minutes: input.readTimeMinutes,
    homepage_slot: input.homepageSlot,
    author_id: user.id,
  };

  if (input.id) {
    const { data: existing } = await supabase
      .from("articles")
      .select("published_at, status")
      .eq("id", input.id)
      .maybeSingle();

    if (input.status === "published") {
      if (!existing?.published_at) {
        payload.published_at = new Date().toISOString();
      }
    } else {
      payload.published_at = null;
    }

    const { error } = await supabase
      .from("articles")
      .update(payload)
      .eq("id", input.id);

    if (error) return { error: error.message };
    return { id: input.id };
  }

  if (input.status === "published") {
    payload.published_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("articles")
    .insert(payload)
    .select("id")
    .single();

  if (error) return { error: error.message };
  return { id: data.id as string };
}

export async function deleteArticle(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Oturum bulunamadı." };
  }

  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) return { error: error.message };
  return { success: true };
}

export async function uploadCoverImage(formData: FormData) {
  const supabase = await createClient();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Geçerli bir görsel seçin." };
  }

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("article-covers")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    return { error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("article-covers").getPublicUrl(filePath);

  return { url: publicUrl };
}
