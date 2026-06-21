export function formatRelativeTime(publishedAtISO: string): string {
  const published = new Date(publishedAtISO);
  const now = new Date();
  const diffMs = now.getTime() - published.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "Az önce";
  if (diffMinutes < 60) return `${diffMinutes} dakika önce`;
  if (diffHours < 24) return `${diffHours} saat önce`;
  if (diffDays < 7) return `${diffDays} gün önce`;

  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(published);
}

export function formatReadTime(minutes: number): string {
  return `${minutes} dk okuma`;
}

export function formatNewsMeta(publishedAtISO: string, readTimeMinutes: number): string {
  return `${formatRelativeTime(publishedAtISO)} • ${formatReadTime(readTimeMinutes)}`;
}
