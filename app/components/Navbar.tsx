"use client";

import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dxt-black/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1">
            <span className="text-xl font-bold tracking-tight text-white">DXT</span>
            <span className="text-xl font-bold text-white">|</span>
            <span className="text-xl font-bold tracking-tight text-white">AB</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {["About", "Research", "Team", "Projects", "Publications"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-dxt-muted hover:text-white transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="px-4 py-2 text-sm font-medium bg-white text-black rounded hover:bg-white/90 transition-colors duration-200"
            >
              Join Research
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-dxt-muted hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            {["About", "Research", "Team", "Projects", "Publications"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block py-2 text-sm text-dxt-muted hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-block mt-4 px-4 py-2 text-sm font-medium bg-white text-black rounded hover:bg-white/90 transition-colors"
            >
              Join Research
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
