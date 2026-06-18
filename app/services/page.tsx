"use client";

const services = [
  {
    label: "01",
    title: "Game Development",
    text: "Unity-powered gameplay systems, prototypes, and polished interactive worlds."
  },
  {
    label: "02",
    title: "AR Applications",
    text: "Immersive mobile AR tools for products, learning, previews, and branded moments."
  },
  {
    label: "03",
    title: "VR Experiences",
    text: "Virtual spaces, guided experiences, and hands-on simulations built for presence."
  },
  {
    label: "04",
    title: "Architectural Walkthrough",
    text: "Real-time spaces that help clients explore interiors, exteriors, and layouts."
  },
  {
    label: "05",
    title: "Training Simulations",
    text: "Interactive modules for operations, safety, onboarding, and technical practice."
  },
  {
    label: "06",
    title: "Product Visualization",
    text: "High-detail 3D assets and product scenes for launches, demos, and configurators."
  }
];

export default function ServicesPage() {
  return (
    <main style={{ paddingTop: "8rem", minHeight: "80vh" }}>
      <section className="content-section services-section">
        <div className="section-heading">
          <p>Services</p>
          <h2>WHAT WE BUILD</h2>
          <span>From mobile games to industrial VR, our stack does it all.</span>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <span>{service.label}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
