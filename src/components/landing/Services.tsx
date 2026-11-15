import { useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, GitBranch } from "lucide-react";
import { serviceCategories, type ServiceId, type ServiceCategory } from "@/content/landing";
import type { EnquiryContext } from "@/content/enquiry";
import { useServiceStack } from "@/components/landing/useServiceStack";

const scope: Record<ServiceId, string> = {
  S01: "Map current and future workflows, clarify requirements, responsibilities and handoffs.",
  S02: "Explore user and stakeholder needs, define product requirements and prioritise improvements.",
  S03: "Structure workstreams, milestones, dependencies, ownership and delivery reporting.",
  S04: "Review customer journeys, onboarding, follow-up and escalation responsibilities.",
  S05: "Assess implementation gaps and plan recovery, handover and operational adoption.",
  S06: "Analyse order, fulfilment and customer-service handoffs and improvement opportunities.",
  S07: "Clarify technical scope and delivery readiness with appropriately qualified partners. Software development is not automatically included.",
  S08: "Assess automation readiness, document processes and review feasibility. AI development and automation implementation are not included automatically.",
};

const visualStages = [
  ["Current workflow", "Handoffs", "Improvement"],
  ["Problem", "Requirements", "Delivery scope"],
  ["Plan", "Owners", "Follow-through"],
];

function ServicePanel({
  category,
  index,
  selected,
  onSelect,
  onDiscuss,
}: {
  category: ServiceCategory;
  index: number;
  selected: ServiceId;
  onSelect: (id: ServiceId) => void;
  onDiscuss?: ((context: EnquiryContext) => void) | undefined;
}) {
  const service = category.services.find((item) => item.id === selected)!;
  const titleId = `service-category-title-${index}`;
  return (
    <article
      id={`service-category-${index}`}
      aria-labelledby={titleId}
      className="service-stack-card"
    >
      <div className="service-stack-copy">
        <p className="eyebrow text-evergreen-soft">
          0{index + 1} / Service Category · {category.services.length} Service Types
        </p>
        <h3 id={titleId} className="mt-5 text-3xl font-medium leading-tight sm:text-4xl">
          {category.title}
        </h3>
        <p className="mt-4 leading-relaxed text-evergreen-soft">{category.summary}</p>
        <div className="service-type-list" role="group" aria-label={`${category.title} services`}>
          {category.services.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected === item.id}
              aria-controls={`service-scope-${index}`}
              onClick={() => onSelect(item.id)}
              className="service-type-control"
            >
              <span className="service-type-id">{item.id}</span>
              <span className="min-w-0 flex-1">{item.name}</span>
              {selected === item.id ? (
                <Check aria-hidden="true" size={18} className="shrink-0" />
              ) : (
                <ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="service-stack-visual">
        <div className="flex items-center justify-between gap-3 text-sm text-evergreen-soft">
          <span>Illustrative approach</span>
          <GitBranch aria-hidden="true" size={23} />
        </div>
        <div className="service-workflow" aria-label="Illustrative workflow, not client data">
          {visualStages[index]!.map((stage, stageIndex) => (
            <div key={stage} className="service-workflow-stage">
              <span className="text-xs text-evergreen-soft">0{stageIndex + 1}</span>
              <span>{stage}</span>
              {stageIndex < 2 && <ArrowDown aria-hidden="true" size={16} />}
            </div>
          ))}
        </div>
        <div id={`service-scope-${index}`} className="service-selected-scope" aria-live="polite">
          <p className="eyebrow text-evergreen-soft">Selected Service Type / {selected}</p>
          <h4 className="mt-3 text-2xl font-medium leading-snug">{service.name}</h4>
          <p className="mt-3 leading-relaxed text-evergreen-soft">{scope[selected]}</p>
          <p className="mt-3 text-sm">Scope and deliverables are agreed individually.</p>
        </div>
        <a
          href="#discuss"
          onClick={(event) => {
            event.preventDefault();
            onDiscuss?.({ serviceIds: [selected] });
            const heading = document.getElementById("discuss-title");
            heading?.setAttribute("tabindex", "-1");
            heading?.focus({ preventScroll: true });
            document.getElementById("discuss")?.scrollIntoView({ block: "start" });
          }}
          className="inline-flex min-h-11 w-fit items-center gap-3 rounded-full bg-evergreen px-5 py-3 text-sm font-medium text-cream"
        >
          Discuss this service <ArrowUpRight aria-hidden="true" size={18} />
        </a>
        <p className="text-xs text-evergreen-soft">
          Demo enquiry only — nothing is sent or stored.
        </p>
      </div>
    </article>
  );
}

export function Services({ onDiscuss }: { onDiscuss?: (context: EnquiryContext) => void }) {
  const stackRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<ServiceId[]>(
    serviceCategories.map((category) => category.services[0]!.id),
  );
  const canStack = useServiceStack(stackRef, selected);
  function select(index: number, id: ServiceId) {
    setSelected((previous) => previous.map((value, i) => (i === index ? id : value)));
  }
  return (
    <section id="services" aria-labelledby="services-title" className="bg-sage-soft py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow text-evergreen-soft">What We Help With</p>
          <h2 id="services-title" className="mt-4 text-4xl font-medium sm:text-5xl">
            Eight services, three clear areas of focus.
          </h2>
          <p className="mt-5 text-lg text-evergreen-soft">
            See the full offer, then explore the support relevant to your challenge.
          </p>
        </div>
        <nav aria-label="All eight Service Types" className="service-overview">
          {serviceCategories.flatMap((category, index) =>
            category.services.map((service) => (
              <a
                key={service.id}
                href={`#service-category-${index}`}
                onClick={() => {
                  select(index, service.id);
                  // Focus a native control so keyboard users reach the chosen details directly.
                  window.requestAnimationFrame(() => {
                    const card = document.getElementById(`service-category-${index}`);
                    const button = card?.querySelector<HTMLButtonElement>(
                      `button[aria-pressed="true"]`,
                    );
                    button?.focus({ preventScroll: true });
                    card?.scrollIntoView({ block: "start" });
                  });
                }}
              >
                <span className="service-type-id">{service.id}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{service.name}</span>
                  <span className="mt-1 block text-sm text-evergreen-soft">{category.title}</span>
                </span>
                <ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
              </a>
            )),
          )}
        </nav>
        <div
          ref={stackRef}
          className="service-stack"
          data-stacking={canStack ? "enabled" : "disabled"}
        >
          {serviceCategories.map((category, index) => (
            <ServicePanel
              key={category.title}
              category={category}
              index={index}
              selected={selected[index]!}
              onSelect={(id) => select(index, id)}
              onDiscuss={onDiscuss}
            />
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm text-evergreen-soft">
          Technical delivery is offered only through appropriately scoped capability or
          partnerships, agreed for each project.
        </p>
      </div>
    </section>
  );
}
