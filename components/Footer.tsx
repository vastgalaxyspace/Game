import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link className="footer-brand" href="/">
            MUKTA
          </Link>
          <p>GAME & DEVELOPMENT</p>
          <span>Blender and Unity studio for games, simulations, and interactive 3D.</span>
        </div>
        <div>
          <h3>Quick Links</h3>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h3>Services</h3>
          <Link href="/services">Game Development</Link>
          <Link href="/services">AR Applications</Link>
          <Link href="/services">VR Experiences</Link>
          <Link href="/services">Product Visualization</Link>
        </div>
        <div>
          <h3>Contact</h3>
          <a href="mailto:hello@muktagamedev.com">hello@muktagamedev.com</a>
          <a href="tel:+910000000000">+91 00000 00000</a>
          <span>India</span>
          <div className="social-links">
            <Link href="/contact">GitHub</Link>
            <Link href="/contact">LinkedIn</Link>
            <Link href="/contact">Instagram</Link>
            <Link href="/contact">YouTube</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        Copyright 2025 Mukta Game and Development. All rights reserved.
      </div>
    </footer>
  );
}
