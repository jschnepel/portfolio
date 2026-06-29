import { ScrollReveal } from "./ScrollReveal";

export function BentoTile({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <ScrollReveal delay={delay}>
      <div
        className={`rounded-lg p-7 ${className}`}
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "0.5px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {children}
      </div>
    </ScrollReveal>
  );
}
