import type { Metadata } from "next";
import { BentoTile } from "@/components/BentoTile";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Research" };

export default function ResearchPage() {
  return (
    <div className="relative z-10 pt-32 pb-16 max-w-[960px] mx-auto px-8">
      <p className="section-label mb-6">// research</p>
      <h1 className="page-title">Research</h1>
      <p className="page-subtitle">
        I work on robotics, perception, and how machines read the people in
        front of them. Right now that means multimodal AI for autonomous
        characters.
      </p>

      {/* Primary research focus */}
      <BentoTile className="mb-4">
        <p className="section-label mb-5">// primary focus</p>
        <h2 className="font-[family-name:var(--font-chakra-petch)] font-bold text-[18px] text-white mb-4 leading-snug">
          Efficient Multimodal Tokenization for Real-Time Social Perception
          in Autonomous Robotic Characters
        </h2>
        <p className="text-[#888] text-[14px] leading-[1.75] mb-6">
          How does a robot read human social cues in real time? The hard part
          is fusing vision, audio, and balance data into one stream that's light
          enough to run on edge hardware like the Jetson Orin, while staying fast
          enough that the interaction still feels natural.
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "Multimodal Transformers",
            "Edge AI",
            "Social Robotics",
            "Real-time Systems",
            "HRI",
          ].map((tag) => (
            <span
              key={tag}
              className="font-[family-name:var(--font-share-tech-mono)] text-[10px] px-3 py-1.5 rounded"
              style={{
                color: "#00E5A0",
                background: "rgba(0,229,160,0.06)",
                border: "0.5px solid rgba(0,229,160,0.15)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </BentoTile>

      {/* Research areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <BentoTile delay={0.1}>
          <p className="section-label mb-5">// ballbot build log</p>
          <h3 className="font-[family-name:var(--font-chakra-petch)] font-bold text-[14px] text-white mb-4">
            Build Progress
          </h3>
          <p className="text-[#666] text-[13px] leading-[1.7] mb-6">
            Build notes on the mechanical design, control systems, and behavior
            layer for a self-balancing inverted pendulum robot that interacts
            with people in character.
          </p>
          <div className="space-y-4">
            {[
              {
                phase: "Mechanical Design",
                status: "Complete",
                color: "#00E5A0",
              },
              {
                phase: "PID Control Loop",
                status: "Complete",
                color: "#00E5A0",
              },
              {
                phase: "ROS2 Integration",
                status: "In Progress",
                color: "#F5C344",
              },
              {
                phase: "Behavior Layer",
                status: "Planned",
                color: "#555",
              },
              {
                phase: "Social Perception",
                status: "Research",
                color: "#4DA8FF",
              },
            ].map((item) => (
              <div
                key={item.phase}
                className="flex justify-between items-center"
              >
                <span className="text-[#BBB] text-[13px]">{item.phase}</span>
                <span
                  className="font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[1px] px-2.5 py-1 rounded"
                  style={{
                    color: item.color,
                    background: `${item.color}0C`,
                    border: `0.5px solid ${item.color}20`,
                  }}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </BentoTile>

        <BentoTile delay={0.15}>
          <p className="section-label mb-5">// papers & writeups</p>
          <div className="space-y-5">
            {[
              {
                title:
                  "Multimodal tokenization for real-time social perception",
                type: "In Progress",
                date: "2026",
              },
              {
                title:
                  "Edge-optimized transformer architectures for robotic perception",
                type: "Planned",
                date: "2026",
              },
              {
                title:
                  "Character behavior modeling in autonomous social robots",
                type: "Planned",
                date: "2025",
              },
            ].map((paper) => (
              <div
                key={paper.title}
                className="pb-5 last:pb-0"
                style={{
                  borderBottom: "0.5px solid rgba(255,255,255,0.04)",
                }}
              >
                <p className="font-[family-name:var(--font-chakra-petch)] font-bold text-[13px] text-[#CCC] mb-2 leading-snug">
                  {paper.title}
                </p>
                <div className="flex gap-3 items-baseline">
                  <span className="font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[1px] text-[#555]">
                    {paper.type}
                  </span>
                  <span className="font-[family-name:var(--font-share-tech-mono)] text-[9px] text-[#3A3D44]">
                    {paper.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </BentoTile>
      </div>

      <Footer />
    </div>
  );
}
