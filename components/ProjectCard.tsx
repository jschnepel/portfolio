"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { TechTag } from "./TechTag";

export type ProjectData = {
  category: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
  href?: string;
  thumbnail?: string;
  liveUrl?: string;
  /** Optional: marks a case study that is read as a series, e.g. "5 chapters". */
  series?: string;
};

export function ProjectCard({
  project,
  onHoverColor,
}: {
  project: ProjectData;
  onHoverColor?: (color: string | null, x?: number, y?: number) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [iframeScale, setIframeScale] = useState(0.2);

  useEffect(() => {
    if (!project.liveUrl || !thumbRef.current) return;
    const measure = () => {
      const w = thumbRef.current?.offsetWidth ?? 300;
      setIframeScale(w / 1440);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [project.liveUrl]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    onHoverColor?.(project.color, e.clientX, e.clientY);
  }, [onHoverColor, project.color]);

  const card = (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-lg cursor-pointer h-full"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: hover
          ? `0.5px solid ${project.color}30`
          : "0.5px solid rgba(255,255,255,0.07)",
        padding: "1.5rem",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.3s ease",
        boxShadow: hover
          ? `0 8px 24px ${project.color}08`
          : "none",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setHover(true); }}
      onMouseLeave={() => { setHover(false); onHoverColor?.(null); }}
    >
      {/* Inner glow following cursor */}
      <div
        className="absolute inset-0 pointer-events-none rounded-lg"
        style={{
          background: hover
            ? `radial-gradient(circle 200px at ${glowPos.x}px ${glowPos.y}px, ${project.color}10, transparent 70%)`
            : "transparent",
          opacity: hover ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Thumbnail / Live preview */}
      {(project.thumbnail || project.liveUrl) && (
        <div
          ref={thumbRef}
          className="relative rounded overflow-hidden mb-4 -mx-1.5 -mt-1.5"
          style={{
            aspectRatio: "16/9",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          {project.thumbnail && (
            <img
              src={project.thumbnail}
              alt={`${project.title} preview`}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
              style={{
                transform: hover ? "scale(1.03)" : "scale(1)",
                opacity: hover && project.liveUrl ? 0 : hover ? 1 : 0.92,
              }}
            />
          )}
          {project.liveUrl && (
            <iframe
              src={hover ? project.liveUrl : undefined}
              title={`${project.title} live preview`}
              className="absolute top-0 left-0 border-0 pointer-events-none transition-opacity duration-500"
              style={{
                opacity: hover ? 1 : 0,
                width: "1440px",
                height: "900px",
                transform: `scale(${iframeScale})`,
                transformOrigin: "top left",
              }}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            />
          )}
        </div>
      )}

      {/* Category, plus a series marker when the case study is read in chapters */}
      <div className="relative flex items-center gap-2.5 flex-wrap mb-3">
        <p
          className="font-[family-name:var(--font-share-tech-mono)] text-[11px] uppercase tracking-[1.5px]"
          style={{
            color: hover ? project.color : "#8A8A8A",
            transition: "color 0.3s ease",
          }}
        >
          {project.category}
        </p>
        {project.series && (
          <span
            className="font-[family-name:var(--font-share-tech-mono)] text-[9px] tracking-[1px] px-2 py-0.5 rounded"
            style={{
              color: hover ? project.color : "#7A7D85",
              background: hover ? `${project.color}14` : "rgba(255,255,255,0.03)",
              border: `0.5px solid ${hover ? `${project.color}3D` : "rgba(255,255,255,0.08)"}`,
              transition: "all 0.3s ease",
            }}
          >
            {project.series}
          </span>
        )}
      </div>

      {/* Title */}
      <h4
        className="relative font-[family-name:var(--font-chakra-petch)] font-bold text-[18px] mb-2"
        style={{
          color: hover ? "#FFF" : "#EDEDED",
          transition: "color 0.3s ease",
        }}
      >
        {project.title}
      </h4>

      {/* Description */}
      <p
        className="relative text-[13px] leading-[1.7]"
        style={{
          color: hover ? "#CCC" : "#9A9A9A",
          transition: "color 0.3s ease",
        }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div className="relative flex flex-wrap mt-1">
        {project.tags.map((tag) => (
          <TechTag
            key={tag}
            label={tag}
            color={project.color}
            active={hover}
          />
        ))}
      </div>
    </div>
  );

  if (project.href) {
    return <Link href={project.href}>{card}</Link>;
  }

  return card;
}
