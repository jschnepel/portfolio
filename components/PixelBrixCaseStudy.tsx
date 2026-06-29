import Link from "next/link";
import { TechTag } from "./TechTag";
import { ScrollReveal } from "./ScrollReveal";
import { ZoomableImage } from "./ZoomableImage";
import { Footer } from "./Footer";

const ACCENT = "#F5C344";
const LIVE_URL = "https://pixel-brix.vercel.app/";

const TAGS = ["Canvas API", "Color Science", "TypeScript", "React"];

const MOSAIC = [
  "#F5C344", "#FCE08A", "#1A1D22", "#2A2D34", "#8A6D1F", "#E6E8EC",
  "#F5C344", "#1A1D22", "#FCE08A", "#6B5A2A", "#2A2D34", "#F5C344",
  "#C99A2E", "#1A1D22", "#FCE08A", "#3A3D44", "#F5C344", "#8A6D1F",
];
const TILE_COUNT = 48;

const steps = [
  { n: "01", title: "Drop in a photo", body: "Any image. Crop it to frame the shot you want." },
  { n: "02", title: "Pick a style and size", body: "Classic, Comic, or Pop, at 48×48 or 96×96 bricks." },
  { n: "03", title: "Get a buildable guide", body: "A brick-by-brick grid with real color codes and exact per-color counts." },
];

const stats = [
  ["9,216", "bricks, max build"],
  ["~50ms", "to match a full grid"],
  ["3", "art styles"],
  ["0", "servers"],
];

const underHood = [
  "Perceptual color matching (CIE LAB + Delta-E) maps each pixel to the nearest real brick color.",
  "Three art styles and two build sizes, each its own sampling pass.",
  "Runs entirely in the browser on the Canvas API, with no server round-trip.",
  "TypeScript (strict), 31 tests, and documented design decisions.",
];

const stack = ["Next.js", "React", "TypeScript", "Tailwind", "Canvas API", "Vitest"];

function MosaicStrip() {
  return (
    <div
      className="grid gap-[2px] rounded-md overflow-hidden"
      style={{ gridTemplateColumns: `repeat(${TILE_COUNT}, minmax(0, 1fr))` }}
      aria-hidden="true"
    >
      {Array.from({ length: TILE_COUNT }).map((_, i) => (
        <span
          key={i}
          className="brick-tile aspect-square"
          style={{ background: MOSAIC[i % MOSAIC.length], animationDelay: `${i * 0.014}s` }}
        />
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-[family-name:var(--font-share-tech-mono)] text-[11px] uppercase tracking-[2.5px] mb-6"
      style={{ color: ACCENT }}
    >
      {children}
    </p>
  );
}

export function PixelBrixCaseStudy() {
  return (
    <div className="relative z-10 pt-32 pb-16 max-w-[960px] mx-auto px-8">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[2px] text-[#3A3D44] mb-8 hover:text-[#888] transition-colors duration-300"
      >
        <span>&larr;</span> Back to projects
      </Link>

      {/* ── HERO ── */}
      <p
        className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[2px] mb-4"
        style={{ color: ACCENT }}
      >
        Platform · Shipped
      </p>
      <h1
        className="font-[family-name:var(--font-chakra-petch)] font-bold text-white mb-5"
        style={{ fontSize: "clamp(40px, 6vw, 68px)", letterSpacing: "-1px", lineHeight: 0.95 }}
      >
        PixelBrix
      </h1>

      <div className="mb-7 max-w-[520px]">
        <MosaicStrip />
      </div>

      <p className="text-[#AAA] text-[16px] leading-[1.8] max-w-[600px] mb-7">
        Turn any photo into a brick mosaic you can actually build, right in the browser. You get a
        buildable grid with real brick color codes and the exact count of each color to order.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-12">
        <div className="flex flex-wrap">
          {TAGS.map((t) => (
            <TechTag key={t} label={t} color={ACCENT} active />
          ))}
        </div>
        <a
          href={LIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] px-4 py-2 rounded transition-all duration-300 hover:brightness-110"
          style={{ color: "#0D0F12", background: ACCENT }}
        >
          Try it live &rarr;
        </a>
      </div>

      <ScrollReveal>
        <ZoomableImage
          src="/projects/pixelbrix/ui.png"
          alt="PixelBrix landing page with a brick-mosaic preview"
          accent={ACCENT}
        />
      </ScrollReveal>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16">
        <SectionLabel>// how it works</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <ScrollReveal key={s.n} delay={0.06 * (i + 1)}>
              <div
                className="h-full rounded-lg p-6"
                style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="font-[family-name:var(--font-share-tech-mono)] text-[12px] tracking-[1.5px] mb-3"
                  style={{ color: ACCENT }}
                >
                  {s.n}
                </div>
                <h3 className="font-[family-name:var(--font-chakra-petch)] font-bold text-[17px] text-white mb-2 leading-tight">
                  {s.title}
                </h3>
                <p className="text-[#9A9A9A] text-[13.5px] leading-[1.7]">{s.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── SEE IT ── */}
      <section className="mb-16">
        <SectionLabel>// photo in, mosaic out</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScrollReveal>
            <ZoomableImage src="/projects/pixelbrix/mclaren.jpg" alt="Original photo of a green McLaren supercar" accent={ACCENT} />
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <ZoomableImage src="/projects/pixelbrix/mclaren-mosaic.png" alt="The green McLaren rendered as a brick mosaic by PixelBrix" accent={ACCENT} />
          </ScrollReveal>
        </div>
      </section>

      {/* ── BUILD GUIDE ── */}
      <section className="mb-20">
        <ScrollReveal>
          <SectionLabel>// every color, counted</SectionLabel>
          <ZoomableImage
            src="/projects/pixelbrix/build-guide.png"
            alt="PixelBrix build guide: the McLaren mosaic beside a per-color brick breakdown with exact counts"
            accent={ACCENT}
          />
          <p className="text-[#666] text-[12px] mt-3 font-[family-name:var(--font-share-tech-mono)]">
            Every build comes with a full color breakdown: each brick color, its code, and exactly how
            many you need.
          </p>
        </ScrollReveal>
      </section>

      {/* ── STATS ── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {stats.map(([num, label], i) => (
          <ScrollReveal key={label} delay={0.05 * (i + 1)}>
            <div>
              <div
                className="font-[family-name:var(--font-chakra-petch)] font-bold tabular-nums leading-none mb-2"
                style={{ fontSize: "clamp(28px, 4vw, 40px)", color: ACCENT }}
              >
                {num}
              </div>
              <div className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] text-[#888]">
                {label}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* ── UNDER THE HOOD ── */}
      <section className="mb-8">
        <SectionLabel>// under the hood</SectionLabel>
        <div className="space-y-3 mb-8 max-w-[640px]">
          {underHood.map((u, i) => (
            <ScrollReveal key={i} delay={0.04 * (i + 1)}>
              <div className="flex gap-3">
                <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                <p className="text-[#9A9A9A] text-[14px] leading-[1.7]">{u}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {stack.map((s) => (
            <span
              key={s}
              className="font-[family-name:var(--font-share-tech-mono)] text-[11px] px-3 py-1.5 rounded"
              style={{ color: "#CCC", background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)" }}
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
