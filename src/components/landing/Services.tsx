import { useState } from "react";
import { Maximize2, Minus, Plus } from "lucide-react";
import { serviceCategories, type ServiceId, type ServiceCategory } from "@/content/landing";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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

function ServiceFlashcard({ category, index }: { category: ServiceCategory; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [maximised, setMaximised] = useState(false);
  const [selected, setSelected] = useState<ServiceId | null>(null);
  const panelId = `service-category-${index}`;
  const details = (
    <ul className="mt-6 space-y-3">
      {category.services.map(s => (
        <li key={s.id} className="rounded-2xl border border-evergreen/15 bg-cream p-4">
          <button type="button" className="flex min-h-11 w-full items-center justify-between gap-3 text-left font-medium"
            aria-expanded={selected === s.id} aria-controls={`detail-${index}-${s.id}`}
            onClick={() => setSelected(selected === s.id ? null : s.id)}>
            <span><span className="mr-2 text-xs text-evergreen-soft">{s.id}</span>{s.name}</span>
            {selected === s.id ? <Minus aria-hidden="true" size={18}/> : <Plus aria-hidden="true" size={18}/>}
          </button>
          {selected === s.id && <div id={`detail-${index}-${s.id}`} className="pt-3">
            <p className="leading-relaxed text-evergreen-soft">{scope[s.id]}</p>
            <p className="mt-3 text-sm">Scope and deliverables are agreed individually.</p>
            <a href="#discuss" onClick={() => setMaximised(false)}
              className="mt-4 inline-flex min-h-11 items-center rounded-full bg-evergreen px-5 text-sm font-medium text-cream">
              Discuss this service
            </a>
            <p className="mt-2 text-xs text-evergreen-soft">Prototype only — live enquiry connection pending.</p>
          </div>}
        </li>
      ))}
    </ul>
  );
  return <article className="flex min-w-0 flex-col self-start rounded-3xl border border-evergreen/15 bg-paper p-6 shadow-soft sm:p-8">
    <p className="text-sm text-evergreen-soft">0{index + 1} · {category.services.length} service types</p>
    <h3 className="mt-4 text-2xl font-semibold leading-snug">{category.title}</h3>
    <p className="mt-3 leading-relaxed text-evergreen-soft">{category.summary}</p>
    <div className="mt-6 flex flex-wrap gap-2">
      <button type="button" aria-expanded={expanded} aria-controls={panelId}
        onClick={() => setExpanded(!expanded)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-evergreen/30 px-4 text-sm font-medium">
        {expanded ? <Minus aria-hidden="true" size={16}/> : <Plus aria-hidden="true" size={16}/>}
        {expanded ? "Minimise" : "Expand"}<span className="sr-only"> {category.title}</span>
      </button>
      {expanded && <Dialog open={maximised} onOpenChange={setMaximised}>
        <DialogTrigger asChild><button type="button"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-evergreen px-4 text-sm font-medium text-cream">
          <Maximize2 aria-hidden="true" size={16}/>Maximise<span className="sr-only"> {category.title}</span>
        </button></DialogTrigger>
        <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-3xl p-6 sm:p-10">
          <DialogTitle className="pr-8 text-2xl leading-snug sm:text-3xl">{category.title}</DialogTitle>
          <DialogDescription className="text-base">{category.summary}</DialogDescription>
          {details}
          <button type="button" onClick={() => setMaximised(false)}
            className="min-h-11 rounded-full border border-evergreen/30 px-5 text-sm font-medium">Minimise to card</button>
        </DialogContent>
      </Dialog>}
    </div>
    <div id={panelId} hidden={!expanded}>{expanded && !maximised && details}</div>
  </article>;
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-sage-soft py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow text-evergreen-soft">What We Help With</p>
          <h2 id="services-title" className="mt-4 text-4xl font-medium sm:text-5xl">
            Eight services, three clear areas of focus.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {serviceCategories.map((c, ci) => <ServiceFlashcard key={c.title} category={c} index={ci}/>)}
        </div>
        <p className="mt-8 max-w-3xl text-sm text-evergreen-soft">
          Technical delivery is offered only through appropriately scoped capability or
          partnerships, agreed for each project.
        </p>
      </div>
    </section>
  );
}

