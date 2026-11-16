import { useEffect, useRef } from "react";
import { PortraitPlaceholder } from "./PortraitPlaceholder";
import { ArrowUpRight } from "lucide-react";

// Reorganises the existing capability statement; no new outcome or client claims.
const benefits = [
  {
    title: "Understand Before Solving",
    body: "Start with the business challenge, context and intended outcome.",
  },
  {
    title: "Complementary Expertise",
    body: "Combine business and product thinking with programme and operational coordination.",
  },
  {
    title: "Clear Scope & Responsibilities",
    body: "Agree what is included, who owns the work and where specialist support is needed.",
  },
  {
    title: "Practical, Scoped Support",
    body: "Shape activities and deliverables around an agreed, manageable brief.",
  },
  {
    title: "Structured Coordination",
    body: "Make milestones, dependencies and responsibilities visible.",
  },
  {
    title: "Solutions Suited to Your Needs",
    body: "Consider the organisation, people and workflows involved before recommending next steps.",
  },
];

export function WhyUs() {
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || typeof IntersectionObserver === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          // Content is visible before observation and if JavaScript/animations are unavailable.
          if (!reduce.matches) entry.target.classList.add("benefit-enter");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );
    Array.from(grid.children).forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);
  return (
    <section id="about" aria-labelledby="why-title" className="benefits-section py-16 sm:py-24">
      <div className="container-page">
        <div className="benefits-shell">
          <div className="benefits-heading">
            <div>
              <p className="eyebrow text-champagne">Why JCA × Salvi</p>
              <h2 id="why-title" className="mt-4 max-w-2xl text-4xl font-medium sm:text-5xl">
                Different Strengths. One Coordinated Approach.
              </h2>
              <p className="mt-5 max-w-2xl leading-relaxed">
                We combine business and product thinking with practical delivery coordination to
                help clients clarify what needs to change and organise the work needed to move
                forward.
              </p>
            </div>
            <a href="#discuss" className="benefits-cta">
              Discuss Your Project <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </div>
          <div className="partner-grid">
            <div className="partner-profile">
              <PortraitPlaceholder name="JCA" label="JCA — portrait placeholder" index={1} />
              <div>
                <p className="eyebrow">JCA — Business & Product</p>
                <h3>Business Analysis + Product Management</h3>
                <p>Supported by Customer Experience and Operations & Workflow Automation.</p>
              </div>
            </div>
            <div className="partner-profile">
              <PortraitPlaceholder name="Salvi" label="Salvi — portrait placeholder" index={2} />
              <div>
                <p className="eyebrow">Salvi — Programme & Operations</p>
                <h3>Programme, project & operational coordination</h3>
                <p>Supporting structured delivery and execution.</p>
              </div>
            </div>
          </div>
          <p className="prototype-note benefits-disclosure">
            Partner portraits are placeholders in this design preview.
          </p>
          <div ref={gridRef} className="benefits-grid">
            {benefits.map((benefit, index) => (
              <article key={benefit.title} className="benefit-card">
                <span className="benefit-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3 className="text-2xl font-medium leading-snug">{benefit.title}</h3>
                <p className="mt-4 leading-relaxed text-evergreen-soft">{benefit.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
