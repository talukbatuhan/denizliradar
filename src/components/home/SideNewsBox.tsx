import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/lib/constants/placeholder-news";

type SideNewsBoxProps = {
  story: NewsItem;
};

export function SideNewsBox({ story }: SideNewsBoxProps) {
  return (
    <article className="relative h-full min-h-[100px] overflow-hidden border border-radar-border bg-background">
      <Link href={story.href} className="relative block h-full min-h-[100px]">
        <Image
          src={story.imageUrl}
          alt={story.title}
          fill
          className="object-cover"
          sizes="320px"
        />
      </Link>
    </article>
  );
}
