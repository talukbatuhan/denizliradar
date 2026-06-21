import { SideNewsBox } from "@/components/home/SideNewsBox";
import { TopStoriesSlider } from "@/components/home/TopStoriesSlider";
import type { NewsItem } from "@/lib/types/news";

type HeroSectionProps = {
  topStories: NewsItem[];
  sideStories: NewsItem[];
};

export function HeroSection({ topStories, sideStories }: HeroSectionProps) {
  if (topStories.length === 0 && sideStories.length === 0) {
    return null;
  }

  return (
    <section aria-label="Öne çıkan haberler">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <TopStoriesSlider stories={topStories} />

        <aside className="flex flex-col gap-4 lg:h-[480px] lg:gap-5">
          {sideStories.map((story) => (
            <SideNewsBox key={story.id} story={story} />
          ))}
        </aside>
      </div>
    </section>
  );
}
