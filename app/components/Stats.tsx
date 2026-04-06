"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 47, suffix: "", label: "Peer-reviewed Publications" },
  { value: 6, suffix: "", label: "Active Research Projects" },
  { value: 4.2, suffix: "M", label: "in Research Funding", prefix: "$" },
  { value: 18, suffix: "+", label: "Research Partners Worldwide" },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const isDecimal = target % 1 !== 0;
    const timer = setInterval(() => {
      start += target / (duration / 16);
      if (start >= target) {
        setVal(target);
        clearInterval(timer);
      } else {
        setVal(isDecimal ? Math.round(start * 10) / 10 : Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return val;
}

function StatItem({
  value, suffix, label, prefix, active, delay,
}: {
  value: number; suffix: string; label: string;
  prefix?: string; active: boolean; delay: number;
}) {
  const [started, setStarted] = useState(false);
  const counted = useCountUp(value, 1400, started);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);

  const display = started ? value : counted;
  const formatted = value % 1 !== 0 ? display.toFixed(1) : display.toString();

  return (
    <div className="flex flex-col items-center text-center px-6 py-8">
      <div className="text-4xl md:text-5xl font-black text-black tracking-tight tabular-nums">
        {prefix && <span>{prefix}</span>}
        {formatted}
        {suffix && <span>{suffix}</span>}
      </div>
      <div className="mt-2 text-xs text-gray-500 font-medium tracking-widest uppercase">
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
          {STATS.map((s, i) => (
            <StatItem
              key={i}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              prefix={s.prefix}
              active={visible}
              delay={i * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
