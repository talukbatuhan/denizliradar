export type CategorySlug =
  | "gundem"
  | "denizli"
  | "ekonomi"
  | "spor"
  | "egitim"
  | "asayis"
  | "siyaset"
  | "yasam"
  | "turkiye";

const categoryMap: Record<CategorySlug, { label: string; name: string }> = {
  gundem: {
    label: "GÜNDEM",
    name: "Gündem",
  },
  denizli: {
    label: "DENİZLİ",
    name: "Denizli",
  },
  ekonomi: {
    label: "EKONOMİ",
    name: "Ekonomi",
  },
  spor: {
    label: "SPOR",
    name: "Spor",
  },
  egitim: {
    label: "EĞİTİM",
    name: "Eğitim",
  },
  asayis: {
    label: "ASAYİŞ",
    name: "Asayiş",
  },
  siyaset: {
    label: "SİYASET",
    name: "Siyaset",
  },
  yasam: {
    label: "YAŞAM",
    name: "Yaşam",
  },
  turkiye: {
    label: "TÜRKİYE",
    name: "Türkiye",
  },
};

const RESERVED_SLUGS = new Set(["haber", "api", "dunya"]);

export const categorySlugs = Object.keys(categoryMap) as CategorySlug[];

export function isReservedCategorySlug(slug: string): boolean {
  return RESERVED_SLUGS.has(slug);
}

export function isValidCategorySlug(slug: string): slug is CategorySlug {
  return slug in categoryMap;
}

export function getCategoryConfig(slug: string) {
  if (!isValidCategorySlug(slug)) return null;
  return categoryMap[slug];
}
