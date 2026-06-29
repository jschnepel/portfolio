import type { Metadata } from "next";
import { ProjectsClient } from "@/components/ProjectsClient";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="relative z-10 pt-32 pb-16 max-w-[960px] mx-auto px-8">
      <p className="section-label mb-6">// projects</p>
      <h1 className="page-title">Projects</h1>
      <p className="page-subtitle">
        A mix of production systems, research prototypes, and personal builds.
        Everything ships or it teaches.
      </p>
      <ProjectsClient />
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}
