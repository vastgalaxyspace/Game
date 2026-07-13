"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus({ type: "success", message: "Thank you! We will get back to you soon." });
        setForm({ name: "", email: "", phone: "", projectType: "", budget: "", message: "" });
      } else {
        const data = await response.json();
        setStatus({ type: "error", message: data.error || "Failed to send message." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setStatus({ type: "", message: "" });
      }, 4000);
    }
  };

  return (
    <>
      <div className="parallax-video-layer">
        <video autoPlay muted loop playsInline className="contact-bg-video">
          <source src="/video/contactus.mp4" type="video/mp4" />
        </video>
        <div className="contact-video-overlay" />
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
        <section className="content-section !bg-transparent">
          <div className="contact-layout">
            {/* ── Left: Form ── */}
            <div className="contact-form contact-glass-card">
              <h3 className="mb-6 font-extrabold text-text-primary">
                Send Us a Message
              </h3>
              <form className="form-grid" onSubmit={handleSubmit}>
                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Phone */}
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Your phone number"
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
                <div className="form-group col-span-full">
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
                <div className="form-group col-span-full">
                  <label htmlFor="message">Project Details *</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project..."
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin mr-2"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      SENDING...
                    </>
                  ) : (
                    "SEND MESSAGE →"
                  )}
                </button>
                {status.message && (
                  <div
                    className="mt-4 font-bold"
                    style={{ color: status.type === "success" ? "#4ade80" : "#ff4d4d" }}
                  >
                    {status.message}
                  </div>
                )}
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
                  <a href="contact@mgdgames.ai">
                    contact@mgdgames.ai
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
                  <a href="tel:+918433886685">8433886685</a>
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
              <h4 className="mt-6 uppercase tracking-[0.12em]">
                Follow Us
              </h4>
              <div className="social-grid">
                
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
      </div>

      {/* ── CTA Banner ── */}
      <section className="cta-banner">
        <h2>CURIOUS ABOUT WHAT WE CAN BUILD?</h2>
        <p>Discover our full range of 3D game models and AR/VR services.</p>
        <Link href="/services" className="button button-primary">
          EXPLORE OUR SERVICES →
        </Link>
      </section>

      <Footer />
    </>
  );
}
