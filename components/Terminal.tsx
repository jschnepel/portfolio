"use client";

import { useState, useEffect, useRef } from "react";

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  about       Who is Joey Schnepel?
  stack       Current tech stack
  ballbot     The robot project
  coaching    16 years of coaching stats
  contact     How to reach me
  clear       Clear terminal
  exit        Close terminal`,

  about: `
  ╔══════════════════════════════════════╗
  ║  Joey Schnepel                       ║
  ║  Software Engineer · AI/ML · Robotics║
  ╚══════════════════════════════════════╝

  Builder of autonomous systems that interact
  with humans. Currently at TSMC building ML
  pipelines for semiconductor manufacturing.

  Master's in AI/ML. Secret Clearance.
  16 years coaching soccer on the side.

  I start with the constraint,
  not the framework.`,

  stack: `
  Languages   Python, Java, C++, TypeScript, SQL
  Web         React, Next.js, Vue, Angular
  Cloud       AWS, GCP, Docker, K8s, Terraform
  AI/ML       PyTorch, TensorFlow, LangChain, RAG
  Robotics    ROS2, Jetson Orin, CUDA, PID
  DevOps      Jenkins, Git, CI/CD, SageMaker`,

  ballbot: `
       .-"""-.
      /        \\
     |  (o)(o)  |    < I'm watching you.
      \\  .__,  /
       '-....-'
        /    \\
       ( ball )
        '-..-'

  Self-balancing inverted pendulum robot with
  expressive, character-driven behavior layer.

  Status: Active Build
  Stack:  Jetson Orin, ROS2, PID, Python, C++
  Goal:   A robot that feels alive, not just
          one that stays balanced.`,

  coaching: `
  ┌────────────────────────────────────┐
  │  16 years coaching soccer          │
  │                                    │
  │  Seasons coached:    32+           │
  │  Teams built:        20+           │
  │  Players mentored:   300+          │
  │  Tournaments:        50+           │
  │                                    │
  │  What it taught me:                │
  │  → Design for the team you have    │
  │  → Simplicity is discipline        │
  │  → Tight feedback loops win        │
  └────────────────────────────────────┘`,

  contact: `
  Email     joeyschnepel@gmail.com
  LinkedIn  linkedin.com/in/joey-schnepel
  GitHub    github.com/jschnepel`,
};

export function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>(["Type 'help' for available commands."]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "`" && !open) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const newLines = [...lines, `> ${input}`];

    if (cmd === "clear") {
      setLines(["Terminal cleared."]);
    } else if (cmd === "exit") {
      setOpen(false);
      return;
    } else if (COMMANDS[cmd]) {
      newLines.push(COMMANDS[cmd]);
      setLines(newLines);
    } else if (cmd) {
      newLines.push(`Command not found: ${cmd}. Type 'help' for available commands.`);
      setLines(newLines);
    }

    setInput("");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        className="w-full max-w-[640px] mx-4 rounded-lg overflow-hidden"
        style={{
          background: "#0D0F12",
          border: "0.5px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="font-[family-name:var(--font-share-tech-mono)] text-[10px] text-[#555] uppercase tracking-[1px]">
            joey@portfolio ~
          </span>
          <button
            onClick={() => setOpen(false)}
            className="text-[#555] hover:text-white text-xs transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Output */}
        <div
          ref={scrollRef}
          className="p-4 overflow-y-auto font-[family-name:var(--font-share-tech-mono)] text-[12px] leading-[1.8]"
          style={{ maxHeight: "400px", color: "#888" }}
        >
          {lines.map((line, i) => (
            <pre key={i} className="whitespace-pre-wrap">
              {line.startsWith(">") ? (
                <span>
                  <span className="text-[#00E5A0]">{line.slice(0, 1)}</span>
                  <span className="text-white">{line.slice(1)}</span>
                </span>
              ) : (
                line
              )}
            </pre>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center px-4 pb-4">
          <span className="font-[family-name:var(--font-share-tech-mono)] text-[12px] text-[#00E5A0] mr-2">
            &gt;
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none font-[family-name:var(--font-share-tech-mono)] text-[12px] text-white"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
