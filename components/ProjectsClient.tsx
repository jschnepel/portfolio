"use client";

import { useState, useCallback } from "react";
import { ProjectCard } from "./ProjectCard";
import { ScrollReveal } from "./ScrollReveal";
import { ColorBleed } from "./ColorBleed";
import { allProjects } from "@/lib/projects";

export function ProjectsClient() {
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  const handleHover = useCallback(
    (color: string | null, x?: number, y?: number) => {
      setHoverColor(color);
      if (x !== undefined && y !== undefined) setHoverPos({ x, y });
    },
    []
  );

  const cardProjects = allProjects.map((p) => ({
    category: p.category,
    title: p.title,
    description: p.description,
    tags: p.tags.slice(0, 5),
    color: p.color,
    href: `/projects/${p.slug}`,
    thumbnail: p.thumbnail,
    liveUrl: p.liveUrl,
  }));

  return (
    <>
      <ColorBleed color={hoverColor} x={hoverPos.x} y={hoverPos.y} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardProjects.map((project, i) => (
          <ScrollReveal key={project.title} delay={0.04 * (i + 1)}>
            <ProjectCard project={project} onHoverColor={handleHover} />
          </ScrollReveal>
        ))}
      </div>
    </>
  );
}
