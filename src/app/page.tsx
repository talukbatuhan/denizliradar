import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-radar-surface">
      <section className="relative overflow-hidden border-b border-radar-border bg-white">
        <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-radar-accent/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-radar-navy/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-radar-border bg-radar-surface px-3 py-1 text-xs font-semibold uppercase tracking-wider text-radar-muted">
              <Newspaper className="size-3.5" />
              UI / UX Tasarım Aşaması
            </span>
            <h1 className="mt-6 font-serif text-4xl font-bold leading-tight tracking-tight text-radar-navy sm:text-5xl">
              Denizli&apos;nin haber radarı{" "}
              <span className="text-radar-accent">yakında burada.</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-radar-muted">
              Navbar ve temel arayüz hazır. Sırada haber kartları, kategori
              sayfaları ve Supabase ile içerik yönetimi var.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/gundem"
                className="inline-flex items-center gap-2 rounded-full bg-radar-navy px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Gündem&apos;e Git
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 rounded-full border border-radar-border bg-white px-5 py-3 text-sm font-semibold text-radar-navy transition-colors hover:bg-radar-surface"
              >
                Bize Ulaşın
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-radar-muted">
          Tasarım Önizlemesi
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Son Dakika Şeridi",
              desc: "Kırmızı vurgulu, dikkat çekici breaking news alanı.",
            },
            {
              title: "Katmanlı Navbar",
              desc: "Üst bilgi, logo, arama ve kategori navigasyonu.",
            },
            {
              title: "Mobil Uyumlu",
              desc: "Kaydırılabilir kategoriler ve tam ekran mobil menü.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-radar-border bg-white p-6 shadow-sm"
            >
              <h3 className="font-serif text-lg font-bold text-radar-navy">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-radar-muted">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
