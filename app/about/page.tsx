"use client";

import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const AboutModelViewer = dynamic(
  () => import("@/components/AboutModelViewer").then((mod) => mod.AboutModelViewer),
  { ssr: false }
);

/* ─── Animated Circular Ring ─── */
function SkillRing({
  label,
  percent,
  color,
  delay = 0,
}: {
  label: string;
  percent: number;
  color: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div ref={ref} className="skill-ring-item" style={{ transitionDelay: `${delay}ms` }}>
      <div className="skill-ring-svg-wrap">
        <svg viewBox="0 0 120 120" className="skill-ring-svg">
          <circle cx="60" cy="60" r={radius} className="skill-ring-track" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            className="skill-ring-progress"
            style={{
              stroke: color,
              strokeDasharray: circumference,
              strokeDashoffset: visible ? offset : circumference,
              transitionDelay: `${delay}ms`,
            }}
          />
        </svg>
        <span className="skill-ring-percent">
          {visible ? `${percent}%` : "0%"}
        </span>
      </div>
      <span className="skill-ring-label">{label}</span>
    </div>
  );
}

/* ─── Timeline Step ─── */
function TimelineStep({
  num,
  title,
  desc,
  index,
}: {
  num: string;
  title: string;
  desc: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`timeline-step ${visible ? "timeline-step--visible" : ""} ${index % 2 === 1 ? "timeline-step--right" : ""}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="timeline-dot">
        <span>{num}</span>
      </div>
      <div className="timeline-content">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}

/* ─── Flip Card ─── */
function TeamFlipCard({
  initials,
  name,
  role,
  bio,
}: {
  initials: string;
  name: string;
  role: string;
  bio: string;
}) {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-front glass-card">
          <div className="team-avatar">{initials}</div>
          <h3>{name}</h3>
          <p>{role}</p>
        </div>
        {/* Back */}
        <div className="flip-card-back glass-card">
          <h3>{name}</h3>
          <p className="flip-bio">{bio}</p>
          <span className="flip-hint">↩ Flip back</span>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ── 1. PAGE HERO ─────────────────────────────────── */}
      <section className="page-hero">
        <span className="section-kicker">ABOUT US</span>
        <h1 className="section-title">
          WE ARE <span className="gradient-text">MUKTA</span>
        </h1>
        <p className="section-subtitle">
          A passionate Blender + Unity studio building immersive 3D worlds,
          games, and interactive experiences from India.
        </p>
      </section>

      {/* ── 2. OUR STORY + 3D MODEL ──────────────────────── */}
      <section
        className="content-section"
        style={{ background: "var(--bg-dark)" }}
      >
        <div className="about-story">
          <div className="about-story-text">
            <h2>
              FROM PASSION TO{" "}
              <span style={{ color: "var(--accent)" }}>PIXELS</span>
            </h2>
            <p>
              Mukta Game &amp; Development was born from a shared obsession with
              immersive digital experiences. What started as a small team of
              Blender artists and Unity developers has grown into a full-service
              3D studio delivering cutting-edge games, simulations, and
              interactive applications.
            </p>
            <p>
              We believe that every great experience starts with a great story.
              Our team combines artistic vision with technical expertise to
              create worlds that captivate, educate, and inspire. From concept
              art to final deployment, we handle the complete pipeline — no
              handoffs, no gaps.
            </p>
            <Link href="/services" className="button button-primary">
              Explore Our Services →
            </Link>
          </div>

          <div className="about-story-visual about-story-visual--3d">
            <AboutModelViewer />
          </div>
        </div>
      </section>

      {/* ── 3. MISSION & VISION ──────────────────────────── */}
      <section
        className="content-section"
        style={{ background: "var(--surface)" }}
      >
        <span className="section-kicker">OUR PURPOSE</span>
        <h2 className="section-title">MISSION &amp; VISION</h2>

        <div className="mission-grid">
          <div className="mission-card glass-card">
            <h3>Our Mission</h3>
            <p>
              To democratize immersive 3D experiences by delivering world-class
              games, simulations, and interactive applications that push the
              boundaries of what&apos;s possible with Blender and Unity.
            </p>
          </div>

          <div className="mission-card glass-card">
            <h3>Our Vision</h3>
            <p>
              To become India&apos;s leading 3D interactive studio — known
              globally for crafting experiences that blur the line between
              digital and reality, making immersive technology accessible to
              every industry.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. PROCESS — SCROLLING TIMELINE ──────────────── */}
      <section
        className="content-section"
        style={{ background: "var(--bg-dark)" }}
      >
        <div className="section-heading">
          <p>PROCESS</p>
          <h2>HOW WE WORK</h2>
          <span>
            A clear path from rough concept to playable, presentable experience.
          </span>
        </div>

        <div className="timeline">
          <div className="timeline-line" />
          {[
            {
              num: "01",
              title: "Discover",
              desc: "We deep-dive into your idea, audience, goals, and target platform to chart the project DNA.",
            },
            {
              num: "02",
              title: "Design",
              desc: "Characters, environments, props, and UI systems are crafted in Blender with cinematic polish.",
            },
            {
              num: "03",
              title: "Develop",
              desc: "Unity brings the vision to life — gameplay, physics, shaders, interactions, and platform builds.",
            },
            {
              num: "04",
              title: "Deliver",
              desc: "Final QA, optimization, deployment to web, mobile, desktop, or XR headsets. Post-launch support included.",
            },
          ].map((step, i) => (
            <TimelineStep key={step.num} {...step} index={i} />
          ))}
        </div>
      </section>

      {/* ── 5. TECH STACK — ANIMATED RINGS ────────────────── */}
      <section
        className="content-section"
        style={{ background: "var(--surface)" }}
      >
        <div className="section-heading">
          <p>TECHNOLOGY</p>
          <h2>OUR TOOLKIT</h2>
        </div>

        <div className="skill-rings-container">
          <SkillRing label="Blender 3D" percent={95} color="#ea7600" delay={0} />
          <SkillRing label="Unity Engine" percent={92} color="#7b68ee" delay={150} />
          <SkillRing label="C# / Scripting" percent={88} color="#00d4ff" delay={300} />
          <SkillRing label="AR / VR" percent={85} color="#e3000b" delay={450} />
          <SkillRing label="Shader Dev" percent={78} color="#f5a623" delay={600} />
          <SkillRing label="Web 3D" percent={82} color="#4ade80" delay={750} />
        </div>
      </section>

      {/* ── 6. BLENDER SHOWCASE ─────────────────────────── */}
      <section
        className="content-section"
        style={{ background: "var(--bg-dark)" }}
      >
        <div className="section-heading">
          <p>SHOWCASE</p>
          <h2>BLENDER MODELS</h2>
          <span>A glimpse of our detailed 3D artwork and models.</span>
        </div>

        <div className="showcase-grid">
          {[ "B2", "B3", "B4", "B5", "B6", "B7"].map((img) => (
            <div key={img} className="showcase-item">
              <Image
                src={`/${img}.jpg`}
                alt={`Blender Showcase ${img}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. STATS STRIP ───────────────────────────────── */}
      <section className="stats-strip">
        {[
          { number: "50+", label: "Projects Delivered" },
          { number: "12+", label: "AR/VR Experiences" },
          { number: "8", label: "Industry Verticals" },
          { number: "100%", label: "Client Satisfaction" },
        ].map((stat) => (
          <div className="stat-item" key={stat.label}>
            <span className="stat-number">{stat.number}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* ── 8. CTA BANNER ────────────────────────────────── */}
      <section className="cta-banner">
        <h2>READY TO BUILD YOUR WORLD?</h2>
        <p>Tell us your idea. We make it real in 3D.</p>
        <Link href="/contact" className="button button-primary">
          START A PROJECT →
        </Link>
      </section>

      <Footer />
    </>
  );
}
