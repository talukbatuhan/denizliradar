import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ReadingProgressBar } from "@/components/article/ReadingProgressBar";
import { RelatedNews } from "@/components/article/RelatedNews";
import { ShareButtons } from "@/components/article/ShareButtons";
import {
  getAllArticleSlugs,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/news/get-article-by-slug";

export const revalidate = 60;

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Haber bulunamadı" };
  }

  return {
    title: article.title,
    description: article.excerpt ?? article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? article.title,
      images: article.imageUrl ? [{ url: article.imageUrl }] : undefined,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = await getRelatedArticles(slug);
  const shareUrl = `https://denizliradar.com/haber/${article.slug}`;
  const paragraphs =
    article.content && article.content.length > 0
      ? article.content
      : [
          article.excerpt ??
            "Denizli Radar editörleri tarafından hazırlanan haber içeriği yakında güncellenecektir.",
        ];

  return (
    <>
      <ReadingProgressBar />
      <main className="flex-1 bg-background pb-12">
        <ArticleHeader article={article} />

        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="grid gap-8 py-8 lg:grid-cols-[48px_minmax(0,1fr)] lg:gap-10">
            <ShareButtons title={article.title} url={shareUrl} />
            <div>
              <ArticleBody paragraphs={paragraphs} />
              <RelatedNews articles={related} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
