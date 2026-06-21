import Link from "next/link";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { fetchCategories } from "@/lib/news/queries";

export default async function NewArticlePage() {
  const categories = await fetchCategories();

  return (
    <div>
      <Link
        href="/admin/haberler"
        className="text-sm text-white/60 hover:text-white"
      >
        ← Haber listesine dön
      </Link>
      <h1 className="font-nav mb-6 mt-2 text-2xl font-bold uppercase tracking-[0.12em]">
        Yeni Haber
      </h1>
      <div className="border border-white/10 bg-white/5 p-6 text-foreground">
        <ArticleForm categories={categories} />
      </div>
    </div>
  );
}
