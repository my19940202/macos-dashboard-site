"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import type { AppItem } from "@/lib/apps";
import type { LaunchPadMessages } from "@/lib/i18n";

const PAGE_ROWS = 5;
const PAGE_COLS = 7;
const PAGE_SIZE = PAGE_ROWS * PAGE_COLS;

type LaunchPadProps = {
  apps: AppItem[];
  messages: LaunchPadMessages;
};

function formatPageLabel(template: string, page: number) {
  return template.replace("{page}", String(page));
}

export default function LaunchPad({ apps, messages }: LaunchPadProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
  const touchStartXRef = useRef<number | null>(null);
  const mouseStartXRef = useRef<number | null>(null);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredApps = useMemo(
    () =>
      normalizedQuery.length === 0
        ? apps
        : apps.filter((app) =>
            app.name.toLowerCase().includes(normalizedQuery),
          ),
    [apps, normalizedQuery],
  );

  const isSearching = normalizedQuery.length > 0;
  const pageCount = Math.max(1, Math.ceil(filteredApps.length / PAGE_SIZE));

  const currentPage = Math.min(page, pageCount - 1);

  const visibleApps = useMemo(() => {
    if (isSearching) {
      return filteredApps;
    }
    const start = currentPage * PAGE_SIZE;
    return filteredApps.slice(start, start + PAGE_SIZE);
  }, [filteredApps, currentPage, isSearching]);

  const handleChangeQuery = useCallback((value: string) => {
    setQuery(value);
    setPage(0);
  }, []);

  const changePage = useCallback(
    (nextPage: number) => {
      const boundedPage = Math.max(0, Math.min(nextPage, pageCount - 1));
      if (boundedPage === currentPage) return;

      setSlideDirection(boundedPage > currentPage ? "left" : "right");
      setPage(boundedPage);
    },
    [currentPage, pageCount],
  );

  const handleSwipe = useCallback(
    (deltaX: number) => {
      if (isSearching) return;
      const threshold = 50;
      if (Math.abs(deltaX) < threshold) return;
      if (deltaX < 0) {
        // 向左滑动：下一页
        changePage(currentPage + 1);
      } else {
        // 向右滑动：上一页
        changePage(currentPage - 1);
      }
    },
    [changePage, currentPage, isSearching],
  );

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current == null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    handleSwipe(endX - touchStartXRef.current);
    touchStartXRef.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseStartXRef.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseStartXRef.current == null) return;
    handleSwipe(e.clientX - mouseStartXRef.current);
    mouseStartXRef.current = null;
  };

  const handleMouseLeave = () => {
    mouseStartXRef.current = null;
  };

  const handleClickApp = (app: AppItem) => {
    const scheme = app.deeplinks[0];
    if (!scheme) {
      window.alert(messages.unsupportedAppMessage);
      return;
    }

    window.location.href = scheme;
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_top,_#3d2fe5_0%,_#2134d7_38%,_#233db3_62%,_#3158a6_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_28%)]" />

      <header className="fixed left-0 right-0 top-0 z-20 px-4 pt-5 sm:px-6">
        <div className="mx-auto flex w-full justify-center">
          <label className="flex h-11 w-full max-w-md items-center gap-3 rounded-full border border-white/10 bg-[#3c35b8]/75 px-4 text-white/70 shadow-[0_12px_30px_rgba(12,10,62,0.28)] ring-1 ring-white/8 backdrop-blur-xl">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-white/65"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="text"
              aria-label={messages.searchAriaLabel}
              className="h-full flex-1 border-0 bg-transparent text-sm text-white placeholder:text-white/55 focus:outline-none"
              placeholder={messages.searchPlaceholder}
              value={query}
              onChange={(e) => handleChangeQuery(e.target.value)}
            />
          </label>
        </div>
      </header>

      <div className="relative z-10 flex flex-1 pt-24">
        <div
          className="launchpad-swipe-surface flex w-full flex-1 items-start justify-center px-5 pb-14 sm:px-8 sm:pb-16"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex w-full flex-1 flex-col items-center">
            <div
              key={isSearching ? "search-results" : `page-${currentPage}`}
              className={`grid w-full max-w-[1400px] grid-cols-3 justify-items-center gap-x-3 gap-y-7 sm:grid-cols-4 sm:gap-x-6 md:grid-cols-5 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-8 ${
                isSearching
                  ? ""
                  : slideDirection === "left"
                    ? "launchpad-page-enter-left"
                    : "launchpad-page-enter-right"
              }`}
            >
              {visibleApps.map((app) => (
                <button
                  key={`${app.name}-${app.iconUrl}`}
                  type="button"
                  className="group flex w-full max-w-[112px] cursor-pointer select-none flex-col items-center justify-start gap-2 text-[13px] text-white/90"
                  onClick={() => handleClickApp(app)}
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-[18px]">
                    <img
                      src={app.iconUrl}
                      alt={app.name}
                      draggable={false}
                      className="h-24 w-24 rounded-[14px] object-contain"
                    />
                  </div>
                  <span className="line-clamp-2 min-h-9 text-center leading-tight text-white/92 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                    {app.name}
                  </span>
                </button>
              ))}
            </div>

            {!isSearching && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {Array.from({ length: pageCount }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`h-2 w-2 rounded-full transition ${
                      index === currentPage ? "bg-white" : "bg-white/35"
                    }`}
                    onClick={() => changePage(index)}
                    aria-label={formatPageLabel(
                      messages.pageIndicatorLabelTemplate,
                      index + 1,
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

