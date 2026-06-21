export function getCategoryHref(category: string): string {
  const map: Record<string, string> = {
    Gündem: "/gundem",
    Denizli: "/denizli",
    Ekonomi: "/ekonomi",
    Spor: "/spor",
    Eğitim: "/egitim",
    Asayiş: "/asayis",
    Siyaset: "/siyaset",
    Yaşam: "/yasam",
    Türkiye: "/turkiye",
  };

  return map[category] ?? "/";
}
