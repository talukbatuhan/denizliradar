import type { Metadata } from "next";
import { CategoryNewsSection } from "@/components/home/CategoryNewsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsGrid } from "@/components/home/NewsGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  fetchGridNews,
  fetchSideStories,
  fetchTopStories,
  fetchTurkiyeCategorySection,
} from "@/lib/news/queries";
import { buildWebsiteJsonLd } from "@/lib/seo/article-json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: `${SITE_NAME} | ${SITE_TAGLINE}`,
  description:
    "Denizli ve çevresinden güncel haberler, son dakika gelişmeleri, spor, ekonomi, siyaset, asayiş ve yaşam haberleri. Denizli'nin güvenilir haber kaynağı.",
  path: "/",
});

export default async function Home() {
  const [topStories, sideStories, gridNews, turkiyeCategorySection] =
    await Promise.all([
      fetchTopStories(),
      fetchSideStories(),
      fetchGridNews(),
      fetchTurkiyeCategorySection(),
    ]);

  return (
    <>
      <JsonLd data={buildWebsiteJsonLd()} />
      <main className="flex-1 bg-background">
        <h1 className="sr-only">
          {SITE_NAME} — Denizli haberleri, son dakika, spor, ekonomi ve gündem
        </h1>
        <div className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
          <HeroSection topStories={topStories} sideStories={sideStories} />
          <NewsGrid articles={gridNews} />
          <CategoryNewsSection data={turkiyeCategorySection} />
        </div>
      </main>
    </>
  );
}
