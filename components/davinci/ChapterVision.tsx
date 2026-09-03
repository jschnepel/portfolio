import Link from "next/link";
import { BentoTile } from "../BentoTile";
import { ScrollReveal } from "../ScrollReveal";
import { ACCENT, SectionLabel, PlaceholderFrame } from "./shared";
import { chapterHref } from "./chapters";

const ARC = [
  { id: "mind", num: "01", name: "The Mind", body: "a screen", role: "Perceives, then decides with restraint who to engage — or when to wait.", lit: true },
  { id: "face", num: "02", name: "The Face", body: "a rendered head", role: "Reacts with a face: gaze, brow, and mouth, driven by the same logged decision.", lit: true },
  { id: "bridge", num: "03", name: "The Bridge", body: "a simulator", role: "Expressive motion you can trust, sim to real.", lit: false },
  { id: "body", num: "04", name: "The Body", body: "a robot", role: "Fully embodied, sharing the room with guests.", lit: false },
];

export function ChapterVision() {
  return (
    <div>
      <SectionLabel>// chapter 00 · the idea</SectionLabel>

      <div className="flex items-center gap-4 flex-wrap mb-6">
        <h2
          className="font-[family-name:var(--font-chakra-petch)] font-bold text-white"
          style={{ fontSize: "clamp(26px, 3.5vw, 34px)", letterSpacing: "-0.5px" }}
        >
          The Vision
        </h2>
        <span
          className="font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[1.5px] px-2.5 py-1 rounded"
          style={{ color: ACCENT, background: `${ACCENT}14`, border: `0.5px solid ${ACCENT}33` }}
        >
          The throughline
        </span>
      </div>

      {/* Thesis: the bet behind the whole project */}
      <blockquote
        className="font-[family-name:var(--font-chakra-petch)] font-bold text-white leading-[1.35] max-w-[760px] mb-12 pl-5"
        style={{ fontSize: "clamp(20px, 2.6vw, 27px)", borderLeft: `2px solid ${ACCENT}` }}
      >
        Engagement feels alive when it is <span style={{ color: ACCENT }}>earned and
        intentional</span>, not constant. A character that notices, engages with restraint, and can
        prove why, reads as present — not as a greeter.
      </blockquote>

      {/* Concept anchor */}
      <ScrollReveal>
        <PlaceholderFrame label="concept: the four bodies, one character" ratio="21 / 9" note="concept art" />
        <p className="text-[#555] text-[12px] mt-3 font-[family-name:var(--font-share-tech-mono)]">
          One character, four bodies: screen → face → simulation → robot.
        </p>
      </ScrollReveal>

      {/* Where the idea starts */}
      <section className="mt-16 mb-14">
        <SectionLabel>// where the idea starts</SectionLabel>
        <p className="text-[#BBB] text-[15px] leading-[1.9] max-w-[680px]">
          Walk up to most digital characters and they run a script. The naive &ldquo;reactive&rdquo;
          version is worse in a real space: it greets whoever is nearest, which is a nuisance. The bet
          behind this project is narrower, and I think truer: a character feels alive when it does the
          harder, more human thing, it <span className="text-[#DDD]">chooses</span> — reading who is
          genuinely present with it, engaging the one person for whom it is actually the right moment,
          and, just as often, choosing to <span style={{ color: ACCENT }}>wait</span>. That single
          shift, from broadcasting to earned, intentional engagement, is the whole idea. It&apos;s
          built for the place it matters most: guests in a real space, a queue, an exhibit, a lobby,
          where engaging the right person and leaving everyone else in peace is the difference between
          presence and a nuisance.
        </p>
      </section>

      {/* Why Leonardo */}
      <section className="mb-14">
        <SectionLabel>// why Leonardo</SectionLabel>
        <p className="text-[#BBB] text-[15px] leading-[1.9] max-w-[680px]">
          The persona is Leonardo da Vinci on purpose. He was history&apos;s greatest{" "}
          <span className="text-[#DDD]">observer</span>, with notebooks full of how light falls, how
          the eye reads depth, how a face moves. So the character&apos;s superpower and his identity
          are the same thing: noticing, and having the restraint to know when not to. What he says is
          drawn from his own notebooks and the historical record, and it is always about the shared
          craft, how a painted gaze seems to follow you across a room, why he left so much unfinished,
          never a remark about the person in front of him.
        </p>
      </section>

      {/* How it comes together: the convergence */}
      <section className="mb-6">
        <SectionLabel>// how it comes together</SectionLabel>
        <p className="text-[#BBB] text-[15px] leading-[1.9] max-w-[680px] mb-8">
          One character, built in four chapters. Each keeps the same beating heart{" "}
          (<span className="text-[#DDD]">perceive, decide with restraint, react believably</span>) and changes only
          the body it lives in: from a screen, to a physical face, through simulation, into a robot
          that shares the room with you. The engine is the product; Leonardo is the first host.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ARC.map((s, i) => (
            <ScrollReveal key={s.num} delay={0.05 * (i + 1)}>
              <Link
                href={chapterHref(s.id)}
                scroll={false}
                aria-label={`Open chapter ${s.num}, ${s.name}`}
                className="group block h-full w-full text-left no-underline rounded-lg p-4 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  background: s.lit ? `${ACCENT}0E` : "rgba(255,255,255,0.02)",
                  border: s.lit ? `0.5px solid ${ACCENT}40` : "0.5px solid rgba(255,255,255,0.06)",
                  opacity: s.lit ? 1 : 0.72,
                  // @ts-expect-error -- CSS custom property for the focus ring colour
                  "--tw-ring-color": `${ACCENT}88`,
                  "--tw-ring-offset-color": "#0D0F12",
                }}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span
                    className="font-[family-name:var(--font-share-tech-mono)] text-[11px] tracking-[1.5px]"
                    style={{ color: s.lit ? ACCENT : "#6B6E76" }}
                  >
                    {s.num}
                  </span>
                  <span className="font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[1px] text-[#5A5D65]">
                    {s.body}
                  </span>
                </div>
                <h4 className="font-[family-name:var(--font-chakra-petch)] font-bold text-[15px] text-white mb-1.5 leading-tight">
                  {s.name}
                </h4>
                <p className="text-[#888] text-[12.5px] leading-[1.6]">{s.role}</p>
                <span
                  className="inline-flex items-center gap-1.5 mt-3 font-[family-name:var(--font-share-tech-mono)] text-[10px] tracking-[1px] transition-colors duration-200"
                  style={{ color: `${ACCENT}99` }}
                >
                  {s.lit ? "Read chapter" : "See the plan"}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div
          className="mt-3 rounded-lg px-4 py-3 flex items-center justify-center gap-3 flex-wrap text-center"
          style={{ background: `${ACCENT}08`, border: `0.5px solid ${ACCENT}1F` }}
        >
          <span
            className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px]"
            style={{ color: ACCENT }}
          >
            The same heart, end to end
          </span>
          <span className="text-[#666]" aria-hidden="true">
            ·
          </span>
          <span className="font-[family-name:var(--font-share-tech-mono)] text-[11px] tracking-[1px] text-[#999]">
            perceive → decide with restraint → react believably
          </span>
        </div>
      </section>

      <BentoTile>
        <p className="text-[#BBB] text-[14px] leading-[1.8]">
          <span style={{ color: ACCENT }}>Two chapters have work in them today.</span> The
          perception and restraint engine, the part that actually does the judging, is live and
          auditable in <span className="text-[#DDD]">The Mind</span> — and the face it drives is
          rendering now in <span className="text-[#DDD]">The Face</span>.
        </p>
      </BentoTile>
    </div>
  );
}
