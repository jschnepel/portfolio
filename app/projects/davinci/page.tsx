import type { Metadata } from "next";
import { DavinciCaseStudy } from "@/components/DavinciCaseStudy";
import { getChapter } from "@/components/davinci/chapters";
import { getProject } from "@/lib/projects";

/**
 * Chapter 00 lives at the case study's root URL, so /projects/davinci stays the
 * canonical, shareable address for the project as a whole.
 */
const VISION = "vision";

export function generateMetadata(): Metadata {
  const project = getProject("davinci");
  const chapter = getChapter(VISION);
  const title = project?.title ?? "Da Vinci";
  const description = project?.description ?? chapter?.blurb ?? "";

  return {
    title,
    description,
    alternates: { canonical: "/projects/davinci" },
    openGraph: {
      type: "article",
      title,
      description,
      url: "/projects/davinci",
      images: [{ url: chapter?.share ?? "/og-default.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [chapter?.share ?? "/og-default.png"],
    },
  };
}

export default function DavinciPage() {
  return <DavinciCaseStudy chapter={VISION} />;
}
