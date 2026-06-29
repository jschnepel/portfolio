"use client";

import { useEffect, useRef, useState } from "react";

export function TypewriterLabel({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const hasTyped = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTyped.current) {
          hasTyped.current = true;
          setShowCursor(true);

          let i = 0;
          const interval = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) {
              clearInterval(interval);
              // Keep cursor blinking for a moment then hide
              setTimeout(() => setShowCursor(false), 2000);
            }
          }, 35);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  return (
    <p
      ref={ref}
      className={`font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[2.5px] text-[#3A3D44] mb-6 ${className}`}
      style={{ minHeight: "1.2em" }}
    >
      {displayed}
      {showCursor && (
        <span
          className="inline-block ml-px w-px h-[10px] align-middle"
          style={{
            background: "#555",
            animation: "blink 1.2s step-end infinite",
          }}
        />
      )}
    </p>
  );
}
