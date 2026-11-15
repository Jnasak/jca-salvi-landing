import { useState } from "react";
import { ArrowUp, Clock, FileText, Target } from "lucide-react";
import { serviceById, type ServiceId } from "@/content/landing";
import { Button } from "@/components/ui/button";

const bring = [
  { Icon: FileText, label: "A short description" },
  { Icon: Target, label: "Your intended outcome" },
  { Icon: Clock, label: "Your timing" },
];

const routes = [
  "Free Enquiry Call",
  "Project Discovery",
  "One-to-One Strategy Consultation",
] as const;

export function DiscussProject({
  context,
}: {
  context?: { situation?: string; service?: ServiceId };
}) {
  const [selectedRoute, setSelectedRoute] = useState<(typeof routes)[number] | null>(null);
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

        <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
          {routes.map((route) => (
            <article key={route} className="rounded-2xl border border-cream/20 bg-cream/[0.07] p-5">
              <h3 className="text-xl font-semibold">{route}</h3>
              <p className="mt-3 text-sm text-on-dark-muted">
                {route === "Project Discovery"
                  ? "Preview structured intake and qualification stages."
                  : "Demonstration only — no live booking or payment."}
              </p>
              <button
                type="button"
                onClick={() => setSelectedRoute(route)}
                aria-pressed={selectedRoute === route}
                aria-controls="route-preview"
                className="mt-5 min-h-11 rounded-full border border-cream/40 px-4 text-sm font-semibold text-cream"
              >
                Preview route
              </button>
            </article>
          ))}
        </div>
        <div
          id="route-preview"
          role="status"
          className="mt-6 rounded-2xl border border-cream/20 bg-cream/[0.07] p-6 text-left"
        >
          <p className="text-sm font-semibold text-champagne">
            Internal prototype — simulated interactions only
          </p>
          {context?.situation && (
            <p className="mt-3 text-sm">Selected buyer situation: {context.situation}</p>
          )}
          {context?.service && (
            <p className="mt-2 text-sm">
              Selected service: {context.service} — {serviceById(context.service).name}
            </p>
          )}
          {selectedRoute ? (
            <>
              <p className="mt-4 font-semibold">{selectedRoute}</p>
              {selectedRoute === "Project Discovery" ? (
                <ol className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  {[
                    "1. Project Intake",
                    "2. Review and Qualification",
                    "3. Discovery Scheduling",
                    "4. Scope and Proposal",
                  ].map((stage) => (
                    <li key={stage} className="rounded-xl bg-cream/10 p-3">
                      {stage}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-3 text-sm">
                  Request flow demonstration only. Scheduling and commercial terms remain subject to
                  approval.
                </p>
              )}
            </>
          ) : (
            <p className="mt-3 text-sm">Select a route above to inspect its simulated next step.</p>
          )}
          <p className="mt-4 text-sm text-on-dark-muted">
            No information is submitted, stored remotely or transmitted to a booking, payment or
            enquiry service.
          </p>
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
