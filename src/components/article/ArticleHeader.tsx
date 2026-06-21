import Image from "next/image";
import Link from "next/link";
import { getCategoryHref } from "@/lib/news/category-href";
import { NewsCardMeta } from "@/components/news/NewsCardMeta";
import type { NewsItem } from "@/lib/constants/placeholder-news";

type ArticleHeaderProps = {
  article: NewsItem;
};

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header className="border-b border-radar-border bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <Link
          href={getCategoryHref(article.category)}
          className="font-nav inline-block bg-[#991b1b] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
        >
          {article.category}
        </Link>
        <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          {article.title}
        </h1>
        <div className="mt-4">
          <NewsCardMeta
            publishedAtISO={article.publishedAtISO}
            readTimeMinutes={article.readTimeMinutes}
          />
        </div>
      </div>

      <div className="relative mx-auto aspect-[16/9] max-w-4xl bg-radar-surface">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>
    </header>
  );
}
