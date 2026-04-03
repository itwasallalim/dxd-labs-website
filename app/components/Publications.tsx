const publications = [
  {
    year: "2026",
    journal: "Nature",
    title: "100,000-Neuron Simultaneous Recording via Adaptive Nano-Mesh Electrode Arrays with Real-Time Spike Sorting",
    authors: "Webb, M., Yıldız, S., Brandt, T. et al.",
    tags: ["Nano-Engineering", "High-Density Recording", "Spike Sorting"],
  },
  {
    year: "2026",
    journal: "Science",
    title: "Living-Silicon Hybrid Processors: Organoid-Integrated Circuits for Fault-Tolerant Biological Computation",
    authors: "Park, J., Chen, A., Nouri, L. et al.",
    tags: ["Organoids", "Biocomputing", "Fault Tolerance"],
  },
  {
    year: "2025",
    journal: "Nature Nanotechnology",
    title: "Sub-Micron Flexible Neural Probes with On-Probe Signal Conditioning for Chronic In Vivo Interfacing",
    authors: "Webb, M., Brandt, T., Park, J. et al.",
    tags: ["Neural Probes", "Nano-Engineering", "Chronic Interface"],
  },
  {
    year: "2025",
    journal: "Nature Biotechnology",
    title: "Multi-Region Closed-Loop Brain-Computer Interface Enabling Bidirectional Communication Across Cortical Hemispheres",
    authors: "Chen, A., Yıldız, S., Nouri, L. et al.",
    tags: ["BCI", "Closed-Loop", "Neural Interface"],
  },
  {
    year: "2025",
    journal: "Cell Systems",
    title: "CORTEX v2: Self-Optimizing Computational Graphs Derived from Continual Biological Neural Learning",
    authors: "Brandt, T., Park, J., Chen, A. et al.",
    tags: ["CORTEX", "Adaptive Systems", "Computational Framework"],
  },
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
    <section id="publications" className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-gray-500">
              Publications
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-black">
              Advancing the Field
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-black hover:text-gray-500 transition-colors"
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
              className="group bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-gray-400 transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                {/* Year */}
                <div className="shrink-0 text-sm text-gray-400 font-mono w-12">{pub.year}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-black font-semibold">{pub.journal}</span>
                  </div>
                  <h3 className="text-base font-semibold text-black mb-2 leading-snug group-hover:text-gray-500 transition-colors duration-200">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{pub.authors}</p>
                  <div className="flex flex-wrap gap-2">
                    {pub.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-2 py-0.5 text-xs bg-white text-gray-600 border border-gray-200 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="shrink-0 self-center">
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors"
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
