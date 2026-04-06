"use client";

import { useState } from "react";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Research: [
    { label: "Neural Interfaces", href: "#research" },
    { label: "Adaptive Architecture", href: "#research" },
    { label: "Organized Computing", href: "#research" },
    { label: "Publications", href: "#publications" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Team", href: "#team" },
    { label: "News", href: "#news" },
    { label: "Careers", href: "mailto:careers@dxtlabs.ai" },
  ],
  Projects: [
    { label: "CORTEX", href: "#projects" },
    { label: "SYNAPSE", href: "https://github.com/dxtlabs/synapse" },
    { label: "ECHO", href: "https://github.com/dxtlabs/echo" },
    { label: "All Projects", href: "#projects" },
  ],
  Connect: [
    { label: "Contact", href: "#contact" },
    { label: "GitHub", href: "https://github.com/dxtlabs" },
    { label: "Twitter / X", href: "https://twitter.com/dxtlabs" },
    { label: "Press", href: "mailto:press@dxtlabs.ai" },
  ],
};

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", institution: "", interest: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Submit via Formspree (replace FORM_ID with real one when available)
    try {
      const res = await fetch("https://formspree.io/f/xdxtlabs", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
      } else {
        // Fallback: open mailto
        window.location.href = `mailto:research@dxtlabs.ai?subject=Research%20Inquiry%20from%20${encodeURIComponent(form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nInstitution: ${form.institution}\nInterest: ${form.interest}\n\n${form.message}`)}`;
      }
    } catch {
      window.location.href = `mailto:research@dxtlabs.ai?subject=Research%20Inquiry%20from%20${encodeURIComponent(form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nInstitution: ${form.institution}\nInterest: ${form.interest}\n\n${form.message}`)}`;
    }
    setSending(false);
  };

  if (sent) {
    return (
      <div className="border border-white/20 rounded-2xl p-8 text-center">
        <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center mx-auto mb-4">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-white font-semibold mb-1">Message received</p>
        <p className="text-dxt-muted text-sm">We&apos;ll get back to you within 2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-white/60 mb-1.5 tracking-wide uppercase">Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Dr. Jane Smith"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-white/60 mb-1.5 tracking-wide uppercase">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@university.edu"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-white/60 mb-1.5 tracking-wide uppercase">Institution</label>
          <input
            type="text"
            value={form.institution}
            onChange={(e) => setForm({ ...form, institution: e.target.value })}
            placeholder="MIT, Stanford, ..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-white/60 mb-1.5 tracking-wide uppercase">Interest</label>
          <select
            value={form.interest}
            onChange={(e) => setForm({ ...form, interest: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/40 transition-colors appearance-none"
          >
            <option value="" className="bg-black">Select one</option>
            <option value="Research Collaboration" className="bg-black">Research Collaboration</option>
            <option value="PhD / Postdoc Position" className="bg-black">PhD / Postdoc Position</option>
            <option value="Industry Partnership" className="bg-black">Industry Partnership</option>
            <option value="Press / Media" className="bg-black">Press / Media</option>
            <option value="General Inquiry" className="bg-black">General Inquiry</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-white/60 mb-1.5 tracking-wide uppercase">Message</label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us about your research and what you're looking to explore together..."
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="w-full sm:w-auto px-8 py-3 bg-white text-black text-sm font-semibold rounded hover:bg-white/90 transition-colors disabled:opacity-50"
      >
        {sending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

export default function Footer() {
  return (
    <>
      {/* Contact section */}
      <section id="contact" className="bg-dxt-black py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(255,255,255,0.05),transparent)]" />
        <div className="absolute inset-0 neural-grid opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 border border-white/30 rounded-full text-xs text-white tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Get in Touch
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
              The Future of Computing<br />
              <span className="text-white">Is Alive.</span>
            </h2>
            <p className="text-dxt-muted text-lg max-w-xl mx-auto leading-relaxed">
              We are always looking for extraordinary researchers, engineers, and
              thinkers to help us build the next frontier of biological computing.
            </p>
          </div>

          {/* Contact form */}
          <ContactForm />

          {/* Direct contact cards */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4 text-left">
            {[
              { label: "Research Inquiries", email: "research@dxtlabs.ai" },
              { label: "Partnerships", email: "partners@dxtlabs.ai" },
              { label: "General", email: "hello@dxtlabs.ai" },
            ].map(({ label, email }) => (
              <div key={label} className="border border-white/10 rounded-lg px-5 py-4">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">{label}</p>
                <a href={`mailto:${email}`} className="text-sm text-dxt-muted hover:text-white transition-colors">
                  {email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full footer */}
      <footer className="bg-dxt-darker border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-xl font-bold text-white">DXT</span>
                <span className="text-xl font-bold text-white">|</span>
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
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-dxt-muted hover:text-white transition-colors duration-200"
                      >
                        {label}
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
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              All systems operational
            </div>
            <div className="flex items-center gap-6">
              <a href="mailto:legal@dxtlabs.ai?subject=Privacy" className="text-xs text-dxt-muted hover:text-white transition-colors">Privacy</a>
              <a href="mailto:legal@dxtlabs.ai?subject=Terms" className="text-xs text-dxt-muted hover:text-white transition-colors">Terms</a>
              <a href="mailto:legal@dxtlabs.ai?subject=Cookies" className="text-xs text-dxt-muted hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
