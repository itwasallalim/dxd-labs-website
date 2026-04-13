const projects = [
  {
    id: "CORTEX",
    name: "CORTEX",
    tagline: "Cortical Computing Framework",
    description: "A unified framework for translating cortical activity patterns into executable computational graphs, enabling real-time neural programming.",
    status: "Active",
    progress: 78,
    link: "#publications",
    linkLabel: "Read paper",
  },
  {
    id: "SYNAPSE",
    name: "SYNAPSE",
    tagline: "Synaptic Interface Protocol",
    description: "High-bandwidth bidirectional neural interface protocol enabling sub-millisecond communication between biological and silicon substrates.",
    status: "Active",
    progress: 65,
    link: "https://github.com/dxtlabs/synapse",
    linkLabel: "GitHub",
  },
  {
    id: "GENESIS",
    name: "GENESIS",
    tagline: "Generative Neural System",
    description: "Self-generating neural network architectures that evolve through biologically-inspired growth rules and environmental feedback signals.",
    status: "Active",
    progress: 42,
    link: "#publications",
    linkLabel: "Read paper",
  },
  {
    id: "ECHO",
    name: "ECHO",
    tagline: "Emergent Computation Hub",
    description: "A distributed computing platform that leverages emergent properties in large-scale neural networks for massively parallel problem solving.",
    status: "Beta",
    progress: 89,
    link: "https://github.com/dxtlabs/echo",
    linkLabel: "GitHub",
  },
  {
    id: "NEXUS",
    name: "NEXUS",
    tagline: "Neural-Execution Substrate",
    description: "Purpose-built silicon substrate for hosting and interfacing with living neural organoids, bridging the physical and computational domains.",
    status: "Research",
    progress: 31,
    link: "mailto:research@dxtlabs.ai?subject=NEXUS%20Collaboration",
    linkLabel: "Collaborate",
  },
  {
    id: "ATLAS",
    name: "ATLAS",
    tagline: "Adaptive Topology Learning",
    description: "Mapping and modeling the dynamic topological changes in neural networks over time to predict and guide adaptive computational behavior.",
    status: "Active",
    progress: 57,
    link: "#publications",
    linkLabel: "Read paper",
  },
  {
    id: "VIBECHECK",
    name: "VIBECHECK",
    tagline: "Mental Wellness Frequency Platform",
    description: "A biocomputing application that plays calibrated radio frequencies and measures user response to generate a real-time Mental Wellness Score, mapping Schumann and ELF bands to emotional states and recommending personalized wellness interventions.",
    status: "Beta",
    progress: 74,
    link: "https://github.com/itwasallalim/VibeCheck-repo",
    linkLabel: "GitHub",
  },
];

const statusColors: Record<string, string> = {
  Active: "text-black border-black/30 bg-black/5",
  Beta: "text-gray-700 border-gray-400 bg-gray-100",
  Research: "text-gray-500 border-gray-300 bg-gray-50",
};

export default function Projects() {
  return (
    <section id="projects" className="bg-gray-50 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-gray-500">
              Projects
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-black">
              Ongoing Projects
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm">
            Seven flagship research initiatives pushing the boundaries of what biological computing can achieve.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-400 transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-black text-black tracking-tight">{project.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{project.tagline}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded border font-medium ${statusColors[project.status]}`}
                >
                  {project.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-6">
                {project.description}
              </p>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-gray-400">Progress</span>
                  <span className="text-xs text-black font-mono">{project.progress}%</span>
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-700"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Link */}
              <a
                href={project.link}
                target={project.link.startsWith("http") ? "_blank" : undefined}
                rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-black hover:opacity-60 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                {project.linkLabel}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
