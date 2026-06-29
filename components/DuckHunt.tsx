"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type Bot = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: "rising" | "flying" | "hit";
  size: number;
  hitTime: number;
};

const HIT_MSGS = ["// target neutralized", "// bot.terminate()", "// rm -rf ballbot", "// segfault squashed", "// pid killed", "// exception handled"];
const MISS_MSGS = ["// ...missed", "// try/catch failed", "// 404: target not found", "// undefined behavior"];
const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

function drawBot(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, hit: boolean) {
  ctx.save();
  ctx.translate(x, y);
  if (hit) {
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(Math.cos(a) * s * 0.8, Math.sin(a) * s * 0.8, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#00E5A0";
      ctx.fill();
    }
    ctx.restore();
    return;
  }
  // Ball
  ctx.beginPath(); ctx.arc(0, s * 0.35, s * 0.35, 0, Math.PI * 2);
  ctx.fillStyle = "#252830"; ctx.fill();
  ctx.strokeStyle = "#00E5A0"; ctx.lineWidth = 1.5; ctx.stroke();
  // Neck
  ctx.beginPath(); ctx.moveTo(-3, 0); ctx.lineTo(-2, -s * 0.15); ctx.lineTo(2, -s * 0.15); ctx.lineTo(3, 0);
  ctx.fillStyle = "#252830"; ctx.fill();
  // Head
  ctx.beginPath(); ctx.arc(0, -s * 0.3, s * 0.28, 0, Math.PI * 2);
  ctx.fillStyle = "#1e2128"; ctx.fill();
  ctx.strokeStyle = "#00E5A0"; ctx.lineWidth = 1.5; ctx.stroke();
  // Visor
  ctx.beginPath(); ctx.ellipse(0, -s * 0.32, s * 0.18, s * 0.12, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,229,160,0.08)"; ctx.fill();
  ctx.strokeStyle = "rgba(0,229,160,0.4)"; ctx.lineWidth = 0.5; ctx.stroke();
  // Eyes
  for (const side of [-1, 1]) {
    ctx.beginPath(); ctx.arc(side * s * 0.08, -s * 0.33, s * 0.07, 0, Math.PI * 2);
    ctx.fillStyle = "#00E5A0"; ctx.fill();
    ctx.beginPath(); ctx.arc(side * s * 0.08, -s * 0.33, s * 0.03, 0, Math.PI * 2);
    ctx.fillStyle = "#0D0F12"; ctx.fill();
  }
  // Antenna
  ctx.beginPath(); ctx.moveTo(0, -s * 0.58); ctx.lineTo(0, -s * 0.75);
  ctx.strokeStyle = "#00E5A0"; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, -s * 0.75, 3, 0, Math.PI * 2);
  ctx.fillStyle = "#00E5A0"; ctx.fill();
  // Glow around whole bot
  ctx.beginPath(); ctx.arc(0, 0, s * 0.6, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(0,229,160,0.1)"; ctx.lineWidth = 1; ctx.stroke();
  ctx.restore();
}

export function DuckHunt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<"idle" | "playing" | "over">("idle");
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [msg, setMsg] = useState("");
  const cleanup = useRef<(() => void) | null>(null);

  const launch = useCallback(() => {
    setMode("playing");
    setScore(0);
    setMisses(0);
    setMsg("");
  }, []);

  useEffect(() => {
    if (mode !== "playing") return;

    // Wait a frame for the canvas to mount and get dimensions
    const timer = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const r = canvas.getBoundingClientRect();
      const W = Math.round(r.width) || 800;
      const H = Math.round(r.height) || 360;
      canvas.width = W * 2;
      canvas.height = H * 2;
      ctx.scale(2, 2);

      let bots: Bot[] = [];
      let nextId = 0;
      let mx = W / 2, my = H / 2;
      let sc = 0, mi = 0;
      let spawnTimer = 0;
      let spawned = 0;
      let laughFrames = 0;
      let dead = false;
      let animId: number;

      const spawn = () => {
        const side = Math.random() > 0.5 ? 1 : -1;
        bots.push({
          id: nextId++,
          x: W * 0.2 + Math.random() * W * 0.6,
          y: H + 30,
          vx: (1 + Math.random() * 1.5) * side,
          vy: -(2 + Math.random() * 1.5),
          phase: "rising",
          size: 30 + Math.random() * 10,
          hitTime: 0,
        });
      };

      const onMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mx = (e.clientX - rect.left) * (W / rect.width);
        my = (e.clientY - rect.top) * (H / rect.height);
      };

      const onClick = () => {
        if (dead) return;
        let hit = false;
        for (const b of bots) {
          if (b.phase === "hit") continue;
          const dx = mx - b.x, dy = my - b.y;
          if (Math.sqrt(dx * dx + dy * dy) < b.size * 1.3) {
            b.phase = "hit"; b.hitTime = Date.now();
            sc += 100; setScore(sc); setMsg(pick(HIT_MSGS));
            hit = true; break;
          }
        }
        if (!hit) {
          mi++; setMisses(mi); setMsg(pick(MISS_MSGS));
          laughFrames = 60;
          if (mi >= 3) { dead = true; setMode("over"); }
        }
      };

      canvas.addEventListener("mousemove", onMove);
      canvas.addEventListener("click", onClick);

      spawn(); // first bot immediately

      const loop = () => {
        if (dead) return;
        ctx.clearRect(0, 0, W, H);

        if (laughFrames > 0) laughFrames--;
        spawnTimer++;
        if (spawnTimer > 50 && spawned < 10) { spawn(); spawned++; spawnTimer = 0; }

        bots = bots.filter((b) => {
          if (b.phase === "rising") {
            b.y += b.vy; b.x += b.vx * 0.3;
            if (b.y < H * 0.5) b.phase = "flying";
          } else if (b.phase === "flying") {
            b.x += b.vx; b.y += Math.sin(Date.now() * 0.003 + b.id) * 0.7;
            if (b.x < -60 || b.x > W + 60) return false;
          } else if (b.phase === "hit") {
            b.y += 4;
            if (Date.now() - b.hitTime > 400) return false;
          }
          drawBot(ctx, b.x, b.y, b.size, b.phase === "hit");
          return true;
        });

        // Astronaut
        ctx.save(); ctx.translate(W / 2, H - 12);
        ctx.fillStyle = laughFrames > 0 ? "#333" : "#222";
        ctx.beginPath(); ctx.arc(0, -12, 14, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = laughFrames > 0 ? "#666" : "#333";
        ctx.beginPath(); ctx.arc(-4, -14, 2, 0, Math.PI * 2); ctx.arc(4, -14, 2, 0, Math.PI * 2); ctx.fill();
        if (laughFrames > 0) { ctx.beginPath(); ctx.arc(0, -9, 4, 0, Math.PI); ctx.strokeStyle = "#666"; ctx.lineWidth = 1.5; ctx.stroke(); }
        ctx.restore();

        // Crosshair
        ctx.strokeStyle = "rgba(0,229,160,0.6)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(mx, my, 12, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mx - 18, my); ctx.lineTo(mx - 6, my);
        ctx.moveTo(mx + 6, my); ctx.lineTo(mx + 18, my);
        ctx.moveTo(mx, my - 18); ctx.lineTo(mx, my - 6);
        ctx.moveTo(mx, my + 6); ctx.lineTo(mx, my + 18);
        ctx.stroke();
        ctx.beginPath(); ctx.arc(mx, my, 1.5, 0, Math.PI * 2); ctx.fillStyle = "#00E5A0"; ctx.fill();

        animId = requestAnimationFrame(loop);
      };

      animId = requestAnimationFrame(loop);

      cleanup.current = () => {
        canvas.removeEventListener("mousemove", onMove);
        canvas.removeEventListener("click", onClick);
        cancelAnimationFrame(animId);
      };
    });

    return () => {
      cancelAnimationFrame(timer);
      cleanup.current?.();
    };
  }, [mode]);

  if (mode === "idle") {
    return (
      <div className="flex justify-center py-8">
        <button
          onClick={launch}
          className="font-[family-name:var(--font-share-tech-mono)] text-[11px] uppercase tracking-[1.5px] px-6 py-3 rounded transition-all duration-300 hover:border-[#00E5A0] hover:text-[#00E5A0]"
          style={{ border: "0.5px solid rgba(255,255,255,0.15)", color: "#777" }}
        >
          &#9654; Launch Bot Hunt
        </button>
      </div>
    );
  }

  return (
    <div className="relative rounded-lg overflow-hidden" style={{ border: "0.5px solid rgba(255,255,255,0.06)", zIndex: 60, position: "relative" }}>
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2" style={{ background: "rgba(13,15,18,0.8)", zIndex: 70 }}>
        <div className="font-[family-name:var(--font-share-tech-mono)] text-[11px] text-[#00E5A0] tracking-[1px]">SCORE: {score}</div>
        <div className="font-[family-name:var(--font-share-tech-mono)] text-[10px] text-[#555] tracking-[1px]">{msg}</div>
        <div className="flex items-center gap-3">
          <div className="font-[family-name:var(--font-share-tech-mono)] text-[11px] tracking-[1px]">
            {[0, 1, 2].map((i) => <span key={i} style={{ color: i < misses ? "#E31837" : "#333" }}>&#10005; </span>)}
          </div>
          <button onClick={() => setMode("idle")} className="font-[family-name:var(--font-share-tech-mono)] text-[9px] text-[#555] hover:text-white uppercase tracking-[1px] transition-colors">[EXIT]</button>
        </div>
      </div>

      <canvas ref={canvasRef} className="w-full cursor-none block" style={{ height: "360px", background: "#0D0F12", position: "relative", zIndex: 60 }} />

      {mode === "over" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: "rgba(13,15,18,0.85)", zIndex: 80 }}>
          <p className="font-[family-name:var(--font-share-tech-mono)] text-[11px] text-[#E31837] uppercase tracking-[2px] mb-2">// process terminated</p>
          <p className="font-[family-name:var(--font-chakra-petch)] font-bold text-[32px] text-white mb-1">{score}</p>
          <p className="font-[family-name:var(--font-share-tech-mono)] text-[10px] text-[#555] uppercase tracking-[1.5px] mb-6">bots eliminated</p>
          <button
            onClick={launch}
            className="font-[family-name:var(--font-share-tech-mono)] text-[11px] uppercase tracking-[1.5px] px-6 py-3 rounded transition-all duration-300 hover:border-[#00E5A0] hover:text-[#00E5A0]"
            style={{ border: "0.5px solid rgba(255,255,255,0.15)", color: "#777" }}
          >&#8634; Restart</button>
        </div>
      )}
    </div>
  );
}
