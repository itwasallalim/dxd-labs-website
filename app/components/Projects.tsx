const projects = [
  {
    id: "CORTEX",
    name: "CORTEX",
    tagline: "Cortical Computing Framework",
    description: "A unified framework for translating cortical activity patterns into executable computational graphs, enabling real-time neural programming.",
    status: "Active",
    progress: 78,
  },
  {
    id: "SYNAPSE",
    name: "SYNAPSE",
    tagline: "Synaptic Interface Protocol",
    description: "High-bandwidth bidirectional neural interface protocol enabling sub-millisecond communication between biological and silicon substrates.",
    status: "Active",
    progress: 65,
  },
  {
    id: "GENESIS",
    name: "GENESIS",
    tagline: "Generative Neural System",
    description: "Self-generating neural network architectures that evolve through biologically-inspired growth rules and environmental feedback signals.",
    status: "Active",
    progress: 42,
  },
  {
    id: "ECHO",
    name: "ECHO",
    tagline: "Emergent Computation Hub",
    description: "A distributed computing platform that leverages emergent properties in large-scale neural networks for massively parallel problem solving.",
    status: "Beta",
    progress: 89,
  },
  {
    id: "NEXUS",
    name: "NEXUS",
    tagline: "Neural-Execution Substrate",
    description: "Purpose-built silicon substrate for hosting and interfacing with living neural organoids, bridging the physical and computational domains.",
    status: "Research",
    progress: 31,
  },
  {
    id: "ATLAS",
    name: "ATLAS",
    tagline: "Adaptive Topology Learning",
    description: "Mapping and modeling the dynamic topological changes in neural networks over time to predict and guide adaptive computational behavior.",
    status: "Active",
    progress: 57,
  },
];

const statusColors: Record<string, string> = {
  Active: "text-dxt-green border-dxt-green/30 bg-dxt-green/5",
  Beta: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
  Research: "text-blue-400 border-blue-400/30 bg-blue-400/5",
};

export default function Projects() {
  return (
    <section id="projects" className="bg-dxt-dark py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-dxt-green">
              Projects
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Ongoing Projects
            </h2>
          </div>
          <p className="text-dxt-muted max-w-sm">
            Six flagship research initiatives pushing the boundaries of what biological computing can achieve.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-dxt-gray rounded-2xl p-6 border border-white/5 hover:border-dxt-green/20 transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">{project.name}</h3>
                  <p className="text-xs text-dxt-green mt-0.5">{project.tagline}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded border font-medium ${statusColors[project.status]}`}
                >
                  {project.status}
                </span>
              </div>

              <p className="text-sm text-dxt-muted leading-relaxed flex-1 mb-6">
                {project.description}
              </p>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-dxt-muted">Progress</span>
                  <span className="text-xs text-dxt-green font-mono">{project.progress}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-dxt-green rounded-full transition-all duration-700"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
