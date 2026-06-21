"use client";

import { useEffect, useRef, useState } from "react";

const MOBILE_QUERY = "(max-width: 1023px)";
const SCROLL_DELTA = 10;
const TOP_THRESHOLD = 12;

export function useMobileSubNavVisibility() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    lastScrollY.current = window.scrollY;

    function applyVisibility(nextVisible: boolean) {
      setVisible((current) => (current === nextVisible ? current : nextVisible));
    }

    function updateVisibility() {
      ticking.current = false;

      if (!media.matches) {
        applyVisibility(true);
        lastScrollY.current = window.scrollY;
        return;
      }

      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY <= TOP_THRESHOLD) {
        applyVisibility(true);
      } else if (delta > SCROLL_DELTA) {
        applyVisibility(false);
      } else if (delta < -SCROLL_DELTA) {
        applyVisibility(true);
      }

      lastScrollY.current = currentY;
    }

    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(updateVisibility);
    }

    function onBreakpointChange() {
      applyVisibility(true);
      lastScrollY.current = window.scrollY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    media.addEventListener("change", onBreakpointChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      media.removeEventListener("change", onBreakpointChange);
    };
  }, []);

  return visible;
}
