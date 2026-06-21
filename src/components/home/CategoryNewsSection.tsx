import Image from "next/image";
import Link from "next/link";
import { SideNewsBox } from "@/components/home/SideNewsBox";
import { NewsCardMeta } from "@/components/news/NewsCardMeta";
import {
  newsCardBaseClass,
  newsCardHoverClass,
} from "@/components/news/news-card-styles";
import type { CategorySectionData, NewsItem } from "@/lib/constants/placeholder-news";

function FeaturedArticleCard({ article }: { article: NewsItem }) {
  return (
    <article
      className={`group flex h-full min-h-[320px] flex-col ${newsCardBaseClass} ${newsCardHoverClass} lg:min-h-0`}
    >
      <Link href={article.href} className="flex h-full flex-col">
        <div className="relative min-h-[220px] flex-1 overflow-hidden bg-radar-surface">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 600px"
          />
        </div>
        <div className="space-y-2 border-t border-radar-border p-4 sm:p-5">
          <NewsCardMeta
            publishedAtISO={article.publishedAtISO}
            readTimeMinutes={article.readTimeMinutes}
          />
          <h3 className="font-serif text-lg font-bold leading-snug text-foreground sm:text-xl lg:text-[22px] lg:leading-tight">
            {article.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}

type CategoryNewsSectionProps = {
  data: CategorySectionData;
};

export function CategoryNewsSection({ data }: CategoryNewsSectionProps) {
  return (
    <section aria-labelledby={`category-${data.categoryLabel}`} className="mt-10 lg:mt-12">
      <Link
        href={data.categoryHref}
        id={`category-${data.categoryLabel}`}
        className="font-nav block bg-[#991b1b] px-4 py-2.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-95 sm:px-5 sm:text-[15px]"
      >
        {data.categoryLabel}
      </Link>

      <div className="mt-4 grid gap-4 lg:grid-cols-2 lg:gap-5 lg:items-stretch">
        <FeaturedArticleCard article={data.featured} />

        <ul className="grid min-h-[240px] grid-cols-2 grid-rows-2 gap-4 sm:min-h-[280px] lg:min-h-0 lg:h-full lg:gap-5">
          {data.secondary.map((article) => (
            <li key={article.id} className="min-h-0">
              <SideNewsBox story={article} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
