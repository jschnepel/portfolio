import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { DavinciCaseStudy } from "@/components/DavinciCaseStudy";
import { CHAPTERS, getChapter } from "@/components/davinci/chapters";

/**
 * Every chapter is its own statically generated page. That is what makes the
 * chapter bodies reachable by a crawler and gives each one a real share card —
 * previously only whichever chapter happened to be the client-side default was
 * ever rendered into HTML.
 *
 * Chapter 00 is excluded: it lives at the parent route, and serving it here too
 * would be the same content on two URLs.
 */
export function generateStaticParams() {
  return CHAPTERS.filter((c) => c.id !== "vision").map((c) => ({ chapter: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapter: string }>;
}): Promise<Metadata> {
  const { chapter: id } = await params;
  const chapter = getChapter(id);
  if (!chapter) return { title: "Not Found" };

  const title = `${chapter.name} · Looking Alive`;
  const path = `/projects/davinci/${chapter.id}`;

  return {
    title,
    description: chapter.blurb,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title,
      description: chapter.blurb,
      url: path,
      images: [{ url: chapter.share }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: chapter.blurb,
      images: [chapter.share],
    },
  };
}

export default async function DavinciChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter: id } = await params;

  // Chapter 00 is canonical at the parent URL.
  if (id === "vision") redirect("/projects/davinci");

  if (!getChapter(id)) notFound();

  return <DavinciCaseStudy chapter={id} />;
}
