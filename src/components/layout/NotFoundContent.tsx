"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import { NewsCard } from "@/components/home/NewsGrid";
import { SearchModal } from "@/components/search/SearchModal";
import { popularArticles } from "@/lib/constants/placeholder-news";

export function NotFoundContent() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-xl text-center">
            <p className="font-nav text-sm font-bold uppercase tracking-[0.2em] text-radar-accent">
              404
            </p>
            <h1 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Aradığınız sayfa bulunamadı
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-radar-muted">
              Bağlantı hatalı olabilir veya içerik kaldırılmış olabilir. Arama
              yapabilir veya ana sayfaya dönebilirsiniz.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="inline-flex items-center justify-center gap-2 border border-radar-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-radar-surface"
              >
                <Search className="size-4" />
                Haber Ara
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-[#991b1b] px-5 py-3 text-sm font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
              >
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>

          <section aria-label="Popüler haberler" className="mt-12">
            <h2 className="font-nav text-sm font-bold uppercase tracking-[0.14em] text-foreground">
              Popüler Haberler
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {popularArticles.map((article) => (
                <li key={article.id}>
                  <NewsCard article={article} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
