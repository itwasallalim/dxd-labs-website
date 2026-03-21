import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function WikiPage() {
  return (
    <>
      <Navbar />
      <main className="bg-dxt-black min-h-screen pt-24 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <div className="mb-12 border-b border-white/10 pb-10">
            <p className="text-xs font-mono text-dxt-muted uppercase tracking-widest mb-3">Project Wiki</p>
            <h1 className="text-4xl font-bold text-white mb-4">DXD Labs Website</h1>
            <p className="text-dxt-muted text-lg leading-relaxed max-w-2xl">
              The public-facing web presence for DXTLabs. Communicates research credibility,
              scientific ambition, and serves as the top-of-funnel for research partnerships,
              talent acquisition, and investor relations.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-dxt-muted">
                <span className="text-white">Status:</span> Active — v1 shipped
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-dxt-muted">
                <span className="text-white">Lead:</span> Founding Engineer
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-dxt-muted">
                <span className="text-white">Branch:</span> main
              </span>
            </div>
          </div>

          {/* Table of Contents */}
          <nav className="mb-12 p-6 bg-white/[0.03] border border-white/8 rounded-lg">
            <h2 className="text-xs font-mono text-dxt-muted uppercase tracking-widest mb-4">Contents</h2>
            <ol className="space-y-2">
              {[
                ["purpose", "Purpose"],
                ["tech-stack", "Tech Stack"],
                ["design-system", "Design System"],
                ["page-architecture", "Page Architecture"],
                ["responsiveness", "Responsiveness"],
              ].map(([id, label], i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-sm text-dxt-muted hover:text-white transition-colors flex items-center gap-3"
                  >
                    <span className="text-white/20 font-mono text-xs w-4">{i + 1}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Section: Purpose */}
          <section id="purpose" className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-white/20 font-mono text-sm">01</span>
              Purpose
            </h2>
            <ul className="space-y-3">
              {[
                "Establish DXTLabs as a credible deep-tech research organization.",
                "Present the team, ongoing projects, and publications.",
                "Drive inbound inquiries from partners, recruits, and investors.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-dxt-muted">
                  <span className="mt-2 w-1 h-1 bg-white/40 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section: Tech Stack */}
          <section id="tech-stack" className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-white/20 font-mono text-sm">02</span>
              Tech Stack
            </h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-8 text-dxt-muted font-medium uppercase tracking-wide text-xs">Layer</th>
                  <th className="text-left py-3 text-dxt-muted font-medium uppercase tracking-wide text-xs">Choice</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Framework", "Next.js 14 (App Router)"],
                  ["Styling", "Tailwind CSS"],
                  ["Rendering", "Static site — no backend required"],
                  ["Hosting", "TBD (Vercel / GitHub Pages)"],
                ].map(([layer, choice]) => (
                  <tr key={layer} className="border-b border-white/5">
                    <td className="py-3 pr-8 text-white">{layer}</td>
                    <td className="py-3 text-dxt-muted">{choice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Section: Design System */}
          <section id="design-system" className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-white/20 font-mono text-sm">03</span>
              Design System
            </h2>
            <table className="w-full text-sm border-collapse mb-4">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-8 text-dxt-muted font-medium uppercase tracking-wide text-xs">Token</th>
                  <th className="text-left py-3 text-dxt-muted font-medium uppercase tracking-wide text-xs">Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Background", "Near-black (#0a0a0a / #111111)"],
                  ["Primary text", "White (#ffffff)"],
                  ["Accent", "Electric green (neon, #39ff14 or similar) — reserved for key interactive elements"],
                  ["Body font", "Inter (Google Fonts)"],
                  ["Heading style", "Bold, large, uppercase where appropriate"],
                  ["Aesthetic", "High-end research / deep-tech"],
                ].map(([token, value]) => (
                  <tr key={token} className="border-b border-white/5">
                    <td className="py-3 pr-8 text-white">{token}</td>
                    <td className="py-3 text-dxt-muted">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-dxt-muted bg-white/[0.03] border border-white/8 rounded px-4 py-3">
              <span className="text-white">Note:</span> Color scheme revised to strict black-and-white (DXTAA-5). Green accent used sparingly for key interactive elements only.
            </p>
          </section>

          {/* Section: Page Architecture */}
          <section id="page-architecture" className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-white/20 font-mono text-sm">04</span>
              Page Architecture
            </h2>
            <div className="space-y-4">
              {[
                {
                  num: "01",
                  title: "Navbar",
                  items: [
                    "Logo: DXT|AB — top-left, dark background",
                    "Navigation: About · Research · Team · Projects · Publications",
                    "CTA button: accent-colored, right-aligned",
                    "Behavior: sticky on scroll, full-width",
                  ],
                },
                {
                  num: "02",
                  title: "Hero",
                  items: [
                    "Full-width dark section",
                    "Background: neural network particle animation",
                    "Headline: \"Where Biology Meets Computing\"",
                    "Subtext: bridging neuroscience and computer science narrative",
                    "CTAs: two buttons — primary: \"Explore Research\" / secondary: \"Meet the Team\"",
                  ],
                },
                {
                  num: "03",
                  title: "Mission",
                  items: [
                    "Light section (visual contrast break)",
                    "\"Computing is alive.\" pull quote",
                    "Two-column layout: supporting copy (left) + neural image (right)",
                  ],
                },
                {
                  num: "04",
                  title: "Three Pillars",
                  items: [
                    "Three equal dark cards",
                    "Organized Computing — structured, bio-inspired computation",
                    "Neural Interface / Nano Design — bridging biology and hardware",
                    "Adaptive Architecture — self-modifying, learning systems",
                  ],
                },
                {
                  num: "05",
                  title: "Watch Neurons Think",
                  items: [
                    "Dark section with neural imagery",
                    "Stats panel: 12,847 neurons · 647 Hz · 96.2% accuracy",
                  ],
                },
                {
                  num: "06",
                  title: "World-Class Researchers",
                  items: [
                    "Team grid with headshot cards",
                    "Each card: name, title, photo",
                  ],
                },
                {
                  num: "07",
                  title: "Advancing the Field",
                  items: [
                    "Publication list in standard academic format",
                    "Fields: title · authors · venue · year",
                  ],
                },
                {
                  num: "08",
                  title: "Ongoing Projects",
                  items: [
                    "2x3 card grid",
                    "Projects: CORTEX · SYNAPSE · GENESIS · ECHO · NEXUS · ATLAS",
                    "Each card: project name + 1-2 sentence description",
                  ],
                },
                {
                  num: "09",
                  title: "Footer CTA + Full Footer",
                  items: [
                    "\"The Future of Computing Is Alive.\" hero text",
                    "Links: About · Research · Projects · Team · Publications · Contact",
                    "Copyright, social icons",
                  ],
                },
              ].map((section) => (
                <div key={section.num} className="border border-white/8 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-4 px-5 py-4 bg-white/[0.03]">
                    <span className="font-mono text-xs text-white/20">{section.num}</span>
                    <h3 className="font-semibold text-white">{section.title}</h3>
                  </div>
                  <ul className="px-5 py-4 space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-dxt-muted">
                        <span className="mt-2 w-1 h-1 bg-white/20 rounded-full shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Responsiveness */}
          <section id="responsiveness" className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-white/20 font-mono text-sm">05</span>
              Responsiveness
            </h2>
            <p className="text-dxt-muted leading-relaxed">
              All sections fully mobile-responsive (mobile-first). Static output — no server-side rendering required.
              All 9 sections implemented and responsive.
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
