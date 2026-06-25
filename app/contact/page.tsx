"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

export default function ContactPage() {
  const [pages, setPages] = useState(3);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        // Calculate exactly how many viewports (vh) the content takes up
        const contentHeight = contentRef.current.scrollHeight;
        const vh = window.innerHeight;
        // Add a tiny bit of buffer (0.05) to ensure nothing is clipped
        setPages(contentHeight / vh + 0.05);
      }
    };

    handleResize(); // Initial calculation
    
    // Add small delay for initial load to ensure fonts/images are rendered
    setTimeout(handleResize, 100);
    setTimeout(handleResize, 500);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We will get back to you soon.");
  };

  return (
    <div className="parallax-contact-wrapper">
      <Parallax pages={pages} className="parallax-container">

        {/* ── Video Background Layer (scrolls slower = parallax) ── */}
        <ParallaxLayer offset={0} speed={-0.2} factor={pages + 1} className="parallax-video-layer">
          <video autoPlay muted loop playsInline className="contact-bg-video">
            <source src="/video/contactus.mp4" type="video/mp4" />
          </video>
          <div className="contact-video-overlay" />
        </ParallaxLayer>

        {/* ── ALL page content in one layer (speed=0 means natural scrolling) ── */}
        <ParallaxLayer offset={0} speed={0} factor={pages} className="parallax-content-layer">
          <div ref={contentRef} style={{ width: "100%" }}>

          {/* ── Hero ── */}
          <section className="page-hero">
            <p className="section-kicker">CONTACT US</p>
            <h1
              className="section-title"
              dangerouslySetInnerHTML={{
                __html:
                  "LET'S BUILD SOMETHING <span class='gradient-text'>AMAZING</span>",
              }}
            />
            <p className="section-subtitle">
              Tell us about your project, game idea, or simulation needs. We make it
              real in 3D.
            </p>
          </section>

          {/* ── Contact Layout ── */}
          <section
            className="content-section"
            style={{ background: "transparent" }}
          >
            <div className="contact-layout">
              {/* ── Left: Form ── */}
              <div className="contact-form contact-glass-card">
                <h3
                  style={{
                    color: "var(--text-primary)",
                    fontWeight: 800,
                    marginBottom: "1.5rem",
                  }}
                >
                  Send Us a Message
                </h3>

                <form className="form-grid" onSubmit={handleSubmit}>
                  {/* Name */}
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 00000 00000"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Project Type */}
                  <div className="form-group">
                    <label htmlFor="projectType">Project Type</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                    >
                      <option value="">Select a project type</option>
                      <option value="Game Development">Game Development</option>
                      <option value="AR Application">AR Application</option>
                      <option value="VR Experience">VR Experience</option>
                      <option value="Architectural Walkthrough">
                        Architectural Walkthrough
                      </option>
                      <option value="Training Simulation">
                        Training Simulation
                      </option>
                      <option value="Product Visualization">
                        Product Visualization
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Budget – full width */}
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                    <label htmlFor="budget">Budget Range</label>
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                    >
                      <option value="">Select your budget</option>
                      <option value="Under ₹1 Lakh">Under ₹1 Lakh</option>
                      <option value="₹1-5 Lakhs">₹1-5 Lakhs</option>
                      <option value="₹5-15 Lakhs">₹5-15 Lakhs</option>
                      <option value="₹15+ Lakhs">₹15+ Lakhs</option>
                      <option value="Not Sure Yet">Not Sure Yet</option>
                    </select>
                  </div>

                  {/* Message – full width */}
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                    <label htmlFor="message">Project Details</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project..."
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    SEND MESSAGE →
                  </button>
                </form>
              </div>

              {/* ── Right: Info Stack ── */}
              <div className="contact-info-stack">
                {/* Email Card */}
                <div className="contact-info-card contact-glass-card">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 4l-10 8L2 4" />
                  </svg>
                  <h4>EMAIL</h4>
                  <p>
                    <a href="mailto:hello@muktagamedev.com">
                      hello@muktagamedev.com
                    </a>
                  </p>
                </div>

                {/* Phone Card */}
                <div className="contact-info-card contact-glass-card">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <h4>PHONE</h4>
                  <p>
                    <a href="tel:+910000000000">+91 00000 00000</a>
                  </p>
                </div>

                {/* Location Card */}
                <div className="contact-info-card contact-glass-card">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <h4>LOCATION</h4>
                  <p>India</p>
                </div>

                {/* Social */}
                <h4
                  style={{
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    marginTop: "1.5rem",
                  }}
                >
                  Follow Us
                </h4>

                <div className="social-grid">
                  {/* GitHub */}
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77 5.44 5.44 0 003.5 8.55c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                    </svg>
                    GitHub
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    LinkedIn
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    Instagram
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                    </svg>
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── CTA Banner ── */}
          <section className="cta-banner">
            <h2>PREFER A QUICK CHAT?</h2>
            <p>Schedule a 15-minute call to discuss your project.</p>
            <Link href="/contact" className="button button-primary">
              BOOK A CALL →
            </Link>
          </section>

          <Footer />
          </div>

        </ParallaxLayer>

      </Parallax>
    </div>
  );
}
