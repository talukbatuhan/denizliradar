import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryArticleCard } from "@/components/category/CategoryArticleCard";
import { CategoryBanner } from "@/components/category/CategoryBanner";
import { CategorySidebar } from "@/components/category/CategorySidebar";
import {
  categorySlugs,
  getCategoryConfig,
  isReservedCategorySlug,
  isValidCategorySlug,
} from "@/lib/news/category-config";
import {
  getArticlesByCategory,
  getMostReadArticles,
  getRecentlyAddedArticles,
} from "@/lib/news/get-articles-by-category";

export const revalidate = 60;

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return categorySlugs.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (isReservedCategorySlug(category) || !isValidCategorySlug(category)) {
    return { title: "Kategori bulunamadı" };
  }

  const config = getCategoryConfig(category);
  if (!config) return { title: "Kategori bulunamadı" };

  return {
    title: `${config.label} Haberleri`,
    description: `${config.label} haberleri — Denizli Radar`,
    openGraph: {
      title: `${config.label} | Denizli Radar`,
      description: `${config.label} haberleri — Denizli Radar`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (isReservedCategorySlug(category) || !isValidCategorySlug(category)) {
    notFound();
  }

  const config = getCategoryConfig(category);
  if (!config) notFound();

  const articles = await getArticlesByCategory(category);
  const mostRead = await getMostReadArticles(5);
  const recentlyAdded = await getRecentlyAddedArticles(5);

  return (
    <main className="flex-1 bg-background py-6 sm:py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-12 gap-8 lg:gap-10">
          <div className="col-span-12 lg:col-span-8 xl:col-span-9">
            <CategoryBanner label={config.label} />

            {articles.length > 0 ? (
              <section
                aria-label={`${config.label} haberleri`}
                className="mt-6 sm:mt-8"
              >
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {articles.map((article) => (
                    <li key={article.id}>
                      <CategoryArticleCard article={article} />
                    </li>
                  ))}
                </ul>
              </section>
            ) : (
              <p className="mt-8 border border-radar-border bg-radar-surface px-4 py-8 text-center text-sm text-radar-muted">
                Bu kategoride henüz haber bulunmuyor.
              </p>
            )}
          </div>

          <div className="col-span-12 lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-24">
              <CategorySidebar
                mostRead={mostRead}
                recentlyAdded={recentlyAdded}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
