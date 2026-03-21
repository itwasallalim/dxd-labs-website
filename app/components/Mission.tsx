export default function Mission() {
  return (
    <section className="bg-dxt-light py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Pull quote */}
        <div className="text-center mb-20">
          <p className="text-4xl md:text-5xl lg:text-6xl font-black text-dxt-black leading-tight max-w-4xl mx-auto">
            &ldquo;Computing is not merely a tool.{" "}
            <span className="text-dxt-green-dim">It is alive.</span>&rdquo;
          </p>
        </div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-dxt-green-dim">
              Our Mission
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-dxt-black mb-6 leading-tight">
              Redefining the boundaries of what computers can do
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At DXTLabs, we believe the future of computing lies not in silicon
              alone, but in the integration of biological intelligence with
              computational architectures. Our research explores how neural
              networks — both artificial and biological — can collaborate to
              solve problems that neither could tackle independently.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From neural interfaces that translate thought into action, to
              adaptive architectures that evolve in real-time, we are building
              the foundational science for a new computing paradigm.
            </p>
          </div>

          <div className="relative">
            {/* Neural image placeholder / SVG visualization */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-dxt-black relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(74,222,128,0.15),transparent)]" />
              <svg
                className="absolute inset-0 w-full h-full opacity-60"
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Neural network SVG */}
                <circle cx="200" cy="200" r="3" fill="#4ade80" opacity="0.9" />
                <circle cx="120" cy="130" r="2.5" fill="#4ade80" opacity="0.7" />
                <circle cx="280" cy="130" r="2.5" fill="#4ade80" opacity="0.7" />
                <circle cx="100" cy="260" r="2" fill="#4ade80" opacity="0.6" />
                <circle cx="200" cy="300" r="2" fill="#4ade80" opacity="0.6" />
                <circle cx="300" cy="260" r="2" fill="#4ade80" opacity="0.6" />
                <circle cx="60" cy="180" r="2" fill="#4ade80" opacity="0.5" />
                <circle cx="340" cy="180" r="2" fill="#4ade80" opacity="0.5" />
                <circle cx="160" cy="80" r="1.5" fill="#4ade80" opacity="0.5" />
                <circle cx="240" cy="80" r="1.5" fill="#4ade80" opacity="0.5" />
                <circle cx="80" cy="320" r="1.5" fill="#4ade80" opacity="0.4" />
                <circle cx="320" cy="320" r="1.5" fill="#4ade80" opacity="0.4" />

                <line x1="200" y1="200" x2="120" y2="130" stroke="#4ade80" strokeWidth="0.8" opacity="0.3" />
                <line x1="200" y1="200" x2="280" y2="130" stroke="#4ade80" strokeWidth="0.8" opacity="0.3" />
                <line x1="200" y1="200" x2="100" y2="260" stroke="#4ade80" strokeWidth="0.8" opacity="0.3" />
                <line x1="200" y1="200" x2="200" y2="300" stroke="#4ade80" strokeWidth="0.8" opacity="0.3" />
                <line x1="200" y1="200" x2="300" y2="260" stroke="#4ade80" strokeWidth="0.8" opacity="0.3" />
                <line x1="200" y1="200" x2="60" y2="180" stroke="#4ade80" strokeWidth="0.5" opacity="0.2" />
                <line x1="200" y1="200" x2="340" y2="180" stroke="#4ade80" strokeWidth="0.5" opacity="0.2" />
                <line x1="120" y1="130" x2="160" y2="80" stroke="#4ade80" strokeWidth="0.5" opacity="0.2" />
                <line x1="280" y1="130" x2="240" y2="80" stroke="#4ade80" strokeWidth="0.5" opacity="0.2" />
                <line x1="120" y1="130" x2="60" y2="180" stroke="#4ade80" strokeWidth="0.5" opacity="0.2" />
                <line x1="280" y1="130" x2="340" y2="180" stroke="#4ade80" strokeWidth="0.5" opacity="0.2" />
                <line x1="100" y1="260" x2="80" y2="320" stroke="#4ade80" strokeWidth="0.5" opacity="0.2" />
                <line x1="300" y1="260" x2="320" y2="320" stroke="#4ade80" strokeWidth="0.5" opacity="0.2" />
                <line x1="100" y1="260" x2="200" y2="300" stroke="#4ade80" strokeWidth="0.5" opacity="0.2" />
                <line x1="300" y1="260" x2="200" y2="300" stroke="#4ade80" strokeWidth="0.5" opacity="0.2" />

                {/* Outer ring */}
                <circle cx="200" cy="200" r="120" stroke="#4ade80" strokeWidth="0.5" fill="none" opacity="0.15" />
                <circle cx="200" cy="200" r="80" stroke="#4ade80" strokeWidth="0.5" fill="none" opacity="0.1" />
              </svg>
              <div className="absolute bottom-6 left-6 right-6 text-xs text-dxt-green font-mono opacity-60">
                Neural topology mapping — active
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
