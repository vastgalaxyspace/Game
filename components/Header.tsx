"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close mobile menu on route change */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`site-header${isScrolled ? " site-header--solid" : ""}`}
    >
      {/* ── Brand ── */}
      <Link href="/" className="site-brand">
        <span className="brand-mark" />
        <span>
          <strong>MUKTA</strong>
          <small>GAME &amp; DEVELOPMENT</small>
        </span>
      </Link>

      {/* ── Nav ── */}
      <nav className={`site-nav${isMenuOpen ? " nav-open" : ""}`}>
        <Link href="/" className={pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link
          href="/services"
          className={pathname === "/services" ? "active" : ""}
        >
          Services
        </Link>
        <Link href="/about" className={pathname === "/about" ? "active" : ""}>
          About
        </Link>
        <Link
          href="/contact"
          className={pathname === "/contact" ? "active" : ""}
        >
          Contact
        </Link>
      </nav>

      {/* ── CTA ── */}
      <Link href="/contact" className="header-cta">
        Get Started
      </Link>

      {/* ── Mobile menu button ── */}
      <button
        className="mobile-menu-btn"
        aria-label="Toggle menu"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
