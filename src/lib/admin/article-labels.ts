import type { ArticleStatus, HomepageSlot } from "@/lib/types/database";

export const articleStatusLabels: Record<ArticleStatus, string> = {
  draft: "Taslak",
  published: "Yayında",
  archived: "Arşiv",
};

export const homepageSlotLabels: Record<HomepageSlot, string> = {
  top_story: "Slider",
  side_story: "Slider Yan",
  grid: "Ana Grid",
  turkiye_featured: "Türkiye Öne Çıkan",
  turkiye_secondary: "Türkiye Yan",
};

export type ArticleStatusFilter = ArticleStatus | "all";

export const statusFilterOptions: { value: ArticleStatusFilter; label: string }[] =
  [
    { value: "all", label: "Tümü" },
    { value: "published", label: "Yayında" },
    { value: "draft", label: "Taslak" },
    { value: "archived", label: "Arşiv" },
  ];
