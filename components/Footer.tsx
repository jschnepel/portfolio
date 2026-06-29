import { ScrollReveal } from "./ScrollReveal";

export function Footer() {
  return (
    <ScrollReveal>
      <footer className="py-16 px-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.04)" }} />
          <span className="font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[2px] text-[#2A2D34]">
            EOF
          </span>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.04)" }} />
        </div>
        <div className="text-center">
          <p className="font-[family-name:var(--font-share-tech-mono)] text-[11px] text-[#333] tracking-[1.5px]">
            Joey Schnepel · Phoenix, AZ · 2026
          </p>
        </div>
      </footer>
    </ScrollReveal>
  );
}
