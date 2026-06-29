import { BentoTile } from "../BentoTile";
import { ScrollReveal } from "../ScrollReveal";
import { ACCENT, SectionLabel, ImageFrame } from "./shared";

const capabilities = [
  {
    label: "// open-vocabulary",
    title: "It notices specific things, by name",
    body: "It isn't limited to a fixed list of objects. It recognizes the glasses, the tie, the scarf, a hat, even a toy lightsaber, and opens on the most distinctive one. That's the raw material of “it noticed me.”",
    img: "/projects/davinci/hero_openvocab.png",
    alt: "Da Vinci engaging a guest on a specific detail it recognized open-vocabulary",
  },
  {
    label: "// attention",
    title: "It knows when you're actually looking",
    body: "It reads each guest's gaze and head orientation, a graded, directional sense of “are you looking at me, or past me?”, so it engages people who are present with it, not just present.",
    img: "/projects/davinci/hero_gaze.png",
    alt: "Da Vinci reading a guest's gaze and head orientation",
  },
  {
    label: "// earning the glance",
    title: "If you're not looking, it earns your attention first",
    body: "The most human touch: when a guest is close but distracted, the character doesn't barge in. It throws a catchy, respectful, funny bid, “you there, with that blue scarf, yes, you! Your eyes are missing something marvelous,” and only fully engages once it's earned the glance.",
    img: "/projects/davinci/hero_bid.png",
    alt: "Da Vinci bidding for a distracted guest's attention",
  },
  {
    label: "// selection logic",
    title: "Two guests, one choice",
    body: "It engages the one facing it and passes the one turned away. Out of everyone in view, it commits to the single person most open to a moment, the way a skilled performer reads a room.",
    img: "/projects/davinci/hero_faces.png",
    alt: "Da Vinci choosing between two guests based on who is attending",
  },
  {
    label: "// commit",
    title: "When you're open, it commits",
    body: "Once a guest is facing it and in range, it stops weighing and opens with a line meant for that person: “Hello there, yes, you. Come closer.” The whole read exists to earn this one moment.",
    img: "/projects/davinci/hero_speaking.png",
    alt: "Da Vinci fully engaging a single guest who is facing it and in range",
  },
];

const analytics = [
  {
    img: "02_decision_funnel",
    cap: "The funnel: 426 person-detections narrow to the 212 frames it chose to engage.",
    alt: "Decision funnel from detections through the engagement heuristic to engagements",
  },
  {
    img: "03_score_components",
    cap: "Why the chosen target won, the weighted score split into attention, proximity, centrality, and hook.",
    alt: "Stacked area chart decomposing the engagement score over time",
  },
  {
    img: "01_engagement_timeline",
    cap: "Who it engaged, frame by frame, across the session.",
    alt: "Timeline of which person the agent engaged over time",
  },
  {
    img: "06_hooks_and_states",
    cap: "What it opened on, a specific color hook, plus the orientation states of everyone else.",
    alt: "The specific-detail hook used on the engaged target and per-person orientation states",
  },
  {
    img: "05_attention_heatmap",
    cap: "Where engaged guests actually stood, in image space.",
    alt: "Heatmap of where engaged targets were located in the frame",
  },
  {
    img: "08_population_over_time",
    cap: "Crowd size versus the agent's state: idle, bidding, or engaging.",
    alt: "People in view versus the agent's state over time",
  },
];

const specs = [
  ["Throughput", "~26 FPS, single consumer GPU"],
  ["Perception", "Real-time multi-person tracking"],
  ["Attention", "Graded, directional gaze sensing"],
  ["Recognition", "Open-vocabulary (editable list)"],
  ["Behaviors", "Engage / bid-for-attention / wait"],
  ["Trust", "Per-decision logging + dashboard"],
];

const stack = [
  ["Open-vocabulary detection", "YOLO-World", "Cheng et al., CVPR 2024"],
  ["Detection backbone", "Ultralytics YOLO11", "Jocher et al., 2024"],
  ["Multi-person tracking", "ByteTrack", "Zhang et al., ECCV 2022"],
  ["Gaze & head orientation", "L2CS-Net", "Abdelrahman et al., 2022"],
  ["Base object vocabulary", "MS-COCO", "Lin et al., ECCV 2014"],
];

export function ChapterMind() {
  return (
    <div>
      <SectionLabel>// chapter 01 · what&apos;s built today</SectionLabel>
      <p className="text-[#888] text-[14px] leading-[1.7] max-w-[620px] mb-12">
        The hard part of &ldquo;alive&rdquo; isn&apos;t the face, it&apos;s the judgment: out of
        everyone in view, who is open to a moment, and what do I say to{" "}
        <span className="text-[#CCC]">them</span>? That engine is built and runs today.
      </p>

      <div className="space-y-12 mb-16">
        {capabilities.map((cap, i) => (
          <ScrollReveal key={cap.title} delay={0.04 * (i + 1)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <ImageFrame src={cap.img} alt={cap.alt} />
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <p
                  className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[2px] mb-3"
                  style={{ color: ACCENT }}
                >
                  {cap.label}
                </p>
                <h3 className="font-[family-name:var(--font-chakra-petch)] font-bold text-[20px] text-white mb-3 leading-tight">
                  {cap.title}
                </h3>
                <p className="text-[#999] text-[14px] leading-[1.8]">{cap.body}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* every decision on the record */}
      <section className="mb-16">
        <SectionLabel>// every decision on the record</SectionLabel>
        <p className="text-[#999] text-[14px] leading-[1.8] max-w-[620px] mb-8">
          A character staged for guests has to be trustworthy and tunable, so the system logs and
          visualizes every choice it makes: who it engaged, for how long, and exactly which factors
          drove each decision. Nothing is a black box.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {analytics.map((a, i) => (
            <ScrollReveal key={a.img} delay={0.04 * (i + 1)}>
              <ImageFrame src={`/projects/davinci/${a.img}.png`} alt={a.alt} />
              <p className="text-[#666] text-[11.5px] mt-2.5 font-[family-name:var(--font-share-tech-mono)] leading-[1.6]">
                {a.cap}
              </p>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <div
            className="rounded-lg overflow-hidden"
            style={{ border: `0.5px solid ${ACCENT}22`, background: "#000" }}
          >
            <video
              className="w-full h-auto block"
              src="/projects/davinci/explainability.mp4"
              poster="/projects/davinci/explainability_poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          </div>
          <p className="text-[#555] text-[12px] mt-3 font-[family-name:var(--font-share-tech-mono)]">
            Live capture: boxes, the chosen target, and the &ldquo;why&rdquo; panel updating in real time.
          </p>
        </ScrollReveal>
      </section>

      {/* how it works */}
      <section className="mb-16">
        <BentoTile>
          <SectionLabel>// how it works</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { k: "perceive", v: "Who & where. Are they looking? What's distinctive about them?" },
              { k: "decide", v: "The host judgment: who is open to a moment, and what to open on. Engage, get attention, or wait." },
              { k: "react", v: "Open on their specific detail, in character, or earn the glance first." },
            ].map((s, i) => (
              <div key={s.k} className="relative">
                <p
                  className="font-[family-name:var(--font-share-tech-mono)] text-[11px] uppercase tracking-[1.5px] mb-2"
                  style={{ color: ACCENT }}
                >
                  {i + 1} · {s.k}
                </p>
                <p className="text-[#999] text-[13px] leading-[1.7]">{s.v}</p>
              </div>
            ))}
          </div>
          <p className="text-[#555] text-[12px] mt-6 font-[family-name:var(--font-share-tech-mono)]">
            Every step is explainable, end to end.
          </p>
        </BentoTile>
      </section>

      {/* specs */}
      <section className="mb-16">
        <SectionLabel>// specs</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
          {specs.map(([k, v], i) => (
            <ScrollReveal key={k} delay={0.04 * (i + 1)}>
              <div
                className="flex items-baseline justify-between gap-4 pb-3"
                style={{ borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}
              >
                <span className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] text-[#555]">
                  {k}
                </span>
                <span className="text-[#CCC] text-[13px] text-right">{v}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* models & datasets */}
      <section className="mb-4">
        <SectionLabel>// models &amp; datasets</SectionLabel>
        <p className="text-[#888] text-[14px] leading-[1.7] max-w-[620px] mb-8">
          The perception layer stands on open, peer-reviewed methods, composed into a single
          real-time pipeline. The object vocabulary is open and editable, so what the character can
          comment on isn&apos;t locked to a fixed list.
        </p>
        <div className="space-y-3">
          {stack.map(([cap, model, src], i) => (
            <ScrollReveal key={cap} delay={0.04 * (i + 1)}>
              <div
                className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-6 gap-y-1 items-baseline py-3"
                style={{ borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] text-[#555] min-w-[180px]">
                    {cap}
                  </span>
                  <span
                    className="font-[family-name:var(--font-chakra-petch)] font-bold text-[15px]"
                    style={{ color: ACCENT }}
                  >
                    {model}
                  </span>
                </div>
                <span className="text-[#666] text-[12px] sm:text-right">{src}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
