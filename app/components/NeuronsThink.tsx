"use client";

import { useEffect, useRef, useState } from "react";

const BASE_STATS = [
  { base: 12847, label: "Active Neurons", unit: "cells", variance: 50, barWidth: 72 },
  { base: 647, label: "Signal Frequency", unit: "Hz", variance: 8, barWidth: 55 },
  { base: 96.2, label: "Pattern Accuracy", unit: "recognition", variance: 0.3, barWidth: 88, isPercent: true },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start * 10) / 10);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return value;
}

function LiveStat({
  base,
  label,
  unit,
  variance,
  barWidth,
  isPercent,
  active,
  delay,
}: {
  base: number;
  label: string;
  unit: string;
  variance: number;
  barWidth: number;
  isPercent?: boolean;
  active: boolean;
  delay: number;
}) {
  const [live, setLive] = useState(base);
  const [started, setStarted] = useState(false);
  const counted = useCountUp(base, 1200 + delay, started);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);

  // fluctuate after count-up completes
  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.5) * 2 * variance;
      setLive(
        isPercent
          ? Math.round((base + delta) * 10) / 10
          : Math.round(base + delta)
      );
    }, 1800 + Math.random() * 1200);
    return () => clearInterval(interval);
  }, [started, base, variance, isPercent]);

  const display = started ? live : counted;
  const formatted = isPercent
    ? `${display.toFixed(1)}%`
    : display.toLocaleString();

  return (
    <div className="group">
      <div className="flex items-baseline gap-3 mb-2">
        <span
          className="text-5xl font-black text-white tracking-tight tabular-nums transition-all duration-700"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {formatted}
        </span>
        <span className="text-white text-sm font-mono uppercase tracking-wider">
          {unit}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10">
          <div
            className="h-full bg-white transition-all duration-1000 ease-out"
            style={{ width: active ? `${barWidth}%` : "0%" }}
          />
        </div>
        <span className="text-sm text-dxt-muted">{label}</span>
      </div>
    </div>
  );
}

// Node positions used both in SVG and for the pulse animation
const NODES = [
  // outer
  { cx: 250, cy: 50, r: 5 },
  { cx: 400, cy: 130, r: 4 },
  { cx: 450, cy: 280, r: 4 },
  { cx: 380, cy: 420, r: 4 },
  { cx: 250, cy: 460, r: 5 },
  { cx: 120, cy: 420, r: 4 },
  { cx: 50, cy: 280, r: 4 },
  { cx: 100, cy: 130, r: 4 },
  // mid
  { cx: 250, cy: 120, r: 4 },
  { cx: 360, cy: 180, r: 3.5 },
  { cx: 380, cy: 290, r: 3.5 },
  { cx: 310, cy: 380, r: 3.5 },
  { cx: 190, cy: 380, r: 3.5 },
  { cx: 120, cy: 290, r: 3.5 },
  { cx: 140, cy: 180, r: 3.5 },
  // inner
  { cx: 250, cy: 170, r: 4 },
  { cx: 320, cy: 210, r: 3 },
  { cx: 340, cy: 290, r: 3 },
  { cx: 290, cy: 340, r: 3 },
  { cx: 210, cy: 340, r: 3 },
  { cx: 160, cy: 290, r: 3 },
  { cx: 180, cy: 210, r: 3 },
];

export default function NeuronsThink() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // randomly fire node pulse
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setActiveNode(Math.floor(Math.random() * NODES.length));
      setTimeout(() => setActiveNode(null), 400);
    }, 600);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section ref={sectionRef} className="bg-dxt-black py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Neural visualization */}
          <div className="relative">
            <div className="aspect-square max-w-lg mx-auto relative">
              {/* Background glow */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)]" />

              <svg
                viewBox="0 0 500 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Outer decorative rings */}
                <circle cx="250" cy="250" r="230" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" />
                <circle cx="250" cy="250" r="200" stroke="#ffffff" strokeWidth="0.3" opacity="0.08" strokeDasharray="4 8" />

                {/* Connections - outer to mid */}
                <line x1="250" y1="50" x2="250" y2="120" stroke="#ffffff" strokeWidth="0.6" opacity="0.25" />
                <line x1="400" y1="130" x2="360" y2="180" stroke="#ffffff" strokeWidth="0.6" opacity="0.25" />
                <line x1="450" y1="280" x2="380" y2="290" stroke="#ffffff" strokeWidth="0.6" opacity="0.25" />
                <line x1="380" y1="420" x2="310" y2="380" stroke="#ffffff" strokeWidth="0.6" opacity="0.25" />
                <line x1="250" y1="460" x2="250" y2="380" stroke="#ffffff" strokeWidth="0.6" opacity="0.25" />
                <line x1="120" y1="420" x2="190" y2="380" stroke="#ffffff" strokeWidth="0.6" opacity="0.25" />
                <line x1="50" y1="280" x2="120" y2="290" stroke="#ffffff" strokeWidth="0.6" opacity="0.25" />
                <line x1="100" y1="130" x2="140" y2="180" stroke="#ffffff" strokeWidth="0.6" opacity="0.25" />

                {/* Connections - mid to inner */}
                <line x1="250" y1="120" x2="250" y2="170" stroke="#ffffff" strokeWidth="0.8" opacity="0.35" />
                <line x1="360" y1="180" x2="320" y2="210" stroke="#ffffff" strokeWidth="0.8" opacity="0.35" />
                <line x1="380" y1="290" x2="340" y2="290" stroke="#ffffff" strokeWidth="0.8" opacity="0.35" />
                <line x1="310" y1="380" x2="290" y2="340" stroke="#ffffff" strokeWidth="0.8" opacity="0.35" />
                <line x1="190" y1="380" x2="210" y2="340" stroke="#ffffff" strokeWidth="0.8" opacity="0.35" />
                <line x1="120" y1="290" x2="160" y2="290" stroke="#ffffff" strokeWidth="0.8" opacity="0.35" />
                <line x1="140" y1="180" x2="180" y2="210" stroke="#ffffff" strokeWidth="0.8" opacity="0.35" />

                {/* Connections - inner to center */}
                <line x1="250" y1="170" x2="250" y2="238" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
                <line x1="320" y1="210" x2="262" y2="242" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
                <line x1="340" y1="290" x2="270" y2="258" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
                <line x1="290" y1="340" x2="258" y2="262" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
                <line x1="210" y1="340" x2="242" y2="262" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
                <line x1="160" y1="290" x2="230" y2="258" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
                <line x1="180" y1="210" x2="238" y2="242" stroke="#ffffff" strokeWidth="1" opacity="0.5" />

                {/* Cross connections */}
                <line x1="250" y1="170" x2="320" y2="210" stroke="#ffffff" strokeWidth="0.4" opacity="0.15" />
                <line x1="320" y1="210" x2="340" y2="290" stroke="#ffffff" strokeWidth="0.4" opacity="0.15" />
                <line x1="340" y1="290" x2="290" y2="340" stroke="#ffffff" strokeWidth="0.4" opacity="0.15" />
                <line x1="290" y1="340" x2="210" y2="340" stroke="#ffffff" strokeWidth="0.4" opacity="0.15" />
                <line x1="210" y1="340" x2="160" y2="290" stroke="#ffffff" strokeWidth="0.4" opacity="0.15" />
                <line x1="160" y1="290" x2="180" y2="210" stroke="#ffffff" strokeWidth="0.4" opacity="0.15" />
                <line x1="180" y1="210" x2="250" y2="170" stroke="#ffffff" strokeWidth="0.4" opacity="0.15" />

                {/* Animated nodes */}
                {NODES.map((node, i) => (
                  <g key={i}>
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={node.r}
                      fill="#ffffff"
                      opacity={activeNode === i ? 1 : 0.6}
                      style={{ transition: "opacity 0.3s, r 0.3s" }}
                    />
                    {activeNode === i && (
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={node.r * 3}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="0.8"
                        opacity="0.4"
                      >
                        <animate
                          attributeName="r"
                          from={node.r}
                          to={node.r * 4}
                          dur="0.4s"
                          fill="freeze"
                        />
                        <animate
                          attributeName="opacity"
                          from="0.6"
                          to="0"
                          dur="0.4s"
                          fill="freeze"
                        />
                      </circle>
                    )}
                  </g>
                ))}

                {/* Center node */}
                <circle cx="250" cy="250" r="12" fill="#ffffff" opacity="0.9">
                  <animate
                    attributeName="opacity"
                    values="0.9;0.5;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="250" cy="250" r="20" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.3" />
                <circle cx="250" cy="250" r="30" stroke="#ffffff" strokeWidth="0.5" fill="none" opacity="0.15">
                  <animate
                    attributeName="r"
                    values="30;38;30"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.15;0.05;0.15"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>

              {/* Floating labels */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-white font-mono opacity-60">
                cortex-layer-7
              </div>
              <div className="absolute bottom-8 right-8 text-xs text-white font-mono opacity-60">
                synapse-active
              </div>
            </div>
          </div>

          {/* Right: Stats */}
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-white">
                Live Data
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Watch Neurons Think
            </h2>
            <p className="text-dxt-muted mb-12 leading-relaxed">
              In our lab, we observe biological neural networks in real-time,
              capturing their computational patterns and translating them into
              algorithms that power the next generation of adaptive systems.
            </p>

            <div className="space-y-8">
              {BASE_STATS.map((stat, i) => (
                <LiveStat
                  key={i}
                  base={stat.base}
                  label={stat.label}
                  unit={stat.unit}
                  variance={stat.variance}
                  barWidth={stat.barWidth}
                  isPercent={stat.isPercent}
                  active={visible}
                  delay={i * 200}
                />
              ))}
            </div>

            <div className="mt-10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs text-dxt-muted font-mono">
                Recording in progress — Lab 3, Node B
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
