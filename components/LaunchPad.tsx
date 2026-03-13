"use client";

import React, { useCallback, useMemo, useState } from "react";
import type { AppItem } from "@/app/page";

const PAGE_ROWS = 5;
const PAGE_COLS = 7;
const PAGE_SIZE = PAGE_ROWS * PAGE_COLS;

type LaunchPadProps = {
  apps: AppItem[];
};

export default function LaunchPad({ apps }: LaunchPadProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);

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

  const handleSwipe = useCallback(
    (deltaX: number) => {
      if (isSearching) return;
      const threshold = 50;
      if (Math.abs(deltaX) < threshold) return;
      if (deltaX < 0) {
        // 向左滑动：下一页
        setPage((prev) => Math.min(prev + 1, pageCount - 1));
      } else {
        // 向右滑动：上一页
        setPage((prev) => Math.max(prev - 1, 0));
      }
    },
    [isSearching, pageCount],
  );

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX == null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX;
    handleSwipe(endX - touchStartX);
    setTouchStartX(null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseStartX == null) return;
    handleSwipe(e.clientX - mouseStartX);
    setMouseStartX(null);
  };

  const handleClickApp = (app: AppItem) => {
    const scheme = app.deeplinks[0];
    if (!scheme) {
      window.alert("该应用暂不支持直接打开");
      return;
    }

    // 参考 README 中的 deeplink 打开方式
    window.location.href = scheme;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed left-0 right-0 top-0 z-20 border-b border-base-300 bg-base-100/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-3">
          <input
            type="text"
            className="input input-bordered input-sm flex-1"
            placeholder="搜索应用名称…"
            value={query}
            onChange={(e) => handleChangeQuery(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => handleChangeQuery(query)}
          >
            搜索
          </button>
        </div>
      </header>

      <div className="flex-1 pt-16">
        <div
          className="flex h-[calc(100vh-4rem)] items-center justify-center px-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <div className="mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center rounded-3xl bg-base-100/60 p-6 shadow-xl backdrop-blur">
            <div className="grid h-full w-full grid-cols-7 grid-rows-5 gap-4">
              {visibleApps.map((app) => (
                <button
                  key={`${app.name}-${app.iconUrl}`}
                  type="button"
                  className="flex flex-col items-center justify-center gap-2 text-xs text-base-content/80 hover:text-base-content"
                  onClick={() => handleClickApp(app)}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-base-200 shadow-md">
                    <img
                      src={app.iconUrl}
                      alt={app.name}
                      className="h-12 w-12 rounded-xl object-contain"
                    />
                  </div>
                  <span className="line-clamp-2 text-center leading-tight">
                    {app.name}
                  </span>
                </button>
              ))}
            </div>

            {!isSearching && (
              <div className="mt-4 flex items-center justify-center gap-2">
                {Array.from({ length: pageCount }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`h-2 w-2 rounded-full ${
                      index === currentPage ? "bg-primary" : "bg-base-300"
                    }`}
                    onClick={() => setPage(index)}
                    aria-label={`第 ${index + 1} 页`}
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

