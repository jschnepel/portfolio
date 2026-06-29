"use client";

import { useEffect, useRef } from "react";

export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
    };

    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-40"
      style={{
        background:
          "radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
