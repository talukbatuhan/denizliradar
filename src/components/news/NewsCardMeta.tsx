import { Clock } from "lucide-react";
import { formatNewsMeta } from "@/lib/format-news-meta";

type NewsCardMetaProps = {
  publishedAtISO: string;
  readTimeMinutes: number;
  className?: string;
};

export function NewsCardMeta({
  publishedAtISO,
  readTimeMinutes,
  className = "",
}: NewsCardMetaProps) {
  return (
    <p
      className={`flex items-center gap-1.5 text-xs text-radar-muted ${className}`}
    >
      <Clock className="size-3 shrink-0" aria-hidden="true" />
      <span>{formatNewsMeta(publishedAtISO, readTimeMinutes)}</span>
    </p>
  );
}
