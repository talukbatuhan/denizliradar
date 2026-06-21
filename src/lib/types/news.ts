export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category: string;
  href: string;
  imageUrl: string;
  publishedAt: string;
  publishedAtISO: string;
  updatedAtISO: string;
  readTimeMinutes: number;
  content?: string[];
};

export type CategorySectionData = {
  categoryLabel: string;
  categoryHref: string;
  featured: NewsItem | null;
  secondary: NewsItem[];
};
