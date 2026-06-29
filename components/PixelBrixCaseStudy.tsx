import Link from "next/link";
import { BentoTile } from "./BentoTile";
import { TechTag } from "./TechTag";
import { ScrollReveal } from "./ScrollReveal";
import { ZoomableImage } from "./ZoomableImage";
import { Footer } from "./Footer";

const ACCENT = "#F5C344";
const LIVE_URL = "https://pixel-brix.vercel.app/";

const TAGS = ["Canvas API", "Color Science", "TypeScript (strict)", "React", "TDD"];

const MOSAIC = [
  "#F5C344", "#FCE08A", "#1A1D22", "#2A2D34", "#8A6D1F", "#E6E8EC",
  "#F5C344", "#1A1D22", "#FCE08A", "#6B5A2A", "#2A2D34", "#F5C344",
  "#C99A2E", "#1A1D22", "#FCE08A", "#3A3D44", "#F5C344", "#8A6D1F",
];
const TILE_COUNT = 48;

const built = [
  {
    title: "Perceptual color matching",
    body: "Every pixel converts to CIE LAB, then matches the nearest brick by Delta-E against a hand-tuned palette with pre-computed LAB values (about 50ms for a full 48×48 grid). I chose CIE76 over CIEDE2000 on purpose: roughly 3× faster, with a difference that's imperceptible at brick resolution.",
  },
  {
    title: "CLAHE contrast enhancement",
    body: "Contrast-Limited Adaptive Histogram Equalization for flat, dominant-color photos, with original-mean-luminance restoration so the mosaic never comes out darker than the photo you put in.",
  },
  {
    title: "Three art styles",
    body: "Classic (clean blocks), Comic (edge-detected outlines), and Pop (bold flat colors). Each is a distinct sampling algorithm, not a filter laid on top.",
  },
  {
    title: "Two build sizes",
    body: "48×48 (2,304 bricks) and 96×96 (9,216 bricks), with a crop selector to frame the shot before it renders.",
  },
  {
    title: "Build guide + tile animation",
    body: "A parts-list generator with per-color counts and totals, plus a GPU-composited CSS flip-tile animation that runs up to 2,304 simultaneous flips on the compositor thread, a measured decision over reaching for a JS animation library.",
  },
];

const engineering = [
  {
    title: "TypeScript, strict",
    body: "No any, no non-null assertions, a typed error hierarchy (PixelBrixError down to domain errors), and a Result pattern for predictable failures.",
  },
  {
    title: "Test-driven",
    body: "31 Vitest tests, with 100% coverage on the core color-matching and build-guide logic.",
  },
  {
    title: "Dependency injection",
    body: "Business logic depends on interfaces (like a StorageProvider), never directly on the AWS SDK, so the core stays unit-testable.",
  },
  {
    title: "Clean architecture",
    body: "Small single-responsibility modules and documented ADRs for the decisions that mattered.",
  },
];

const stack = ["Next.js", "React", "TypeScript", "Tailwind", "Canvas API", "Vitest", "Playwright"];

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

      <p className="text-[#AAA] text-[16px] leading-[1.8] max-w-[620px] mb-7">
        A browser app I built that turns any photo into a buildable brick mosaic. It maps every pixel
        to a real brick color and generates an exact, orderable parts list, with no server involved.
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

      {/* ── OVERVIEW ── */}
      <section className="py-16">
        <BentoTile>
          <SectionLabel>// what i built</SectionLabel>
          <p className="text-[#BBB] text-[15px] leading-[1.9]">
            I wanted a photo to become something you could actually build, not just a filtered image.
            So I wrote the whole pipeline myself: perceptual color matching, contrast handling, and a
            row-by-row parts list, all running client-side on the Canvas API. The hard part was never
            resizing the photo, it was{" "}
            <span style={{ color: ACCENT }}>color</span>, mapping every pixel onto a fixed set of real,
            purchasable brick colors.
          </p>
        </BentoTile>
      </section>

      {/* ── BEFORE / AFTER ── */}
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
            The output: every brick color, its code, and exactly how many you need. This McLaren is
            9,216 bricks on the 96×96 grid.
          </p>
        </ScrollReveal>
      </section>

      {/* ── THE WORK ── */}
      <section className="mb-16">
        <SectionLabel>// the pieces</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {built.map((b, i) => (
            <BentoTile key={b.title} delay={0.04 * (i + 1)} className="h-full">
              <h3 className="font-[family-name:var(--font-chakra-petch)] font-bold text-[16px] text-white mb-2 leading-tight">
                {b.title}
              </h3>
              <p className="text-[#9A9A9A] text-[13.5px] leading-[1.8]">{b.body}</p>
            </BentoTile>
          ))}
        </div>
      </section>

      {/* ── ENGINEERING ── */}
      <section className="mb-16">
        <SectionLabel>// how it's engineered</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {engineering.map((e, i) => (
            <BentoTile key={e.title} delay={0.05 * (i + 1)} className="h-full">
              <h3 className="font-[family-name:var(--font-chakra-petch)] font-bold text-[15px] text-white mb-2">
                {e.title}
              </h3>
              <p className="text-[#888] text-[13px] leading-[1.75]">{e.body}</p>
            </BentoTile>
          ))}
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="mb-8">
        <BentoTile>
          <SectionLabel>// tech stack</SectionLabel>
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
        </BentoTile>
      </section>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}
