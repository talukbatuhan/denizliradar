"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/lib/types/news";

type TopStoriesSliderProps = {
  stories: NewsItem[];
};

const AUTOPLAY_INTERVAL_MS = 6000;
const SWIPE_THRESHOLD_PX = 50;
const SWIPE_AXIS_LOCK_PX = 10;

export function TopStoriesSlider({ stories }: TopStoriesSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayPausedUntil = useRef(0);
  const didSwipe = useRef(false);
  const activePointerId = useRef<number | null>(null);
  const dragState = useRef({
    active: false,
    startX: 0,
    startY: 0,
    offset: 0,
    axis: null as "x" | "y" | null,
  });

  const storyCount = stories.length;

  const goTo = useCallback(
    (index: number) => {
      if (storyCount === 0) return;
      setActiveIndex((index + storyCount) % storyCount);
    },
    [storyCount],
  );

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % storyCount);
  }, [storyCount]);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + storyCount) % storyCount);
  }, [storyCount]);

  const pauseAutoplay = useCallback((durationMs = AUTOPLAY_INTERVAL_MS * 2) => {
    autoplayPausedUntil.current = Date.now() + durationMs;
  }, []);

  useEffect(() => {
    if (storyCount <= 1) return;

    const timer = window.setInterval(() => {
      if (Date.now() < autoplayPausedUntil.current) return;
      if (dragState.current.active) return;
      if (document.visibilityState === "hidden") return;

      setActiveIndex((current) => (current + 1) % storyCount);
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [storyCount]);

  const resetDrag = useCallback(() => {
    dragState.current = {
      active: false,
      startX: 0,
      startY: 0,
      offset: 0,
      axis: null,
    };
    activePointerId.current = null;
    setDragOffset(0);
    setTransitionEnabled(true);
    setIsDragging(false);
  }, []);

  const onDragStart = useCallback(
    (clientX: number, clientY: number, pointerId: number) => {
      didSwipe.current = false;
      activePointerId.current = pointerId;
      dragState.current = {
        active: true,
        startX: clientX,
        startY: clientY,
        offset: 0,
        axis: null,
      };
      setTransitionEnabled(false);
      pauseAutoplay();
    },
    [pauseAutoplay],
  );

  const onDragMove = useCallback(
    (
      clientX: number,
      clientY: number,
      pointerId: number,
      target: HTMLElement,
    ) => {
      const drag = dragState.current;
      if (!drag.active || activePointerId.current !== pointerId) return;

      const deltaX = clientX - drag.startX;
      const deltaY = clientY - drag.startY;

      if (drag.axis === null) {
        if (
          Math.abs(deltaX) < SWIPE_AXIS_LOCK_PX &&
          Math.abs(deltaY) < SWIPE_AXIS_LOCK_PX
        ) {
          return;
        }

        drag.axis = Math.abs(deltaX) > Math.abs(deltaY) ? "x" : "y";
        if (drag.axis === "y") {
          resetDrag();
          return;
        }

        if (!target.hasPointerCapture(pointerId)) {
          target.setPointerCapture(pointerId);
        }
        setIsDragging(true);
      }

      if (drag.axis === "x") {
        dragState.current.offset = deltaX;
        setDragOffset(deltaX);
      }
    },
    [resetDrag],
  );

  const onDragEnd = useCallback(
    (pointerId: number, target: HTMLElement) => {
      const drag = dragState.current;
      if (!drag.active || activePointerId.current !== pointerId) return;

      if (target.hasPointerCapture(pointerId)) {
        target.releasePointerCapture(pointerId);
      }

      if (drag.axis === "x" && Math.abs(drag.offset) >= SWIPE_THRESHOLD_PX) {
        didSwipe.current = true;
        if (drag.offset < 0) goNext();
        else goPrev();
        pauseAutoplay();
      }

      resetDrag();
    },
    [goNext, goPrev, pauseAutoplay, resetDrag],
  );

  const onSlideClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (didSwipe.current) {
        event.preventDefault();
        didSwipe.current = false;
      }
    },
    [],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (storyCount <= 1) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
        pauseAutoplay();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
        pauseAutoplay();
      }
    },
    [goNext, goPrev, pauseAutoplay, storyCount],
  );

  if (storyCount === 0) return null;

  return (
    <section
      aria-label="Top Stories"
      aria-roledescription="carousel"
      className="flex h-[320px] flex-col border border-radar-border bg-background sm:h-[400px] lg:h-[480px]"
    >
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={cn(
          "relative min-h-0 flex-1 touch-pan-y overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-radar-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          onDragStart(event.clientX, event.clientY, event.pointerId);
        }}
        onPointerMove={(event) => {
          onDragMove(
            event.clientX,
            event.clientY,
            event.pointerId,
            event.currentTarget,
          );
        }}
        onPointerUp={(event) => {
          onDragEnd(event.pointerId, event.currentTarget);
        }}
        onPointerCancel={(event) => {
          onDragEnd(event.pointerId, event.currentTarget);
        }}
      >
        <div
          className={cn(
            "flex h-full",
            transitionEnabled &&
              "transition-transform duration-500 ease-out motion-reduce:transition-none",
          )}
          style={{
            transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
          }}
        >
          {stories.map((story, index) => (
            <div
              key={story.id}
              className="relative h-full w-full shrink-0"
              aria-hidden={index !== activeIndex}
            >
              <Link
                href={story.href}
                onClick={onSlideClick}
                className="relative block h-full"
                draggable={false}
                tabIndex={index === activeIndex ? 0 : -1}
              >
                <Image
                  src={story.imageUrl}
                  alt={story.title}
                  fill
                  priority={index === 0}
                  className="pointer-events-none object-cover select-none"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  draggable={false}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <nav
        aria-label="Top Stories navigasyonu"
        className="flex shrink-0 border-t border-radar-border"
      >
        {stories.map((story, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={story.id}
              type="button"
              onClick={() => {
                goTo(index);
                pauseAutoplay();
              }}
              aria-label={`${index + 1}. haber: ${story.title}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "font-nav min-w-0 flex-1 border-r border-radar-border py-1 text-center text-[10px] font-bold tabular-nums tracking-wide last:border-r-0 sm:py-1.5 sm:text-[11px]",
                isActive
                  ? "bg-radar-surface text-radar-accent"
                  : "bg-background text-radar-navy/70 hover:bg-radar-surface/60",
              )}
            >
              {index + 1}
            </button>
          );
        })}
      </nav>
    </section>
  );
}
