import { BentoTile } from "../BentoTile";
import { ScrollReveal } from "../ScrollReveal";
import { ACCENT, SectionLabel, PlaceholderFrame } from "./shared";

const ARC = [
  { num: "01", name: "The Mind", body: "a screen", role: "Perceives and decides who is open, and what to open on.", lit: true },
  { num: "02", name: "The Face", body: "a physical bust", role: "Reacts with a face: gaze, brow, and voice in persona.", lit: false },
  { num: "03", name: "The Bridge", body: "a simulator", role: "Expressive motion you can trust, sim to real.", lit: false },
  { num: "04", name: "The Body", body: "a robot", role: "Fully embodied, sharing the room with guests.", lit: false },
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
        Being noticed <span style={{ color: ACCENT }}>specifically</span> is what makes a character
        feel alive. Real perception, not generic friendliness.
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
          Walk up to most digital characters and they run a script. The bet behind this project is
          narrower, and I think truer: a character feels alive the moment it notices something
          specific about <span className="text-[#DDD]">you</span> (your red hat, the camera around
          your neck, a kid&apos;s toy lightsaber) and opens on that, in persona. Not friendliness
          aimed at everyone. Attention aimed at one person. That single shift, from broadcasting to{" "}
          <span style={{ color: ACCENT }}>noticing</span>, is the whole idea. It&apos;s built for the
          place that shift matters most: guests in a real space, a queue, an exhibit, a lobby, where
          a character that reacts to this person, right now, turns a wait into a moment.
        </p>
      </section>

      {/* Why Leonardo */}
      <section className="mb-14">
        <SectionLabel>// why Leonardo</SectionLabel>
        <p className="text-[#BBB] text-[15px] leading-[1.9] max-w-[680px]">
          The persona is Leonardo da Vinci on purpose. He was history&apos;s greatest{" "}
          <span className="text-[#DDD]">observer</span>, with notebooks full of how light falls, how
          the eye reads depth, how a face moves. So the character&apos;s superpower and his identity
          are the same thing: noticing the world, and the person in front of him. When Leonardo
          remarks on your blue scarf, it isn&apos;t a gimmick. It&apos;s who he is.
        </p>
      </section>

      {/* How it comes together: the convergence */}
      <section className="mb-6">
        <SectionLabel>// how it comes together</SectionLabel>
        <p className="text-[#BBB] text-[15px] leading-[1.9] max-w-[680px] mb-8">
          One character, built in four chapters. Each keeps the same beating heart{" "}
          (<span className="text-[#DDD]">perceive, decide, react believably</span>) and changes only
          the body it lives in: from a screen, to a physical face, through simulation, into a robot
          that shares the room with you. The engine is the product; Leonardo is the first host.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ARC.map((s, i) => (
            <ScrollReveal key={s.num} delay={0.05 * (i + 1)}>
              <div
                className="h-full rounded-lg p-4"
                style={{
                  background: s.lit ? `${ACCENT}0E` : "rgba(255,255,255,0.02)",
                  border: s.lit ? `0.5px solid ${ACCENT}40` : "0.5px solid rgba(255,255,255,0.06)",
                  opacity: s.lit ? 1 : 0.72,
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
              </div>
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
            perceive → decide → react believably
          </span>
        </div>
      </section>

      <BentoTile>
        <p className="text-[#BBB] text-[14px] leading-[1.8]">
          <span style={{ color: ACCENT }}>Chapter 01 is running today.</span> The perception and
          decision engine, the part that actually does the noticing, is built and live. Open{" "}
          <span className="text-[#DDD]">The Mind</span> to see it work.
        </p>
      </BentoTile>
    </div>
  );
}
