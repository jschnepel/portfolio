import { BentoTile } from "../BentoTile";
import { ScrollReveal } from "../ScrollReveal";
import { AwardQuote } from "../AwardQuote";
import { ACCENT, SectionLabel, ImageFrame } from "./shared";

const capabilities = [
  {
    label: "// presence",
    title: "It reads who is genuinely present",
    body: "Graded, directional gaze and head orientation tell it who is oriented toward it and lingering, versus who is only passing through. Each person is tracked with a stable ID across a small group.",
  },
  {
    label: "// restraint",
    title: "It engages with restraint — or waits",
    body: "It commits to at most one person, and only when two independent signals are both there: a genuine relevance signal, and a social-license signal (they have come close, they have lingered). If either is missing, the honest output is to wait.",
  },
  {
    label: "// grounded voice",
    title: "What it says is grounded in the real Leonardo",
    body: "When it does engage, it speaks authored, fact-checked lines drawn from Leonardo's own notebooks and the historical record — always about the shared craft, and never a word about a person's appearance, face, or gaze.",
  },
  {
    label: "// on the record",
    title: "Every decision — including every restraint — is auditable",
    body: "Every choice, including every deliberate choice to hold back, is re-derivable from the log. You can reconstruct who it engaged, who it passed over, and why. “Why not her?” has an answer.",
  },
];

const liveShots = [
  {
    img: "live_idle.jpg",
    cap: "Idle — nobody genuinely present, so it waits and keeps scanning. ~33 FPS on a single GPU.",
    alt: "The system running with an empty space in view, waiting with no one to approach",
  },
  {
    img: "live_engage_one.jpg",
    cap: "Commits to one person once attention, proximity, and dwell all clear the bar, and opens with a grounded line. Face de-identified.",
    alt: "The system engaging a single person, that person's face de-identified",
  },
  {
    img: "live_restraint_group.jpg",
    cap: "Restraint in a group: it engages one and logs the other as deliberately passed over. Faces de-identified.",
    alt: "The system engaging one person in a small group and passing over another, faces de-identified",
  },
];

const analytics = [
  {
    img: "02_decision_funnel",
    cap: "The funnel: every person-detection narrows to the few frames it chose to engage. Most people, it lets pass.",
    alt: "Decision funnel from detections through the restraint policy to engagements",
  },
  {
    img: "03_score_components",
    cap: "Why the chosen person won: the weighted score split into attention, proximity, dwell, and relevance.",
    alt: "Stacked area chart decomposing the engagement score over time",
  },
  {
    img: "04_person_score_traces",
    cap: "Each person's openness score over time — it commits only when one crosses the bar with social license.",
    alt: "Per-person engagement score traces over the session",
  },
  {
    img: "01_engagement_timeline",
    cap: "Who it engaged, frame by frame — and the long stretches where the honest call was to wait.",
    alt: "Timeline of which person the agent engaged over time",
  },
  {
    img: "05_attention_heatmap",
    cap: "Where engaged people actually stood, in image space.",
    alt: "Heatmap of where engaged targets were located in the frame",
  },
  {
    img: "08_population_over_time",
    cap: "Crowd size versus the character's state: waiting, or engaging a single person.",
    alt: "People in view versus the agent's state over time",
  },
];

const specs = [
  ["Throughput", "~26 FPS, single consumer GPU"],
  ["Perception", "Real-time multi-person tracking"],
  ["Attention", "Graded, directional gaze sensing"],
  ["Decision", "Restraint: engage one, or wait"],
  ["Grounding", "Authored, source-cited persona"],
  ["Audit", "Every decision re-derivable from log"],
];

const stack = [
  ["Detection backbone", "Ultralytics YOLO11", "Jocher et al., 2024"],
  ["Open-vocabulary detection", "YOLO-World", "Cheng et al., CVPR 2024"],
  ["Multi-person tracking", "ByteTrack", "Zhang et al., ECCV 2022"],
  ["Gaze & head orientation", "L2CS-Net", "Abdelrahman et al., 2022"],
  ["Base object vocabulary", "MS-COCO", "Lin et al., ECCV 2014"],
];

const rigor = [
  {
    label: "// model a · a DNN that reads expression",
    title: "Trained honestly, and checked before it was trusted",
    body: "A facial-expression deep neural network (EfficientNet-B0, transfer-learned on FER2013): ~0.63 accuracy and 0.59 macro-F1, near the ~65% human ceiling for this data, reported across five seeds with calibration checked (ECE ≈ 0.04). Before trusting a single number, I pixel-hashed the images and removed near-duplicates that straddled the train/test split — the quiet leak that inflates results if you don't look.",
  },
  {
    label: "// model b · a GMM-HMM, and an honest negative",
    title: "It failed — so I proved why, instead of burying it",
    body: "Chaining expression into a temporal GMM-HMM to read engagement did not beat the floor. Rather than drop the result, I diagnosed it: a probe and a frame-shuffle control localized the failure to the features, not the idea. Swapping in head-pose and action-unit features cleared the floor, modestly but measurably — matching what the published literature finds.",
  },
  {
    label: "// the headline question",
    title: "Is the explanation actually faithful?",
    body: "The centerpiece isn't accuracy, it's honesty. Every decision is auditable by construction: an independent re-implementation replays the log and reproduces each call frame-for-frame. A forward-simulatability test then asks whether the shown reason predicts the choice — a result I left honestly inconclusive on current footage, with a synthetic control proving the test itself works.",
  },
];

const rigorFigs = [
  {
    img: "confusion_matrix",
    cap: "Model A on held-out FER2013: where the expression classes hold, and where they blur.",
    alt: "Confusion matrix for the facial-expression classifier",
  },
  {
    img: "reliability_diagram",
    cap: "Calibration: a confident prediction actually means something (ECE ≈ 0.04).",
    alt: "Reliability diagram showing the classifier's calibration",
  },
  {
    img: "probe",
    cap: "The probe: can any classifier beat the floor from expression alone? It could not.",
    alt: "Probe test for predicting engagement from expression probabilities",
  },
  {
    img: "feature_ab",
    cap: "Swap in head-pose and action-unit features and the engagement model finally clears the floor.",
    alt: "Feature A/B comparison for the engagement model",
  },
  {
    img: "simulatability",
    cap: "Forward-simulatability on real footage: underpowered and honest, not rounded up into a win.",
    alt: "Forward-simulatability result on real footage",
  },
  {
    img: "synth_simulatability",
    cap: "A synthetic control confirms the faithfulness test itself behaves — positive when it should be, null when it should be.",
    alt: "Synthetic control validating the simulatability test",
  },
];

export function ChapterMind() {
  return (
    <div>
      <SectionLabel>// chapter 01 · built and running today</SectionLabel>
      <p className="text-[#888] text-[14px] leading-[1.7] max-w-[620px] mb-12">
        The hard part of &ldquo;alive&rdquo; isn&apos;t the face, it&apos;s the judgment, and the
        restraint. Out of everyone in view, who is genuinely open to a moment, is <span className="text-[#CCC]">now</span>{" "}
        the right time, or is the honest answer to wait? That engine is built and runs today, in real
        time on a single consumer GPU.
      </p>

      {/* what it actually does — restraint, in the character's own terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        {capabilities.map((cap, i) => (
          <BentoTile key={cap.title} delay={0.05 * (i + 1)}>
            <p
              className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[2px] mb-3"
              style={{ color: ACCENT }}
            >
              {cap.label}
            </p>
            <h3 className="font-[family-name:var(--font-chakra-petch)] font-bold text-[18px] text-white mb-3 leading-tight">
              {cap.title}
            </h3>
            <p className="text-[#999] text-[13.5px] leading-[1.8]">{cap.body}</p>
          </BentoTile>
        ))}
      </div>

      {/* the system, running — de-identified live frames */}
      <section className="mb-16">
        <SectionLabel>// the system, running</SectionLabel>
        <p className="text-[#999] text-[14px] leading-[1.8] max-w-[620px] mb-8">
          The live pipeline, annotated in real time: who it detects, who it commits to, who it
          deliberately passes over, and the line it opens with. Faces are de-identified and the
          expression read is removed — the benchmark footage was never consented for publication, so
          only the system&apos;s own reasoning is shown.
        </p>
        <div className="space-y-6">
          {liveShots.map((s, i) => (
            <ScrollReveal key={s.img} delay={0.05 * (i + 1)}>
              <ImageFrame src={`/projects/davinci/${s.img}`} alt={s.alt} />
              <p className="text-[#666] text-[11.5px] mt-2.5 font-[family-name:var(--font-share-tech-mono)] leading-[1.6]">
                {s.cap}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* measured against the greedy baseline */}
      <section className="mb-16">
        <SectionLabel>// measured against the greedy baseline</SectionLabel>
        <p className="text-[#999] text-[14px] leading-[1.8] max-w-[620px] mb-8">
          Restraint only means something if you can show what the greedy version would have done
          instead. So the system is built to be measured against an indiscriminate baseline that
          engages the nearest person every chance it gets, the &ldquo;salesman.&rdquo; The baseline
          and the selectivity metrics are implemented; the headline measured run awaits consented or
          synthetic footage.
        </p>
        <ScrollReveal>
          <ImageFrame
            src="/projects/davinci/baseline_comparison.png"
            alt="The restraint policy compared against an indiscriminate greet-the-nearest-person baseline"
          />
          <p className="text-[#666] text-[11.5px] mt-2.5 font-[family-name:var(--font-share-tech-mono)] leading-[1.6]">
            Restraint vs. the greedy baseline: the character holds back where the &ldquo;greet
            everyone&rdquo; version would have barged in.
          </p>
        </ScrollReveal>
      </section>

      {/* every decision on the record */}
      <section className="mb-16">
        <SectionLabel>// every decision on the record</SectionLabel>
        <p className="text-[#999] text-[14px] leading-[1.8] max-w-[620px] mb-8">
          A character staged for guests has to be trustworthy and tunable, so the system logs and
          visualizes every choice it makes: who it engaged, who it deliberately passed over, for how
          long, and exactly which signals drove each decision. Nothing is a black box.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {analytics.map((a, i) => (
            <ScrollReveal key={a.img} delay={0.04 * (i + 1)}>
              <ImageFrame src={`/projects/davinci/${a.img}.png`} alt={a.alt} />
              <p className="text-[#666] text-[11.5px] mt-2.5 font-[family-name:var(--font-share-tech-mono)] leading-[1.6]">
                {a.cap}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* how it works */}
      <section className="mb-16">
        <BentoTile>
          <SectionLabel>// how it works</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { k: "perceive", v: "Who & where. Are they oriented toward it? Have they come close and lingered?" },
              { k: "decide with restraint", v: "Is there a genuine signal, and is engagement licensed right now? Commit to one person — or wait." },
              { k: "react", v: "Open with a fact-checked line about the shared craft, in character. The reason it engaged stays in the log." },
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
            Every step is explainable, end to end — including every choice to hold back.
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
          real-time pipeline. Object naming, commenting on a specific held item, is the weakest
          channel and is currently gated off until higher-resolution detection can meet the
          project&apos;s faithfulness bar.
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

      {/* the modeling rigor the award recognized */}
      <section className="mb-16">
        <SectionLabel>// the modeling rigor beneath it</SectionLabel>
        <p className="text-[#888] text-[14px] leading-[1.7] max-w-[620px] mb-8">
          The live engine above is deliberately simple and auditable. The depth sits one layer down,
          in how the underlying models were built and stress-tested: two models, a hard question about
          whether the character&apos;s explanations are actually true, and an adversarial review whose
          job was to break all of it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {rigor.map((r, i) => (
            <BentoTile key={r.title} delay={0.05 * (i + 1)}>
              <p
                className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] mb-3"
                style={{ color: ACCENT }}
              >
                {r.label}
              </p>
              <h3 className="font-[family-name:var(--font-chakra-petch)] font-bold text-[16px] text-white mb-3 leading-tight">
                {r.title}
              </h3>
              <p className="text-[#999] text-[13px] leading-[1.75]">{r.body}</p>
            </BentoTile>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {rigorFigs.map((f, i) => (
            <ScrollReveal key={f.img} delay={0.04 * (i + 1)}>
              <ImageFrame src={`/projects/davinci/${f.img}.png`} alt={f.alt} />
              <p className="text-[#666] text-[11.5px] mt-2.5 font-[family-name:var(--font-share-tech-mono)] leading-[1.6]">
                {f.cap}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <div
          className="rounded-lg p-5"
          style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] mb-2"
            style={{ color: ACCENT }}
          >
            // a note on restraint
          </p>
          <p className="text-[#999] text-[13px] leading-[1.8]">
            The expression model is gated behind an explicit consent flag and off by default. An
            adversarial ethics review caught it running on non-consenting pedestrians in the benchmark
            footage, so it was disabled — the honest cost was a weaker comparison, and the right trade.
            The deployed character decides on gaze, proximity, and dwell, never emotion recognition on
            people who did not consent.
          </p>
        </div>
      </section>

      {/* recognition — the award for the model implementations + documentation */}
      <section className="mb-4">
        <SectionLabel>// recognition</SectionLabel>
        <p className="text-[#888] text-[14px] leading-[1.7] max-w-[620px] mb-8">
          This modeling work — the deep neural network and the GMM-HMM, their documentation, and their
          optimizations — earned an Academic Award of Excellence in a formal evaluation of the
          submission.
        </p>
        <ScrollReveal>
          <AwardQuote />
        </ScrollReveal>
      </section>
    </div>
  );
}
