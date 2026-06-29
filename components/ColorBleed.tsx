"use client";

import { useEffect, useRef } from "react";

export function ColorBleed({
  color,
  x,
  y,
}: {
  color: string | null;
  x?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (color && x !== undefined && y !== undefined) {
      el.style.background = `radial-gradient(circle 400px at ${x}px ${y}px, ${color}08, transparent 70%)`;
      el.style.opacity = "1";
    } else {
      el.style.opacity = "0";
    }
  }, [color, x, y]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-1"
      style={{
        opacity: 0,
        transition: "opacity 0.6s ease",
        mixBlendMode: "screen",
      }}
    />
  );
}
