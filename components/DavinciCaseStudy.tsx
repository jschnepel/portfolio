"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BentoTile } from "./BentoTile";
import { TechTag } from "./TechTag";
import { ScrollReveal } from "./ScrollReveal";
import { AwardQuote } from "./AwardQuote";
import { Footer } from "./Footer";
import { ACCENT, SectionLabel, ImageFrame } from "./davinci/shared";
import { CHAPTERS, TEASERS } from "./davinci/chapters";
import { ChapterNav } from "./davinci/ChapterNav";
import { ChapterVision } from "./davinci/ChapterVision";
import { ChapterMind } from "./davinci/ChapterMind";
import { ChapterTeaser } from "./davinci/ChapterTeaser";

const TAGS = [
  "Computer Vision",
  "Gaze Estimation",
  "Multi-Person Tracking",
  "Restraint Policy",
  "Explainable AI",
  "Real-Time",
];

const advisors = [
  {
    name: "Markus Gross",
    where: "ETH Zürich / Disney Research",
    body: "Interactive digital characters and the technology that makes them feel present, including projection into physical space.",
  },
  {
    name: "Joseph Campbell",
    where: "Purdue, CAMP Lab",
    body: "Theory of mind, anticipating human intent, and interpretable interaction, the backbone of the “explain every decision” principle.",
  },
  {
    name: "Heni Ben Amor",
    where: "Arizona State, Interactive Robotics Lab",
    body: "Reactive control and robot learning: characters and robots that respond to people in the moment, the engine behind the robotic phase.",
  },
  {
    name: "Stelian Coros",
    where: "ETH Zürich, Computational Robotics Lab",
    body: "Physics-based, expressive character and robot motion, how a believable performance transfers to a body that obeys physics.",
  },
];

const refsGrounding = [
  "Wampfler, R., et al. (2025). A Platform for Interactive AI Character Experiences (Digital Einstein). SIGGRAPH Conf. Papers '25.",
  "Campbell, J. & Ben Amor, H. (2017). Bayesian Interaction Primitives: A SLAM Approach to Human-Robot Interaction. CoRL, PMLR 78.",
  "Campbell, J., Stepputtis, S. & Ben Amor, H. (2019). Probabilistic Multimodal Modeling for Human-Robot Interaction Tasks. RSS. arXiv:1908.04955.",
  "Oguntola, I., Campbell, J., Stepputtis, S. & Sycara, K. (2023). Theory of Mind as Intrinsic Motivation for Multi-Agent RL. ICML Workshop. arXiv:2307.01158.",
  "Zhang, X.-J., et al. (2025). Model-Agnostic Policy Explanations with Large Language Models. COLM. arXiv:2504.05625.",
  "Serifi, A., et al. (2024). Robot Motion Diffusion Model (RobotMDM): Motion Generation for Robotic Characters. SIGGRAPH Asia.",
  "Coros, S., et al. (2013). Computational Design of Mechanical Characters. ACM TOG 32(4), SIGGRAPH.",
  "Bates, J. (1994). The Role of Emotion in Believable Agents. Communications of the ACM 37(7).",
];

const refsMethods = [
  "Cheng, T., Song, L., Ge, Y., et al. (2024). YOLO-World: Real-Time Open-Vocabulary Object Detection. CVPR. arXiv:2401.17270.",
  "Jocher, G., et al. (2024). Ultralytics YOLO11 (software).",
  "Zhang, Y., Sun, P., Jiang, Y., et al. (2022). ByteTrack: Multi-Object Tracking by Associating Every Detection Box. ECCV. arXiv:2110.06864.",
  "Abdelrahman, A. A., et al. (2022). L2CS-Net: Fine-Grained Gaze Estimation.",
  "Lin, T.-Y., Maire, M., Belongie, S., et al. (2014). Microsoft COCO: Common Objects in Context. ECCV.",
  "Glas, D. F., Shiomi, M., Kanda, T., et al. (2017). Personal Greetings: Personalizing Robot Utterances Based on Novelty of Observed Behavior. Int. J. of Social Robotics.",
];

export function DavinciCaseStudy() {
  const [active, setActive] = useState("vision");
  const panelRef = useRef<HTMLDivElement>(null);

  // Deep-link support: read ?chapter= on mount.
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("chapter");
    if (c && CHAPTERS.some((ch) => ch.id === c)) setActive(c);
  }, []);

  const select = (id: string) => {
    setActive(id);
    const url = new URL(window.location.href);
    url.searchParams.set("chapter", id);
    window.history.replaceState({}, "", url);

    // Land the reader at the top of the new chapter, clear of the sticky chrome.
    requestAnimationFrame(() => {
      const el = panelRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 132;
      window.scrollTo({ top, behavior: "smooth" });
    });
  };

  const activeChapter = CHAPTERS.find((c) => c.id === active) ?? CHAPTERS[0];

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
        AI / Robotics
      </p>
      <h1 className="page-title mb-2" style={{ marginBottom: 6 }}>
        Looking Alive
      </h1>
      <p className="font-[family-name:var(--font-chakra-petch)] text-[#CCC] text-[18px] mb-4">
        An interactive, perceptive Leonardo da Vinci.
      </p>
      <p className="text-[#999] text-[15px] leading-[1.8] max-w-[620px] mb-6 italic">
        A character that doesn&apos;t just talk <span className="text-[#CCC]">at</span> you. It{" "}
        <span style={{ color: ACCENT }}>notices</span> you, and has the restraint to know when not
        to.
      </p>

      <div className="flex items-center gap-2.5 flex-wrap mb-5">
        {["Active Research", "~26 FPS", "Single GPU"].map((b) => (
          <span
            key={b}
            className="font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[1px] px-2.5 py-1 rounded"
            style={{ color: ACCENT, background: `${ACCENT}0C`, border: `0.5px solid ${ACCENT}20` }}
          >
            {b}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap mb-10">
        {TAGS.map((t) => (
          <TechTag key={t} label={t} color={ACCENT} active />
        ))}
      </div>

      <ScrollReveal>
        <ImageFrame
          src="/projects/davinci/dashboard.png"
          alt="Analytics dashboard of the character's decisions: who it engaged, who it passed over, and the signals behind each call"
        />
        <p className="text-[#555] text-[12px] mt-3 font-[family-name:var(--font-share-tech-mono)]">
          Every decision on the record: who it engaged, who it deliberately passed over, and which
          signals drove each call. Nothing is a black box, &ldquo;why not her?&rdquo; has an answer.
        </p>
      </ScrollReveal>

      {/* ── AWARD ENDORSEMENT ── */}
      <ScrollReveal>
        <div className="mt-8 max-w-[620px]">
          <AwardQuote variant="condensed" />
        </div>
      </ScrollReveal>

      {/* ── ORIENT ── */}
      <p className="text-[#888] text-[14px] leading-[1.7] max-w-[620px] mt-14 mb-8">
        Five chapters: the vision, then four builds that bring it to life. Chapter one runs today;
        the rest are mapped. Pick a chapter to follow the story.
      </p>

      {/* ── CHAPTER NAV (sticky tabs) ── */}
      <ChapterNav activeId={active} onSelect={select} />

      {/* ── ACTIVE CHAPTER PANEL ── */}
      <div
        ref={panelRef}
        role="tabpanel"
        id={`chapter-panel-${active}`}
        aria-labelledby={`chapter-tab-${active}`}
        tabIndex={0}
        className="outline-none scroll-mt-[132px]"
      >
        {active === "vision" ? (
          <ChapterVision />
        ) : active === "mind" ? (
          <ChapterMind />
        ) : (
          <ChapterTeaser chapter={activeChapter} content={TEASERS[active]} />
        )}
      </div>

      {/* ── SHARED FOUNDATION (constant under every chapter) ── */}
      <div className="mt-20 pt-12" style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
        {/* research direction */}
        <section className="mb-16">
          <SectionLabel>// the research behind every chapter</SectionLabel>
          <p className="text-[#888] text-[14px] leading-[1.7] max-w-[620px] mb-8">
            The PhD arc is built to bring four researchers&apos; strengths together: a believable,
            deployable character that perceives and reasons about people, explainably, then steps off
            the screen into a physical, reactive robot.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advisors.map((a, i) => (
              <BentoTile key={a.name} delay={0.05 * (i + 1)}>
                <h3 className="font-[family-name:var(--font-chakra-petch)] font-bold text-[15px] text-white">
                  {a.name}
                </h3>
                <p
                  className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1px] mb-3"
                  style={{ color: ACCENT }}
                >
                  {a.where}
                </p>
                <p className="text-[#888] text-[13px] leading-[1.7]">{a.body}</p>
              </BentoTile>
            ))}
          </div>
        </section>

        {/* why it matters */}
        <section className="mb-16">
          <BentoTile>
            <SectionLabel>// why it matters</SectionLabel>
            <p className="text-[#BBB] text-[15px] leading-[1.9]">
              The single most repeatable bit of theme-park magic is a character who makes a guest feel{" "}
              <span style={{ color: ACCENT }}>seen</span>. Today that depends on a gifted human
              performer. This builds it as a real-time, repeatable, explainable system: a character
              that notices the specific guest in front of it, reacts in persona, plays to a crowd, and
              eventually steps off the screen into the room. Da Vinci is the first host; the
              perception and decision engine is the product.
            </p>
          </BentoTile>
        </section>

        {/* selected references */}
        <section className="mb-8">
          <SectionLabel>// selected references</SectionLabel>
          <p className="text-[#666] text-[12px] leading-[1.7] max-w-[620px] mb-8 font-[family-name:var(--font-share-tech-mono)]">
            A curated selection from a maintained annotated bibliography of 60+ sources, the
            research grounding plus the third-party methods the build stands on.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <div>
              <p className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] text-[#555] mb-4">
                Research grounding
              </p>
              <ol className="space-y-3">
                {refsGrounding.map((r, i) => (
                  <li key={i} className="flex gap-3 text-[12px] leading-[1.6] text-[#888]">
                    <span style={{ color: ACCENT }} className="shrink-0 tabular-nums">
                      [{i + 1}]
                    </span>
                    <span>{r}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] text-[#555] mb-4">
                Methods &amp; systems
              </p>
              <ol className="space-y-3">
                {refsMethods.map((r, i) => (
                  <li key={i} className="flex gap-3 text-[12px] leading-[1.6] text-[#888]">
                    <span style={{ color: ACCENT }} className="shrink-0 tabular-nums">
                      [{refsGrounding.length + i + 1}]
                    </span>
                    <span>{r}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}
