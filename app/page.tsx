import { HomeClient } from "@/components/HomeClient";
import { getAllPosts } from "@/lib/mdx";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3).map((p) => ({
    title: p.title,
    date: p.date,
    slug: p.slug,
  }));

  return <HomeClient blogPosts={posts} />;
}
