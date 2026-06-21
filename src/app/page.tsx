import { CategoryNewsSection } from "@/components/home/CategoryNewsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsGrid } from "@/components/home/NewsGrid";
import { dunyaCategorySection, gridNews } from "@/lib/constants/placeholder-news";

export default function Home() {
  return (
    <main className="flex-1 bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        <HeroSection />
        <NewsGrid articles={gridNews} />
        <CategoryNewsSection data={dunyaCategorySection} />
      </div>
    </main>
  );
}
