"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { SubNavbar } from "@/components/layout/SubNavbar";
import { SearchModal } from "@/components/search/SearchModal";
import { useMobileSubNavVisibility } from "@/lib/hooks/use-mobile-subnav-visibility";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const subNavVisible = useMobileSubNavVisibility();

  return (
    <>
      <div className="sticky top-0 z-50 isolate w-full [transform:translateZ(0)]">
        <Navbar onSearchOpen={() => setSearchOpen(true)} />
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none lg:grid-rows-[1fr]",
            subNavVisible ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
          aria-hidden={!subNavVisible}
        >
          <div className="overflow-hidden">
            <SubNavbar />
          </div>
        </div>
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
