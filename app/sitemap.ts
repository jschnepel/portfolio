import type { MetadataRoute } from "next";
import { allProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/mdx";
import { CHAPTERS, chapterHref } from "@/components/davinci/chapters";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${SITE_URL}${path}`;

  const staticRoutes = ["", "/about", "/projects", "/research", "/blog", "/resume", "/contact"].map(
    (path) => ({ url: url(path), lastModified: now, priority: path === "" ? 1 : 0.7 })
  );

  const projectRoutes = allProjects.map((p) => ({
    url: url(`/projects/${p.slug}`),
    lastModified: now,
    priority: 0.8,
  }));

  // Chapter 00 lives at /projects/davinci, already covered by projectRoutes.
  const chapterRoutes = CHAPTERS.filter((c) => c.id !== "vision").map((c) => ({
    url: url(chapterHref(c.id)),
    lastModified: now,
    priority: 0.8,
  }));

  const postRoutes = getAllPosts().map((p) => ({
    url: url(`/blog/${p.slug}`),
    lastModified: now,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...chapterRoutes, ...postRoutes];
}
