/**
 * All JCA × Salvi landing-page copy and structured content.
 * Buyer situations are illustrative, not verified client cases.
 */

export type ServiceId = "S01" | "S02" | "S03" | "S04" | "S05" | "S06" | "S07" | "S08";

export interface Service {
  id: ServiceId;
  name: string;
}

export interface ServiceCategory {
  title: string;
  summary: string;
  services: Service[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    title: "Business & Workflow Improvement",
    summary: "Clarifying how work, customers and operations flow, and what to improve first.",
    services: [
      { id: "S01", name: "Business Systems & Workflow Improvement" },
      { id: "S04", name: "Customer Experience & Operations Improvement" },
      { id: "S06", name: "E-commerce Operations Improvement" },
      { id: "S08", name: "AI & Automation Readiness Solutions" },
    ],
  },
  {
    title: "Product & Solution Development Support",
    summary:
      "Clarifying product problems and requirements, with technical delivery through appropriately scoped partnerships.",
    services: [
      { id: "S02", name: "Product Discovery & Improvement" },
      { id: "S07", name: "Product Discovery & Technical Delivery Partnerships" },
    ],
  },
  {
    title: "Programme & Project Delivery",
    summary: "Planning, coordination and follow-through so agreed work moves forward and is adopted.",
    services: [
      { id: "S03", name: "Programme & Project Delivery" },
      { id: "S05", name: "Implementation Recovery & Operational Adoption" },
    ],
  },
];

export const allServices: Service[] = serviceCategories.flatMap((c) => c.services);

export function serviceById(id: ServiceId): Service {
  const found = allServices.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown service ${id}`);
  return found;
}

export interface BuyerSituation {
  segment: string;
  shortLabel: string;
  problem: string;
  friction: string;
  help: string[];
  serviceIds: ServiceId[];
  cta: string;
}

export const buyerSituations: BuyerSituation[] = [
  {
    segment: "Growing service businesses and agencies",
    shortLabel: "Service businesses",
    problem: "Fragmented enquiries, onboarding, responsibilities and delivery.",
    friction: "Repeated work and lost handoff context.",
    help: [
      "Map the client lifecycle",
      "Clarify handoffs",
      "Structure onboarding",
      "Coordinate delivery",
    ],
    serviceIds: ["S01", "S03", "S04"],
    cta: "Discuss your client workflow",
  },
  {
    segment: "Startup founders and growing businesses",
    shortLabel: "Founders",
    problem: "Unclear ideas, operational priorities and business requirements.",
    friction: "Difficulty deciding what to do first.",
    help: [
      "Business discovery",
      "Requirements clarification",
      "Workflow design",
      "Implementation planning",
    ],
    serviceIds: ["S01", "S02"],
    cta: "Discuss your business priorities",
  },
  {
    segment: "Product teams and digital businesses",
    shortLabel: "Product teams",
    problem: "Unclear product problems, stakeholder requirements and priorities.",
    friction: "Misaligned decisions and delivery briefs.",
    help: [
      "Problem clarification",
      "Requirements analysis",
      "Prioritisation",
      "Appropriately scoped technical-delivery partnerships",
    ],
    serviceIds: ["S02", "S07"],
    cta: "Discuss your product challenge",
  },
  {
    segment: "Programme and project leaders",
    shortLabel: "Programme leaders",
    problem: "Unclear ownership, missed handoffs and execution gaps.",
    friction: "Stalled decisions and dependencies.",
    help: ["Planning", "Accountability", "Coordination", "Implementation follow-through"],
    serviceIds: ["S03", "S05"],
    cta: "Discuss your delivery challenge",
  },
  {
    segment: "Customer experience and operations teams",
    shortLabel: "CX & operations",
    problem: "Inconsistent enquiries, onboarding, follow-ups and service processes.",
    friction: "Repeated information and broken continuity.",
    help: [
      "Journey analysis",
      "Friction identification",
      "Workflow design",
      "Operations improvement",
    ],
    serviceIds: ["S04", "S01"],
    cta: "Discuss your customer journey",
  },
  {
    segment: "E-commerce and operationally complex businesses",
    shortLabel: "E-commerce & complex ops",
    problem: "Disconnected order, service and fulfilment workflows.",
    friction: "Hard-to-track status and exceptions.",
    help: [
      "Analyse operations",
      "Clarify handoffs",
      "Assess workflow and automation readiness, subject to verified scope",
    ],
    serviceIds: ["S06", "S08"],
    cta: "Discuss your operations challenge",
  },
];

export const heroCopy = {
  eyebrow: "Business, Product & Operations Delivery Partners",
  headline: "Your business is growing. Let's make the way it works even better.",
  /**
   * Intentional line breaks (shown from small tablets up), grouped by sentence.
   * Joined with spaces they equal `headline`. The final line carries the single persimmon rule.
   */
  headlineSentences: [
    ["Your business", "is growing."],
    ["Let's make", "the way it works", "even better."],
  ],
  supporting:
    "We help growing teams untangle workflows, clarify product needs and coordinate delivery — with practical solutions scoped around your business.",
  primaryCta: { label: "Discuss Your Project", href: "#discuss" },
  secondaryCta: { label: "Explore Solutions", href: "#solutions" },
};

/** Equal partner frames. Approved photos are not yet supplied — never substitute people imagery. */
export const partners = [
  { name: "JCA", label: "JCA — approved portrait pending" },
  { name: "Salvi", label: "Salvi — approved portrait pending" },
] as const;

export const approachCopy = {
  eyebrow: "Our Approach",
  title: "From friction to a clearer way forward.",
  intro:
    "Most challenges sit in one of three places. We start by seeing where work slows down, then shape a practical, clearly scoped next step.",
  graphicLabel: "Illustrative workflow — not client data.",
  stepsTitle: "From understanding to adoption.",
  stepsIntro: "An illustrative approach, adapted to the agreed scope of each project.",
};

export interface WorkflowStage {
  id: string;
  label: string;
  steps: [string, string, string];
  note: string;
  summary: string;
}

/** Illustrative workflow graphic stages (Our Approach section) — not client data. */
export const workflowStages: WorkflowStage[] = [
  {
    id: "customer",
    label: "Customer workflows",
    steps: ["Enquiry", "Onboarding", "Follow-up"],
    note: "Seeing where information is repeated or lost between steps.",
    summary: "Enquiries, onboarding and follow-ups that repeat work or lose context between people.",
  },
  {
    id: "product",
    label: "Product clarity",
    steps: ["Problem", "Requirements", "Priorities"],
    note: "Turning open questions into a clear, agreed brief.",
    summary: "Open questions about the problem, requirements and priorities, shaped into an agreed brief.",
  },
  {
    id: "delivery",
    label: "Delivery coordination",
    steps: ["Plan", "Owners", "Follow-through"],
    note: "Making ownership and next steps visible to everyone involved.",
    summary: "Plans, owners and follow-through made visible, so agreed work keeps moving.",
  },
];

export const workRoutes = [
  {
    title: "Discover & Design",
    body: "Understand the current situation, clarify the problem and requirements, and shape a practical improvement.",
    fit: "Useful when the challenge or priority is not yet clear.",
  },
  {
    title: "Plan & Execute",
    body: "Turn an agreed direction into a plan with clear ownership, then coordinate the work through delivery.",
    fit: "Useful when you know what needs to happen and need it to move.",
  },
  {
    title: "Improve & Sustain",
    body: "Review how a process, product or change is working in practice and support its adoption day to day.",
    fit: "Useful when something exists but isn't yet working as intended.",
  },
];

export const approachSteps = [
  {
    title: "Understand the Problem",
    body: "Listen, map the current situation and agree what needs improving.",
  },
  {
    title: "Design the Improvement",
    body: "Shape a practical, clearly scoped response to the agreed problem.",
  },
  {
    title: "Coordinate Delivery",
    body: "Plan the work, clarify responsibilities and keep it moving.",
  },
  {
    title: "Support Adoption",
    body: "Help people use the change in day-to-day work.",
  },
];

