"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? "site-header--solid" : ""}`} aria-label="Main navigation">
      <Link className="site-brand" href="/" aria-label="Mukta home">
        <span className="brand-mark" aria-hidden="true" />
        <span>
          <strong>MUKTA</strong>
          <small>GAME & DEVELOPMENT</small>
        </span>
      </Link>
      <nav className="site-nav" aria-label="Website sections">
        <Link href="/" className={pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link href="/services" className={pathname === "/services" ? "active" : ""}>
          Services
        </Link>
        <Link href="/about" className={pathname === "/about" ? "active" : ""}>
          About us
        </Link>
        <Link href="/contact" className={pathname === "/contact" ? "active" : ""}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
