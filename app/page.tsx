"use client";

import { ParallaxSection, ParallaxLayer, useScrollY } from "@/components/Parallax";
import { ShowcaseReel } from "@/components/ShowcaseReel";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const scrollY = useScrollY();

  // Hero parallax values driven by raw scroll
  const heroOpacity = Math.max(0, 1 - scrollY / 700);
  const heroCopyY = scrollY * 0.25;
  const sceneY = scrollY * 0.15;

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="hero-section" aria-label="Mukta Game and Development">
        <div
          className="scene-canvas"
          style={{
            transform: `translateY(${sceneY}px)`,
            willChange: "transform",
          }}
        >
          <video
            className="hero-video"
            src="/video/ll.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        </div>

        <div
          className="hero-copy"
          style={{
            transform: `translateY(calc(-48% + ${heroCopyY}px))`,
            opacity: heroOpacity,
            willChange: "transform, opacity",
          }}
        >
          <p className="hero-kicker">Blender + Unity Studio</p>
          <h1>
            <span>WE BUILD</span>
            <span className="text-red">WORLDS</span>
            <span>IN 3D.</span>
          </h1>
          <p>
            Blender + Unity powered studio crafting games, AR/VR apps, simulations, and
            interactive 3D experiences.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#showcase">
              See Our Work
            </a>
            <Link className="button button-secondary" href="/services">
              What We Do
            </Link>
          </div>
        </div>

        <a
          className="scroll-cue"
          href="#stats"
          aria-label="Scroll to explore"
          style={{ opacity: heroOpacity }}
        >
          <span aria-hidden="true" />
          <strong>SCROLL TO EXPLORE</strong>
        </a>
      </section>

      {/* ─── STATS / NUMBERS STRIP ─── */}
      <ParallaxSection
        id="stats"
        speed={0.08}
        slideDistance={40}
        style={{
          position: "relative",
          zIndex: 2,
          background: "var(--surface)",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          padding: "2.5rem 5rem",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        {[
          { number: "50+", label: "Projects Delivered" },
          { number: "12+", label: "AR/VR Experiences" },
          { number: "8", label: "Industry Verticals" },
          { number: "100%", label: "Client Satisfaction" },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "2.8rem",
                fontWeight: 950,
                color: "var(--accent)",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {stat.number}
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </ParallaxSection>

      {/* ═══════════════════════════════════════════
          SHOWCASE REEL — Advanced 3D Parallax Cards
          ═══════════════════════════════════════════ */}
      <ShowcaseReel />

      {/* ─── WHAT WE DO — 3 HIGHLIGHT CARDS ─── */}
      <ParallaxSection
        speed={0.06}
        slideDistance={50}
        style={{
          position: "relative",
          zIndex: 2,
          padding: "5rem clamp(1rem, 5vw, 5rem)",
          background: "var(--surface)",
        }}
      >
        <ParallaxLayer speed={0.1} style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p
            style={{
              color: "var(--accent)",
              fontWeight: 900,
              fontSize: "0.78rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            What We Do
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontWeight: 950,
              lineHeight: 0.92,
              color: "var(--text-primary)",
            }}
          >
            OUR CORE EXPERTISE
          </h2>
        </ParallaxLayer>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            maxWidth: "1180px",
            margin: "0 auto",
          }}
        >
          {[
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="6" y1="11" x2="10" y2="11" /><line x1="8" y1="9" x2="8" y2="13" />
                  <line x1="15" y1="12" x2="15.01" y2="12" /><line x1="18" y1="10" x2="18.01" y2="10" />
                  <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.01.152v6.516A4 4 0 0 0 6.68 19h10.64a4 4 0 0 0 3.978-3.742c.006-.052.01-.101.01-.152V8.59A4 4 0 0 0 17.32 5Z" />
                </svg>
              ),
              title: "Game Development",
              desc: "Unity-powered gameplay systems, prototypes, and polished interactive worlds built for any platform.",
              link: "/services",
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ),
              title: "AR / VR Experiences",
              desc: "Immersive augmented and virtual reality apps for training, product previews, and branded moments.",
              link: "/services",
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              ),
              title: "Product Visualization",
              desc: "High-detail 3D assets and real-time scenes for product launches, demos, and configurators.",
              link: "/services",
            },
          ].map((card) => (
            <ParallaxLayer key={card.title} speed={0.04}>
              <div className="expertise-card">
                <div className="expertise-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <Link href={card.link} className="expertise-link">
                  Learn More →
                </Link>
              </div>
            </ParallaxLayer>
          ))}
        </div>
      </ParallaxSection>

      {/* ─── FEATURED PROJECT PREVIEW ─── */}
      <ParallaxSection
        id="work"
        speed={0.05}
        slideDistance={55}
        style={{
          position: "relative",
          zIndex: 2,
          padding: "5rem clamp(1rem, 5vw, 5rem)",
          background: "var(--bg-dark)",
        }}
      >
        <ParallaxLayer speed={0.12} style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p
            style={{
              color: "var(--accent)",
              fontWeight: 900,
              fontSize: "0.78rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontWeight: 950,
              lineHeight: 0.92,
              color: "var(--text-primary)",
            }}
          >
            FEATURED WORK
          </h2>
        </ParallaxLayer>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "1.5rem",
            maxWidth: "1180px",
            margin: "0 auto",
          }}
        >
          {/* Big card */}
          <ParallaxLayer speed={0.06}>
            <div className="featured-card featured-card--big">
              <span className="featured-badge">Game</span>
              <h3>Mech Arena Prototype</h3>
              <p>A fast-paced mech combat prototype with destructible environments.</p>
              <Link href="/contact" className="featured-link">
                View Project →
              </Link>
            </div>
          </ParallaxLayer>
          {/* Two small cards stacked */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              {
                title: "Industrial VR Trainer",
                cat: "Simulation",
                desc: "Safety training module for heavy machinery operators.",
              },
              {
                title: "Interactive Product Bay",
                cat: "Visualization",
                desc: "360° product configurator for real-time client demos.",
              },
            ].map((p, i) => (
              <ParallaxLayer key={p.title} speed={0.04 + i * 0.05}>
                <div className="featured-card featured-card--small">
                  <span className="featured-badge">{p.cat}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <Link href="/contact" className="featured-link">
                    View →
                  </Link>
                </div>
              </ParallaxLayer>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link href="/contact" className="button button-primary">
            See Full Portfolio →
          </Link>
        </div>
      </ParallaxSection>

      {/* ─── WHY CHOOSE US ─── */}
      <ParallaxSection
        speed={0.07}
        slideDistance={50}
        style={{
          position: "relative",
          zIndex: 2,
          padding: "5rem clamp(1rem, 5vw, 5rem)",
          background: "var(--surface)",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <ParallaxLayer speed={0.08}>
            <p
              style={{
                color: "var(--accent)",
                fontWeight: 900,
                fontSize: "0.78rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                margin: "0 0 0.85rem",
              }}
            >
              Why Mukta
            </p>
            <h2
              style={{
                margin: "0 0 1.5rem",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 950,
                lineHeight: 0.92,
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
                marginBottom: "1.5rem",
              }}
            >
              From concept art in Blender to a fully interactive Unity build — we
              handle the complete pipeline. No handoffs, no gaps, no surprises.
            </p>
            <Link href="/about" className="button button-primary">
              About Us →
            </Link>
          </ParallaxLayer>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { title: "Full Pipeline Studio", desc: "Blender 3D art + Unity dev under one roof." },
              { title: "Multi-Platform Delivery", desc: "Web, mobile, desktop, and headset builds." },
              { title: "Rapid Prototyping", desc: "Playable proof-of-concept in weeks, not months." },
              { title: "Post-Launch Support", desc: "Updates, optimization, and feature additions." },
            ].map((item, i) => (
              <ParallaxLayer key={item.title} speed={0.03 + i * 0.025}>
                <div className="why-item">
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </ParallaxLayer>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ─── TESTIMONIALS ─── */}
      <ParallaxSection
        speed={0.06}
        slideDistance={45}
        style={{
          position: "relative",
          zIndex: 2,
          padding: "5rem clamp(1rem, 5vw, 5rem)",
          background: "var(--bg-dark)",
        }}
      >
        <ParallaxLayer speed={0.1} style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p
            style={{
              color: "var(--accent)",
              fontWeight: 900,
              fontSize: "0.78rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Testimonials
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontWeight: 950,
              lineHeight: 0.92,
              color: "var(--text-primary)",
            }}
          >
            WHAT CLIENTS SAY
          </h2>
        </ParallaxLayer>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            maxWidth: "1180px",
            margin: "0 auto",
          }}
        >
          {[
            {
              quote: "Mukta transformed our concept into a stunning 3D experience. The attention to detail was extraordinary.",
              name: "Rahul Sharma",
              role: "CEO at TechVista",
            },
            {
              quote: "Their VR training module reduced our onboarding time by 40%. Exceptional work from concept to delivery.",
              name: "Priya Patel",
              role: "Director at IndusTrain",
            },
            {
              quote: "The product visualization they built increased our conversion rate by 60%. True professionals.",
              name: "Amit Kumar",
              role: "Founder at DesignPro",
            },
          ].map((t, i) => (
            <ParallaxLayer key={t.name} speed={0.04 + i * 0.03}>
              <div className="testimonial-card">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ marginBottom: "1rem", opacity: 0.25 }}>
                  <path d="M11 7H7a4 4 0 0 0-4 4v1h4a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5a6 6 0 0 1 6-6h3v2Zm11 0h-4a4 4 0 0 0-4 4v1h4a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-5a6 6 0 0 1 6-6h3v2Z" fill="var(--accent)" />
                </svg>
                <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-role">{t.role}</p>
                  </div>
                </div>
              </div>
            </ParallaxLayer>
          ))}
        </div>
      </ParallaxSection>

      {/* ─── CTA STRIP ─── */}
      <ParallaxSection
        speed={0.04}
        slideDistance={30}
        style={{
          position: "relative",
          zIndex: 2,
          padding: "4rem clamp(1rem, 5vw, 5rem)",
          background: "var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2
            style={{
              margin: "0 0 0.5rem",
              fontSize: "clamp(1.8rem,4vw,3rem)",
              fontWeight: 950,
              color: "#fff",
              lineHeight: 1,
            }}
          >
            READY TO BUILD YOUR WORLD?
          </h2>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.85)",
              fontWeight: 800,
            }}
          >
            Tell us your idea. We make it real in 3D.
          </p>
        </div>
        <Link
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "3rem",
            padding: "0 2rem",
            background: "var(--bg-dark)",
            color: "#fff",
            fontWeight: 900,
            fontSize: "0.95rem",
            textDecoration: "none",
            whiteSpace: "nowrap",
            borderRadius: "var(--radius-sm)",
            transition: "transform 160ms ease, box-shadow 160ms ease",
          }}
        >
          START A PROJECT →
        </Link>
      </ParallaxSection>
    </>
  );
}
