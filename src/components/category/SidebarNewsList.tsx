import Link from "next/link";
import { NewsCardMeta } from "@/components/news/NewsCardMeta";
import type { NewsItem } from "@/lib/types/news";

type SidebarNewsListProps = {
  articles: NewsItem[];
  title: string;
  numbered?: boolean;
  showMeta?: boolean;
};

export function SidebarNewsList({
  articles,
  title,
  numbered = false,
  showMeta = false,
}: SidebarNewsListProps) {
  if (articles.length === 0) return null;

  const ListTag = numbered ? "ol" : "ul";

  return (
    <section
      aria-label={title}
      className="border border-radar-border bg-background"
    >
      <div className="border-b border-radar-border bg-[#0c1524] px-4 py-2.5">
        <h2 className="font-nav text-xs font-bold uppercase tracking-[0.16em] text-white">
          {title}
        </h2>
      </div>
      <ListTag className="divide-y divide-radar-border">
        {articles.map((article, index) => (
          <li key={article.id}>
            <Link
              href={article.href}
              className="group flex gap-3 rounded-none px-4 py-3 transition-colors hover:bg-radar-surface"
            >
              {numbered && (
                <span
                  className="font-nav w-7 shrink-0 text-2xl font-bold leading-none text-[#991b1b] tabular-nums"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
              )}
              <span className="min-w-0">
                <span className="font-nav block text-[10px] font-bold uppercase tracking-[0.12em] text-radar-accent">
                  {article.category}
                </span>
                <span className="mt-1 block font-serif text-sm font-bold leading-snug text-foreground group-hover:text-[#991b1b]">
                  {article.title}
                </span>
                {showMeta && (
                  <span className="mt-2 block">
                    <NewsCardMeta
                      publishedAtISO={article.publishedAtISO}
                      readTimeMinutes={article.readTimeMinutes}
                    />
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ListTag>
    </section>
  );
}
