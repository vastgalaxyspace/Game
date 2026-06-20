"use client";

import Link from "next/link";

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

      {/* ── 2. OUR STORY ─────────────────────────────────── */}
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

          <div className="about-story-visual">
            <div className="logo-display">
              <span>MUKTA</span>
            </div>
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

      {/* ── 4. PROCESS ───────────────────────────────────── */}
      <section
        className="content-section process-section"
        style={{ background: "var(--bg-dark)" }}
      >
        <span className="section-kicker">PROCESS</span>
        <h2 className="section-title">HOW WE WORK</h2>
        <p className="section-subtitle">
          A clear path from rough concept to playable, presentable experience.
        </p>

        <div className="process-grid">
          {[
            {
              num: "01",
              title: "Discover",
              desc: "Understand your idea, users, goals, and target platform.",
            },
            {
              num: "02",
              title: "Design",
              desc: "Shape characters, props, spaces, and visual systems in Blender.",
            },
            {
              num: "03",
              title: "Develop",
              desc: "Bring the experience to life with Unity interactions and polish.",
            },
            {
              num: "04",
              title: "Deliver",
              desc: "Prepare builds and assets for web, mobile, desktop, or headset.",
            },
          ].map((step) => (
            <div className="process-card glass-card" key={step.num}>
              <span className="process-number">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. TECH STACK ────────────────────────────────── */}
      <section
        className="content-section"
        style={{ background: "var(--surface)" }}
      >
        <span className="section-kicker">TECHNOLOGY</span>
        <h2 className="section-title">OUR TOOLKIT</h2>

        <div className="tech-grid">
          <div className="tech-card glass-card">
            <div className="tech-icon tech-icon--blender">B</div>
            <h3>Blender 3D</h3>
            <p>
              Industry-standard open-source 3D creation suite for modeling,
              sculpting, texturing, rigging, animation, and rendering. Our
              artists craft every asset with precision and artistry.
            </p>
          </div>

          <div className="tech-card glass-card">
            <div className="tech-icon tech-icon--unity">U</div>
            <h3>Unity Engine</h3>
            <p>
              The world&apos;s leading real-time development platform. We use
              Unity for cross-platform game builds, AR/VR applications,
              interactive simulations, and product configurators.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. TEAM ──────────────────────────────────────── */}
      <section
        className="content-section"
        style={{ background: "var(--bg-dark)" }}
      >
        <span className="section-kicker">THE TEAM</span>
        <h2 className="section-title">MEET THE CREATORS</h2>

        <div className="team-grid">
          {[
            {
              initials: "DM",
              name: "Dhiraj Mukta",
              role: "Founder & Lead Developer",
            },
            {
              initials: "AP",
              name: "Arjun Patil",
              role: "3D Artist & Animator",
            },
            {
              initials: "SK",
              name: "Sneha Kulkarni",
              role: "AR/VR Specialist",
            },
            {
              initials: "RV",
              name: "Rohan Verma",
              role: "Unity Developer",
            },
          ].map((member) => (
            <div className="team-card glass-card" key={member.initials}>
              <div className="team-avatar">{member.initials}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
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
    </>
  );
}
