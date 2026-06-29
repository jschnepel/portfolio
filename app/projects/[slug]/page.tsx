import Link from "next/link";
import { notFound } from "next/navigation";
import { allProjects, getProject } from "@/lib/projects";
import { TechTag } from "@/components/TechTag";
import { BentoTile } from "@/components/BentoTile";
import { BallbotFollower } from "@/components/BallbotFollower";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Footer } from "@/components/Footer";
import { DavinciCaseStudy } from "@/components/DavinciCaseStudy";
import { PixelBrixCaseStudy } from "@/components/PixelBrixCaseStudy";

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not Found" };
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.thumbnail ? [{ url: project.thumbnail }] : [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  if (slug === "davinci") return <DavinciCaseStudy />;
  if (slug === "pixelbrix") return <PixelBrixCaseStudy />;

  return (
    <div className="relative z-10 pt-32 pb-16 max-w-[960px] mx-auto px-8">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[2px] text-[#3A3D44] mb-8 hover:text-[#888] transition-colors duration-300"
      >
        <span>&larr;</span> Back to projects
      </Link>

      {/* Header */}
      <div className="mb-12">
        <p
          className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[2px] mb-4"
          style={{ color: project.color }}
        >
          {project.category}
        </p>
        <h1 className="page-title mb-3">{project.title}</h1>
        <div className="flex items-center gap-3 mb-6">
          <span
            className="font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[1px] px-2.5 py-1 rounded"
            style={{
              color: project.color,
              background: `${project.color}0C`,
              border: `0.5px solid ${project.color}20`,
            }}
          >
            {project.status}
          </span>
        </div>
        <div className="flex flex-wrap">
          {project.tags.map((tag) => (
            <TechTag key={tag} label={tag} />
          ))}
        </div>
      </div>

      {/* Thumbnail */}
      {project.thumbnail && (
        <div
          className="rounded-lg overflow-hidden mb-8"
          style={{ aspectRatio: "16/9", background: "rgba(255,255,255,0.02)" }}
        >
          <img
            src={project.thumbnail}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Ballbot interactive demo */}
      {slug === "ballbot" && (
        <div className="mb-8">
          <BentoTile>
            <div className="flex items-center gap-8 flex-wrap">
              <BallbotFollower />
              <div className="flex-1 min-w-[200px]">
                <p className="section-label mb-3">// interactive demo</p>
                <p className="text-[#888] text-[13px] leading-[1.7]">
                  Move your mouse over the bot. It tracks you, leans toward your cursor,
                  and wobbles when you move fast. Same character behavior ideas I&apos;m
                  building into the real Ballbot.
                </p>
              </div>
            </div>
          </BentoTile>
        </div>
      )}

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4">
        <BentoTile>
          <p className="section-label mb-5">// overview</p>
          <p className="text-[#BBB] text-[14px] leading-[1.8]">
            {project.longDescription}
          </p>
        </BentoTile>

        <BentoTile delay={0.1}>
          <p className="section-label mb-5">// highlights</p>
          <div className="space-y-4">
            {project.highlights.map((h, i) => (
              <ScrollReveal key={i} delay={0.08 * (i + 1)}>
                <div className="flex gap-3">
                  <span
                    className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                    style={{
                      background: project.color,
                      boxShadow: `0 0 6px ${project.color}40`,
                    }}
                  />
                  <p className="text-[#999] text-[13px] leading-[1.65]">
                    {h}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </BentoTile>
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}
