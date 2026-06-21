import { Footer } from "@/components/layout/Footer";
import { NotFoundContent } from "@/components/layout/NotFoundContent";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { fetchPopularArticles } from "@/lib/news/queries";

export default async function NotFound() {
  const popularArticles = await fetchPopularArticles(3);

  return (
    <>
      <SiteHeader />
      <NotFoundContent popularArticles={popularArticles} />
      <Footer />
    </>
  );
}
