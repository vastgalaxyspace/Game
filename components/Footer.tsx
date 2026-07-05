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

          {/* <div className="social-links">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              GH
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              IN
            </a>
            <a
              href="https://www.instagram.com/mgdgames.ai/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              YT
            </a>
          </div> */}
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
          <p>Get the latest Updates of our projects and 3D insights.</p>

          <div className="social-grid" style={{ gap: '1.25rem', alignItems: 'center' }}>
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/mgdgames.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@mgdgames_ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </a>
              </div>

          {/* <div className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button>Subscribe</button>
          </div> */}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom" style={{ justifyContent: 'center' }}>
        <span>© 2026 Mukta Game &amp; Development. All rights reserved.</span>
        
      </div>
    </footer>
  );
}
