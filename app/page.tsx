"use client";

import { ParallaxSection, ParallaxLayer, useScrollY } from "@/components/Parallax";
import Link from "next/link";

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
            src="/video/create_video_for_this_backgrou.mp4"
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
            <a className="button button-primary" href="#work">
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
          background: "#fff",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
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
                color: "var(--red)",
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
                color: "#555770",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </ParallaxSection>

      {/* ─── WHAT WE DO — 3 HIGHLIGHT CARDS ─── */}
      <ParallaxSection
        speed={0.06}
        slideDistance={50}
        style={{
          position: "relative",
          zIndex: 2,
          padding: "5rem 5rem",
          background: "#f5f5f7",
        }}
      >
        <ParallaxLayer speed={0.1} style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p
            style={{
              color: "var(--red)",
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
          ].map((card) => (
            <div
              key={card.title}
              style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.08)",
                borderBottom: "3px solid var(--red)",
                padding: "2rem 1.5rem",
                transition: "transform 180ms ease, box-shadow 180ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-6px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 20px 50px rgba(227,0,11,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <h3
                style={{
                  margin: "0 0 0.75rem",
                  fontSize: "1rem",
                  fontWeight: 900,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  margin: "0 0 1.25rem",
                  color: "#555770",
                  lineHeight: 1.65,
                }}
              >
                {card.desc}
              </p>
              <Link
                href={card.link}
                style={{
                  color: "var(--red)",
                  fontWeight: 900,
                  fontSize: "0.85rem",
                  letterSpacing: "0.05em",
                }}
              >
                Learn More →
              </Link>
            </div>
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
          padding: "5rem 5rem",
          background: "#fff",
        }}
      >
        <ParallaxLayer speed={0.12} style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p
            style={{
              color: "var(--red)",
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
          <div
            style={{
              minHeight: "22rem",
              background:
                "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85)), radial-gradient(circle at 30% 30%, rgba(227,0,11,0.35), transparent 60%), #1a1a2e",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <span
              style={{
                background: "var(--red)",
                color: "#fff",
                fontSize: "0.7rem",
                fontWeight: 900,
                padding: "0.36rem 0.55rem",
                alignSelf: "flex-start",
                marginBottom: "0.75rem",
              }}
            >
              Game
            </span>
            <h3
              style={{
                margin: "0 0 0.5rem",
                color: "#fff",
                fontSize: "1.4rem",
                fontWeight: 900,
              }}
            >
              Mech Arena Prototype
            </h3>
            <p
              style={{
                margin: "0 0 1rem",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.6,
              }}
            >
              A fast-paced mech combat prototype with destructible environments.
            </p>
            <Link
              href="/contact"
              style={{ color: "var(--red)", fontWeight: 900 }}
            >
              View Project →
            </Link>
          </div>
          {/* Two small cards stacked */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
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
            ].map((p) => (
              <div
                key={p.title}
                style={{
                  flex: 1,
                  background:
                    "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.8)), radial-gradient(circle at 70% 20%, rgba(227,0,11,0.25), transparent 50%), #1a1a2e",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <span
                  style={{
                    background: "var(--red)",
                    color: "#fff",
                    fontSize: "0.7rem",
                    fontWeight: 900,
                    padding: "0.3rem 0.5rem",
                    alignSelf: "flex-start",
                    marginBottom: "0.6rem",
                  }}
                >
                  {p.cat}
                </span>
                <h3
                  style={{
                    margin: "0 0 0.4rem",
                    color: "#fff",
                    fontSize: "1rem",
                    fontWeight: 900,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    margin: "0 0 0.75rem",
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "0.88rem",
                    lineHeight: 1.5,
                  }}
                >
                  {p.desc}
                </p>
                <Link
                  href="/contact"
                  style={{
                    color: "var(--red)",
                    fontWeight: 900,
                    fontSize: "0.85rem",
                  }}
                >
                  View →
                </Link>
              </div>
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
          padding: "5rem 5rem",
          background: "#f5f5f7",
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
                color: "var(--red)",
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
              }}
            >
              BLENDER + UNITY.
              <br />
              <span style={{ color: "var(--red)" }}>END TO END.</span>
            </h2>
            <p
              style={{
                color: "#555770",
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
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
              <div
                key={item.title}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                  padding: "1rem",
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderLeft: "3px solid var(--red)",
                }}
              >
                <div>
                  <h4
                    style={{
                      margin: "0 0 0.25rem",
                      fontSize: "0.9rem",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      color: "#555770",
                      fontSize: "0.88rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ─── CTA STRIP ─── */}
      <ParallaxSection
        speed={0.04}
        slideDistance={30}
        style={{
          position: "relative",
          zIndex: 2,
          padding: "4rem 5rem",
          background: "var(--red)",
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
            background: "#0a0a0f",
            color: "#fff",
            fontWeight: 900,
            fontSize: "0.95rem",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          START A PROJECT →
        </Link>
      </ParallaxSection>
    </>
  );
}
