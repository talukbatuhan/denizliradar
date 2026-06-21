"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { slugify } from "@/lib/news/map-article";
import {
  deleteArticleAction,
  saveArticleAction,
  uploadCoverAction,
} from "@/app/admin/actions";
import type { ArticleStatus, CategoryRow, HomepageSlot } from "@/lib/types/database";
import type { AdminArticleRow } from "@/lib/news/queries";

const homepageSlotOptions: { value: HomepageSlot | ""; label: string }[] = [
  { value: "", label: "Yok" },
  { value: "top_story", label: "Slider (Top Story)" },
  { value: "side_story", label: "Slider Yan Kutu" },
  { value: "grid", label: "Ana Grid" },
  { value: "turkiye_featured", label: "Türkiye Öne Çıkan" },
  { value: "turkiye_secondary", label: "Türkiye Yan Kutular" },
];

const fieldClassName = "admin-field w-full px-3 py-2 text-sm";
const labelClassName =
  "font-nav admin-label text-xs font-bold uppercase tracking-[0.14em]";

type ArticleFormProps = {
  categories: CategoryRow[];
  article?: AdminArticleRow | null;
};

export function ArticleForm({ categories, article }: ArticleFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [content, setContent] = useState(
    Array.isArray(article?.content) ? article.content.join("\n\n") : "",
  );
  const [categoryId, setCategoryId] = useState(
    article?.category_id ?? categories[0]?.id ?? "",
  );
  const [coverImageUrl, setCoverImageUrl] = useState(
    article?.cover_image_url ?? "",
  );
  const [status, setStatus] = useState<ArticleStatus>(
    article?.status ?? "draft",
  );
  const [readTimeMinutes, setReadTimeMinutes] = useState(
    String(article?.read_time_minutes ?? 3),
  );
  const [homepageSlot, setHomepageSlot] = useState<HomepageSlot | "">(
    article?.homepage_slot ?? "",
  );
  const [uploading, setUploading] = useState(false);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!article) {
      setSlug(slugify(value));
    }
  }

  async function handleUpload(file: File | null) {
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.set("file", file);

    const result = await uploadCoverAction(formData);
    setUploading(false);

    if ("error" in result && result.error) {
      setError(result.error);
      return;
    }

    if ("url" in result && result.url) {
      setCoverImageUrl(result.url);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const paragraphs = content
      .split(/\n\s*\n/)
      .map((item) => item.trim())
      .filter(Boolean);

    startTransition(async () => {
      const result = await saveArticleAction({
        id: article?.id,
        title,
        slug,
        excerpt,
        content: paragraphs,
        categoryId,
        coverImageUrl,
        status,
        readTimeMinutes: Number(readTimeMinutes) || 3,
        homepageSlot: homepageSlot || null,
      });

      if (result?.error) {
        setError(result.error);
      }
    });
  }

  function handleDelete() {
    if (!article?.id) return;
    if (!window.confirm("Bu haberi silmek istediğinize emin misiniz?")) return;

    startTransition(async () => {
      const result = await deleteArticleAction(article.id);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white">
      {error && (
        <p className="border border-red-400/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <label className="block space-y-2">
          <span className={labelClassName}>Başlık</span>
          <input
            required
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            className={fieldClassName}
          />
        </label>

        <label className="block space-y-2">
          <span className={labelClassName}>Slug</span>
          <input
            required
            value={slug}
            onChange={(event) => setSlug(slugify(event.target.value))}
            className={fieldClassName}
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className={labelClassName}>Özet</span>
        <textarea
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          rows={3}
          className={fieldClassName}
        />
      </label>

      <label className="block space-y-2">
        <span className={labelClassName}>
          İçerik (paragraflar arasında boş satır bırakın)
        </span>
        <textarea
          required
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={12}
          className={`${fieldClassName} leading-relaxed`}
        />
      </label>

      <div className="grid gap-6 lg:grid-cols-2">
        <label className="block space-y-2">
          <span className={labelClassName}>Kategori</span>
          <select
            required
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            className={fieldClassName}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className={labelClassName}>Durum</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as ArticleStatus)}
            className={fieldClassName}
          >
            <option value="draft">Taslak</option>
            <option value="published">Yayında</option>
            <option value="archived">Arşiv</option>
          </select>
          <p className="admin-hint text-xs">
            Yayında olan haberler sitede görünür. Taslak ve arşiv gizlidir.
          </p>
        </label>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <label className="block space-y-2">
          <span className={labelClassName}>Okuma Süresi (dk)</span>
          <input
            type="number"
            min={1}
            value={readTimeMinutes}
            onChange={(event) => setReadTimeMinutes(event.target.value)}
            className={fieldClassName}
          />
        </label>

        <label className="block space-y-2">
          <span className={labelClassName}>Ana Sayfa Yerleşimi</span>
          <select
            value={homepageSlot}
            onChange={(event) =>
              setHomepageSlot(event.target.value as HomepageSlot | "")
            }
            className={fieldClassName}
          >
            {homepageSlotOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="space-y-3 border border-white/15 p-4">
        <p className={labelClassName}>Kapak Görseli</p>
        {coverImageUrl && (
          <div className="relative aspect-video max-w-md overflow-hidden border border-white/15">
            <Image
              src={coverImageUrl}
              alt="Kapak görseli"
              fill
              className="object-cover"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(event) => handleUpload(event.target.files?.[0] ?? null)}
          className="block w-full text-sm text-white/80 file:mr-3 file:border file:border-white/20 file:bg-white/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white"
        />
        {uploading && (
          <p className="admin-hint text-sm">Görsel yükleniyor...</p>
        )}
        <input
          type="url"
          value={coverImageUrl}
          onChange={(event) => setCoverImageUrl(event.target.value)}
          placeholder="veya görsel URL'si yapıştırın"
          className={fieldClassName}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isPending || uploading}
          className="bg-[#991b1b] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.1em] text-white disabled:opacity-60"
        >
          {isPending ? "Kaydediliyor..." : "Kaydet"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/haberler")}
          className="admin-secondary-btn px-5 py-2.5 text-sm font-medium"
        >
          İptal
        </button>
        {article?.id && article.status === "published" && (
          <Link
            href={`/haber/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-secondary-btn px-5 py-2.5 text-sm font-medium"
          >
            Sitede Gör
          </Link>
        )}
        {article?.id && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="ml-auto border border-red-400/40 px-5 py-2.5 text-sm font-medium text-red-200 hover:bg-red-950/40 disabled:opacity-60"
          >
            Sil
          </button>
        )}
      </div>
    </form>
  );
}
