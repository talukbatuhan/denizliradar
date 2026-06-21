import Image from "next/image";
import Link from "next/link";
import { SideNewsBox } from "@/components/home/SideNewsBox";
import { NewsCardMeta } from "@/components/news/NewsCardMeta";
import {
  newsCardBaseClass,
  newsCardHoverClass,
  newsImageAspectClass,
  newsImageCoverClass,
} from "@/components/news/news-card-styles";
import type { CategorySectionData, NewsItem } from "@/lib/types/news";

function FeaturedArticleCard({ article }: { article: NewsItem }) {
  return (
    <article className={`group ${newsCardBaseClass} ${newsCardHoverClass}`}>
      <Link href={article.href} className="block">
        <div className={newsImageAspectClass}>
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            className={newsImageCoverClass}
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
  if (!data.featured && data.secondary.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby={`category-${data.categoryLabel}`} className="mt-10 lg:mt-12">
      <Link
        href={data.categoryHref}
        id={`category-${data.categoryLabel}`}
        className="font-nav block bg-[#991b1b] px-4 py-2.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-95 sm:px-5 sm:text-[15px]"
      >
        {data.categoryLabel}
      </Link>

      <div className="mt-4 grid gap-4 lg:grid-cols-2 lg:gap-5 lg:items-start">
        {data.featured && <FeaturedArticleCard article={data.featured} />}

        {data.secondary.length > 0 && (
          <ul
            className={`grid grid-cols-2 gap-4 lg:gap-5 ${
              data.featured ? "" : "lg:col-span-2"
            }`}
          >
            {data.secondary.map((article) => (
              <li key={article.id}>
                <SideNewsBox story={article} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
