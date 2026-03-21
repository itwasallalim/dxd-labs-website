const team = [
  {
    name: "Dr. Amara Chen",
    role: "Director of Neural Architecture",
    field: "Computational Neuroscience",
    initials: "AC",
    color: "from-gray-200 to-gray-400",
  },
  {
    name: "Prof. Marcus Webb",
    role: "Head of Nano Interface Lab",
    field: "Nano-Bio Engineering",
    initials: "MW",
    color: "from-gray-300 to-gray-500",
  },
  {
    name: "Dr. Selin Yıldız",
    role: "Lead Research Scientist",
    field: "Adaptive Systems",
    initials: "SY",
    color: "from-gray-200 to-gray-400",
  },
  {
    name: "Dr. James Park",
    role: "Principal Engineer",
    field: "Biocomputing Systems",
    initials: "JP",
    color: "from-gray-300 to-gray-500",
  },
  {
    name: "Dr. Leila Nouri",
    role: "Research Fellow",
    field: "Neural Signal Processing",
    initials: "LN",
    color: "from-gray-200 to-gray-400",
  },
  {
    name: "Dr. Theo Brandt",
    role: "Systems Architect",
    field: "Distributed Bio-Computing",
    initials: "TB",
    color: "from-gray-300 to-gray-500",
  },
];

export default function Team() {
  return (
    <section id="team" className="bg-gray-50 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-gray-500">
              The Team
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-black">
              World-Class Researchers
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm">
            Our interdisciplinary team brings together the world&apos;s leading minds
            in neuroscience, engineering, and computer science.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-400 transition-all duration-300 cursor-pointer"
            >
              {/* Avatar */}
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center mb-4 text-black font-bold text-lg`}
              >
                {member.initials}
              </div>

              <div className="text-xs text-gray-500 font-medium tracking-widest uppercase mb-1">
                {member.field}
              </div>
              <h3 className="text-lg font-bold text-black mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">View profile</span>
                <svg
                  className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
