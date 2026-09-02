"use client";

import { useEffect, useState } from "react";
import { IMAGE_DIMENSIONS } from "../lib/imageDimensions";

interface ZoomableImageProps {
  src: string;
  alt: string;
  accent?: string;
}

export function ZoomableImage({ src, alt, accent = "#4DA8FF" }: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Reserve the right amount of space before the (lazy) image arrives, so the
  // page doesn't reflow underneath the reader as figures load in.
  const dimensions = IMAGE_DIMENSIONS[src];

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Enlarge image: ${alt}`}
        className="group relative block w-full rounded-lg overflow-hidden cursor-zoom-in"
        style={{
          border: `0.5px solid ${accent}22`,
          boxShadow: `0 0 0 0.5px rgba(255,255,255,0.03), 0 18px 50px -20px rgba(0,0,0,0.7)`,
          background: "rgba(255,255,255,0.02)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={dimensions?.[0]}
          height={dimensions?.[1]}
          loading="lazy"
          decoding="async"
          className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          style={dimensions ? { aspectRatio: `${dimensions[0]} / ${dimensions[1]}` } : undefined}
        />
        <span
          aria-hidden="true"
          className="absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 px-2 py-1 rounded font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            color: accent,
            background: "rgba(0,0,0,0.55)",
            border: `0.5px solid ${accent}33`,
          }}
        >
          <span className="text-[11px] leading-none">⤢</span> Expand
        </span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          style={{ background: "rgba(5,6,8,0.92)", backdropFilter: "blur(6px)" }}
        >
          <button
            type="button"
            aria-label="Close enlarged image"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 hover:bg-white/10"
            style={{
              color: "#CCC",
              background: "rgba(255,255,255,0.06)",
              border: "0.5px solid rgba(255,255,255,0.15)",
            }}
          >
            <span className="text-[14px] leading-none">✕</span>
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[96vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg cursor-default"
            style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.85)" }}
          />

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] text-[#666]">
            Click anywhere or press Esc to close
          </p>
        </div>
      )}
    </>
  );
}
