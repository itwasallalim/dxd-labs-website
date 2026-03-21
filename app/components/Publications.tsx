const publications = [
  {
    year: "2024",
    journal: "Nature Neuroscience",
    title: "Bidirectional Neural-Silicon Interface with Sub-Millisecond Latency for Real-Time Biological Computing",
    authors: "Chen, A., Webb, M., Yıldız, S. et al.",
    tags: ["Neural Interface", "Silicon Photonics"],
  },
  {
    year: "2024",
    journal: "Science",
    title: "Emergent Computational Properties in Organoid Neural Networks: A New Paradigm for Adaptive Processing",
    authors: "Park, J., Nouri, L., Chen, A. et al.",
    tags: ["Organoids", "Adaptive Systems"],
  },
  {
    year: "2023",
    journal: "Cell",
    title: "Nano-Scale Electrode Arrays for Simultaneous Recording of 10,000+ Neurons with Single-Cell Resolution",
    authors: "Webb, M., Brandt, T., Yıldız, S. et al.",
    tags: ["Nano-Engineering", "High-Density Recording"],
  },
  {
    year: "2023",
    journal: "Nature Methods",
    title: "CORTEX: A Framework for Translating Biological Neural Patterns into Executable Computational Graphs",
    authors: "Brandt, T., Park, J., Chen, A. et al.",
    tags: ["CORTEX", "Computational Framework"],
  },
  {
    year: "2023",
    journal: "PNAS",
    title: "Synaptic Plasticity-Inspired Learning Rules for Self-Modifying Neural Architectures",
    authors: "Nouri, L., Yıldız, S., Webb, M. et al.",
    tags: ["Plasticity", "Learning Systems"],
  },
];

export default function Publications() {
  return (
    <section id="publications" className="bg-dxt-black py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-white">
              Publications
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Advancing the Field
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-white hover:text-white/70 transition-colors"
          >
            View all publications
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="space-y-4">
          {publications.map((pub, i) => (
            <div
              key={i}
              className="group bg-dxt-gray rounded-xl p-6 border border-white/5 hover:border-white/15 transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                {/* Year */}
                <div className="shrink-0 text-sm text-dxt-muted font-mono w-12">{pub.year}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-white font-semibold">{pub.journal}</span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2 leading-snug group-hover:text-white/70 transition-colors duration-200">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-dxt-muted mb-3">{pub.authors}</p>
                  <div className="flex flex-wrap gap-2">
                    {pub.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-2 py-0.5 text-xs bg-dxt-black text-dxt-muted border border-white/10 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="shrink-0 self-center">
                  <svg
                    className="w-5 h-5 text-dxt-muted group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
