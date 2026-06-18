"use client";

export default function ContactPage() {
  return (
    <main style={{ paddingTop: "8rem", minHeight: "80vh" }}>
      <section className="content-section" style={{ background: "transparent" }}>
        <div className="section-heading">
          <p>Contact Us</p>
          <h2>GET IN TOUCH</h2>
          <span>Tell us about your project, game idea, or simulation needs. We make it real in 3D.</span>
        </div>

        <div className="service-grid" style={{ marginTop: "3rem" }}>
          <article className="service-card" style={{ minHeight: "10rem" }}>
            <span>✉</span>
            <h3>Email Us</h3>
            <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
              <a href="mailto:hello@muktagamedev.com" style={{ color: "var(--red)", fontWeight: "bold" }}>
                hello@muktagamedev.com
              </a>
            </p>
          </article>

          <article className="service-card" style={{ minHeight: "10rem" }}>
            <span>📞</span>
            <h3>Call Us</h3>
            <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
              <a href="tel:+910000000000" style={{ color: "var(--red)", fontWeight: "bold" }}>
                +91 00000 00000
              </a>
            </p>
          </article>

          <article className="service-card" style={{ minHeight: "10rem" }}>
            <span>📍</span>
            <h3>Location</h3>
            <p style={{ marginTop: "1rem", fontSize: "1.1rem", fontWeight: "bold", color: "#555770" }}>
              India
            </p>
          </article>
        </div>

        <div className="section-heading" style={{ marginTop: "5rem", marginBottom: "2rem" }}>
          <h3>Follow Our Journey</h3>
        </div>
        <div className="ability-tags" style={{ justifyContent: "center", gap: "1rem" }}>
          <a href="#" className="button button-secondary" style={{ minHeight: "auto", padding: "0.6rem 1.5rem" }}>LinkedIn</a>
          <a href="#" className="button button-secondary" style={{ minHeight: "auto", padding: "0.6rem 1.5rem" }}>GitHub</a>
          <a href="#" className="button button-secondary" style={{ minHeight: "auto", padding: "0.6rem 1.5rem" }}>Instagram</a>
          <a href="#" className="button button-secondary" style={{ minHeight: "auto", padding: "0.6rem 1.5rem" }}>YouTube</a>
        </div>
      </section>
    </main>
  );
}
