import type { ArticleStatus } from "@/lib/types/database";
import { articleStatusLabels } from "@/lib/admin/article-labels";

const statusStyles: Record<ArticleStatus, string> = {
  draft: "border-white/20 bg-white/5 text-white/70",
  published: "border-emerald-400/30 bg-emerald-950/40 text-emerald-200",
  archived: "border-amber-400/30 bg-amber-950/40 text-amber-200",
};

type ArticleStatusBadgeProps = {
  status: ArticleStatus;
};

export function ArticleStatusBadge({ status }: ArticleStatusBadgeProps) {
  return (
    <span
      className={`inline-block border px-2 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {articleStatusLabels[status]}
    </span>
  );
}
