import { ScrollReveal } from "../ScrollReveal";
import { ACCENT, SectionLabel, PlaceholderFrame } from "./shared";
import { Chapter, TeaserContent } from "./chapters";

export function ChapterTeaser({
  chapter,
  content,
}: {
  chapter: Chapter;
  content: TeaserContent;
}) {
  const planned = chapter.status === "planned";
  const statusColor = planned ? "#6B6E76" : ACCENT;

  return (
    <div>
      <SectionLabel>
        // chapter {chapter.num} · {chapter.literal}
      </SectionLabel>

      <div className="flex items-center gap-4 flex-wrap mb-3">
        <h2
          className="font-[family-name:var(--font-chakra-petch)] font-bold text-white"
          style={{ fontSize: "clamp(26px, 3.5vw, 34px)", letterSpacing: "-0.5px" }}
        >
          {chapter.name}
        </h2>
        <span
          className="font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[1.5px] px-2.5 py-1 rounded"
          style={{ color: statusColor, background: `${statusColor}14`, border: `0.5px solid ${statusColor}33` }}
        >
          {chapter.statusLabel}
        </span>
      </div>

      <p className="text-[18px] leading-[1.6] mb-10 max-w-[620px] italic" style={{ color: ACCENT }}>
        {content.tagline}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 items-start mb-12">
        <ScrollReveal>
          <PlaceholderFrame label={content.hero.label} ratio={content.hero.ratio} />
        </ScrollReveal>
        <div>
          <p className="text-[#AAA] text-[14.5px] leading-[1.85] mb-6">{content.proves}</p>
          <div className="rounded-lg p-4" style={{ background: `${ACCENT}08`, border: `0.5px solid ${ACCENT}22` }}>
            <p
              className="font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[1.5px] mb-2"
              style={{ color: ACCENT }}
            >
              // done looks like
            </p>
            <p className="text-[#CCC] text-[13.5px] leading-[1.7]">{content.goal}</p>
          </div>
        </div>
      </div>

      <SectionLabel>// what I&apos;ll build</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-12">
        {content.build.map((b, i) => (
          <ScrollReveal key={b} delay={0.04 * (i + 1)}>
            <div className="flex gap-3 items-start">
              <span
                aria-hidden="true"
                className="shrink-0 mt-1 w-3 h-3 rounded-[2px]"
                style={{ border: `1px solid ${statusColor}88` }}
              />
              <p className="text-[#999] text-[13.5px] leading-[1.6]">{b}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <SectionLabel>// what it&apos;ll show</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {content.visuals.map((v, i) => (
          <ScrollReveal key={v.label} delay={0.05 * (i + 1)}>
            <PlaceholderFrame label={v.label} ratio="4 / 3" note="planned" />
          </ScrollReveal>
        ))}
      </div>

      <p className="font-[family-name:var(--font-share-tech-mono)] text-[11px] text-[#555] leading-[1.7]">
        Placeholder chapter. Fills in with real captures as this phase is built.
      </p>
    </div>
  );
}
