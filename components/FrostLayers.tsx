"use client";

import { useEffect, useState } from "react";

const layers = [
  { blur: "blur(8px)", start: 0.2, end: 0.5, bg: "" },
  { blur: "blur(32px)", start: 0.45, end: 0.75, bg: "rgba(13,15,18,0.3)" },
  {
    blur: "blur(80px) saturate(0.5)",
    start: 0.7,
    end: 1.1,
    bg: "rgba(13,15,18,0.5)",
  },
];

export function FrostLayers() {
  const [opacities, setOpacities] = useState<number[]>(layers.map(() => 0));

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      setOpacities(
        layers.map((l) => {
          const startPx = vh * l.start;
          const rangePx = vh * (l.end - l.start);
          return Math.min(1, Math.max(0, (scrollY - startPx) / rangePx));
        })
      );
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
  }, []);

  return (
    <>
      {layers.map((layer, i) => (
        <div
          key={i}
          className="fixed inset-0 w-full h-screen pointer-events-none"
          style={{
            zIndex: 1,
            opacity: opacities[i],
            backdropFilter: layer.blur,
            WebkitBackdropFilter: layer.blur,
            background: layer.bg || undefined,
          }}
        />
      ))}
    </>
  );
}
