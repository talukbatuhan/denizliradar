import Image from "next/image";
import Link from "next/link";
import { NewsCardMeta } from "@/components/news/NewsCardMeta";
import {
  newsCardBaseClass,
  newsImageAspectClass,
  newsImageCoverClass,
} from "@/components/news/news-card-styles";
import type { NewsItem } from "@/lib/types/news";

const categoryCardHoverClass =
  "rounded-none transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl";

type CategoryArticleCardProps = {
  article: NewsItem;
};

export function CategoryArticleCard({ article }: CategoryArticleCardProps) {
  return (
    <article
      className={`group ${newsCardBaseClass} ${categoryCardHoverClass} rounded-none`}
    >
      <Link href={article.href} className="block rounded-none">
        <div className={`${newsImageAspectClass} rounded-none`}>
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className={`rounded-none ${newsImageCoverClass}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
        <div className="space-y-2 rounded-none p-4">
          <NewsCardMeta
            publishedAtISO={article.publishedAtISO}
            readTimeMinutes={article.readTimeMinutes}
          />
          <h2 className="line-clamp-3 font-serif text-base font-bold leading-snug text-foreground sm:text-[17px]">
            {article.title}
          </h2>
        </div>
      </Link>
    </article>
  );
}
