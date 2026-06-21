"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { WeatherWidget } from "@/components/layout/WeatherWidget";
import { mainNavItems } from "@/lib/constants/navigation";

function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`font-nav shrink-0 text-base font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:text-[17px] ${className}`}
    >
      DENİZLİRADAR.COM
    </Link>
  );
}

function NavLink({
  href,
  label,
  onClick,
  className = "",
}: {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`font-nav whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-all hover:text-white/85 sm:text-sm lg:text-[15px] ${className}`}
    >
      {label}
    </Link>
  );
}

function NavDivider() {
  return (
    <span
      className="hidden h-4 w-px shrink-0 bg-white/45 lg:block"
      aria-hidden="true"
    />
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="w-full border-b-2 border-[#991b1b] bg-radar-accent shadow-[0_2px_12px_rgba(185,28,28,0.35)]">
      {/* Masaüstü */}
      <div className="relative mx-auto hidden max-w-[1400px] items-center justify-center px-6 py-3 lg:flex">
        <Logo className="absolute left-6 top-1/2 -translate-y-1/2" />

        <nav aria-label="Ana menü">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 xl:gap-x-5">
            {mainNavItems.map((item, index) => (
              <li key={item.href} className="flex items-center gap-4 xl:gap-5">
                {index > 0 && <NavDivider />}
                <NavLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute right-6 top-1/2 -translate-y-1/2">
          <WeatherWidget />
        </div>
      </div>

      {/* Mobil */}
      <div className="lg:hidden">
        <div className="relative flex items-center justify-between px-4 py-3">
          <Logo className="text-sm sm:text-base" />
          <div className="flex items-center gap-2 sm:gap-3">
            <WeatherWidget compact />
            <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex size-9 items-center justify-center text-white transition-colors hover:bg-white/15"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          </div>
        </div>

        {!mobileOpen && (
          <nav aria-label="Mobil kategoriler" className="border-t border-white/20">
            <ul className="flex gap-6 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {mainNavItems.map((item) => (
                <li key={item.href} className="shrink-0">
                  <NavLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Mobil tam ekran menü */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-radar-accent lg:hidden">
          <div className="flex items-center justify-between border-b border-white/20 px-4 py-3">
            <Logo className="text-sm sm:text-base" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="inline-flex size-9 items-center justify-center text-white hover:bg-white/15"
              aria-label="Menüyü kapat"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav
            aria-label="Mobil menü"
            className="flex h-[calc(100%-52px)] items-center justify-center overflow-y-auto px-6"
          >
            <ul className="flex flex-col items-center gap-4 py-8">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    label={item.label}
                    onClick={() => setMobileOpen(false)}
                    className="text-base tracking-[0.12em]"
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
