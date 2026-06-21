import { CategoryNewsSection } from "@/components/home/CategoryNewsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsGrid } from "@/components/home/NewsGrid";
import {
  fetchGridNews,
  fetchSideStories,
  fetchTopStories,
  fetchTurkiyeCategorySection,
} from "@/lib/news/queries";

export const revalidate = 60;

export default async function Home() {
  const [topStories, sideStories, gridNews, turkiyeCategorySection] =
    await Promise.all([
      fetchTopStories(),
      fetchSideStories(),
      fetchGridNews(),
      fetchTurkiyeCategorySection(),
    ]);

  return (
    <main className="flex-1 bg-background">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        <HeroSection topStories={topStories} sideStories={sideStories} />
        <NewsGrid articles={gridNews} />
        <CategoryNewsSection data={turkiyeCategorySection} />
      </div>
    </main>
  );
}
