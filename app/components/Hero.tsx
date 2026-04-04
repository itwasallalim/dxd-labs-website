"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Neuron {
  x: number;
  y: number;
  r: number;
  connections: number[];
  state: "resting" | "firing" | "refractory";
  fireTime: number;
  refractoryDuration: number;
  firingThreshold: number; // probability of cascading when signal arrives
  baseOpacity: number;
  pulseOffset: number;
  vx: number; // slow drift
  vy: number;
}

interface Signal {
  fromIdx: number;
  toIdx: number;
  progress: number; // 0 → 1
  speed: number; // progress-units / sec
  trail: { x: number; y: number; age: number }[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NEURON_COUNT = 110;
const MAX_CONNECT_DIST = 165;
const MAX_CONNECTIONS = 7;
const FIRE_DURATION_MS = 180;
const REFRACTORY_BASE_MS = 900;
const SPONTANEOUS_RATE_MS = 1100; // avg ms between spontaneous fires

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Mouse ──
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    // ── Click burst ──
    const onClickBurst = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const cx = e.clientX - r.left;
      const cy = e.clientY - r.top;
      neurons.forEach((n, i) => {
        const d = Math.hypot(n.x - cx, n.y - cy);
        if (d < 120 && n.state === "resting") fireNeuron(i, performance.now());
      });
    };
    canvas.addEventListener("click", onClickBurst);

    // ── Build neurons ──
    const neurons: Neuron[] = [];
    for (let i = 0; i < NEURON_COUNT; i++) {
      neurons.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 1.2 + Math.random() * 2.2,
        connections: [],
        state: "resting",
        fireTime: 0,
        refractoryDuration: REFRACTORY_BASE_MS + Math.random() * 500,
        firingThreshold: 0.25 + Math.random() * 0.45,
        baseOpacity: 0.25 + Math.random() * 0.35,
        pulseOffset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      });
    }

    // ── Build connections (spatial, capped) ──
    const buildConnections = () => {
      neurons.forEach((n) => (n.connections = []));
      for (let i = 0; i < NEURON_COUNT; i++) {
        for (let j = i + 1; j < NEURON_COUNT; j++) {
          if (neurons[i].connections.length >= MAX_CONNECTIONS) break;
          if (neurons[j].connections.length >= MAX_CONNECTIONS) continue;
          const dx = neurons[i].x - neurons[j].x;
          const dy = neurons[i].y - neurons[j].y;
          if (dx * dx + dy * dy < MAX_CONNECT_DIST * MAX_CONNECT_DIST) {
            neurons[i].connections.push(j);
            neurons[j].connections.push(i);
          }
        }
      }
    };
    buildConnections();

    // ── Fire a neuron ──
    const signals: Signal[] = [];
    const fireNeuron = (idx: number, now: number) => {
      const n = neurons[idx];
      if (n.state !== "resting") return;
      n.state = "firing";
      n.fireTime = now;
      n.connections.forEach((j) => {
        signals.push({
          fromIdx: idx,
          toIdx: j,
          progress: 0,
          speed: 0.55 + Math.random() * 0.5,
          trail: [],
        });
      });
    };

    let lastSpontaneous = 0;
    let animId: number;
    let prevNow = performance.now();

    const draw = (now: number) => {
      const dt = Math.min((now - prevNow) / 1000, 0.05);
      prevNow = now;
      const t = now * 0.001;

      ctx.clearRect(0, 0, W, H);

      // ── Slow drift ──
      neurons.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      // ── State transitions ──
      neurons.forEach((n) => {
        if (n.state === "firing" && now - n.fireTime > FIRE_DURATION_MS)
          n.state = "refractory";
        else if (
          n.state === "refractory" &&
          now - n.fireTime > n.refractoryDuration
        )
          n.state = "resting";
      });

      // ── Spontaneous firing ──
      if (now - lastSpontaneous > SPONTANEOUS_RATE_MS) {
        const resting = neurons.reduce<number[]>((a, n, i) => {
          if (n.state === "resting") a.push(i);
          return a;
        }, []);
        if (resting.length) {
          fireNeuron(resting[Math.floor(Math.random() * resting.length)], now);
        }
        lastSpontaneous = now + (Math.random() - 0.5) * 400;
      }

      // ── Mouse proximity ──
      const { x: mx, y: my } = mouseRef.current;
      if (mx > 0) {
        neurons.forEach((n, i) => {
          if (n.state !== "resting") return;
          const d = Math.hypot(n.x - mx, n.y - my);
          if (d < 90 && Math.random() < 0.006) fireNeuron(i, now);
        });
      }

      // ── Draw resting connection lines (very dim) ──
      for (let i = 0; i < NEURON_COUNT; i++) {
        const a = neurons[i];
        for (const j of a.connections) {
          if (j <= i) continue;
          const b = neurons[j];
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = "rgba(255,255,255,0.045)";
          ctx.lineWidth = 0.35;
          ctx.stroke();
        }
      }

      // ── Update & draw signals ──
      for (let i = signals.length - 1; i >= 0; i--) {
        const sig = signals[i];
        const from = neurons[sig.fromIdx];
        const to = neurons[sig.toIdx];

        // Current position
        const px = from.x + (to.x - from.x) * sig.progress;
        const py = from.y + (to.y - from.y) * sig.progress;

        // Record trail point
        sig.trail.push({ x: px, y: py, age: 0 });

        sig.progress += sig.speed * dt;

        // Age trail points
        sig.trail.forEach((pt) => (pt.age += dt));

        // Remove old trail
        while (sig.trail.length > 0 && sig.trail[0].age > 0.25)
          sig.trail.shift();

        // Signal arrived
        if (sig.progress >= 1) {
          if (to.state === "resting" && Math.random() < to.firingThreshold)
            fireNeuron(sig.toIdx, now);
          signals.splice(i, 1);
          continue;
        }

        // Draw lit-up connection line segment (from → current position)
        const gradient = ctx.createLinearGradient(from.x, from.y, px, py);
        gradient.addColorStop(0, "rgba(255,255,255,0)");
        gradient.addColorStop(0.6, "rgba(255,255,255,0.12)");
        gradient.addColorStop(1, "rgba(255,255,255,0.35)");
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(px, py);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Draw trail glow
        sig.trail.forEach((pt) => {
          const fade = 1 - pt.age / 0.25;
          const grd = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 5);
          grd.addColorStop(0, `rgba(180,210,255,${0.25 * fade})`);
          grd.addColorStop(1, "rgba(0,0,0,0)");
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        });

        // Signal particle core
        const particleGrd = ctx.createRadialGradient(px, py, 0, px, py, 9);
        particleGrd.addColorStop(0, "rgba(255,255,255,1)");
        particleGrd.addColorStop(0.3, "rgba(200,225,255,0.55)");
        particleGrd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(px, py, 9, 0, Math.PI * 2);
        ctx.fillStyle = particleGrd;
        ctx.fill();

        // Bright dot
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.fill();
      }

      // ── Draw neurons ──
      neurons.forEach((n) => {
        const pulse = 0.75 + 0.25 * Math.sin(t * 1.8 + n.pulseOffset);

        if (n.state === "firing") {
          const elapsed = now - n.fireTime;
          const prog = Math.min(elapsed / FIRE_DURATION_MS, 1);

          // Expanding ring
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + prog * 28, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${0.75 * (1 - prog)})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Second ring (slight delay)
          if (prog > 0.15) {
            const p2 = (prog - 0.15) / 0.85;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r + p2 * 16, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(200,220,255,${0.4 * (1 - p2)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }

          // Bright glow halo
          const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 9);
          halo.addColorStop(0, "rgba(255,255,255,0.95)");
          halo.addColorStop(0.2, "rgba(210,230,255,0.35)");
          halo.addColorStop(0.6, "rgba(180,210,255,0.08)");
          halo.addColorStop(1, "rgba(0,0,0,0)");
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 9, 0, Math.PI * 2);
          ctx.fillStyle = halo;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 1.6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,1)";
          ctx.fill();
        } else {
          // Resting / refractory
          const op =
            n.state === "refractory" ? 0.12 : n.baseOpacity * pulse;

          // Soft glow on brighter nodes
          if (op > 0.35) {
            const grd = ctx.createRadialGradient(
              n.x,
              n.y,
              0,
              n.x,
              n.y,
              n.r * 4
            );
            grd.addColorStop(0, `rgba(255,255,255,${op * 0.25})`);
            grd.addColorStop(1, "rgba(0,0,0,0)");
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * (n.state === "refractory" ? 0.65 : 1), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${op})`;
          ctx.fill();
        }
      });

      // ── Mouse glow ──
      if (mx > 0 && mx < W) {
        const mgrd = ctx.createRadialGradient(mx, my, 0, mx, my, 130);
        mgrd.addColorStop(0, "rgba(255,255,255,0.05)");
        mgrd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(mx, my, 130, 0, Math.PI * 2);
        ctx.fillStyle = mgrd;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClickBurst);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dxt-black"
    >
      {/* Neural simulation canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: "crosshair" }}
      />

      {/* Atmospheric glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_40%,rgba(255,255,255,0.055),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_25%_at_50%_50%,rgba(255,255,255,0.025),transparent)]" />

      {/* Grid */}
      <div className="absolute inset-0 neural-grid opacity-25" />

      {/* Staggered content entrance */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto select-none">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 border border-white/25 rounded-full text-xs text-white tracking-widest uppercase transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transitionDelay: "0ms",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Biocomputing Research
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none mb-6 transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(22px)",
            transitionDelay: "160ms",
          }}
        >
          Where Biology
          <br />
          <span className="text-white">Meets Computing</span>
        </h1>

        {/* Body */}
        <p
          className="text-lg md:text-xl text-dxt-muted max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "320ms",
          }}
        >
          We bridge the gap between neuroscience and computer science, harnessing
          the computational power of biological neural networks to build the next
          generation of adaptive systems.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "480ms",
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

        {/* Hint */}
        <div
          className="mt-14 flex flex-col items-center gap-2 transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 0.35 : 0,
            transitionDelay: "750ms",
          }}
        >
          <span className="text-[10px] text-white font-mono tracking-[0.2em] uppercase">
            move cursor · click to fire
          </span>
          <div className="w-px h-7 bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-dxt-black to-transparent" />
    </section>
  );
}
