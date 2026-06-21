export type ArticleStatus = "draft" | "published" | "archived";

export type HomepageSlot =
  | "top_story"
  | "side_story"
  | "grid"
  | "turkiye_featured"
  | "turkiye_secondary";

export type CategoryRow = {
  id: string;
  slug: string;
  label: string;
  name: string;
  sort_order: number;
};

export type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string[];
  category_id: string;
  cover_image_url: string;
  status: ArticleStatus;
  published_at: string | null;
  read_time_minutes: number;
  view_count: number;
  homepage_slot: HomepageSlot | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
  categories?: CategoryRow | CategoryRow[] | null;
};

export type ArticleInsert = {
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string[];
  category_id: string;
  cover_image_url?: string;
  status?: ArticleStatus;
  published_at?: string | null;
  read_time_minutes?: number;
  homepage_slot?: HomepageSlot | null;
  author_id?: string | null;
};

export type ArticleUpdate = Partial<ArticleInsert>;
