import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/** Draft buyer-facing questions for internal review; publication clearance pending. */
export const prototypeFaqItems = [
  {
    id: "scope",
    question: "Do we need to know exactly what support we need?",
    answer:
      "Not necessarily. We begin by understanding the challenge, intended outcome and relevant timing, then assess appropriate next steps.",
  },
  {
    id: "services",
    question: "What kinds of challenges can JS BusinessSuite help with?",
    answer:
      "The service areas are business and workflow improvement, product and solution development support, and programme and project delivery. Activities depend on agreed scope and verified capabilities.",
  },
  {
    id: "routes",
    question: "Do all projects follow the same engagement route?",
    answer:
      "No. Discover & Design, Plan & Execute, and Improve & Sustain are flexible approaches rather than compulsory sequential packages.",
  },
  {
    id: "software",
    question: "Can you support software product development?",
    answer:
      "We can support product discovery, requirements, planning and coordination. Engineering delivery requires separately verified capabilities or qualified partners and an agreed scope.",
  },
  {
    id: "commercial",
    question: "Are fees, timelines and deliverables fixed?",
    answer:
      "They depend on the engagement. Scope, responsibilities, milestones, deliverables and commercial terms require agreement before any commitment.",
  },
  {
    id: "enquiry",
    question: "Does selecting a service or route create a booking?",
    answer:
      "No. The current prototype does not submit an enquiry, book a call, collect payment or create an engagement.",
  },
] as const;

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 sm:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
        <div>
          <p className="eyebrow text-evergreen-soft">Frequently Asked Questions</p>
          <h2 id="faq-title" className="mt-4 text-4xl font-medium sm:text-5xl">
            Questions before we begin?
          </h2>
          <p className="mt-5 text-sm text-evergreen-soft">
            Internal preview copy — pending SIA and principal clearance.
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="min-w-0 rounded-3xl border border-evergreen/15 bg-paper px-5 sm:px-8"
        >
          {prototypeFaqItems.map(({ id, question, answer }) => (
            <AccordionItem key={id} value={id} className="border-evergreen/15 last:border-0">
              <AccordionTrigger className="min-h-14 gap-3 py-5 text-left text-base leading-relaxed text-evergreen sm:text-lg [&>svg]:size-5">
                {question}
              </AccordionTrigger>
              <AccordionContent className="pr-6 text-base leading-relaxed text-evergreen-soft">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
