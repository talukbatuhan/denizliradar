"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Menu,
  Search,
  X,
  ChevronRight,
  User,
  Radio,
} from "lucide-react";
import { mainNavItems, utilityNavItems } from "@/lib/constants/navigation";

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-radar-navy shadow-sm ring-1 ring-radar-navy/10">
        <Radio
          className="size-5 text-white transition-transform group-hover:scale-110"
          strokeWidth={2.25}
        />
        <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-radar-accent animate-pulse ring-2 ring-white" />
      </div>
      <div className="flex flex-col leading-none">
        {!compact && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-radar-muted">
            Denizli
          </span>
        )}
        <span
          className={`font-serif font-bold tracking-tight text-radar-navy ${
            compact ? "text-xl" : "text-2xl"
          }`}
        >
          RADAR
        </span>
      </div>
    </Link>
  );
}

function formatTurkishDate(date: Date) {
  return new Intl.DateTimeFormat("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(formatTurkishDate(new Date()));
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Son Dakika */}
      <div className="bg-radar-accent text-white">
        <div className="mx-auto flex max-w-7xl items-stretch gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex shrink-0 items-center gap-2 border-r border-white/20 py-2.5 pr-3">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-white" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest">
              Son Dakika
            </span>
          </div>
          <div className="flex min-w-0 flex-1 items-center overflow-hidden py-2.5">
            <p className="truncate text-sm font-medium">
              Denizli Radar yakında yayında — yerel haberlerin yeni adresi.
            </p>
          </div>
        </div>
      </div>

      {/* Üst bilgi çubuğu */}
      <div className="hidden border-b border-radar-border bg-radar-surface sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-radar-muted sm:px-6 lg:px-8">
          <p className="capitalize">{today || "Yükleniyor..."}</p>
          <nav className="flex items-center gap-5" aria-label="Yardımcı menü">
            {utilityNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-radar-navy"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Ana header */}
      <div className="border-b border-radar-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Logo />

          <div
            className={`hidden flex-1 items-center justify-center md:flex ${
              searchOpen ? "max-w-xl" : "max-w-md"
            }`}
          >
            <form
              role="search"
              className="relative w-full"
              onSubmit={(event) => event.preventDefault()}
            >
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-radar-muted" />
              <input
                type="search"
                placeholder="Haber, kategori veya anahtar kelime ara..."
                className="w-full rounded-full border border-radar-border bg-radar-surface py-2.5 pl-10 pr-4 text-sm text-radar-navy outline-none transition-all placeholder:text-radar-muted/70 focus:border-radar-navy/30 focus:bg-white focus:ring-2 focus:ring-radar-navy/10"
                aria-label="Haber ara"
              />
            </form>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              className="inline-flex size-10 items-center justify-center rounded-full text-radar-navy transition-colors hover:bg-radar-surface md:hidden"
              aria-label={searchOpen ? "Aramayı kapat" : "Ara"}
            >
              <Search className="size-5" />
            </button>

            <Link
              href="/giris"
              className="hidden items-center gap-2 rounded-full border border-radar-border px-4 py-2 text-sm font-medium text-radar-navy transition-colors hover:border-radar-navy/20 hover:bg-radar-surface sm:inline-flex"
            >
              <User className="size-4" />
              Giriş Yap
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex size-10 items-center justify-center rounded-full text-radar-navy transition-colors hover:bg-radar-surface lg:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-radar-border px-4 pb-4 md:hidden">
            <form role="search" onSubmit={(event) => event.preventDefault()}>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-radar-muted" />
                <input
                  type="search"
                  placeholder="Haber ara..."
                  className="w-full rounded-full border border-radar-border bg-radar-surface py-2.5 pl-10 pr-4 text-sm outline-none focus:border-radar-navy/30 focus:ring-2 focus:ring-radar-navy/10"
                  aria-label="Haber ara"
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Kategori navigasyonu — masaüstü */}
      <nav
        className="hidden border-b border-radar-border bg-radar-navy lg:block"
        aria-label="Ana kategoriler"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-1 overflow-x-auto py-0.5">
            {mainNavItems.map((item, index) => (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  className={`relative block px-4 py-3.5 text-sm font-medium transition-colors ${
                    index === 0
                      ? "text-white after:absolute after:inset-x-4 after:bottom-0 after:h-0.5 after:rounded-full after:bg-radar-accent"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobil menü */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[var(--navbar-offset,120px)] z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-radar-navy/20 backdrop-blur-[2px]"
            aria-label="Menüyü kapat"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative mx-2 mt-2 overflow-hidden rounded-2xl border border-radar-border bg-white shadow-xl">
            <div className="border-b border-radar-border px-4 py-3">
              <Logo compact />
            </div>

            <nav aria-label="Mobil menü">
              <ul className="divide-y divide-radar-border">
                {mainNavItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-4 py-3.5 text-base font-medium text-radar-navy transition-colors hover:bg-radar-surface"
                    >
                      {item.label}
                      <ChevronRight className="size-4 text-radar-muted" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-radar-border bg-radar-surface p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-radar-muted">
                Diğer
              </p>
              <div className="flex flex-wrap gap-2">
                {utilityNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full border border-radar-border bg-white px-3 py-1.5 text-xs font-medium text-radar-navy transition-colors hover:border-radar-navy/20"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/giris"
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-radar-navy px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <User className="size-4" />
                Giriş Yap
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobil kategori şeridi */}
      <nav
        className="border-b border-radar-border bg-white lg:hidden"
        aria-label="Mobil kategoriler"
      >
        <ul className="flex gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          {mainNavItems.map((item, index) => (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                className={`block rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  index === 0
                    ? "bg-radar-navy text-white"
                    : "bg-radar-surface text-radar-navy hover:bg-radar-border/60"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
