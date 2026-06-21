"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { NewsCardMeta } from "@/components/news/NewsCardMeta";
import type { NewsItem } from "@/lib/types/news";

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query.trim()) params.set("q", query.trim());

        const response = await fetch(`/api/search?${params.toString()}`, {
          signal: controller.signal,
        });

        if (response.ok) {
          setResults((await response.json()) as NewsItem[]);
        }
      } catch {
        if (!controller.signal.aborted) setResults([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [open, query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-radar-navy/50 px-4 py-8 backdrop-blur-sm sm:py-16"
      role="dialog"
      aria-modal="true"
      aria-label="Haber ara"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl border border-radar-border bg-background shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-radar-border px-4 py-3">
          <Search className="size-4 shrink-0 text-radar-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Haber, kategori veya anahtar kelime ara..."
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-radar-muted"
            aria-label="Arama sorgusu"
            autoFocus
          />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-8 items-center justify-center text-radar-muted hover:text-foreground"
            aria-label="Aramayı kapat"
          >
            <X className="size-4" />
          </button>
        </div>

        <ul className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <li className="px-4 py-8 text-center text-sm text-radar-muted">
              Aranıyor...
            </li>
          )}
          {!loading &&
            results.map((article) => (
              <li
                key={article.id}
                className="border-b border-radar-border last:border-b-0"
              >
                <Link
                  href={article.href}
                  onClick={onClose}
                  className="block px-4 py-3 transition-colors hover:bg-radar-surface"
                >
                  <p className="font-nav text-[10px] font-bold uppercase tracking-[0.12em] text-radar-accent">
                    {article.category}
                  </p>
                  <p className="mt-1 font-serif text-sm font-bold leading-snug text-foreground">
                    {article.title}
                  </p>
                  <div className="mt-2">
                    <NewsCardMeta
                      publishedAtISO={article.publishedAtISO}
                      readTimeMinutes={article.readTimeMinutes}
                    />
                  </div>
                </Link>
              </li>
            ))}
          {!loading && results.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-radar-muted">
              Sonuç bulunamadı.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
