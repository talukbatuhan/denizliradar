import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { ArticleStatusBadge } from "@/components/admin/ArticleStatusBadge";
import { fetchAdminArticleById, fetchCategories } from "@/lib/news/queries";

type EditArticlePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;
  const [article, categories] = await Promise.all([
    fetchAdminArticleById(id),
    fetchCategories(),
  ]);

  if (!article) notFound();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/haberler"
            className="text-sm text-white/60 hover:text-white"
          >
            ← Haber listesine dön
          </Link>
          <h1 className="font-nav mt-2 text-2xl font-bold uppercase tracking-[0.12em]">
            Haberi Düzenle
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <ArticleStatusBadge status={article.status} />
            <span className="text-sm text-white/50">
              Son güncelleme:{" "}
              {new Intl.DateTimeFormat("tr-TR", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(article.updated_at))}
            </span>
          </div>
        </div>
        {article.status === "published" && (
          <Link
            href={`/haber/${article.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            Sitede Gör
          </Link>
        )}
      </div>
      <div className="admin-form-surface p-6">
        <ArticleForm categories={categories} article={article} />
      </div>
    </div>
  );
}
