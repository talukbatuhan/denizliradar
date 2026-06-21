import Image from "next/image";
import Link from "next/link";
import { NewsCardMeta } from "@/components/news/NewsCardMeta";
import {
  newsCardBaseClass,
  newsCardHoverClass,
  newsImageAspectClass,
  newsImageCoverClass,
} from "@/components/news/news-card-styles";
import type { NewsItem } from "@/lib/types/news";

type NewsCardProps = {
  article: NewsItem;
};

export function NewsCard({ article }: NewsCardProps) {
  return (
    <article className={`group ${newsCardBaseClass} ${newsCardHoverClass}`}>
      <Link href={article.href} className="block">
        <div className={newsImageAspectClass}>
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className={newsImageCoverClass}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
          />
        </div>
        <div className="space-y-2 p-4">
          <NewsCardMeta
            publishedAtISO={article.publishedAtISO}
            readTimeMinutes={article.readTimeMinutes}
          />
          <h3 className="line-clamp-2 font-serif text-[15px] font-bold leading-snug text-foreground sm:text-base">
            {article.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}

type NewsGridProps = {
  articles: NewsItem[];
};

export function NewsGrid({ articles }: NewsGridProps) {
  if (articles.length === 0) return null;

  return (
    <section aria-label="Son haberler" className="mt-8 lg:mt-10">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <li key={article.id}>
            <NewsCard article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
}
