"use client";

import { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  depth: number; // 0=back, 1=front
  baseOpacity: number;
  pulseOffset: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  createdAt: number;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const [visible, setVisible] = useState(false);

  // Staggered text entrance
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", onMouseMove);

    // Ripples on click
    const ripples: Ripple[] = [];
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: 180,
        alpha: 0.6,
        createdAt: performance.now(),
      });
    };
    canvas.addEventListener("click", onClick);

    // Build nodes with depth layers
    const COUNT_BACK = 50;
    const COUNT_FRONT = 35;
    const nodes: Node[] = [];

    for (let i = 0; i < COUNT_BACK; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 0.4,
        depth: 0,
        baseOpacity: 0.2 + Math.random() * 0.2,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    for (let i = 0; i < COUNT_FRONT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        r: Math.random() * 2.5 + 1,
        depth: 1,
        baseOpacity: 0.45 + Math.random() * 0.3,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    const CONNECT_DIST_BACK = 110;
    const CONNECT_DIST_FRONT = 150;
    const MOUSE_ATTRACT_DIST = 200;
    const MOUSE_ATTRACT_FORCE = 0.012;

    let animId: number;
    let t = 0;

    const draw = (now: number) => {
      t = now * 0.001;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // --- Update nodes ---
      nodes.forEach((n) => {
        // Mouse attraction
        const dx = mx - n.x;
        const dy = my - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_ATTRACT_DIST && dist > 0) {
          const force = ((MOUSE_ATTRACT_DIST - dist) / MOUSE_ATTRACT_DIST) * MOUSE_ATTRACT_FORCE * (n.depth + 0.5);
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
        }

        // Dampen velocity
        n.vx *= 0.99;
        n.vy *= 0.99;

        // Clamp speed
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        const maxSpeed = n.depth === 1 ? 1.2 : 0.6;
        if (speed > maxSpeed) {
          n.vx = (n.vx / speed) * maxSpeed;
          n.vy = (n.vy / speed) * maxSpeed;
        }

        n.x += n.vx;
        n.y += n.vy;

        // Wrap around edges (softer)
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      });

      // --- Draw edges ---
      const count = nodes.length;
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const a = nodes[i];
          const b = nodes[j];
          // Only connect within same depth layer or adjacent
          if (Math.abs(a.depth - b.depth) > 0.5) continue;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          const maxDist = a.depth === 1 ? CONNECT_DIST_FRONT : CONNECT_DIST_BACK;
          if (dist2 > maxDist * maxDist) continue;

          const dist = Math.sqrt(dist2);
          const alpha = (1 - dist / maxDist) * (a.depth === 1 ? 0.25 : 0.1);

          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(255,255,255,${alpha * (0.8 + 0.2 * Math.sin(t * 1.2 + a.pulseOffset))})`);
          grad.addColorStop(1, `rgba(255,255,255,${alpha * (0.8 + 0.2 * Math.sin(t * 1.2 + b.pulseOffset))})`);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = a.depth === 1 ? 0.7 : 0.35;
          ctx.stroke();
        }
      }

      // --- Draw nodes ---
      nodes.forEach((n) => {
        const pulse = 0.8 + 0.2 * Math.sin(t * 2 + n.pulseOffset);
        const op = n.baseOpacity * pulse;
        const r = n.r * (0.9 + 0.1 * pulse);

        if (n.depth === 1) {
          // Glow for front nodes
          const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
          grd.addColorStop(0, `rgba(255,255,255,${op * 0.5})`);
          grd.addColorStop(1, `rgba(255,255,255,0)`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${op})`;
        ctx.fill();
      });

      // --- Draw mouse proximity highlight ---
      if (mx > 0 && mx < width) {
        const grd = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_ATTRACT_DIST);
        grd.addColorStop(0, "rgba(255,255,255,0.04)");
        grd.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(mx, my, MOUSE_ATTRACT_DIST, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // --- Draw ripples ---
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        const elapsed = (now - rip.createdAt) / 1000;
        rip.radius = rip.maxRadius * Math.min(elapsed * 1.8, 1);
        rip.alpha = Math.max(0, 0.55 * (1 - elapsed * 1.4));

        if (rip.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${rip.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Second ring slightly behind
        if (rip.radius > 20) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${rip.alpha * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dxt-black"
    >
      {/* Particle canvas — interactive */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: "crosshair" }}
      />

      {/* Layered radial glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(255,255,255,0.06),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_50%,rgba(255,255,255,0.03),transparent)]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 neural-grid opacity-30" />

      {/* Content with staggered entrance */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto select-none">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 border border-white/30 rounded-full text-xs text-white tracking-widest uppercase transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "0ms",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Biocomputing Research
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none mb-6 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "150ms",
          }}
        >
          Where Biology
          <br />
          <span className="text-white">Meets Computing</span>
        </h1>

        {/* Subtext */}
        <p
          className="text-lg md:text-xl text-dxt-muted max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "300ms",
          }}
        >
          We bridge the gap between neuroscience and computer science, harnessing
          the computational power of biological neural networks to build the next
          generation of adaptive systems.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "450ms",
          }}
        >
          <a
            href="#research"
            className="px-8 py-3.5 bg-white text-black font-semibold rounded hover:bg-white/90 transition-colors duration-200 text-sm"
          >
            Explore Research
          </a>
          <a
            href="#team"
            className="px-8 py-3.5 border border-white/20 text-white font-semibold rounded hover:border-white/40 hover:bg-white/5 transition-all duration-200 text-sm"
          >
            Meet the Team
          </a>
        </div>

        {/* Scroll hint */}
        <div
          className="mt-16 flex flex-col items-center gap-2 transition-all duration-700"
          style={{
            opacity: visible ? 0.4 : 0,
            transitionDelay: "700ms",
          }}
        >
          <span className="text-xs text-white font-mono tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dxt-black to-transparent" />
    </section>
  );
}
