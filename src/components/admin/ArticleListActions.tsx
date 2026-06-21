"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteArticleAction } from "@/app/admin/actions";
import type { ArticleStatus } from "@/lib/types/database";

type ArticleListActionsProps = {
  id: string;
  title: string;
  slug: string;
  status: ArticleStatus;
};

export function ArticleListActions({
  id,
  title,
  slug,
  status,
}: ArticleListActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (
      !window.confirm(
        `"${title}" haberini kalıcı olarak silmek istediğinize emin misiniz?`,
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await deleteArticleAction(id);
      if (result?.error) {
        window.alert(result.error);
        return;
      }

      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={`/admin/haberler/${id}`}
        className="border border-white/20 px-2.5 py-1 text-xs font-medium text-white hover:bg-white/10"
      >
        Düzenle
      </Link>
      {status === "published" && (
        <Link
          href={`/haber/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-white/20 px-2.5 py-1 text-xs font-medium text-white/80 hover:bg-white/10"
        >
          Sitede Gör
        </Link>
      )}
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="border border-red-400/40 px-2.5 py-1 text-xs font-medium text-red-200 hover:bg-red-950/40 disabled:opacity-60"
      >
        {isPending ? "Siliniyor..." : "Sil"}
      </button>
    </div>
  );
}
