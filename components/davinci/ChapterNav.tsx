"use client";

import { useRef } from "react";
import { ACCENT } from "./shared";
import { CHAPTERS, ChapterStatus } from "./chapters";

function StatusDot({ status, active }: { status: ChapterStatus; active: boolean }) {
  if (status === "vision") {
    return (
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rotate-45"
        style={{ background: active ? ACCENT : `${ACCENT}88` }}
      />
    );
  }
  if (status === "building") {
    return (
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full davinci-live"
        style={{ background: ACCENT }}
      />
    );
  }
  if (status === "built") {
    return (
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}77` }}
      />
    );
  }
  if (status === "next") {
    return (
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: `${ACCENT}66`, boxShadow: active ? `0 0 6px ${ACCENT}55` : "none" }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="w-1.5 h-1.5 rounded-full"
      style={{ border: "1px solid #4A4D55", background: "transparent" }}
    />
  );
}

export function ChapterNav({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (to: number) => {
    const i = (to + CHAPTERS.length) % CHAPTERS.length;
    onSelect(CHAPTERS[i].id);
    tabsRef.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = CHAPTERS.findIndex((c) => c.id === activeId);
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        move(idx + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        move(idx - 1);
        break;
      case "Home":
        e.preventDefault();
        move(0);
        break;
      case "End":
        e.preventDefault();
        move(CHAPTERS.length - 1);
        break;
    }
  };

  return (
    <div
      className="sticky top-[64px] z-40 -mx-8 px-8 py-3 mb-12"
      style={{
        background: "rgba(13,15,18,0.72)",
        backdropFilter: "blur(16px) saturate(1.2)",
        WebkitBackdropFilter: "blur(16px) saturate(1.2)",
        borderBottom: "0.5px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        role="tablist"
        aria-label="Build chapters"
        onKeyDown={onKeyDown}
        className="grid grid-cols-2 md:grid-cols-5 gap-2"
      >
        {CHAPTERS.map((c, i) => {
          const active = c.id === activeId;
          return (
            <button
              key={c.id}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`chapter-tab-${c.id}`}
              aria-selected={active}
              aria-controls={`chapter-panel-${c.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => onSelect(c.id)}
              className={`group relative text-left rounded-lg px-3.5 py-3 transition-all duration-300 hover:brightness-125 ${
                c.id === "vision" ? "col-span-2 md:col-span-1" : ""
              }`}
              style={{
                background: active ? `${ACCENT}0E` : "rgba(255,255,255,0.02)",
                border: active ? `0.5px solid ${ACCENT}40` : "0.5px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className="font-[family-name:var(--font-share-tech-mono)] text-[10px] tracking-[1.5px]"
                  style={{ color: active ? ACCENT : "#5A5D65" }}
                >
                  {c.num}
                </span>
                <StatusDot status={c.status} active={active} />
              </div>
              <div
                className="font-[family-name:var(--font-chakra-petch)] font-bold text-[14px] leading-tight transition-colors duration-300"
                style={{ color: active ? "#FFF" : "#9A9DA5" }}
              >
                {c.name}
              </div>
              <div className="font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[1px] mt-0.5 text-[#5A5D65] truncate">
                {c.literal}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
