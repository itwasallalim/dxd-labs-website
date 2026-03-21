const team = [
  {
    name: "Dr. Amara Chen",
    role: "Director of Neural Architecture",
    field: "Computational Neuroscience",
    initials: "AC",
    color: "from-gray-600 to-gray-800",
  },
  {
    name: "Prof. Marcus Webb",
    role: "Head of Nano Interface Lab",
    field: "Nano-Bio Engineering",
    initials: "MW",
    color: "from-gray-500 to-gray-700",
  },
  {
    name: "Dr. Selin Yıldız",
    role: "Lead Research Scientist",
    field: "Adaptive Systems",
    initials: "SY",
    color: "from-gray-700 to-gray-900",
  },
  {
    name: "Dr. James Park",
    role: "Principal Engineer",
    field: "Biocomputing Systems",
    initials: "JP",
    color: "from-gray-600 to-gray-800",
  },
  {
    name: "Dr. Leila Nouri",
    role: "Research Fellow",
    field: "Neural Signal Processing",
    initials: "LN",
    color: "from-gray-500 to-gray-700",
  },
  {
    name: "Dr. Theo Brandt",
    role: "Systems Architect",
    field: "Distributed Bio-Computing",
    initials: "TB",
    color: "from-gray-700 to-gray-900",
  },
];

export default function Team() {
  return (
    <section id="team" className="bg-dxt-dark py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-white">
              The Team
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              World-Class Researchers
            </h2>
          </div>
          <p className="text-dxt-muted max-w-sm">
            Our interdisciplinary team brings together the world&apos;s leading minds
            in neuroscience, engineering, and computer science.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div
              key={i}
              className="group bg-dxt-gray rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer"
            >
              {/* Avatar */}
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center mb-4 text-white font-bold text-lg`}
              >
                {member.initials}
              </div>

              <div className="text-xs text-white font-medium tracking-widest uppercase mb-1">
                {member.field}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
              <p className="text-sm text-dxt-muted">{member.role}</p>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-dxt-muted">View profile</span>
                <svg
                  className="w-4 h-4 text-dxt-muted group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
