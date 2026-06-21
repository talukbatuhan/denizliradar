import Image from "next/image";
import Link from "next/link";
import { ArticleListActions } from "@/components/admin/ArticleListActions";
import { ArticleStatusBadge } from "@/components/admin/ArticleStatusBadge";
import { ArticleStatusFilter as ArticleStatusFilterBar } from "@/components/admin/ArticleStatusFilter";
import {
  articleStatusLabels,
  homepageSlotLabels,
  type ArticleStatusFilter as ArticleStatusFilterValue,
} from "@/lib/admin/article-labels";
import { fetchAdminArticles } from "@/lib/news/queries";
import type { ArticleStatus } from "@/lib/types/database";

type AdminArticlesPageProps = {
  searchParams: Promise<{ status?: string }>;
};

function parseStatusFilter(value?: string): ArticleStatusFilterValue {
  if (value === "draft" || value === "published" || value === "archived") {
    return value;
  }

  return "all";
}

export default async function AdminArticlesPage({
  searchParams,
}: AdminArticlesPageProps) {
  const { status: statusParam } = await searchParams;
  const statusFilter = parseStatusFilter(statusParam);
  const articles = await fetchAdminArticles(
    statusFilter === "all" ? undefined : { status: statusFilter },
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-nav text-2xl font-bold uppercase tracking-[0.12em]">
            Haberler
          </h1>
          <p className="mt-1 text-sm text-white/60">
            {statusFilter === "all"
              ? `Toplam ${articles.length} kayıt`
              : `${articleStatusLabels[statusFilter as ArticleStatus]} — ${articles.length} kayıt`}
          </p>
        </div>
        <Link
          href="/admin/haberler/yeni"
          className="bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.1em] text-[#991b1b]"
        >
          Yeni Haber
        </Link>
      </div>

      <div className="mb-4">
        <ArticleStatusFilterBar current={statusFilter} />
      </div>

      <div className="overflow-x-auto border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 text-white/60">
            <tr>
              <th className="px-4 py-3 font-medium">Kapak</th>
              <th className="px-4 py-3 font-medium">Başlık</th>
              <th className="px-4 py-3 font-medium">Durum</th>
              <th className="px-4 py-3 font-medium">Kategori</th>
              <th className="px-4 py-3 font-medium">Ana Sayfa</th>
              <th className="px-4 py-3 font-medium">Güncelleme</th>
              <th className="px-4 py-3 font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => {
              const category = Array.isArray(article.categories)
                ? article.categories[0]
                : article.categories;

              return (
                <tr key={article.id} className="border-t border-white/10">
                  <td className="px-4 py-3">
                    {article.cover_image_url ? (
                      <div className="relative h-12 w-20 overflow-hidden border border-white/10 bg-white/5">
                        <Image
                          src={article.cover_image_url}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    ) : (
                      <div className="flex h-12 w-20 items-center justify-center border border-white/10 bg-white/5 text-[10px] text-white/40">
                        Görsel yok
                      </div>
                    )}
                  </td>
                  <td className="max-w-xs px-4 py-3">
                    <Link
                      href={`/admin/haberler/${article.id}`}
                      className="font-medium text-white hover:text-white/80"
                    >
                      {article.title}
                    </Link>
                    <p className="mt-1 truncate text-xs text-white/40">
                      /haber/{article.slug}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <ArticleStatusBadge status={article.status} />
                  </td>
                  <td className="px-4 py-3">{category?.label ?? "-"}</td>
                  <td className="px-4 py-3 text-white/60">
                    {article.homepage_slot
                      ? homepageSlotLabels[article.homepage_slot]
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-white/60">
                    {new Intl.DateTimeFormat("tr-TR", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(article.updated_at))}
                  </td>
                  <td className="px-4 py-3">
                    <ArticleListActions
                      id={article.id}
                      title={article.title}
                      slug={article.slug}
                      status={article.status}
                    />
                  </td>
                </tr>
              );
            })}
            {articles.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-white/50">
                  {statusFilter === "all"
                    ? "Henüz haber yok. İlk haberi ekleyin."
                    : "Bu filtrede haber bulunamadı."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
