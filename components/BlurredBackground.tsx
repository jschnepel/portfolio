"use client";

import { usePathname } from "next/navigation";

export function BlurredBackground() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <img
        src="/images/hero.png"
        alt=""
        className="w-full h-full object-cover opacity-15"
        style={{
          objectPosition: "center 30%",
          filter: "blur(80px) saturate(0.3)",
        }}
      />
      {/* Heavy dark overlay to keep content readable */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(13,15,18,0.88)" }}
      />
    </div>
  );
}
