import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  thumbnail?: string;
  summary?: string;
};

// Derive a one-line excerpt from the first real paragraph of the post body.
function excerpt(content: string): string {
  const firstPara = content
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .find((s) => s && !s.startsWith("#") && !s.startsWith("---"));

  const text = (firstPara ?? "")
    .replace(/[#*`>_]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > 180 ? `${text.slice(0, 177).trimEnd()}…` : text;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      tags: data.tags ?? [],
      thumbnail: data.thumbnail ?? undefined,
      summary: data.summary ?? excerpt(content),
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPost(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      tags: data.tags ?? [],
      thumbnail: data.thumbnail ?? undefined,
      summary: data.summary ?? excerpt(content),
    } as PostMeta,
    content,
  };
}
