/**
 * Single source of truth for the academic-award reviewer testimonial, so the
 * wording stays identical everywhere it appears (case study, about, résumé).
 * The `full` string is the reviewer's verbatim quote; `highlight` is a faithful
 * excerpt of it used where space is tight.
 */
export const AWARD_QUOTE = {
  full:
    "The submission stands out for its extensive documentation, including a detailed README, docstrings, and inline code comments, and for the strong model implementations of the deep neural network and GMM-HMM, with clear optimizations.",
  highlight:
    "…strong model implementations of the deep neural network and GMM-HMM, with clear optimizations.",
  author: "Kimberley Merritt",
  pronouns: "she/her",
  role: "Vice President, Evaluation — Academic Delivery",
  award: "Academic Award of Excellence",
} as const;

const DEFAULT_ACCENT = "#4DA8FF";

interface AwardQuoteProps {
  variant?: "full" | "condensed";
  accent?: string;
}

/**
 * A reviewer testimonial for the academic award.
 * - `full`: a bordered card with the complete quote and attribution.
 * - `condensed`: a slim endorsement strip using the highlight excerpt.
 */
export function AwardQuote({ variant = "full", accent = DEFAULT_ACCENT }: AwardQuoteProps) {
  const q = AWARD_QUOTE;

  if (variant === "condensed") {
    return (
      <figure
        className="rounded-lg px-5 py-4 flex items-start gap-3.5"
        style={{ background: `${accent}0A`, border: `0.5px solid ${accent}22` }}
      >
        <span aria-hidden="true" className="text-[16px] leading-none mt-0.5" style={{ color: accent }}>
          &#9733;
        </span>
        <div>
          <p className="text-[#CFCFCF] text-[13.5px] leading-[1.7] italic">
            <span aria-hidden="true" style={{ color: accent }}>&ldquo;</span>
            {q.highlight}
            <span aria-hidden="true" style={{ color: accent }}>&rdquo;</span>
          </p>
          <figcaption className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] mt-2">
            <span style={{ color: accent }}>{q.author}</span>
            <span className="text-[#555]"> · {q.award}</span>
          </figcaption>
        </div>
      </figure>
    );
  }

  return (
    <figure
      className="rounded-lg p-6 sm:p-7"
      style={{ background: `${accent}0A`, border: `0.5px solid ${accent}22` }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span aria-hidden="true" className="text-[15px] leading-none" style={{ color: accent }}>
          &#9733;
        </span>
        <span
          className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px]"
          style={{ color: accent }}
        >
          {q.award}
        </span>
      </div>
      <blockquote className="text-[#DDD] text-[15px] leading-[1.85]">
        <span aria-hidden="true" style={{ color: accent }}>&ldquo;</span>
        {q.full}
        <span aria-hidden="true" style={{ color: accent }}>&rdquo;</span>
      </blockquote>
      <figcaption
        className="mt-5 pt-4 flex flex-col"
        style={{ borderTop: `0.5px solid ${accent}1A` }}
      >
        <span className="font-[family-name:var(--font-chakra-petch)] font-bold text-[14px] text-white">
          {q.author} <span className="text-[#777] font-normal">({q.pronouns})</span>
        </span>
        <span className="text-[#777] text-[12px] mt-0.5">{q.role}</span>
      </figcaption>
    </figure>
  );
}
