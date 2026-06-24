"use client";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { ShowcaseReel } from "@/components/ShowcaseReel";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const parallax = useRef<any>(null);

  return (
    <div style={{ width: "100%", height: "100%", background: "var(--bg-dark)" }}>
      <Parallax ref={parallax} pages={8.5} style={{ top: "0", left: "0" }}>

        {/* ─── HERO BACKGROUND ─── */}
        <ParallaxLayer offset={0} speed={0} factor={1.2}>
          <div className="scene-canvas" style={{ width: "100%", height: "100%", pointerEvents: "auto" }}>
            <div className="sketchfab-embed-wrapper" style={{ width: "100%", height: "100%", opacity: 0.7, background: "black", overflow: "hidden", position: "relative" }}>
              <iframe
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; xr-spatial-tracking"
                src="https://sketchfab.com/models/0d9286ebb8cc426e993e1d398b874a34/embed?autostart=1&ui_infos=0&ui_watermark=0&ui_controls=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_animations=0&ui_theme=light&dnt=1&transparent=1"
                style={{ width: "110%", height: "115%", position: "absolute", top: "-7.5%", left: "-5%" }}
              />
            </div>
          </div>
        </ParallaxLayer>

        {/* ─── HERO FOREGROUND TEXT ─── */}
        <ParallaxLayer offset={0} speed={0.4} style={{ display: "flex", alignItems: "center", pointerEvents: "none" }}>
          <div className="hero-copy" style={{ pointerEvents: "auto", marginTop: "-5%" }}>
            <p className="hero-kicker" style={{ textShadow: "0 0 20px rgba(227,0,11,0.5)" }}>Blender + Unity Studio</p>
            <h1 style={{ textShadow: "0 8px 30px rgba(0,0,0,0.8)" }}>
              <span>WE BUILD</span>
              <span className="text-red" style={{ display: "block" }}>WORLDS</span>
              <span>IN 3D.</span>
            </h1>
            <p style={{ textShadow: "0 4px 15px rgba(0,0,0,0.8)", maxWidth: "400px" }}>
              Blender + Unity powered studio crafting games, AR/VR apps, simulations, and interactive 3D experiences.
            </p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => parallax.current.scrollTo(2.3)}>
                See Our Work
              </button>
              <Link className="button button-secondary" href="/services">
                What We Do
              </Link>
            </div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={0.9} speed={0.8} style={{ pointerEvents: "none" }}>
          <a
            className="scroll-cue"
            onClick={() => parallax.current.scrollTo(1)}
            style={{ pointerEvents: "auto", cursor: "pointer", position: "absolute", bottom: "5vh", left: "50%", transform: "translateX(-50%)" }}
          >
            <span aria-hidden="true" />
            <strong>SCROLL TO EXPLORE</strong>
          </a>
        </ParallaxLayer>

        {/* ─── STATS ─── */}
        <ParallaxLayer offset={1} speed={0.2} factor={0.5}>
          <div
            className="stats-strip"
            style={{
              background: "var(--surface)",
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
              padding: "3rem 5rem",
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: "2rem",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
            }}
          >
            {[
              { number: "50+", label: "Projects Delivered" },
              { number: "12+", label: "AR/VR Experiences" },
              { number: "8", label: "Industry Verticals" },
              { number: "100%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem", fontWeight: 950, color: "var(--accent)", fontFamily: "'Outfit', sans-serif" }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ParallaxLayer>

        {/* ─── SHOWCASE REEL ─── */}
        <ParallaxLayer offset={1.3} speed={0.1} factor={1.5}>
          <ShowcaseReel />
        </ParallaxLayer>

        {/* ─── WHAT WE DO ─── */}
        <ParallaxLayer offset={2.8} speed={0.25} factor={1.5}>
          <div style={{ padding: "5rem clamp(1rem, 5vw, 5rem)", background: "var(--surface)", minHeight: "100vh" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ color: "var(--accent)", fontWeight: 900, fontSize: "0.8rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                What We Do
              </p>
              <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 950, color: "var(--text-primary)", margin: 0 }}>
                OUR CORE EXPERTISE
              </h2>
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
                <div key={card.title} className="expertise-card" style={{ transform: `translateY(${i * 20}px)` }}>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <Link href={card.link} className="expertise-link">Learn More →</Link>
                </div>
              ))}
            </div>
          </div>
        </ParallaxLayer>

        {/* WHAT WE DO: FLOATING ICONS */}
        <ParallaxLayer offset={2.9} speed={0.5} style={{ pointerEvents: "none" }}>
          <div style={{ position: "absolute", left: "15%", top: "10%", opacity: 0.2, color: "var(--accent)" }}>
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </div>
        </ParallaxLayer>

        {/* ─── PORTFOLIO ─── */}
        <ParallaxLayer offset={4.3} speed={0.15} factor={1.5}>
          <div id="work" style={{ padding: "5rem clamp(1rem, 5vw, 5rem)", background: "var(--bg-dark)", minHeight: "100vh" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ color: "var(--accent)", fontWeight: 900, fontSize: "0.8rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                Portfolio
              </p>
              <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 950, color: "var(--text-primary)", margin: 0 }}>
                FEATURED WORK
              </h2>
            </div>

            <div className="featured-grid">
              <div className="featured-card featured-card--big">
                <span className="featured-badge">Game</span>
                <h3>Mech Arena Prototype</h3>
                <p>A fast-paced mech combat prototype with destructible environments.</p>
                <Link href="/contact" className="featured-link">View Project →</Link>
              </div>
              <div className="featured-stack">
                {[
                  { title: "Industrial VR Trainer", cat: "Simulation", desc: "Safety training module for heavy machinery." },
                  { title: "Interactive Product Bay", cat: "Visualization", desc: "360° product configurator for client demos." },
                ].map((p, i) => (
                  <div key={p.title} className="featured-card featured-card--small" style={{ transform: `translateX(${i * -20}px)` }}>
                    <span className="featured-badge">{p.cat}</span>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <Link href="/contact" className="featured-link">View →</Link>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/contact" className="button button-primary">See Full Portfolio →</Link>
            </div>
          </div>
        </ParallaxLayer>

        {/* PORTFOLIO FOREGROUND ELEMENT */}
        <ParallaxLayer offset={4.5} speed={0.4} style={{ pointerEvents: "none" }}>
          <div style={{ width: "200px", height: "200px", background: "radial-gradient(circle, var(--accent-glow), transparent 70%)", position: "absolute", right: "10%", top: "40%" }} />
        </ParallaxLayer>

        {/* ─── WHY CHOOSE US ─── */}
        <ParallaxLayer offset={5.8} speed={0.2} factor={1}>
          <div style={{ padding: "5rem clamp(1rem, 5vw, 5rem)", background: "var(--surface)", minHeight: "100vh" }}>
            <div className="why-grid">
              <div>
                <p style={{ color: "var(--accent)", fontWeight: 900, fontSize: "0.8rem", letterSpacing: "0.16em", textTransform: "uppercase", margin: "0 0 1rem" }}>
                  Why Mukta
                </p>
                <h2 style={{ margin: "0 0 1.5rem", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 950, color: "var(--text-primary)" }}>
                  BLENDER + UNITY.<br /><span style={{ color: "var(--accent)" }}>END TO END.</span>
                </h2>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "2rem" }}>
                  From concept art in Blender to a fully interactive Unity build — we handle the complete pipeline. No handoffs, no gaps, no surprises.
                </p>
                <Link href="/about" className="button button-primary">About Us →</Link>
              </div>
              <div className="why-list">
                {[
                  { title: "Full Pipeline Studio", desc: "Blender 3D art + Unity dev under one roof." },
                  { title: "Multi-Platform Delivery", desc: "Web, mobile, desktop, and headset builds." },
                  { title: "Rapid Prototyping", desc: "Playable proof-of-concept in weeks, not months." },
                  { title: "Post-Launch Support", desc: "Updates, optimization, and feature additions." },
                ].map((item, i) => (
                  <div key={item.title} className="why-item" style={{ transform: `translateX(${i * 15}px)` }}>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ParallaxLayer>

        {/* WHY CHOOSE US BACKGROUND SHADOW */}
        <ParallaxLayer offset={5.8} speed={0.05} style={{ pointerEvents: "none", zIndex: -1 }}>
          <div style={{ position: "absolute", left: "-10%", top: "20%", width: "50%", height: "80%", background: "radial-gradient(circle, rgba(227,0,11,0.05), transparent 70%)" }} />
        </ParallaxLayer>

        {/* ─── TESTIMONIALS ─── */}
        <ParallaxLayer offset={6.8} speed={0.15} factor={1}>
          <div style={{ padding: "5rem clamp(1rem, 5vw, 5rem)", background: "var(--bg-dark)", minHeight: "100vh" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ color: "var(--accent)", fontWeight: 900, fontSize: "0.8rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                Testimonials
              </p>
              <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 950, color: "var(--text-primary)", margin: 0 }}>
                WHAT CLIENTS SAY
              </h2>
            </div>
            <div className="testimonial-grid">
              {[
                { quote: "Mukta transformed our concept into a stunning 3D experience.", name: "Rahul Sharma", role: "CEO at TechVista" },
                { quote: "Their VR training module reduced our onboarding time by 40%.", name: "Priya Patel", role: "Director at IndusTrain" },
                { quote: "The product visualization increased our conversion rate by 60%.", name: "Amit Kumar", role: "Founder at DesignPro" },
              ].map((t, i) => (
                <div key={t.name} className="testimonial-card" style={{ transform: `translateY(${i * 30}px)` }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ marginBottom: "1rem", opacity: 0.25 }}>
                    <path d="M11 7H7a4 4 0 0 0-4 4v1h4a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5a6 6 0 0 1 6-6h3v2Zm11 0h-4a4 4 0 0 0-4 4v1h4a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-5a6 6 0 0 1 6-6h3v2Z" fill="var(--accent)" />
                  </svg>
                  <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{t.name.split(" ").map(n => n[0]).join("")}</div>
                    <div>
                      <p className="testimonial-name">{t.name}</p>
                      <p className="testimonial-role">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ParallaxLayer>

        {/* TESTIMONIALS PARALLAX TEXT */}
        <ParallaxLayer offset={7} speed={0.6} style={{ pointerEvents: "none" }}>
          <div style={{ position: "absolute", left: "-5%", whiteSpace: "nowrap", fontSize: "15vw", fontWeight: 900, color: "rgba(255,255,255,0.02)" }}>
            CLIENT SUCCESS
          </div>
        </ParallaxLayer>

        {/* ─── CTA ─── */}
        <ParallaxLayer offset={7.8} speed={0.3} factor={0.7}>
          <div style={{ padding: "5rem clamp(1rem, 5vw, 5rem)", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 950, color: "#fff", margin: "0 0 0.5rem" }}>
                READY TO BUILD YOUR WORLD?
              </h2>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.85)", fontWeight: 800 }}>
                Tell us your idea. We make it real in 3D.
              </p>
            </div>
            <Link href="/contact" className="button" style={{ background: "var(--bg-dark)", color: "#fff" }}>
              START A PROJECT →
            </Link>
          </div>
        </ParallaxLayer>

        {/* ─── FOOTER ─── */}
        <ParallaxLayer offset={8.2} speed={0} factor={0.3}>
          <Footer />
        </ParallaxLayer>

      </Parallax>
    </div>
  );
}
