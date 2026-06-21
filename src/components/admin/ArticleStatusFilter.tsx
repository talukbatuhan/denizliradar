import Link from "next/link";
import {
  statusFilterOptions,
  type ArticleStatusFilter,
} from "@/lib/admin/article-labels";

type ArticleStatusFilterProps = {
  current: ArticleStatusFilter;
};

export function ArticleStatusFilter({ current }: ArticleStatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {statusFilterOptions.map((option) => {
        const isActive = current === option.value;
        const href =
          option.value === "all"
            ? "/admin/haberler"
            : `/admin/haberler?status=${option.value}`;

        return (
          <Link
            key={option.value}
            href={href}
            className={
              isActive
                ? "bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-[#991b1b]"
                : "border border-white/15 px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/5"
            }
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
