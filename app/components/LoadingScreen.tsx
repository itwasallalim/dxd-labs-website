"use client";

import { useEffect, useState } from "react";

const NODES = [0, 1, 2, 3, 4, 5];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1200);
    const hideTimer = setTimeout(() => setVisible(false), 1700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes orbitPulse {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 60; }
          to { stroke-dashoffset: 0; }
        }
        .orbit-node {
          animation: orbitPulse 1.2s ease-in-out infinite;
        }
      `}</style>
      <div
        className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-500 ${
          fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* SVG orbital animation */}
        <svg width="96" height="96" viewBox="0 0 96 96" className="mb-8">
          {/* Outer ring */}
          <circle cx="48" cy="48" r="38" stroke="white" strokeWidth="0.4" fill="none" opacity="0.15" />
          {/* Orbit nodes */}
          {NODES.map((i) => {
            const angle = (i / NODES.length) * 2 * Math.PI - Math.PI / 2;
            const x = 48 + 38 * Math.cos(angle);
            const y = 48 + 38 * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill="white"
                className="orbit-node"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            );
          })}
          {/* Spokes */}
          {NODES.map((i) => {
            const angle = (i / NODES.length) * 2 * Math.PI - Math.PI / 2;
            const x = 48 + 38 * Math.cos(angle);
            const y = 48 + 38 * Math.sin(angle);
            return (
              <line
                key={i}
                x1="48" y1="48"
                x2={x} y2={y}
                stroke="white"
                strokeWidth="0.5"
                opacity="0.2"
                strokeDasharray="60"
                style={{
                  animation: `drawLine 0.4s ease-out ${i * 0.1}s both`,
                }}
              />
            );
          })}
          {/* Center dot */}
          <circle cx="48" cy="48" r="5" fill="white" opacity="0.9" />
          <circle cx="48" cy="48" r="8" stroke="white" strokeWidth="0.8" fill="none" opacity="0.3" />
        </svg>

        <span className="font-mono text-white text-xs tracking-[0.3em] uppercase opacity-50">
          DXTLabs
        </span>
      </div>
    </>
  );
}
