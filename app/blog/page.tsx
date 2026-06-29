import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { accentForTags } from "@/lib/topics";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="relative z-10 pt-32 pb-16 max-w-[960px] mx-auto px-8">
      <p className="section-label mb-6">// writing</p>
      <h1 className="page-title">Blog</h1>
      <p className="page-subtitle">
        Notes on engineering, AI, and robotics, plus the occasional lesson that crosses over from
        sixteen years of coaching.
      </p>

      {/* ── FEATURED ── */}
      {featured && (
        <ScrollReveal>
          <FeaturedCard post={featured} />
        </ScrollReveal>
      )}

      {/* ── GRID ── */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {rest.map((post, i) => (
            <ScrollReveal key={post.slug} delay={0.06 * (i + 1)}>
              <PostCard post={post} />
            </ScrollReveal>
          ))}
        </div>
      )}

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}

type Post = ReturnType<typeof getAllPosts>[number];

function FeaturedCard({ post }: { post: Post }) {
  const accent = accentForTags(post.tags);
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article
        className="relative rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] transition-transform duration-400 group-hover:-translate-y-0.5"
        style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)" }}
      >
        {/* accent top hairline */}
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px z-10"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent 70%)` }}
        />

        <div className="p-8 md:p-10 flex flex-col justify-between order-2 md:order-1">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[2px]"
                style={{ color: accent }}
              >
                // featured
              </span>
              <span className="font-[family-name:var(--font-share-tech-mono)] text-[10px] tracking-[1px] text-[#4A4D55]">
                {post.date}
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-chakra-petch)] font-bold text-[24px] md:text-[26px] leading-tight text-white mb-4 max-w-[440px]">
              {post.title}
            </h2>
            <p className="text-[#999] text-[14px] leading-[1.75] max-w-[460px]">{post.summary}</p>
          </div>
          <div className="flex items-center justify-between gap-4 mt-7">
            <TagRow tags={post.tags} accent={accent} />
            <span
              className="inline-flex items-center gap-1.5 font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: accent }}
            >
              Read <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden order-1 md:order-2 min-h-[180px]">
          {post.thumbnail && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.thumbnail}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-70 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.03]"
            />
          )}
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: `linear-gradient(120deg, rgba(13,15,18,0.4), ${accent}10)` }}
          />
        </div>
      </article>
    </Link>
  );
}

function PostCard({ post }: { post: Post }) {
  const accent = accentForTags(post.tags);
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article
        className="relative h-full rounded-lg overflow-hidden flex flex-col transition-transform duration-400 group-hover:-translate-y-0.5"
        style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.06)" }}
      >
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px z-10 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent 70%)` }}
        />

        {post.thumbnail && (
          <div className="relative overflow-hidden aspect-[16/9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.thumbnail}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-55 transition-all duration-700 group-hover:opacity-90 group-hover:scale-[1.03]"
            />
          </div>
        )}

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[1.5px]"
              style={{ color: accent }}
            >
              {post.tags?.[0] ?? "post"}
            </span>
            <span className="font-[family-name:var(--font-share-tech-mono)] text-[9px] tracking-[1px] text-[#4A4D55]">
              {post.date}
            </span>
          </div>
          <h3 className="font-[family-name:var(--font-chakra-petch)] font-bold text-[17px] leading-snug text-[#CCC] transition-colors duration-300 group-hover:text-white mb-2">
            {post.title}
          </h3>
          <p className="text-[#888] text-[13px] leading-[1.65] line-clamp-2">{post.summary}</p>
        </div>
      </article>
    </Link>
  );
}

function TagRow({ tags, accent }: { tags?: string[]; accent: string }) {
  if (!tags || tags.length === 0) return <span />;
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.slice(0, 3).map((tag) => (
        <span
          key={tag}
          className="font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[1px] px-2 py-0.5 rounded"
          style={{ color: `${accent}`, background: `${accent}10`, border: `0.5px solid ${accent}22` }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
