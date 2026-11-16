import { useEffect, useRef, useState } from "react";
import { ArrowRight, Workflow, Layers, CalendarCheck } from "lucide-react";
import { serviceCategories, serviceById, type ServiceId } from "@/content/landing";
import type { EnquiryContext } from "@/content/enquiry";
import { useServiceStack } from "./useServiceStack";
import { ReferenceMedia } from "./ReferenceMedia";

const serviceScope: Record<ServiceId, { summary: string; deliverables: string }> = {
  S01: {
    summary:
      "Map current and future workflows, clarify requirements, responsibilities and handoffs.",
    deliverables:
      "Workflow maps, prioritised improvement recommendations and responsibility definitions.",
  },
  S02: {
    summary:
      "Explore user and stakeholder needs, define product requirements and prioritise improvements.",
    deliverables: "Problem statements, discovery findings and prioritised requirements.",
  },
  S03: {
    summary: "Structure workstreams, milestones, dependencies, ownership and delivery reporting.",
    deliverables: "Delivery plans, responsibility maps and agreed progress reporting.",
  },
  S04: {
    summary: "Review customer journeys, onboarding, follow-up and escalation responsibilities.",
    deliverables: "Journey maps, friction reviews and service-process recommendations.",
  },
  S05: {
    summary: "Assess implementation gaps and plan recovery, handover and operational adoption.",
    deliverables: "Gap assessment, recovery priorities and adoption or handover plans.",
  },
  S06: {
    summary:
      "Analyse order, fulfilment and customer-service handoffs and improvement opportunities.",
    deliverables: "Order-workflow reviews, exception maps and improvement priorities.",
  },
  S07: {
    summary:
      "Clarify technical scope and delivery readiness with appropriately qualified partners. Software development is not automatically included.",
    deliverables:
      "Scoped requirements, technical handoff briefs and agreed specialist responsibilities.",
  },
  S08: {
    summary:
      "Assess automation readiness, document processes and review feasibility. AI development and automation implementation are not included automatically.",
    deliverables: "Readiness assessment, process documentation and feasibility recommendations.",
  },
};
const icons = [Workflow, Layers, CalendarCheck];
export function Services({
  onDiscuss,
  requested,
}: {
  onDiscuss?: (c: EnquiryContext) => void;
  requested?: { id: ServiceId; revision: number; context?: EnquiryContext } | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef<number | null>(null);
  const [selected, setSelected] = useState<ServiceId>("S01");
  const [origin, setOrigin] = useState<EnquiryContext>({});
  const canStack = useServiceStack(ref, []);
  useEffect(
    () => () => {
      if (pendingFocus.current !== null) window.cancelAnimationFrame(pendingFocus.current);
    },
    [],
  );
  const activeCategory = serviceCategories.find((c) => c.services.some((s) => s.id === selected))!;
  function reveal(id: ServiceId, context: EnquiryContext = {}) {
    setSelected(id);
    setOrigin(context);
    if (pendingFocus.current !== null) window.cancelAnimationFrame(pendingFocus.current);
    pendingFocus.current = window.requestAnimationFrame(() => {
      pendingFocus.current = null;
      const title = document.getElementById("service-detail-title");
      title?.focus({ preventScroll: true });
      document.getElementById("service-explorer")?.scrollIntoView({ block: "start" });
    });
  }
  useEffect(() => {
    if (requested) reveal(requested.id, requested.context);
  }, [requested]);
  return (
    <section
      id="services"
      className="container-page section-space"
      aria-labelledby="services-title"
    >
      <div className="section-heading">
        <h2 id="services-title">Our Services</h2>
        <span className="heading-rule" aria-hidden="true" />
        <a href="#service-details">
          Discover all services <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
      <nav className="category-entry-grid" aria-label="Three Service Categories">
        {serviceCategories.map((c, i) => {
          const Icon = icons[i]!;
          return (
            <a
              key={c.title}
              className={`category-entry category-entry-${i}`}
              href={`#service-category-${i}`}
            >
              <ReferenceMedia index={i} />
              <div>
                <Icon aria-hidden="true" size={30} />
                <h3>{c.title}</h3>
                <span>
                  {c.services.length} service types <ArrowRight size={17} aria-hidden="true" />
                </span>
              </div>
            </a>
          );
        })}
      </nav>
      <div id="service-details" className="service-details-heading">
        <p className="eyebrow">Explore the support behind each category</p>
        <h3>Three areas of focus. Eight practical services.</h3>
        <p>Choose any service to see its scope and indicative deliverables.</p>
      </div>
      <div ref={ref} className="service-stack" data-stacking={canStack ? "enabled" : "disabled"}>
        {serviceCategories.map((c, i) => (
          <article
            className="service-stack-card"
            id={`service-category-${i}`}
            key={c.title}
            aria-labelledby={`category-title-${i}`}
          >
            <div className="service-stack-copy">
              <p className="eyebrow">0{i + 1} / Service Category</p>
              <h3 id={`category-title-${i}`}>{c.title}</h3>
              <p>{c.summary}</p>
              <div role="group" aria-label={`${c.title} services`} className="service-type-list">
                {c.services.map((s) => (
                  <button
                    id={`service-${s.id}`}
                    key={s.id}
                    type="button"
                    className="service-type-control"
                    aria-pressed={selected === s.id}
                    aria-controls="service-explorer"
                    onClick={() => reveal(s.id)}
                  >
                    <span className="service-type-id">{s.id}</span>
                    <span className="min-w-0 flex-1">{s.name}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
            <div className="service-stack-visual">
              <ReferenceMedia index={i} />
              <span className="media-disclosure">Illustrative design reference</span>
            </div>
          </article>
        ))}
      </div>
      <div
        id="service-explorer"
        role="region"
        aria-labelledby="service-detail-title"
        className="service-explorer"
      >
        <div className="explorer-selection">
          <p className="eyebrow">Service Explorer / {selected}</p>
          <label htmlFor="service-choice">Select a service</label>
          <select
            id="service-choice"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value as ServiceId);
              setOrigin({});
            }}
          >
            {serviceCategories.map((c) => (
              <optgroup key={c.title} label={c.title}>
                {c.services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.id} — {s.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <p>{activeCategory.title}</p>
        </div>
        <div aria-live="polite">
          <h3 id="service-detail-title" tabIndex={-1}>
            {serviceById(selected).name}
          </h3>
          <p>{serviceScope[selected].summary}</p>
          <h4>Indicative deliverables</h4>
          <p>{serviceScope[selected].deliverables}</p>
          <p className="prototype-note">
            Illustrative scope; specific activities and deliverables require agreement.
          </p>
          <a
            href="#discuss"
            className="primary-action"
            onClick={(e) => {
              e.preventDefault();
              if (pendingFocus.current !== null) window.cancelAnimationFrame(pendingFocus.current);
              onDiscuss?.({ ...origin, serviceIds: [selected] });
              const h = document.getElementById("discuss-title");
              h?.setAttribute("tabindex", "-1");
              h?.focus({ preventScroll: true });
              document.getElementById("discuss")?.scrollIntoView({ block: "start" });
            }}
          >
            Discuss this service <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
      <p className="prototype-note mt-4">
        Technical delivery requires appropriately scoped capability or partnerships. This prototype
        does not offer unrestricted software engineering.
      </p>
    </section>
  );
}
