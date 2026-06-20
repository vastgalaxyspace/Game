"use client";

import Link from "next/link";

/* ─── Inline SVG Icons (24×24, stroke, currentColor) ─── */

const IconGamepad = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="3" />
    <line x1="6" y1="10" x2="6" y2="14" />
    <line x1="4" y1="12" x2="8" y2="12" />
    <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="16" cy="14" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconAR = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <line x1="5" y1="18" x2="19" y2="18" />
    <polygon points="12,7 14.5,12 12,11 9.5,12" fill="none" />
    <line x1="15" y1="6" x2="16" y2="5" />
    <circle cx="16.5" cy="4.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const IconVR = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 10a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-3.28l-1.44 2.16a1 1 0 0 1-1.56 0L11.28 17H5a3 3 0 0 1-3-3z" />
    <circle cx="8" cy="12" r="2" />
    <circle cx="16" cy="12" r="2" />
  </svg>
);

const IconBuilding = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="18" rx="1" />
    <rect x="14" y="8" width="7" height="13" rx="1" />
    <line x1="6" y1="7" x2="6" y2="7.01" />
    <line x1="6" y1="11" x2="6" y2="11.01" />
    <line x1="6" y1="15" x2="6" y2="15.01" />
    <line x1="17" y1="12" x2="17" y2="12.01" />
    <line x1="17" y1="16" x2="17" y2="16.01" />
    <line x1="10" y1="21" x2="14" y2="21" />
  </svg>
);

const IconShield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l7 4v5c0 5.25-3.5 9.74-7 11c-3.5-1.26-7-5.75-7-11V6z" />
    <polyline points="9,12 11,14 15,10" />
  </svg>
);

const IconCube = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
    <line x1="12" y1="12" x2="12" y2="22" />
  </svg>
);

/* ─── Data ─── */

const services = [
  {
    num: "01",
    icon: <IconGamepad />,
    title: "Game Development",
    desc: "Unity-powered gameplay systems, prototypes, and polished interactive worlds built for any platform.",
    features: [
      "Real-time multiplayer",
      "Cross-platform builds",
      "Physics & AI systems",
      "In-app purchases",
    ],
  },
  {
    num: "02",
    icon: <IconAR />,
    title: "AR Applications",
    desc: "Immersive mobile AR tools for products, learning, previews, and branded moments.",
    features: [
      "Marker-based tracking",
      "Surface detection",
      "3D product placement",
      "AR filters & effects",
    ],
  },
  {
    num: "03",
    icon: <IconVR />,
    title: "VR Experiences",
    desc: "Virtual spaces, guided experiences, and hands-on simulations built for presence.",
    features: [
      "Room-scale VR",
      "Hand tracking",
      "360° environments",
      "Multi-user spaces",
    ],
  },
  {
    num: "04",
    icon: <IconBuilding />,
    title: "Architectural Walkthrough",
    desc: "Real-time spaces that help clients explore interiors, exteriors, and layouts.",
    features: [
      "Photorealistic rendering",
      "Interactive floor plans",
      "Day/night cycles",
      "Material switching",
    ],
  },
  {
    num: "05",
    icon: <IconShield />,
    title: "Training Simulations",
    desc: "Interactive modules for operations, safety, onboarding, and technical practice.",
    features: [
      "Scenario branching",
      "Performance analytics",
      "Safety protocols",
      "Certification tracking",
    ],
  },
  {
    num: "06",
    icon: <IconCube />,
    title: "Product Visualization",
    desc: "High-detail 3D assets and product scenes for launches, demos, and configurators.",
    features: [
      "360° product views",
      "Real-time configurator",
      "Exploded views",
      "Material editor",
    ],
  },
];

const processSteps = [
  {
    num: "01",
    title: "Discover",
    desc: "We listen, research, and define the scope — aligning goals, audience, and constraints into a clear creative brief.",
  },
  {
    num: "02",
    title: "Design",
    desc: "Concepts, wireframes, and art direction take shape in Blender — from look-dev to UI, every detail is intentional.",
  },
  {
    num: "03",
    title: "Develop",
    desc: "Unity brings the vision to life with real-time interactivity, polished mechanics, and cross-platform deployment.",
  },
  {
    num: "04",
    title: "Deliver",
    desc: "Rigorous QA, performance tuning, and platform-specific optimization ensure a flawless launch every time.",
  },
];

/* ─── Page Component ─── */

export default function ServicesPage() {
  return (
    <>
      {/* ━━━ HERO ━━━ */}
      <section className="page-hero" style={{ background: "var(--bg-dark)" }}>
        <p className="section-kicker">OUR SERVICES</p>
        <h1
          className="section-title"
          dangerouslySetInnerHTML={{
            __html: 'WHAT WE <span class="gradient-text">BUILD</span>',
          }}
        />
        <p className="section-subtitle">
          From mobile games to industrial VR — our Blender + Unity pipeline
          delivers immersive 3D experiences across every platform.
        </p>
      </section>

      {/* ━━━ SERVICES DETAIL GRID ━━━ */}
      <section
        className="content-section"
        style={{ background: "var(--surface)" }}
      >
        <div className="services-detail-grid">
          {services.map((s) => (
            <div className="services-detail-card" key={s.num}>
              <span className="card-number">{s.num}</span>
              <div className="card-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul>
                {s.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ TECH STACK ━━━ */}
      <section
        className="content-section"
        style={{ background: "var(--bg-dark)" }}
      >
        <p className="section-kicker">OUR TOOLKIT</p>
        <h2 className="section-title">
          POWERED BY THE <span className="gradient-text">BEST</span>
        </h2>

        <div className="tech-grid">
          {/* Blender */}
          <div className="tech-card">
            <div className="tech-icon tech-icon--blender">B</div>
            <h3>Blender</h3>
            <p>
              Industry-grade 3D modeling, sculpting, texturing, and animation —
              all in a single open-source powerhouse. From high-poly sculpts to
              game-ready assets, Blender drives our entire art pipeline.
            </p>
          </div>

          {/* Unity */}
          <div className="tech-card">
            <div className="tech-icon tech-icon--unity">U</div>
            <h3>Unity Engine</h3>
            <p>
              Real-time rendering, cross-platform deployment, and native AR/VR
              SDK support. Unity powers every interactive experience we ship —
              from mobile games to enterprise simulations.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ PROCESS TIMELINE ━━━ */}
      <section
        className="content-section"
        style={{ background: "var(--surface)" }}
      >
        <p className="section-kicker">OUR PROCESS</p>
        <h2 className="section-title">
          FROM IDEA TO <span className="gradient-text">LAUNCH</span>
        </h2>

        <div className="process-grid">
          {processSteps.map((step) => (
            <div className="process-card" key={step.num}>
              <span className="card-number">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section
        className="content-section"
        style={{ background: "var(--bg-dark)" }}
      >
        <div className="cta-banner">
          <h2 className="section-title">
            HAVE A PROJECT IN <span className="gradient-text">MIND?</span>
          </h2>
          <p className="section-subtitle">
            Let&rsquo;s discuss your idea and bring it to life in 3D.
          </p>
          <Link href="/contact" className="button button-primary">
            START A PROJECT →
          </Link>
        </div>
      </section>
    </>
  );
}
