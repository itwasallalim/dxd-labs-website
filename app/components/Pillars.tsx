const pillars = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="4" y="16" width="8" height="8" rx="2" fill="#111111" opacity="0.8" />
        <rect x="16" y="8" width="8" height="8" rx="2" fill="#111111" opacity="0.8" />
        <rect x="28" y="16" width="8" height="8" rx="2" fill="#111111" opacity="0.8" />
        <rect x="16" y="24" width="8" height="8" rx="2" fill="#111111" opacity="0.8" />
        <line x1="12" y1="20" x2="16" y2="12" stroke="#111111" strokeWidth="1" opacity="0.5" />
        <line x1="24" y1="12" x2="28" y2="20" stroke="#111111" strokeWidth="1" opacity="0.5" />
        <line x1="20" y1="16" x2="20" y2="24" stroke="#111111" strokeWidth="1" opacity="0.5" />
        <line x1="12" y1="20" x2="16" y2="28" stroke="#111111" strokeWidth="1" opacity="0.5" />
        <line x1="24" y1="28" x2="28" y2="20" stroke="#111111" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    title: "Organized Computing",
    subtitle: "Structured Neural Logic",
    description:
      "We architect computing systems that mirror the organized, hierarchical structure of biological neural pathways — enabling massively parallel processing with emergent intelligence at every layer.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <circle cx="20" cy="20" r="6" stroke="#111111" strokeWidth="1.5" opacity="0.8" />
        <circle cx="20" cy="20" r="12" stroke="#111111" strokeWidth="0.8" opacity="0.4" strokeDasharray="3 3" />
        <circle cx="20" cy="20" r="18" stroke="#111111" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 4" />
        <circle cx="20" cy="8" r="2" fill="#111111" opacity="0.7" />
        <circle cx="32" cy="20" r="2" fill="#111111" opacity="0.7" />
        <circle cx="20" cy="32" r="2" fill="#111111" opacity="0.7" />
        <circle cx="8" cy="20" r="2" fill="#111111" opacity="0.7" />
      </svg>
    ),
    title: "Neural Interface / Nano Design",
    subtitle: "Bridging Biology & Silicon",
    description:
      "Our nano-scale neural interfaces create seamless communication channels between biological neurons and computational substrates, enabling bidirectional data flow at the speed of thought.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M20 4 L36 14 L36 26 L20 36 L4 26 L4 14 Z" stroke="#111111" strokeWidth="1.2" fill="none" opacity="0.8" />
        <path d="M20 10 L30 16 L30 24 L20 30 L10 24 L10 16 Z" stroke="#111111" strokeWidth="0.8" fill="none" opacity="0.4" />
        <circle cx="20" cy="20" r="3" fill="#111111" opacity="0.9" />
        <line x1="20" y1="4" x2="20" y2="10" stroke="#111111" strokeWidth="0.8" opacity="0.5" />
        <line x1="36" y1="14" x2="30" y2="16" stroke="#111111" strokeWidth="0.8" opacity="0.5" />
        <line x1="4" y1="14" x2="10" y2="16" stroke="#111111" strokeWidth="0.8" opacity="0.5" />
        <line x1="36" y1="26" x2="30" y2="24" stroke="#111111" strokeWidth="0.8" opacity="0.5" />
        <line x1="4" y1="26" x2="10" y2="24" stroke="#111111" strokeWidth="0.8" opacity="0.5" />
        <line x1="20" y1="36" x2="20" y2="30" stroke="#111111" strokeWidth="0.8" opacity="0.5" />
      </svg>
    ),
    title: "Adaptive Architecture",
    subtitle: "Self-Evolving Systems",
    description:
      "Inspired by synaptic plasticity, our adaptive architectures continuously reorganize and optimize themselves in response to new data — systems that genuinely learn, evolve, and improve over time.",
  },
];

export default function Pillars() {
  return (
    <section id="research" className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-gray-500">
            Core Research
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            Three Pillars of Biocomputing
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our research is organized around three interconnected domains that together
            define the frontier of biological computing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="group relative bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-gray-400 transition-all duration-300"
            >
              <div className="relative">
                <div className="mb-6">{pillar.icon}</div>
                <div className="text-xs text-gray-500 font-medium tracking-widest uppercase mb-2">
                  {pillar.subtitle}
                </div>
                <h3 className="text-xl font-bold text-black mb-4">{pillar.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
