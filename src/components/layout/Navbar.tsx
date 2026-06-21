"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { WeatherWidget } from "@/components/layout/WeatherWidget";
import { mainNavItems } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";

function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "font-nav shrink-0 text-base font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:text-[17px]",
        className,
      )}
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
  isActive = false,
}: {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "font-nav whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:text-white/85 sm:text-sm lg:text-[15px]",
        isActive && "text-white underline decoration-2 underline-offset-4",
        className,
      )}
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

type NavbarProps = {
  onSearchOpen?: () => void;
};

function NavbarComponent({ onSearchOpen }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="relative w-full border-b-2 border-[#991b1b] bg-radar-accent max-lg:shadow-none lg:shadow-[0_2px_12px_rgba(185,28,28,0.35)]">
      <div className="relative mx-auto hidden max-w-[1400px] items-center justify-center px-6 py-3 lg:flex">
        <Logo className="absolute left-6 top-1/2 -translate-y-1/2" />

        <nav aria-label="Ana menü">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 xl:gap-x-5">
            {mainNavItems.map((item, index) => (
              <li key={item.href} className="flex items-center gap-4 xl:gap-5">
                {index > 0 && <NavDivider />}
                <NavLink
                  href={item.href}
                  label={item.label}
                  isActive={isActive(item.href)}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute right-6 top-1/2 flex -translate-y-1/2 items-center gap-3">
          {onSearchOpen && (
            <button
              type="button"
              onClick={onSearchOpen}
              className="inline-flex size-9 items-center justify-center text-white transition-colors hover:bg-white/15"
              aria-label="Arama aç"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20L16.5 16.5" />
              </svg>
            </button>
          )}
          <WeatherWidget />
        </div>
      </div>

      <div className="lg:hidden">
        <div className="relative flex items-center justify-between px-4 py-3">
          <Logo className="text-sm sm:text-base" />
          <div className="flex items-center gap-2 sm:gap-3">
            {onSearchOpen && (
              <button
                type="button"
                onClick={onSearchOpen}
                className="inline-flex size-9 items-center justify-center text-white transition-colors hover:bg-white/15"
                aria-label="Arama aç"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20L16.5 16.5" />
                </svg>
              </button>
            )}
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
          <nav
            aria-label="Mobil kategoriler"
            className="border-t border-white/20 max-lg:[transform:translate3d(0,0,0)]"
          >
            <ul className="flex gap-2 overflow-x-auto overscroll-x-contain px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {mainNavItems.map((item) => (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "font-nav inline-flex px-3 py-1.5 text-[13px] font-bold uppercase tracking-[0.1em] text-white hover:bg-white/10 max-lg:transition-none lg:transition-colors",
                      isActive(item.href) && "bg-white/15",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-radar-accent lg:hidden">
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
                    isActive={isActive(item.href)}
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

export const Navbar = memo(NavbarComponent);
