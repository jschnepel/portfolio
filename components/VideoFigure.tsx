"use client";

import { useEffect, useRef, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const IN_VIEW_THRESHOLD = 0.35;

/**
 * A silent, looping clip presented as a figure rather than as media furniture.
 *
 * Plays only while it is on screen, and never autoplays for a visitor who has asked
 * for reduced motion — they get the poster and an explicit control instead.
 */
export function VideoFigure({
  src,
  poster,
  label,
  accent = "#4DA8FF",
  ratio = "512 / 576",
}: {
  src: string;
  poster: string;
  label: string;
  accent?: string;
  ratio?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    setPrefersReducedMotion(query.matches);

    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Only spend decode cycles while the clip is actually in view.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {
            /* autoplay refused — the visible controls still work */
          });
        } else {
          el.pause();
        }
      },
      { threshold: IN_VIEW_THRESHOLD }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  return (
    <figure className="m-0">
      <div
        className="relative rounded-lg overflow-hidden mx-auto"
        style={{
          maxWidth: 420,
          aspectRatio: ratio,
          border: `0.5px solid ${accent}22`,
          boxShadow: "0 0 0 0.5px rgba(255,255,255,0.03), 0 18px 50px -20px rgba(0,0,0,0.7)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full block object-cover"
        />

        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? `Pause clip: ${label}` : `Play clip: ${label}`}
          className="absolute inset-0 flex items-end justify-start p-3 group cursor-pointer focus:outline-none"
        >
          <span
            className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[1.5px] transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
            style={{
              color: accent,
              background: "rgba(0,0,0,0.6)",
              border: `0.5px solid ${accent}33`,
            }}
          >
            <span aria-hidden="true" className="text-[11px] leading-none">
              {isPlaying ? "❚❚" : "▶"}
            </span>
            {isPlaying ? "Pause" : "Play"}
          </span>
        </button>

        <span
          aria-hidden="true"
          className="absolute top-2.5 right-2.5 px-2 py-1 rounded font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[1px]"
          style={{
            color: "#8A8D95",
            background: "rgba(0,0,0,0.55)",
            border: "0.5px solid rgba(255,255,255,0.10)",
          }}
        >
          Silent · captions burned in
        </span>
      </div>
    </figure>
  );
}
