import Image from "next/image";
import Link from "next/link";
import {
  newsImageAspectClass,
  newsImageCoverStaticClass,
} from "@/components/news/news-card-styles";
import type { NewsItem } from "@/lib/types/news";

type SideNewsBoxProps = {
  story: NewsItem;
};

export function SideNewsBox({ story }: SideNewsBoxProps) {
  return (
    <article
      className={`${newsImageAspectClass} border border-radar-border bg-background`}
    >
      <Link href={story.href} className="absolute inset-0">
        <Image
          src={story.imageUrl}
          alt={story.title}
          fill
          className={newsImageCoverStaticClass}
          sizes="(max-width: 640px) 50vw, 320px"
        />
      </Link>
    </article>
  );
}
