import { NotFoundContent } from "@/components/layout/NotFoundContent";
import { fetchPopularArticles } from "@/lib/news/queries";

export default async function SiteNotFound() {
  const popularArticles = await fetchPopularArticles(3);

  return <NotFoundContent popularArticles={popularArticles} />;
}
