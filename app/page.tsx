import { ShowcaseScene } from "@/components/ShowcaseScene";
import Link from "next/link";

const projects = [
  { title: "Mech Arena Prototype", category: "Game" },
  { title: "Industrial VR Trainer", category: "Simulation" },
  { title: "Interactive Product Bay", category: "Visualization" }
];

export default function Home() {
  return (
    <>
      <section className="hero-section" aria-label="Mukta Game and Development">
        <div className="title-backdrop" aria-hidden="true">
          MUKTA
        </div>

        <ShowcaseScene autoRotate={true} animationMode="idle" zoomSignal={0} />

        <div className="hero-copy">
          <p className="hero-kicker">Blender + Unity Studio</p>
          <h1>
            <span>WE BUILD</span>
            <span className="text-red">WORLDS</span>
            <span>IN 3D.</span>
          </h1>
          <p>
            Blender + Unity powered studio crafting games, AR/VR apps, simulations, and
            interactive 3D experiences.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              See Our Work
            </a>
            <Link className="button button-secondary" href="/services">
              What We Do
            </Link>
          </div>
        </div>

        <Link className="scroll-cue" href="/services" aria-label="Scroll to explore">
          <span aria-hidden="true" />
          <strong>SCROLL TO EXPLORE</strong>
        </Link>
      </section>

      <section className="content-section work-section reveal-section" id="work">
        <div className="section-heading">
          <p>Portfolio</p>
          <h2>OUR WORK</h2>
          <span>Preview projects shaped for games, simulation, training, and product storytelling.</span>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <span>{project.category}</span>
              <h3>{project.title}</h3>
              <Link href="/contact">View Project -&gt;</Link>
            </article>
          ))}
        </div>
        <Link className="button button-primary portfolio-link" href="/contact">
          See Full Portfolio -&gt;
        </Link>
      </section>
    </>
  );
}
