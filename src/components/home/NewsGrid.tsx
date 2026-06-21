import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/lib/constants/placeholder-news";

type NewsCardProps = {
  article: NewsItem;
};

function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="group overflow-hidden border border-radar-border bg-white shadow-[0_1px_3px_rgba(15,39,68,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,39,68,0.12)]">
      <Link href={article.href} className="block">
        <div className="relative aspect-video overflow-hidden bg-radar-surface">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
          />
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 font-serif text-[15px] font-bold leading-snug text-radar-navy sm:text-base">
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
