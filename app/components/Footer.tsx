const footerLinks = {
  Research: ["Neural Interfaces", "Adaptive Architecture", "Organized Computing", "Publications"],
  Company: ["About", "Team", "Careers", "Press"],
  Projects: ["CORTEX", "SYNAPSE", "GENESIS", "ECHO"],
  Connect: ["Contact", "Newsletter", "GitHub", "Twitter"],
};

export default function Footer() {
  return (
    <>
      {/* Footer CTA */}
      <section id="contact" className="bg-dxt-black py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(74,222,128,0.08),transparent)]" />
        <div className="absolute inset-0 neural-grid opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 border border-dxt-green/30 rounded-full text-xs text-dxt-green tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-dxt-green animate-pulse" />
            Join Us
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            The Future of Computing<br />
            <span className="text-dxt-green">Is Alive.</span>
          </h2>

          <p className="text-dxt-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            We are always looking for extraordinary researchers, engineers, and
            thinkers to help us build the next frontier of biological computing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:research@dxtlabs.ai"
              className="px-8 py-3.5 bg-dxt-green text-black font-semibold rounded hover:bg-green-400 transition-colors duration-200 text-sm"
            >
              Apply to Research Program
            </a>
            <a
              href="mailto:hello@dxtlabs.ai"
              className="px-8 py-3.5 border border-white/20 text-white font-semibold rounded hover:border-white/40 hover:bg-white/5 transition-all duration-200 text-sm"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* Full Footer */}
      <footer className="bg-dxt-darker border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-xl font-bold text-white">DXT</span>
                <span className="text-xl font-bold text-dxt-green">|</span>
                <span className="text-xl font-bold text-white">AB</span>
              </div>
              <p className="text-xs text-dxt-muted leading-relaxed">
                Where Biology Meets Computing. Building the next generation of biological computing systems.
              </p>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-white mb-4">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-dxt-muted hover:text-white transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
            <p className="text-xs text-dxt-muted">
              &copy; {new Date().getFullYear()} DXTLabs. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-dxt-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-dxt-green" />
              All systems operational
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-dxt-muted hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-xs text-dxt-muted hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-xs text-dxt-muted hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
