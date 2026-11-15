import { ArrowUp, Clock, FileText, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

import { EnquiryForm } from "./EnquiryForm";
import type { EnquiryContext } from "@/content/enquiry";

const bring = [
  { Icon: FileText, label: "A short description" },
  { Icon: Target, label: "Your intended outcome" },
  { Icon: Clock, label: "Your timing" },
];

export function DiscussProject({ context }: { context?: EnquiryContext }) {
  return (
    <section
      id="discuss"
      aria-labelledby="discuss-title"
      className="on-dark bg-evergreen-rich relative overflow-hidden py-20 text-cream sm:py-28"
    >
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-champagne">Discuss Your Project</p>
          <h2 id="discuss-title" className="mt-4 text-4xl font-medium sm:text-6xl">
            What would you like to make work better?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-on-dark-muted">
            Bring a short description, your intended outcome and timing, and we can discuss project
            fit.
          </p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
          {bring.map(({ Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-cream/15 bg-cream/[0.05] px-4 py-3.5"
            >
              <Icon aria-hidden="true" className="size-5 shrink-0 text-champagne" />
              <span className="font-medium">{label}</span>
            </li>
          ))}
        </ul>

        <div className="mx-auto max-w-3xl">
          <EnquiryForm context={context ?? {}} />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild variant="creamOutline" size="pill">
            <a href="#solutions">Review buyer situations</a>
          </Button>
          <Button asChild variant="creamOutline" size="pill">
            <a href="#top">
              Back to top
              <ArrowUp aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
