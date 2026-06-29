import Link from "next/link";
import { BentoTile } from "./BentoTile";
import { TechTag } from "./TechTag";
import { ScrollReveal } from "./ScrollReveal";
import { Footer } from "./Footer";

const ACCENT = "#F5C344";
const LIVE_URL = "https://pixel-brix.vercel.app/";

const TAGS = ["Canvas API", "Color Science", "TypeScript (strict)", "React", "TDD"];

const built = [
  {
    title: "Perceptual color matching",
    body: "RGB to CIE LAB conversion, then nearest brick via Delta-E CIE76 against a hand-tuned palette with pre-computed LAB values (about 50ms for a full 48×48 grid). I chose CIE76 over CIEDE2000 on purpose: roughly 3× faster, with a difference that's imperceptible at brick resolution.",
  },
  {
    title: "CLAHE contrast enhancement",
    body: "Contrast-Limited Adaptive Histogram Equalization for dominant-color images, with original-mean-luminance restoration so the result never comes out darker than the photo you put in.",
  },
  {
    title: "Three art styles",
    body: "Classic (clean blocks), Comic (edge-detected outlines), and Pop (bold flat colors). Each one is a distinct sampling algorithm, not a filter on top.",
  },
  {
    title: "Two build sizes",
    body: "48×48 (15\" x 15\", 2,304 bricks) and 96×96 (30\" x 30\", 9,216 bricks), with a crop selector to frame the shot before it renders.",
  },
  {
    title: "Build guide + 2,304-tile animation",
    body: "A build-guide generator with per-color counts and totals, plus a GPU-composited CSS flip-tile animation on the hero that runs up to 2,304 simultaneous tile flips on the compositor thread. Deliberately not a JS animation library: it was a measured architectural decision.",
  },
];

const engineering = [
  {
    title: "TypeScript, strict",
    body: "No any, no non-null assertions, a typed error hierarchy (PixelBrixError down to domain errors), and a Result pattern for predictable failures.",
  },
  {
    title: "Test-driven",
    body: "31 passing Vitest tests, with 100% coverage targets on the core-logic modules (color matching and build guide).",
  },
  {
    title: "Dependency injection",
    body: "Business logic depends on interfaces (like a StorageProvider), never directly on the AWS SDK, so the core stays unit-testable.",
  },
  {
    title: "Clean architecture",
    body: "Single-responsibility modules, barrel exports, and documented ADRs for the decisions that mattered (color matching, client-side preview).",
  },
];

const specs = [
  ["Color match", "~50ms, full 48×48 grid"],
  ["Algorithm", "Delta-E CIE76 in CIE LAB"],
  ["Build sizes", "2,304 / 9,216 bricks"],
  ["Animation", "2,304 tile flips at 60fps"],
  ["Tests", "31 Vitest, 100% core coverage"],
  ["Runtime", "100% client-side, no server"],
];

const stack = [
  "Next.js 16 (App Router)",
  "React 19",
  "TypeScript (strict)",
  "Tailwind v4",
  "Canvas API",
  "Vitest + Testing Library",
  "Playwright",
];

function ImageFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        border: `0.5px solid ${ACCENT}22`,
        boxShadow: `0 0 0 0.5px rgba(255,255,255,0.03), 0 18px 50px -20px rgba(0,0,0,0.7)`,
        background: "rgba(255,255,255,0.02)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-auto block" />
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
        Platform
      </p>
      <h1 className="page-title mb-3">PixelBrix</h1>
      <p className="text-[#AAA] text-[15px] leading-[1.8] max-w-[640px] mb-6">
        Turn any photo into a brick-mosaic build guide, entirely in the browser. Upload an image,
        pick an art style, and get a buildable grid with real brick-compatible color codes and exact
        per-color brick counts.
      </p>

      <div className="flex items-center gap-2.5 flex-wrap mb-5">
        {["Shipped", "Live in browser", "Zero server"].map((b) => (
          <span
            key={b}
            className="font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[1px] px-2.5 py-1 rounded"
            style={{ color: ACCENT, background: `${ACCENT}0C`, border: `0.5px solid ${ACCENT}20` }}
          >
            {b}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4 mb-10">
        <div className="flex flex-wrap">
          {TAGS.map((t) => (
            <TechTag key={t} label={t} color={ACCENT} active />
          ))}
        </div>
        <a
          href={LIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] px-4 py-2 rounded transition-colors duration-300"
          style={{ color: ACCENT, border: `0.5px solid ${ACCENT}40` }}
        >
          Try it live &rarr;
        </a>
      </div>

      <ScrollReveal>
        <ImageFrame
          src="/projects/pixelbrix/ui.png"
          alt="PixelBrix landing page with a brick-mosaic preview"
        />
      </ScrollReveal>

      {/* ── PROBLEM ── */}
      <section className="py-16">
        <BentoTile>
          <SectionLabel>// the problem</SectionLabel>
          <p className="text-[#BBB] text-[15px] leading-[1.9]">
            Brick mosaic art normally means mapping every pixel to a purchasable brick color by hand,
            then counting parts one by one. PixelBrix automates the whole pipeline: perceptual color
            matching, contrast enhancement, and a row-by-row parts list, so anyone can go from a photo
            to <span style={{ color: ACCENT }}>&ldquo;here&apos;s exactly what to order.&rdquo;</span>
          </p>
        </BentoTile>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section className="mb-16">
        <SectionLabel>// from a photo to a parts list</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScrollReveal>
            <ImageFrame src="/projects/pixelbrix/mclaren.jpg" alt="Original photo of a green McLaren supercar" />
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <ImageFrame src="/projects/pixelbrix/mclaren-mosaic.png" alt="The green McLaren rendered as a brick mosaic by PixelBrix" />
          </ScrollReveal>
        </div>
        <p className="text-[#666] text-[12px] mt-3 font-[family-name:var(--font-share-tech-mono)]">
          A real photo in (left), a buildable brick mosaic out (right). Every tile maps to the
          nearest available brick color, with per-color counts generated alongside it.
        </p>
      </section>

      {/* ── BUILD GUIDE ── */}
      <section className="mb-16">
        <ScrollReveal>
          <SectionLabel>// every color, counted</SectionLabel>
          <ImageFrame
            src="/projects/pixelbrix/build-guide.png"
            alt="PixelBrix build guide: the McLaren mosaic beside a per-color brick breakdown with exact counts"
          />
          <p className="text-[#666] text-[12px] mt-3 font-[family-name:var(--font-share-tech-mono)]">
            Each build ships with a full color breakdown: every brick color, its code, and the exact
            count you need. This McLaren is 9,216 bricks across the 96×96 grid.
          </p>
        </ScrollReveal>
      </section>

      {/* ── WHAT'S BUILT ── */}
      <section className="mb-16">
        <SectionLabel>// what&apos;s built</SectionLabel>
        <p className="text-[#888] text-[14px] leading-[1.7] max-w-[640px] mb-10">
          A complete client-side image-processing pipeline running on the Canvas API. No server
          round-trip, no waiting, instant results.
        </p>
        <div className="space-y-4">
          {built.map((b, i) => (
            <BentoTile key={b.title} delay={0.04 * (i + 1)}>
              <h3 className="font-[family-name:var(--font-chakra-petch)] font-bold text-[16px] text-white mb-2 leading-tight">
                {b.title}
              </h3>
              <p className="text-[#9A9A9A] text-[13.5px] leading-[1.8]">{b.body}</p>
            </BentoTile>
          ))}
        </div>
      </section>

      {/* ── SPECS ── */}
      <section className="mb-16">
        <SectionLabel>// specs</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
          {specs.map(([k, v], i) => (
            <ScrollReveal key={k} delay={0.04 * (i + 1)}>
              <div
                className="flex items-baseline justify-between gap-4 pb-3"
                style={{ borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}
              >
                <span className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] text-[#666]">
                  {k}
                </span>
                <span className="text-[#CCC] text-[13px] text-right">{v}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── FULL APP ── */}
      <section className="mb-16">
        <ScrollReveal>
          <SectionLabel>// the full build view</SectionLabel>
          <ImageFrame
            src="/projects/pixelbrix/app.png"
            alt="The complete PixelBrix interface: source photo, live mosaic, and color breakdown"
          />
          <p className="text-[#666] text-[12px] mt-3 font-[family-name:var(--font-share-tech-mono)]">
            The whole tool in one view: your source photo, the live mosaic, and the running parts
            list, all computed in the browser.
          </p>
        </ScrollReveal>
      </section>

      {/* ── ENGINEERING ── */}
      <section className="mb-16">
        <SectionLabel>// engineering</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {engineering.map((e, i) => (
            <BentoTile key={e.title} delay={0.05 * (i + 1)}>
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
