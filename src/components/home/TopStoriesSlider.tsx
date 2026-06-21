"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import type { NewsItem } from "@/lib/constants/placeholder-news";

type TopStoriesSliderProps = {
  stories: NewsItem[];
};

export function TopStoriesSlider({ stories }: TopStoriesSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + stories.length) % stories.length);
    },
    [stories.length],
  );

  const activeStory = stories[activeIndex];

  return (
    <section
      aria-label="Top Stories"
      className="flex h-[320px] flex-col border border-radar-border bg-white sm:h-[400px] lg:h-[480px]"
    >
      <Link
        href={activeStory.href}
        className="relative block min-h-0 flex-1 overflow-hidden"
      >
        <Image
          key={activeStory.id}
          src={activeStory.imageUrl}
          alt={activeStory.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </Link>

      <nav
        aria-label="Top Stories navigasyonu"
        className="flex shrink-0 border-t border-radar-border"
      >
        {stories.map((story, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={story.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`${index + 1}. haber: ${story.title}`}
              aria-current={isActive ? "true" : undefined}
              className={`font-nav min-w-0 flex-1 border-r border-radar-border py-1 text-center text-[10px] font-bold tabular-nums tracking-wide last:border-r-0 sm:py-1.5 sm:text-[11px] ${
                isActive
                  ? "bg-radar-surface text-radar-accent"
                  : "bg-white text-radar-navy/70 hover:bg-radar-surface/60"
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </nav>
    </section>
  );
}
