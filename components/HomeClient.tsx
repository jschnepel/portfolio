"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { FrostLayers } from "./FrostLayers";
import { ProjectCard, ProjectData } from "./ProjectCard";
import { TechTag } from "./TechTag";
import { BlogItem } from "./BlogItem";
import { ScrollReveal } from "./ScrollReveal";
import { TypewriterLabel } from "./TypewriterLabel";
import { ColorBleed } from "./ColorBleed";
import { DuckHunt } from "./DuckHunt";
import { Footer } from "./Footer";

const featuredProjects: ProjectData[] = [
  {
    category: "AI / Robotics",
    title: "Da Vinci",
    description:
      "A real-time Leonardo that actually sees the guest in front of it. It reads their gaze and what they're wearing, then decides who to talk to, the way a good host would.",
    tags: ["CV", "Open-Vocab", "Real-Time"],
    color: "#4DA8FF",
    href: "/projects/davinci",
    thumbnail: "/projects/davinci/hero_corridor.png",
  },
  {
    category: "Robotics",
    title: "Ballbot",
    description:
      "Most robots have no personality, so I'm building one that does: a self-balancing bot with expressive, character-driven behaviors.",
    tags: ["Jetson", "ROS2", "PID"],
    color: "#00E5A0",
    href: "/projects/ballbot",
    thumbnail: "/thumbnails/projects/ballbot.svg",
  },
  {
    category: "Platform",
    title: "PixelBrix",
    description:
      "Wanted to turn any photo into a buildable brick mosaic. So I built an app that maps pixels to real brick colors and generates build instructions.",
    tags: ["React", "Canvas", "TS"],
    color: "#F5C344",
    href: "/projects/pixelbrix",
    thumbnail: "/projects/pixelbrix/ui.png",
    liveUrl: "https://pixel-brix.vercel.app/",
  },
];

const recommendations = [
  {
    quote:
      "A rare talent who brings a unique combination of professionalism, empathy, and innovation to any role he undertakes. His work ethic is unmatched.",
    title: "Department Manager",
    org: "TSMC",
  },
  {
    quote:
      "One of the most intelligent and driven individuals I have had the privilege to mentor. His intellectual curiosity is rare, and a strong indicator of success in advanced academic pursuits such as a Ph.D.",
    title: "Program Mentor",
    org: "Western Governors University",
  },
  {
    quote:
      "He proved himself more than capable of performing just about anything we could throw his direction. An excellent asset to our organization.",
    title: "Senior Project Manager",
    org: "SAIC",
  },
];

function AnimatedStat({ num, label }: { num: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1200;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * num));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  return (
    <div ref={ref}>
      <div
        className="font-[family-name:var(--font-chakra-petch)] text-[38px] font-bold text-white tabular-nums"
        style={{ textShadow: "0 1px 20px rgba(0,0,0,0.5)", lineHeight: 1 }}
      >
        {count}
      </div>
      <div className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] text-[#999] mt-2">
        {label}
      </div>
    </div>
  );
}

export function HomeClient({
  blogPosts,
}: {
  blogPosts: { title: string; date: string; slug: string }[];
}) {
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  const handleHover = useCallback(
    (color: string | null, x?: number, y?: number) => {
      setHoverColor(color);
      if (x !== undefined && y !== undefined) setHoverPos({ x, y });
    },
    []
  );

  return (
    <>
      {/* Fixed hero image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url(/images/hero.png)",
          backgroundSize: "100% auto",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "rgba(13,15,18,0.25)" }}
        />
      </div>

      {/* Frost layers */}
      <FrostLayers />

      {/* Scrollable content */}
      <div className="relative z-5">
        {/* Hero text */}
        <div className="min-h-screen flex flex-col justify-end relative">
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "70%",
              background:
                "linear-gradient(to top, rgba(13,15,18,0.75) 0%, rgba(13,15,18,0.4) 40%, transparent 100%)",
            }}
          />

          <div className="relative max-w-[960px] mx-auto px-8 pb-24 w-full">
            <p
              className="hero-stagger font-[family-name:var(--font-share-tech-mono)] text-[11px] uppercase tracking-[2.5px] text-[#777] mb-5"
              style={{ animationDelay: "0.1s" }}
            >
              // intro
            </p>
            <h1
              className="hero-stagger text-shimmer font-[family-name:var(--font-chakra-petch)] font-bold mb-3"
              style={{
                fontSize: "clamp(38px, 5vw, 56px)",
                letterSpacing: "-0.5px",
                animationDelay: "0.25s",
                filter: "drop-shadow(0 2px 40px rgba(0,0,0,0.7))",
              }}
            >
              Joey Schnepel
            </h1>
            <p
              className="hero-stagger font-[family-name:var(--font-share-tech-mono)] text-[13px] tracking-[3px] uppercase text-[#BBB] mb-7"
              style={{
                textShadow: "0 1px 20px rgba(0,0,0,0.6)",
                animationDelay: "0.4s",
              }}
            >
              Builder // Researcher // Coach
            </p>
            <p
              className="hero-stagger text-[#DDD] text-[15px] leading-[1.85] max-w-[500px] mb-12"
              style={{
                textShadow: "0 1px 12px rgba(0,0,0,0.5)",
                animationDelay: "0.55s",
              }}
            >
              I build systems that interact with people, everything from
              enterprise platforms to self-balancing robots. I usually start by
              figuring out what the thing actually needs to do, then find the
              simplest way to get there.
            </p>

            <div
              className="hero-stagger flex gap-16 flex-wrap"
              style={{ animationDelay: "0.7s" }}
            >
              <AnimatedStat num={16} label="Years coaching" />
              <AnimatedStat num={8} label="Years engineering" />
              <AnimatedStat num={3} label="Active builds" />
            </div>
          </div>
        </div>

        {/* Below the fold */}
        <div style={{ background: "var(--color-bg)" }}>
          <ColorBleed color={hoverColor} x={hoverPos.x} y={hoverPos.y} />
          <div className="max-w-[960px] mx-auto px-8">
            {/* Featured work */}
            <section className="py-20">
              <TypewriterLabel text="// featured work" />

              {/* Flagship feature: Da Vinci */}
              <ScrollReveal>
                <Link href="/projects/davinci" className="group block mb-4">
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 rounded-lg overflow-hidden transition-transform duration-300 group-hover:-translate-y-0.5"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "0.5px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div
                      className="relative overflow-hidden"
                      style={{ aspectRatio: "16/10", background: "#000" }}
                    >
                      <img
                        src="/projects/davinci/hero_corridor.png"
                        alt="Da Vinci perception system choosing who to engage among guests"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <p
                        className="font-[family-name:var(--font-share-tech-mono)] text-[11px] uppercase tracking-[1.5px] mb-3"
                        style={{ color: "#4DA8FF" }}
                      >
                        AI / Robotics · Flagship
                      </p>
                      <h3 className="font-[family-name:var(--font-chakra-petch)] font-bold text-[26px] text-white mb-3 leading-tight">
                        Da Vinci
                      </h3>
                      <p className="text-[#9A9A9A] text-[14px] leading-[1.8] mb-5 transition-colors duration-300 group-hover:text-[#CCC]">
                        A real-time Leonardo that actually sees the guest in front of it. It reads their gaze and what they&apos;re wearing, then decides who to talk to, the way a good host would.
                      </p>
                      <div className="flex flex-wrap mb-5">
                        {["Computer Vision", "Open-Vocab", "Gaze", "Real-Time"].map((t) => (
                          <TechTag key={t} label={t} color="#4DA8FF" active />
                        ))}
                      </div>
                      <span className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] text-[#777] transition-colors duration-300 group-hover:text-white">
                        View case study &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>

              {/* Ballbot + PixelBrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredProjects.slice(1).map((project, i) => (
                  <ScrollReveal key={project.title} delay={0.04 * (i + 1)}>
                    <ProjectCard project={project} onHoverColor={handleHover} />
                  </ScrollReveal>
                ))}
              </div>
            </section>

            <div className="divider" />

            {/* How I Think */}
            <section className="py-20">
              <ScrollReveal>
                <div
                  className="rounded-lg p-8"
                  style={{
                    background: "rgba(255,255,255,0.015)",
                    border: "0.5px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <div className="font-[family-name:var(--font-share-tech-mono)] text-[13px] leading-[2.2] text-[#A2A2A2]">
                    <p><span className="text-[#4DA8FF]/60">//</span> I start with the constraint, not the framework.</p>
                    <p><span className="text-[#4DA8FF]/60">//</span> Simple almost always beats clever.</p>
                    <p><span className="text-[#4DA8FF]/60">//</span> The best systems feel inevitable in hindsight.</p>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            <div className="divider" />

            {/* Recommendations */}
            <section className="py-20">
              <ScrollReveal>
                <p className="section-label">// recommendations</p>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.map((r, i) => (
                  <ScrollReveal key={i} delay={0.06 * (i + 1)}>
                    <figure
                      className="rounded-lg p-7 h-full"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "0.5px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div
                        className="font-[family-name:var(--font-chakra-petch)] leading-none mb-2"
                        style={{ fontSize: 44, color: "#2A2D34" }}
                        aria-hidden="true"
                      >
                        &ldquo;
                      </div>
                      <blockquote className="text-[#CCC] text-[15px] leading-[1.85] mb-6">
                        {r.quote}
                      </blockquote>
                      <figcaption className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] text-[#777]">
                        {r.title}
                        <span className="text-[#3A3D44]"> / </span>
                        {r.org}
                      </figcaption>
                    </figure>
                  </ScrollReveal>
                ))}
              </div>
              <ScrollReveal>
                <p className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] text-[#555] mt-6">
                  Full letters of recommendation available on request.
                </p>
              </ScrollReveal>
            </section>

            <div className="divider" />

            {/* Bot Hunt */}
            <section className="py-20">
              <ScrollReveal>
                <p className="section-label">// break time</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <DuckHunt />
              </ScrollReveal>
            </section>

            <div className="divider" />

            {/* Writing */}
            <section className="py-20">
              <ScrollReveal>
                <p className="section-label">// writing</p>
              </ScrollReveal>
              {blogPosts.map((post, i) => (
                <ScrollReveal key={post.slug} delay={0.04 * (i + 1)}>
                  <BlogItem
                    title={post.title}
                    date={post.date}
                    href={`/blog/${post.slug}`}
                  />
                </ScrollReveal>
              ))}
            </section>

            <div className="divider" />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
