"use client";

import { useRef, useEffect } from "react";

export function BallbotFollower({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const bot = useRef({ x: 0, y: 0, lean: 0, targetLean: 0, eyeX: 0, eyeY: 0, wobble: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 200;
    const H = 200;
    canvas.width = W * 2;
    canvas.height = H * 2;
    ctx.scale(2, 2);

    const centerX = W / 2;
    const centerY = H / 2 + 20;
    const ballR = 24;
    const bodyR = 18;
    const bodyY = centerY - ballR - bodyR + 4;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: (e.clientX - rect.left) * (W / rect.width),
        y: (e.clientY - rect.top) * (H / rect.height),
      };
    };

    canvas.addEventListener("mousemove", onMove);

    let animId: number;

    const draw = () => {
      const b = bot.current;
      const m = mouse.current;

      // Calculate lean toward mouse
      const dx = m.x - centerX;
      const dy = m.y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxLean = 0.25;
      b.targetLean = (dx / W) * maxLean * 2;

      // Wobble from fast mouse movement
      const mouseDx = m.x - lastMouse.current.x;
      const mouseDy = m.y - lastMouse.current.y;
      const speed = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
      b.wobble += (speed * 0.02 - b.wobble) * 0.1;
      b.wobble *= 0.95;
      lastMouse.current = { ...m };

      // Smooth lean
      b.lean += (b.targetLean + Math.sin(Date.now() * 0.003) * b.wobble * 0.3 - b.lean) * 0.08;

      // Eye tracking
      const eyeTargetX = Math.max(-3, Math.min(3, dx * 0.03));
      const eyeTargetY = Math.max(-2, Math.min(2, dy * 0.02));
      b.eyeX += (eyeTargetX - b.eyeX) * 0.1;
      b.eyeY += (eyeTargetY - b.eyeY) * 0.1;

      // Clear
      ctx.clearRect(0, 0, W, H);

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(b.lean);
      ctx.translate(-centerX, -centerY);

      // Shadow
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + ballR + 6, ballR * 0.8, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,229,160,0.06)";
      ctx.fill();

      // Ball
      ctx.beginPath();
      ctx.arc(centerX, centerY, ballR, 0, Math.PI * 2);
      ctx.fillStyle = "#1a1d22";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,229,160,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Ball center ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, ballR * 0.4, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,229,160,0.15)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Neck
      ctx.beginPath();
      ctx.moveTo(centerX - 4, centerY - ballR + 2);
      ctx.lineTo(centerX - 3, bodyY + bodyR - 2);
      ctx.lineTo(centerX + 3, bodyY + bodyR - 2);
      ctx.lineTo(centerX + 4, centerY - ballR + 2);
      ctx.fillStyle = "#1a1d22";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,229,160,0.2)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Body (head)
      ctx.beginPath();
      ctx.arc(centerX, bodyY, bodyR, 0, Math.PI * 2);
      ctx.fillStyle = "#12151a";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,229,160,0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Visor
      ctx.beginPath();
      ctx.ellipse(centerX, bodyY - 2, bodyR * 0.65, bodyR * 0.45, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,229,160,0.04)";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,229,160,0.2)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Eyes
      const eyeSpacing = 6;
      const eyeBaseY = bodyY - 3;
      for (const side of [-1, 1]) {
        // Eye socket
        ctx.beginPath();
        ctx.arc(centerX + side * eyeSpacing + b.eyeX, eyeBaseY + b.eyeY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#00E5A0";
        ctx.globalAlpha = 0.8;
        ctx.fill();

        // Pupil
        ctx.beginPath();
        ctx.arc(centerX + side * eyeSpacing + b.eyeX * 1.3, eyeBaseY + b.eyeY * 1.3, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#0D0F12";
        ctx.globalAlpha = 1;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Antenna
      const antennaBaseY = bodyY - bodyR;
      ctx.beginPath();
      ctx.moveTo(centerX, antennaBaseY);
      ctx.lineTo(centerX + b.wobble * 8, antennaBaseY - 10);
      ctx.strokeStyle = "rgba(0,229,160,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Antenna tip
      ctx.beginPath();
      ctx.arc(centerX + b.wobble * 8, antennaBaseY - 10, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#00E5A0";
      ctx.globalAlpha = 0.5 + Math.sin(Date.now() * 0.005) * 0.3;
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.restore();

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      canvas.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`cursor-none ${className}`}
      style={{ width: 200, height: 200 }}
    />
  );
}
