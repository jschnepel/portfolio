"use client";

import { useState } from "react";
import Link from "next/link";
import { ACCENT } from "./shared";
import { CHAPTERS, ChapterStatus, chapterHref } from "./chapters";

/**
 * Chapters that represent work already reached. The spine runs bright up to here
 * and dims after, so the row reads as progress along a build rather than a legend.
 */
const REACHED: ChapterStatus[] = ["vision", "built", "building"];
const lastReached = CHAPTERS.reduce(
  (acc, c, i) => (REACHED.includes(c.status) ? i : acc),
  0
);

function SpineNode({ status, active }: { status: ChapterStatus; active: boolean }) {
  const ring = active
    ? { boxShadow: `0 0 0 4px ${ACCENT}22`, transform: "scale(1.35)" }
    : undefined;

  if (status === "vision") {
    return (
      <span
        aria-hidden="true"
        className="relative z-10 w-2 h-2 rotate-45 transition-transform duration-300"
        style={{ background: ACCENT, ...ring }}
      />
    );
  }
  if (status === "building") {
    return (
      <span
        aria-hidden="true"
        className="relative z-10 w-2 h-2 rounded-full davinci-live transition-transform duration-300"
        style={{ background: ACCENT, ...ring }}
      />
    );
  }
  if (status === "built") {
    return (
      <span
        aria-hidden="true"
        className="relative z-10 w-2 h-2 rounded-full transition-transform duration-300"
        style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}88`, ...ring }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="relative z-10 w-2 h-2 rounded-full transition-transform duration-300"
      style={{
        background: "#0D0F12",
        border: `1px solid ${status === "next" ? `${ACCENT}77` : "#4A4D55"}`,
        ...ring,
      }}
    />
  );
}

export function ChapterNav({ activeId }: { activeId: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const activeIndex = CHAPTERS.findIndex((c) => c.id === activeId);


  return (
    <div
      className="sticky top-[64px] z-40 -mx-8 px-8 pt-3 pb-3.5 mb-12"
      style={{
        background: "rgba(13,15,18,0.82)",
        backdropFilter: "blur(16px) saturate(1.2)",
        WebkitBackdropFilter: "blur(16px) saturate(1.2)",
        borderBottom: "0.5px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Position in the series — tells the reader more chapters exist. */}
      <div className="flex items-baseline justify-between gap-4 mb-2.5">
        <p className="font-[family-name:var(--font-share-tech-mono)] text-[10px] tracking-[1.5px] text-[#6A6D75]">
          Chapter{" "}
          <span style={{ color: ACCENT }}>{activeIndex + 1}</span>
          <span className="text-[#4A4D55]"> / {CHAPTERS.length}</span>
        </p>
        <p className="font-[family-name:var(--font-share-tech-mono)] text-[10px] tracking-[1px] text-[#4A4D55] hidden sm:block">
          Each chapter has its own page
        </p>
      </div>

      {/* The build spine: which chapters exist yet, and where you are on them. */}
      {/* gap-2 matches the tab grid below, so each node sits over its own tab. */}
      <div aria-hidden="true" className="hidden md:grid grid-cols-5 gap-2 mb-2">
        {CHAPTERS.map((c, i) => (
          <div key={c.id} className="relative flex items-center justify-center h-2.5">
            {i > 0 && (
              <span
                className="absolute -left-1 right-1/2 h-px"
                style={{ background: i <= lastReached ? `${ACCENT}55` : "rgba(255,255,255,0.07)" }}
              />
            )}
            {i < CHAPTERS.length - 1 && (
              <span
                className="absolute left-1/2 -right-1 h-px"
                style={{ background: i < lastReached ? `${ACCENT}55` : "rgba(255,255,255,0.07)" }}
              />
            )}
            <SpineNode status={c.status} active={c.id === activeId} />
          </div>
        ))}
      </div>

      <nav aria-label="Chapters" className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {CHAPTERS.map((c) => {
          const active = c.id === activeId;
          const hot = hovered === c.id && !active;
          const planned = c.status === "planned";

          return (
            <Link
              key={c.id}
              href={chapterHref(c.id)}
              scroll={false}
              id={`chapter-tab-${c.id}`}
              aria-current={active ? "page" : undefined}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(c.id)}
              onBlur={() => setHovered(null)}
              className={`relative block overflow-hidden text-left no-underline rounded-lg px-3.5 pt-3 pb-2.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                c.id === "vision" ? "col-span-2 md:col-span-1" : ""
              }`}
              style={{
                background: active
                  ? `${ACCENT}1A`
                  : hot
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.022)",
                border: active
                  ? `0.5px solid ${ACCENT}66`
                  : hot
                    ? "0.5px solid rgba(255,255,255,0.16)"
                    : "0.5px solid rgba(255,255,255,0.06)",
                transform: hot ? "translateY(-1px)" : "translateY(0)",
                boxShadow: active ? `0 6px 20px -12px ${ACCENT}99` : "none",
                // @ts-expect-error -- CSS custom property for the focus ring colour
                "--tw-ring-color": `${ACCENT}88`,
                "--tw-ring-offset-color": "#0D0F12",
              }}
            >
              {/* Filled rail: the unambiguous "this one is open" signal. */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 transition-all duration-200"
                style={{
                  height: active ? 2.5 : 0,
                  background: ACCENT,
                }}
              />

              <div className="flex items-center justify-between gap-2 mb-1">
                <span
                  className="font-[family-name:var(--font-share-tech-mono)] text-[10px] tracking-[1.5px] transition-colors duration-200"
                  style={{ color: active ? ACCENT : hot ? "#8A8D95" : "#5A5D65" }}
                >
                  {c.num}
                </span>
              </div>

              <div
                className="font-[family-name:var(--font-chakra-petch)] font-bold text-[14px] leading-tight transition-colors duration-200"
                style={{ color: active || hot ? "#FFF" : "#9A9DA5" }}
              >
                {c.name}
              </div>

              {/* Status, not the literal subtitle: it answers "is there anything to read here?" */}
              <div
                className="font-[family-name:var(--font-share-tech-mono)] text-[9px] tracking-[0.5px] mt-1 truncate transition-colors duration-200"
                style={{
                  color: active ? `${ACCENT}CC` : planned ? "#55585F" : hot ? "#8A8D95" : "#6A6D75",
                }}
              >
                {c.statusLabel}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
