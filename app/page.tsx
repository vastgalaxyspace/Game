"use client";

import dynamic from "next/dynamic";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Suspense } from "react";
import { AnimatedStat } from "@/components/AnimatedStat";

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
        <div className="scene-canvas !pointer-events-auto">
          <div className="relative h-full w-full overflow-hidden opacity-[0.92] bg-[radial-gradient(circle_at_70%_45%,rgba(255,48,64,0.26),transparent_36%),radial-gradient(circle_at_54%_52%,rgba(255,255,255,0.08),transparent_30%),#07080c]">
            <Suspense
              fallback={
                <div className="hero-model-fallback">Loading 3D car</div>
              }
            >
              <CustomSketchfabViewer />
            </Suspense>
          </div>
        </div>

        <div className="hero-copy">
          <p className="hero-kicker">Blender + Unity Studio</p>
          <h1>
            <span>WE BUILD</span>
            <span className="text-red block">
              WORLDS
            </span>
            <span>IN 3D.</span>
          </h1>
          <p className="!max-w-[400px]">
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
          className="scroll-cue cursor-pointer"
          onClick={scrollToWork}
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
          <AnimatedStat key={stat.label} value={stat.number} label={stat.label} />
        ))}
      </section>

      {/* ─── SHOWCASE REEL ─── */}
      <Suspense fallback={null}>
        <ShowcaseReel />
      </Suspense>

      {/* ─── WHAT WE DO ─── */}
      <section className="content-section !bg-surface">
        <div className="section-heading">
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
      {/* <section
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
      </section> */}

      {/* ─── WHY CHOOSE US ─── */}
      <section className="content-section !bg-surface">
        <div className="why-grid">
          <div>
            <p className="section-kicker !m-0 !mb-4">
              Why Mukta
            </p>
            <h2 className="m-0 mb-6 text-[clamp(2rem,4vw,3rem)] font-[950] text-text-primary">
              BLENDER + UNITY.
              <br />
              <span className="text-accent">END TO END.</span>
            </h2>
            <p className="mb-8 text-text-secondary leading-[1.7]">
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
      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Testimonials</p>
          <h2 className="section-title">WHAT CLIENTS SAY</h2>
        </div>
        <div className="testimonial-grid">
          {[
            {
              quote:
                "MGD's ability to create highly immersive AR/VR experiences is truly world-class. They delivered beyond our expectations.",
              name: "Dr. Ani Atanasova",
              role: "Pixelhunters (Dubai)",
            },
            {
              quote:
                "The 3D assets and game mechanics they produced fit perfectly into our workflow. A reliable and highly skilled technical team.",
              name: "Nao Udagawa",
              role: "Bandai Namco Entertainment Inc. (Malaysia)",
            },
            {
              quote:
                "Their deep understanding of Unity and Blender helped us bring complex simulation logic to life with incredible visual fidelity.",
              name: "Eng. Iliya Atanasov",
              role: "Pixelhunters (Dubai)",
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
                className="mb-4 opacity-25"
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
          className="button bg-bg-dark text-white"
        >
          START A PROJECT →
        </Link>
      </section>

      {/* ─── FOOTER ─── */}
      <Footer />
    </div>
  );
}
