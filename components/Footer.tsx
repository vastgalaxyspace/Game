"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        {/* ── Column 1 — Brand ── */}
        <div>
          <Link href="/" className="footer-brand">
            MUKTA
          </Link>
          <p>GAME &amp; DEVELOPMENT</p>
          <span>
            Blender and Unity studio for games, simulations, and interactive 3D.
          </span>

          <div className="social-links">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub GH"
            >
              GH
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn IN"
            >
              IN
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram IG"
            >
              IG
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube YT"
            >
              YT
            </a>
          </div>
        </div>

        {/* ── Column 2 — Quick Links ── */}
        <div>
          <h3>Quick Links</h3>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* ── Column 3 — Services ── */}
        <div>
          <h3>Services</h3>
          <Link href="/services">Game Development</Link>
          <Link href="/services">AR Applications</Link>
          <Link href="/services">VR Experiences</Link>
          <Link href="/services">Product Visualization</Link>
        </div>

        {/* ── Column 4 — Newsletter ── */}
        <div>
          <h3>Stay Updated</h3>
          <p>Get the latest on our projects and 3D insights.</p>

          <div className="newsletter-form">
            <input type="email" placeholder="Your email" aria-label="Newsletter email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <span>© 2026 Mukta Game &amp; Development. All rights reserved.</span>
        <span>Crafted with ❤️ in India</span>
      </div>
    </footer>
  );
}
