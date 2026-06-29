export function TechTag({
  label,
  color,
  active,
}: {
  label: string;
  color?: string;
  active?: boolean;
}) {
  return (
    <span
      className="inline-block rounded-[3px] font-[family-name:var(--font-share-tech-mono)] text-[10px] transition-all duration-400"
      style={{
        padding: "3px 8px",
        margin: "10px 5px 0 0",
        background:
          active && color
            ? color + "0F"
            : "rgba(255,255,255,0.03)",
        color: active && color ? color : "#444",
        border:
          active && color
            ? `0.5px solid ${color}33`
            : "0.5px solid rgba(255,255,255,0.05)",
      }}
    >
      {label}
    </span>
  );
}
