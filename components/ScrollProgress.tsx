"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const pageColors: Record<string, string> = {
  "/": "rgba(255,255,255,0.3)",
  "/resume": "rgba(255,255,255,0.3)",
  "/projects": "#00E5A0",
  "/research": "#4DA8FF",
  "/blog": "#FF6B4A",
  "/contact": "rgba(255,255,255,0.3)",
};

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const color =
    Object.entries(pageColors).find(
      ([path]) => path !== "/" && pathname.startsWith(path)
    )?.[1] ??
    pageColors[pathname] ??
    "rgba(255,255,255,0.3)";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const update = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      el.style.transform = `scaleX(${progress})`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <div
      ref={ref}
      className="scroll-progress"
      style={{ background: color, width: "100%" }}
    />
  );
}
