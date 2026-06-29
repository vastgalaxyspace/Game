"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { ShowcaseReel } from "@/components/ShowcaseReel";

const CustomSketchfabViewer = dynamic(
  () =>
    import("@/components/CustomSketchfabViewer").then(
      (mod) => mod.CustomSketchfabViewer
    ),
  {
    ssr: false,
    loading: () => <HeroModelFallback />,
  }
);

function HeroModelFallback() {
  return (
    <div className="hero-model-fallback" aria-hidden="true">
      <div className="hero-model-fallback__mark" />
    </div>
  );
}

const expertiseCards = [
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
];

const stats = [
  { number: "50+", label: "Projects Delivered" },
  { number: "12+", label: "AR/VR Experiences" },
  { number: "8", label: "Industry Verticals" },
  { number: "100%", label: "Client Satisfaction" },
];

const featuredProjects = [
  {
    title: "Industrial VR Trainer",
    cat: "Simulation",
    desc: "Safety training module for heavy machinery.",
  },
  {
    title: "Interactive Product Bay",
    cat: "Visualization",
    desc: "360 degree product configurator for client demos.",
  },
];

const whyItems = [
  { title: "Full Pipeline Studio", desc: "Blender 3D art + Unity dev under one roof." },
  { title: "Multi-Platform Delivery", desc: "Web, mobile, desktop, and headset builds." },
  { title: "Rapid Prototyping", desc: "Playable proof-of-concept in weeks, not months." },
  { title: "Post-Launch Support", desc: "Updates, optimization, and feature additions." },
];

const testimonials = [
  {
    quote: "Mukta transformed our concept into a stunning 3D experience.",
    name: "Rahul Sharma",
    role: "CEO at TechVista",
  },
  {
    quote: "Their VR training module reduced our onboarding time by 40%.",
    name: "Priya Patel",
    role: "Director at IndusTrain",
  },
  {
    quote: "The product visualization increased our conversion rate by 60%.",
    name: "Amit Kumar",
    role: "Founder at DesignPro",
  },
];

export default function Home() {
  const [loadHeroModel, setLoadHeroModel] = useState(false);

  useEffect(() => {
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const fallback = window.setTimeout(() => setLoadHeroModel(true), 1800);
    const idleId = idleWindow.requestIdleCallback?.(
      () => {
        window.clearTimeout(fallback);
        setLoadHeroModel(true);
      },
      { timeout: 2200 }
    );

    return () => {
      window.clearTimeout(fallback);
      if (idleId && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId);
      }
    };
  }, []);

  const scrollToShowcase = () => {
    document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="scene-canvas home-hero__model">
          <div className="sketchfab-embed-wrapper">
            {loadHeroModel ? <CustomSketchfabViewer /> : <HeroModelFallback />}
          </div>
        </div>

        <div className="hero-copy">
          <p className="hero-kicker">Blender + Unity Studio</p>
          <h1>
            <span>WE BUILD</span>
            <span className="text-red">WORLDS</span>
            <span>IN 3D.</span>
          </h1>
          <p>
            Blender + Unity powered studio crafting games, AR/VR apps,
            simulations, and interactive 3D experiences.
          </p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={scrollToShowcase}>
              See Our Work
            </button>
            <Link className="button button-secondary" href="/services">
              What We Do
            </Link>
          </div>
        </div>

        <a className="scroll-cue" href="#showcase">
          <span aria-hidden="true" />
          <strong>SCROLL TO EXPLORE</strong>
        </a>
      </section>

      <section className="stats-strip" aria-label="Studio stats">
        {stats.map((stat) => (
          <div key={stat.label} className="stats-strip__item">
            <div className="stats-strip__number">{stat.number}</div>
            <div className="stats-strip__label">{stat.label}</div>
          </div>
        ))}
      </section>

      <ShowcaseReel />

      <section className="home-section home-section--surface">
        <div className="section-heading">
          <p>What We Do</p>
          <h2>OUR CORE EXPERTISE</h2>
        </div>

        <div className="home-expertise-grid">
          {expertiseCards.map((card) => (
            <div key={card.title} className="expertise-card">
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <Link href={card.link} className="expertise-link">
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="home-section">
        <div className="section-heading">
          <p>Portfolio</p>
          <h2>FEATURED WORK</h2>
        </div>

        <div className="featured-grid">
          <div className="featured-card featured-card--big">
            <span className="featured-badge">Game</span>
            <h3>Mech Arena Prototype</h3>
            <p>A fast-paced mech combat prototype with destructible environments.</p>
            <Link href="/contact" className="featured-link">
              View Project
            </Link>
          </div>
          <div className="featured-stack">
            {featuredProjects.map((project) => (
              <div key={project.title} className="featured-card featured-card--small">
                <span className="featured-badge">{project.cat}</span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <Link href="/contact" className="featured-link">
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="section-action">
          <Link href="/contact" className="button button-primary">
            See Full Portfolio
          </Link>
        </div>
      </section>

      <section className="home-section home-section--surface">
        <div className="why-grid">
          <div>
            <p className="section-kicker">Why Mukta</p>
            <h2 className="section-title">
              BLENDER + UNITY.
              <br />
              <span className="text-red">END TO END.</span>
            </h2>
            <p className="section-subtitle">
              From concept art in Blender to a fully interactive Unity build, we
              handle the complete pipeline. No handoffs, no gaps, no surprises.
            </p>
            <Link href="/about" className="button button-primary">
              About Us
            </Link>
          </div>
          <div className="why-list">
            {whyItems.map((item) => (
              <div key={item.title} className="why-item">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <p>Testimonials</p>
          <h2>WHAT CLIENTS SAY</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="testimonial-card">
              <p className="testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" aria-hidden="true">
                  {testimonial.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </div>
                <div>
                  <p className="testimonial-name">{testimonial.name}</p>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div>
          <h2>READY TO BUILD YOUR WORLD?</h2>
          <p>Tell us your idea. We make it real in 3D.</p>
        </div>
        <Link href="/contact" className="button home-cta__button">
          START A PROJECT
        </Link>
      </section>

      <Footer />
    </main>
  );
}
