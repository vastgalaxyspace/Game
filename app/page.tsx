"use client";

import dynamic from "next/dynamic";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Suspense } from "react";

/* Lazy-load heavy components so they don't block initial render */
const CustomSketchfabViewer = dynamic(
  () =>
    import("@/components/CustomSketchfabViewer").then(
      (mod) => mod.CustomSketchfabViewer
    ),
  { ssr: false }
);

const ShowcaseReel = dynamic(
  () => import("@/components/ShowcaseReel").then((mod) => mod.ShowcaseReel),
  { ssr: false }
);

export default function Home() {
  const scrollToWork = () => {
    document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-page">
      {/* ─── HERO ─── */}
      <section className="hero-section">
        <div className="scene-canvas" style={{ width: "100%", height: "100%", pointerEvents: "auto" }}>
          <div
            className="sketchfab-embed-wrapper"
            style={{
              width: "100%",
              height: "100%",
              opacity: 0.7,
              background: "black",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Suspense fallback={null}>
              <CustomSketchfabViewer />
            </Suspense>
          </div>
        </div>

        <div className="hero-copy">
          <p className="hero-kicker">Blender + Unity Studio</p>
          <h1>
            <span>WE BUILD</span>
            <span className="text-red" style={{ display: "block" }}>
              WORLDS
            </span>
            <span>IN 3D.</span>
          </h1>
          <p style={{ maxWidth: "400px" }}>
            Blender + Unity powered studio crafting games, AR/VR apps,
            simulations, and interactive 3D experiences.
          </p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={scrollToWork}>
              See Our Work
            </button>
            <Link className="button button-secondary" href="/services">
              What We Do
            </Link>
          </div>
        </div>

        <a
          className="scroll-cue"
          onClick={scrollToWork}
          style={{ cursor: "pointer" }}
        >
          <span aria-hidden="true" />
          <strong>SCROLL TO EXPLORE</strong>
        </a>
      </section>

      {/* ─── STATS ─── */}
      <section className="stats-strip">
        {[
          { number: "50+", label: "Projects Delivered" },
          { number: "12+", label: "AR/VR Experiences" },
          { number: "8", label: "Industry Verticals" },
          { number: "100%", label: "Client Satisfaction" },
        ].map((stat) => (
          <div key={stat.label} className="stat-item">
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* ─── SHOWCASE REEL ─── */}
      <Suspense fallback={null}>
        <ShowcaseReel />
      </Suspense>

      {/* ─── WHAT WE DO ─── */}
      <section className="content-section" style={{ background: "var(--surface)" }}>
        <div className="section-heading" style={{ textAlign: "center" }}>
          <p className="section-kicker">What We Do</p>
          <h2 className="section-title">OUR CORE EXPERTISE</h2>
        </div>

        <div className="home-expertise-grid">
          {[
            {
              title: "Game Development",
              desc: "Unity-powered gameplay systems, prototypes, and polished interactive worlds built for any platform.",
              link: "/services",
            },
            {
              title: "AR / VR Experiences",
              desc: "Immersive augmented and virtual reality apps for training, product previews, and branded moments.",
              link: "/services",
            },
            {
              title: "Product Visualization",
              desc: "High-detail 3D assets and real-time scenes for product launches, demos, and configurators.",
              link: "/services",
            },
          ].map((card, i) => (
            <div
              key={card.title}
              className="expertise-card"
              style={{ transform: `translateY(${i * 20}px)` }}
            >
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <Link href={card.link} className="expertise-link">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section
        id="work"
        className="content-section"
        style={{ background: "var(--bg-dark)" }}
      >
        <div className="section-heading" style={{ textAlign: "center" }}>
          <p className="section-kicker">Portfolio</p>
          <h2 className="section-title">FEATURED WORK</h2>
        </div>

        <div className="featured-grid">
          <div className="featured-card featured-card--big">
            <span className="featured-badge">Game</span>
            <h3>Mech Arena Prototype</h3>
            <p>
              A fast-paced mech combat prototype with destructible environments.
            </p>
            <Link href="/contact" className="featured-link">
              View Project →
            </Link>
          </div>
          <div className="featured-stack">
            {[
              {
                title: "Industrial VR Trainer",
                cat: "Simulation",
                desc: "Safety training module for heavy machinery.",
              },
              {
                title: "Interactive Product Bay",
                cat: "Visualization",
                desc: "360° product configurator for client demos.",
              },
            ].map((p) => (
              <div key={p.title} className="featured-card featured-card--small">
                <span className="featured-badge">{p.cat}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <Link href="/contact" className="featured-link">
                  View →
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/contact" className="button button-primary">
            See Full Portfolio →
          </Link>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section
        className="content-section"
        style={{ background: "var(--surface)" }}
      >
        <div className="why-grid">
          <div>
            <p className="section-kicker" style={{ margin: "0 0 1rem" }}>
              Why Mukta
            </p>
            <h2
              style={{
                margin: "0 0 1.5rem",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 950,
                color: "var(--text-primary)",
              }}
            >
              BLENDER + UNITY.
              <br />
              <span style={{ color: "var(--accent)" }}>END TO END.</span>
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              From concept art in Blender to a fully interactive Unity build — we
              handle the complete pipeline. No handoffs, no gaps, no surprises.
            </p>
            <Link href="/about" className="button button-primary">
              About Us →
            </Link>
          </div>
          <div className="why-list">
            {[
              {
                title: "Full Pipeline Studio",
                desc: "Blender 3D art + Unity dev under one roof.",
              },
              {
                title: "Multi-Platform Delivery",
                desc: "Web, mobile, desktop, and headset builds.",
              },
              {
                title: "Rapid Prototyping",
                desc: "Playable proof-of-concept in weeks, not months.",
              },
              {
                title: "Post-Launch Support",
                desc: "Updates, optimization, and feature additions.",
              },
            ].map((item) => (
              <div key={item.title} className="why-item">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section
        className="content-section"
        style={{ background: "var(--bg-dark)" }}
      >
        <div className="section-heading" style={{ textAlign: "center" }}>
          <p className="section-kicker">Testimonials</p>
          <h2 className="section-title">WHAT CLIENTS SAY</h2>
        </div>
        <div className="testimonial-grid">
          {[
            {
              quote:
                "Mukta transformed our concept into a stunning 3D experience.",
              name: "Rahul Sharma",
              role: "CEO at TechVista",
            },
            {
              quote:
                "Their VR training module reduced our onboarding time by 40%.",
              name: "Priya Patel",
              role: "Director at IndusTrain",
            },
            {
              quote:
                "The product visualization increased our conversion rate by 60%.",
              name: "Amit Kumar",
              role: "Founder at DesignPro",
            },
          ].map((t, i) => (
            <div
              key={t.name}
              className="testimonial-card"
              style={{ transform: `translateY(${i * 30}px)` }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginBottom: "1rem", opacity: 0.25 }}
              >
                <path
                  d="M11 7H7a4 4 0 0 0-4 4v1h4a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5a6 6 0 0 1 6-6h3v2Zm11 0h-4a4 4 0 0 0-4 4v1h4a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-5a6 6 0 0 1 6-6h3v2Z"
                  fill="var(--accent)"
                />
              </svg>
              <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-banner home-cta">
        <div>
          <h2>READY TO BUILD YOUR WORLD?</h2>
          <p>Tell us your idea. We make it real in 3D.</p>
        </div>
        <Link
          href="/contact"
          className="button"
          style={{ background: "var(--bg-dark)", color: "#fff" }}
        >
          START A PROJECT →
        </Link>
      </section>

      {/* ─── FOOTER ─── */}
      <Footer />
    </div>
  );
}
