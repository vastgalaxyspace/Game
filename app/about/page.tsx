"use client";

const processSteps = [
  { step: "01", title: "Discover", text: "Understand your idea, users, goals, and target platform." },
  { step: "02", title: "Design", text: "Shape characters, props, spaces, and visual systems in Blender." },
  { step: "03", title: "Develop", text: "Bring the experience to life with Unity interactions and polish." },
  { step: "04", title: "Deliver", text: "Prepare builds and assets for web, mobile, desktop, or headset." }
];

export default function AboutPage() {
  return (
    <main style={{ paddingTop: "8rem", minHeight: "80vh" }}>
      <section className="content-section process-section">
        <div className="section-heading">
          <p>Process</p>
          <h2>HOW WE WORK</h2>
          <span>A clear path from rough concept to playable, presentable experience.</span>
        </div>
        <div className="process-grid">
          {processSteps.map((item) => (
            <article className="process-card" key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
