import { SidebarNewsList } from "@/components/category/SidebarNewsList";
import type { NewsItem } from "@/lib/types/news";

type CategorySidebarProps = {
  mostRead: NewsItem[];
  recentlyAdded: NewsItem[];
};

export function CategorySidebar({
  mostRead,
  recentlyAdded,
}: CategorySidebarProps) {
  if (mostRead.length === 0 && recentlyAdded.length === 0) {
    return null;
  }

  return (
    <aside aria-label="Kategori yan menü" className="space-y-6">
      <SidebarNewsList
        articles={mostRead}
        title="En Çok Okunanlar"
        numbered
      />
      <SidebarNewsList
        articles={recentlyAdded}
        title="Son Eklenenler"
        showMeta
      />
    </aside>
  );
}
