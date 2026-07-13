"use client";

import dynamic from "next/dynamic";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Suspense } from "react";
import { AnimatedStat } from "@/components/AnimatedStat";
import { Reveal } from "@/components/interactive/Reveal";
import { Marquee } from "@/components/interactive/Marquee";
import { smoothScrollTo } from "@/lib/scrollState";

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
    smoothScrollTo("#showcase");
  };

  return (
    <div className="home-page">
      {/* ─── HERO ─── */}
      <section className="hero-section">
        <div className="scene-canvas !pointer-events-auto" data-cursor="DRAG">
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
          <Reveal variant="fade" as="p" className="hero-kicker">
            Blender + Unity Studio
          </Reveal>
          <h1>
            <Reveal as="span" variant="line">
              <span>WE BUILD</span>
            </Reveal>
            <Reveal as="span" variant="line" delay={0.12}>
              <span className="text-red block">WORLDS</span>
            </Reveal>
            <Reveal as="span" variant="line" delay={0.24}>
              <span>IN 3D.</span>
            </Reveal>
          </h1>
          <Reveal variant="fade" delay={0.35} as="p" className="!max-w-[400px]">
            Blender + Unity powered studio crafting games, AR/VR apps,
            simulations, and interactive 3D experiences.
          </Reveal>
          <Reveal variant="fade" delay={0.5} className="hero-actions">
            <button
              className="button button-primary"
              onClick={scrollToWork}
              data-cursor="GO"
            >
              See Our Work
            </button>
            <Link
              className="button button-secondary"
              href="/services"
              data-cursor="VIEW"
            >
              What We Do
            </Link>
          </Reveal>
        </div>

        <a
          className="scroll-cue cursor-pointer"
          onClick={scrollToWork}
          data-cursor="DOWN"
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

      {/* ─── MARQUEE STRIP ─── */}
      <div className="marquee-strip">
        <Marquee speed={1}>
          {[
            { title: "GAME DEVELOPMENT", label: "( Unity )" },
            { title: "AR / VR", label: "( Immersive )" },
            { title: "PRODUCT VISUALIZATION", label: "( Real-time 3D )" },
            { title: "SIMULATIONS", label: "( Blender )" },
          ].map((item) => (
            <span key={item.title} className="marquee-block">
              <span className="marquee-item">{item.title}</span>
              <span className="marquee-label">{item.label}</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ─── WHAT WE DO ─── */}
      <section className="content-section !bg-surface">
        <div className="section-heading">
          <Reveal variant="fade" as="p" className="section-kicker">
            What We Do
          </Reveal>
          <Reveal variant="words" as="h2" className="section-title">
            OUR CORE EXPERTISE
          </Reveal>
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
            <Reveal variant="fade" delay={i * 0.12} key={card.title}>
              <div
                className="expertise-card"
                style={{ transform: `translateY(${i * 20}px)` }}
                data-cursor="VIEW"
              >
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <Link href={card.link} className="expertise-link">
                  Learn More →
                </Link>
              </div>
            </Reveal>
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
            <Reveal variant="fade" as="p" className="section-kicker !m-0 !mb-4">
              Why Mukta
            </Reveal>
            <h2 className="m-0 mb-6 text-[clamp(2rem,4vw,3rem)] font-[950] text-text-primary">
              <Reveal as="span" variant="line">
                <span>BLENDER + UNITY.</span>
              </Reveal>
              <Reveal as="span" variant="line" delay={0.12}>
                <span className="text-accent">END TO END.</span>
              </Reveal>
            </h2>
            <Reveal
              variant="fade"
              delay={0.2}
              as="p"
              className="mb-8 text-text-secondary leading-[1.7]"
            >
              From concept art in Blender to a fully interactive Unity build — we
              handle the complete pipeline. No handoffs, no gaps, no surprises.
            </Reveal>
            <Reveal variant="fade" delay={0.3}>
              <Link href="/about" className="button button-primary" data-cursor="GO">
                About Us →
              </Link>
            </Reveal>
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
            ].map((item, i) => (
              <Reveal variant="fade" delay={i * 0.08} key={item.title}>
                <div className="why-item">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="content-section">
        <div className="section-heading">
          <Reveal variant="fade" as="p" className="section-kicker">
            Testimonials
          </Reveal>
          <Reveal variant="words" as="h2" className="section-title">
            WHAT CLIENTS SAY
          </Reveal>
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
            <Reveal variant="fade" delay={i * 0.12} key={t.name}>
            <div
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
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-banner home-cta">
        <div>
          <Reveal variant="words" as="h2">
            READY TO BUILD YOUR WORLD?
          </Reveal>
          <Reveal variant="fade" delay={0.25} as="p">
            Tell us your idea. We make it real in 3D.
          </Reveal>
        </div>
        <Link
          href="/contact"
          className="button bg-bg-dark text-white"
          data-cursor="START"
        >
          START A PROJECT →
        </Link>
      </section>

      {/* ─── FOOTER ─── */}
      <Footer />
    </div>
  );
}
