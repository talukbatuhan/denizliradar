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

type CategoryConfig = {
  label: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
};

const categoryMap: Record<CategorySlug, CategoryConfig> = {
  gundem: {
    label: "GÜNDEM",
    name: "Gündem",
    seoTitle: "Gündem Haberleri",
    seoDescription:
      "Türkiye ve Denizli gündeminden son dakika haberleri, güncel gelişmeler ve öne çıkan başlıklar Denizli Radar'da.",
  },
  denizli: {
    label: "DENİZLİ",
    name: "Denizli",
    seoTitle: "Denizli Haberleri",
    seoDescription:
      "Denizli'den yerel haberler, belediye, ilçe, asayiş ve şehir gündemine dair güncel içerikler Denizli Radar'da.",
  },
  ekonomi: {
    label: "EKONOMİ",
    name: "Ekonomi",
    seoTitle: "Ekonomi Haberleri",
    seoDescription:
      "Ekonomi, finans, borsa, döviz ve iş dünyasından Denizli ve Türkiye'ye dair güncel ekonomi haberleri.",
  },
  spor: {
    label: "SPOR",
    name: "Spor",
    seoTitle: "Spor Haberleri",
    seoDescription:
      "Futbol, basketbol ve yerel spor haberleri; Denizli takımları ve Türkiye spor gündeminden son gelişmeler.",
  },
  egitim: {
    label: "EĞİTİM",
    name: "Eğitim",
    seoTitle: "Eğitim Haberleri",
    seoDescription:
      "Eğitim, üniversite, sınav ve okul haberleri; Denizli ve Türkiye'de eğitim gündemine dair güncel içerikler.",
  },
  asayis: {
    label: "ASAYİŞ",
    name: "Asayiş",
    seoTitle: "Asayiş Haberleri",
    seoDescription:
      "Asayiş, adliye ve güvenlik haberleri; Denizli ve çevresinden güncel olay ve gelişmeler Denizli Radar'da.",
  },
  siyaset: {
    label: "SİYASET",
    name: "Siyaset",
    seoTitle: "Siyaset Haberleri",
    seoDescription:
      "Yerel ve ulusal siyaset gündemi, seçim, parti ve meclis haberleri Denizli Radar siyaset sayfasında.",
  },
  yasam: {
    label: "YAŞAM",
    name: "Yaşam",
    seoTitle: "Yaşam Haberleri",
    seoDescription:
      "Yaşam, kültür, sağlık ve sosyal hayata dair haberler; Denizli'den güncel yaşam içerikleri ve rehberler.",
  },
  turkiye: {
    label: "TÜRKİYE",
    name: "Türkiye",
    seoTitle: "Türkiye Haberleri",
    seoDescription:
      "Türkiye gündeminden son dakika haberleri, ulusal gelişmeler ve öne çıkan başlıklar Denizli Radar'da.",
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
