import { ZoomableImage } from "../ZoomableImage";

export const ACCENT = "#4DA8FF";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-[family-name:var(--font-share-tech-mono)] text-[11px] uppercase tracking-[2.5px] mb-6"
      style={{ color: ACCENT }}
    >
      {children}
    </p>
  );
}

export function ImageFrame({ src, alt }: { src: string; alt: string }) {
  return <ZoomableImage src={src} alt={alt} accent={ACCENT} />;
}

const CORNERS: { pos: string; sides: React.CSSProperties }[] = [
  { pos: "top-2 left-2", sides: { borderTop: `1px solid ${ACCENT}55`, borderLeft: `1px solid ${ACCENT}55` } },
  { pos: "top-2 right-2", sides: { borderTop: `1px solid ${ACCENT}55`, borderRight: `1px solid ${ACCENT}55` } },
  { pos: "bottom-2 left-2", sides: { borderBottom: `1px solid ${ACCENT}55`, borderLeft: `1px solid ${ACCENT}55` } },
  { pos: "bottom-2 right-2", sides: { borderBottom: `1px solid ${ACCENT}55`, borderRight: `1px solid ${ACCENT}55` } },
];

/**
 * A deliberately "reserved" image slot for chapters that aren't built yet.
 * Reads as planned-and-coming (corner ticks + diagonal hatch), not as a broken image.
 */
export function PlaceholderFrame({
  label,
  ratio = "16 / 10",
  note = "image coming",
}: {
  label: string;
  ratio?: string;
  note?: string;
}) {
  return (
    <div
      className="relative w-full rounded-lg overflow-hidden flex items-center justify-center"
      style={{
        aspectRatio: ratio,
        border: `0.5px dashed ${ACCENT}33`,
        background: `repeating-linear-gradient(-45deg, ${ACCENT}06 0px, ${ACCENT}06 1px, transparent 1px, transparent 11px), rgba(255,255,255,0.015)`,
      }}
    >
      {CORNERS.map((c) => (
        <span
          key={c.pos}
          aria-hidden="true"
          className={`absolute w-3 h-3 ${c.pos}`}
          style={c.sides}
        />
      ))}

      <div className="flex flex-col items-center gap-2 text-center px-4">
        <span className="text-[18px] leading-none" style={{ color: `${ACCENT}66` }} aria-hidden="true">
          ◳
        </span>
        <span
          className="font-[family-name:var(--font-share-tech-mono)] text-[11px] uppercase tracking-[1.5px]"
          style={{ color: ACCENT }}
        >
          // {label}
        </span>
        <span className="font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[1.5px] text-[#555]">
          {note}
        </span>
      </div>
    </div>
  );
}
