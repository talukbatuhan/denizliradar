"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { SubNavbar } from "@/components/layout/SubNavbar";
import { SearchModal } from "@/components/search/SearchModal";
import { useMobileSubNavVisibility } from "@/lib/hooks/use-mobile-subnav-visibility";
import { cn } from "@/lib/utils";

const SUBNAV_ANIMATION_MS = 300;

function MobileSubNavSlot({ visible }: { visible: boolean }) {
  const [slotCollapsed, setSlotCollapsed] = useState(false);

  useEffect(() => {
    if (visible) {
      setSlotCollapsed(false);
      return;
    }

    const timer = window.setTimeout(
      () => setSlotCollapsed(true),
      SUBNAV_ANIMATION_MS,
    );

    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <div
      className={cn(
        "overflow-hidden bg-[#0c1524] max-lg:transition-[height] max-lg:duration-300 max-lg:ease-out motion-reduce:max-lg:transition-none",
        slotCollapsed ? "max-lg:h-0" : "max-lg:h-8",
        "lg:h-auto lg:overflow-visible",
      )}
      aria-hidden={!visible}
    >
      <div
        className={cn(
          "transition-transform duration-300 ease-out motion-reduce:transition-none lg:translate-y-0",
          visible
            ? "translate-y-0"
            : "pointer-events-none -translate-y-full lg:translate-y-0",
        )}
      >
        <SubNavbar />
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const subNavVisible = useMobileSubNavVisibility();
  const headerRef = useRef<HTMLDivElement>(null);
  const [mobileHeaderHeight, setMobileHeaderHeight] = useState(0);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeight = () => {
      setMobileHeaderHeight(header.offsetHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={headerRef}
        className="z-50 w-full bg-radar-accent max-lg:fixed max-lg:inset-x-0 max-lg:top-0 lg:sticky lg:top-0"
      >
        <Navbar onSearchOpen={openSearch} />
        <MobileSubNavSlot visible={subNavVisible} />
      </div>

      <div
        className="shrink-0 lg:hidden"
        style={{ height: mobileHeaderHeight }}
        aria-hidden="true"
      />

      <SearchModal open={searchOpen} onClose={closeSearch} />
    </>
  );
}
