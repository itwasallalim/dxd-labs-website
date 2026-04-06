import RevealOnScroll from "./RevealOnScroll";

const news = [
  {
    date: "Apr 2026",
    tag: "Publication",
    title: "CORTEX framework paper accepted at Nature Neuroscience",
    body: "Our paper on real-time cortical activity translation into computational graphs has been accepted for publication, marking a key milestone in biological computing formalization.",
  },
  {
    date: "Mar 2026",
    tag: "Funding",
    title: "$1.8M NIH grant awarded for NEXUS organoid interface research",
    body: "The National Institutes of Health has awarded DXTLabs a two-year research grant to advance the NEXUS substrate for hosting and interfacing with living neural organoids.",
  },
  {
    date: "Feb 2026",
    tag: "Milestone",
    title: "ECHO achieves 99.1% accuracy on distributed bio-computation benchmark",
    body: "ECHO's emergent computation engine surpassed all prior baselines on the standard distributed neural computation benchmark suite, a first for biologically-derived architectures.",
  },
  {
    date: "Jan 2026",
    tag: "Partnership",
    title: "DXTLabs joins EU Horizon Biocomputing Consortium",
    body: "We are now a founding member of the EU Horizon Biocomputing Consortium, joining 14 institutions across 9 countries to advance standards for biological computing research.",
  },
  {
    date: "Dec 2025",
    tag: "Open Source",
    title: "SYNAPSE protocol v1.0 released on GitHub",
    body: "The bidirectional neural interface protocol specification and reference implementation are now publicly available, enabling the broader research community to build on our interface stack.",
  },
  {
    date: "Nov 2025",
    tag: "Conference",
    title: "Prof. Marcus Webb delivers keynote at NeurIPS 2025",
    body: "Prof. Webb presented our nano-electrode array breakthroughs to an audience of 4,000+ researchers, outlining the path from single-cell recording to full cortical I/O.",
  },
];

const tagColors: Record<string, string> = {
  Publication: "bg-black text-white",
  Funding: "bg-gray-800 text-white",
  Milestone: "bg-gray-600 text-white",
  Partnership: "bg-gray-400 text-white",
  "Open Source": "bg-gray-200 text-black",
  Conference: "bg-gray-100 text-black border border-gray-300",
};

export default function News() {
  return (
    <section id="news" className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <RevealOnScroll direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-gray-500">
                Lab Updates
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-black">
                Latest News
              </h2>
            </div>
            <p className="text-gray-500 max-w-sm">
              Grants, publications, milestones, and partnerships from the DXTLabs research program.
            </p>
          </div>
        </RevealOnScroll>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2 hidden md:block" />

          <div className="space-y-0">
            {news.map((item, i) => (
              <RevealOnScroll key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 60}>
                <div
                  className={`relative flex flex-col md:flex-row gap-8 py-8 ${
                    i % 2 === 0 ? "md:pr-[calc(50%+2rem)]" : "md:pl-[calc(50%+2rem)] md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 top-10 w-3 h-3 rounded-full bg-black border-2 border-white shadow-sm -translate-x-1/2" />

                  <div className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-300 rounded-2xl p-6 transition-all duration-300 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded ${tagColors[item.tag] || "bg-gray-100 text-gray-600"}`}
                      >
                        {item.tag}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">{item.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-black mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
