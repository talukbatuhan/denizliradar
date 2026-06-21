import { NewsCard } from "@/components/home/NewsGrid";
import type { NewsItem } from "@/lib/types/news";

type RelatedNewsProps = {
  articles: NewsItem[];
};

export function RelatedNews({ articles }: RelatedNewsProps) {
  if (articles.length === 0) return null;

  return (
    <section aria-label="Bunlar da ilginizi çekebilir" className="mt-12 border-t border-radar-border pt-10">
      <h2 className="font-nav text-sm font-bold uppercase tracking-[0.14em] text-foreground">
        Bunlar da İlginizi Çekebilir
      </h2>
      <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <li key={article.id}>
            <NewsCard article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
}
