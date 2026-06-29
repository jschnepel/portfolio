import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/mdx";
import { accentForTags } from "@/lib/topics";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { Footer } from "@/components/Footer";

// Inline images render as framed figures with an optional caption (the markdown title).
const mdxComponents = {
  img: ({ src, alt, title }: { src?: string; alt?: string; title?: string }) => {
    if (!src) return null;
    return (
      <span className="block my-9">
        <span
          className="block rounded-lg overflow-hidden"
          style={{ border: "0.5px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.015)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt ?? ""} className="w-full h-auto block" />
        </span>
        {title && (
          <span className="block mt-3 text-center font-[family-name:var(--font-share-tech-mono)] text-[11px] text-[#666] leading-[1.6]">
            {title}
          </span>
        )}
      </span>
    );
  },
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.meta.title,
    description: post.meta.summary,
    openGraph: {
      title: post.meta.title,
      description: post.meta.summary,
      type: "article",
      images: post.meta.thumbnail ? [{ url: post.meta.thumbnail }] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const accent = accentForTags(post.meta.tags);

  return (
    <div className="relative z-10 pt-32 pb-16 max-w-[960px] mx-auto px-8">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[2px] text-[#3A3D44] mb-8 hover:text-[#888] transition-colors duration-300"
      >
        <span>&larr;</span> Back to blog
      </Link>

      {/* Header */}
      <div className="max-w-[680px]">
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <span
            className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[2px]"
            style={{ color: accent }}
          >
            {post.meta.date}
          </span>
          {post.meta.tags && post.meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[1px] px-2 py-0.5 rounded"
                  style={{ color: accent, background: `${accent}10`, border: `0.5px solid ${accent}22` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <h1 className="page-title leading-tight mb-4">{post.meta.title}</h1>
        {post.meta.summary && (
          <p className="text-[#999] text-[16px] leading-[1.7] mb-3">{post.meta.summary}</p>
        )}
        <span aria-hidden="true" className="block h-px w-16 mt-6 mb-12" style={{ background: accent }} />
      </div>

      {/* MDX content */}
      <article className="prose-custom">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHighlight] } }}
        />
      </article>

      <div className="divider mt-20" />
      <Footer />
    </div>
  );
}
