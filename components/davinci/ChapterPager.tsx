import Link from "next/link";
import { ACCENT } from "./shared";
import { CHAPTERS, chapterHref } from "./chapters";

/**
 * Carries the reader from the end of one chapter into the next.
 *
 * Without this, finishing a chapter drops you straight into the page footer, so a
 * visitor can leave having never learned the other chapters existed.
 */
export function ChapterPager({ activeId }: { activeId: string }) {
  const i = CHAPTERS.findIndex((c) => c.id === activeId);
  const prev = i > 0 ? CHAPTERS[i - 1] : null;
  const next = i < CHAPTERS.length - 1 ? CHAPTERS[i + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Chapter navigation"
      className="mt-20 pt-8"
      style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {prev ? (
          <PagerLink chapter={prev} direction="prev" />
        ) : (
          <span aria-hidden="true" />
        )}
        {next && <PagerLink chapter={next} direction="next" />}
      </div>
    </nav>
  );
}

function PagerLink({
  chapter,
  direction,
}: {
  chapter: (typeof CHAPTERS)[number];
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";

  return (
    <Link
      href={chapterHref(chapter.id)}
      scroll={false}
      className={`group block no-underline rounded-lg px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        isNext ? "text-right sm:col-start-2" : "text-left"
      }`}
      style={{
        background: isNext ? `${ACCENT}0D` : "rgba(255,255,255,0.022)",
        border: isNext ? `0.5px solid ${ACCENT}33` : "0.5px solid rgba(255,255,255,0.07)",
        // @ts-expect-error -- CSS custom property for the focus ring colour
        "--tw-ring-color": `${ACCENT}88`,
        "--tw-ring-offset-color": "#0D0F12",
      }}
    >
      <span
        className="block font-[family-name:var(--font-share-tech-mono)] text-[9px] tracking-[1.5px] mb-1.5 transition-colors duration-200"
        style={{ color: isNext ? `${ACCENT}CC` : "#5A5D65" }}
      >
        {isNext ? "Next chapter" : "Previous"}
      </span>
      <span className="flex items-baseline gap-2.5 justify-start" style={isNext ? { justifyContent: "flex-end" } : undefined}>
        {!isNext && (
          <span
            aria-hidden="true"
            className="text-[13px] transition-transform duration-200 group-hover:-translate-x-1"
            style={{ color: "#6A6D75" }}
          >
            &larr;
          </span>
        )}
        <span
          className="font-[family-name:var(--font-chakra-petch)] font-bold text-[17px] transition-colors duration-200"
          style={{ color: isNext ? "#FFF" : "#9A9DA5" }}
        >
          {chapter.name}
        </span>
        {isNext && (
          <span
            aria-hidden="true"
            className="text-[13px] transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: ACCENT }}
          >
            &rarr;
          </span>
        )}
      </span>
      <span
        className="block font-[family-name:var(--font-share-tech-mono)] text-[10px] tracking-[0.5px] mt-1"
        style={{ color: "#5A5D65" }}
      >
        {chapter.statusLabel}
      </span>
    </Link>
  );
}
