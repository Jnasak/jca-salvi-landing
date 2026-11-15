import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

// Reorganises the existing capability statement; no new outcome or client claims.
const benefits = [
  {
    title: "Business analysis",
    body: "Understand the current situation and clarify the business need before shaping the work.",
  },
  {
    title: "Product thinking",
    body: "Connect product problems, stakeholder requirements and priorities to a practical scope.",
  },
  {
    title: "Customer experience",
    body: "Consider customer journeys, onboarding, follow-up and the handoffs between people.",
  },
  {
    title: "Operations",
    body: "Look at how the work happens day to day and where a clearer workflow could help.",
  },
  {
    title: "Delivery coordination",
    body: "Bring attention to ownership, dependencies and follow-through within the agreed work.",
  },
  {
    title: "Clearly agreed scope",
    body: "Agree responsibilities and deliverables for each project. Technical delivery requires appropriately scoped capability or partnerships.",
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
    <section id="why" aria-labelledby="why-title" className="benefits-section py-16 sm:py-24">
      <div className="container-page">
        <div className="benefits-shell">
          <div className="benefits-heading">
            <div>
              <p className="eyebrow text-champagne">Why JCA × Salvi</p>
              <h2 id="why-title" className="mt-4 max-w-2xl text-4xl font-medium sm:text-5xl">
                Business clarity meets practical coordination.
              </h2>
              <p className="mt-5 max-w-2xl leading-relaxed">
                We are independent professionals combining business analysis and product thinking
                with customer experience, operations and delivery coordination.
              </p>
            </div>
            <a href="#discuss" className="benefits-cta">
              Discuss Your Project <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </div>
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
