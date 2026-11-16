import { Compass, ListChecks, RefreshCcw } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { workRoutes } from "@/content/landing";

const icons: LucideIcon[] = [Compass, ListChecks, RefreshCcw];

export function HowWeWork() {
  return (
    <section
      id="ways-to-work"
      aria-labelledby="how-title"
      className="on-dark bg-evergreen-rich py-20 text-cream sm:py-28"
    >
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow text-champagne">Ways to Work With Us</p>
            <h2 id="how-title" className="mt-4 text-4xl font-medium sm:text-5xl">
              Three routes in. Start where it helps.
            </h2>
          </div>
          <p className="max-w-md text-on-dark-muted lg:justify-self-end">
            These are available routes, not compulsory stages. A project may use one, two or all
            three, depending on what you need.
          </p>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {workRoutes.map((r, i) => {
            const Icon = icons[i] ?? Compass;
            return (
              <li
                key={r.title}
                className="flex flex-col rounded-3xl border border-cream/15 bg-cream/[0.04] p-7 transition-colors hover:bg-cream/[0.08]"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-cream text-evergreen">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-champagne">
                  Route {String.fromCharCode(65 + i)}
                </p>
                <h3 className="mt-2 text-2xl font-medium sm:text-3xl">{r.title}</h3>
                <p className="mt-3 text-on-dark-muted">{r.body}</p>
                <details className="route-detail">
                  <summary>When this route helps</summary>
                  <p>{r.fit}</p>
                  <p>
                    Indicative deliverables:{" "}
                    {i === 0
                      ? "discovery findings, workflow maps and requirements"
                      : i === 1
                        ? "delivery plans, responsibility maps and coordination records"
                        : "improvement priorities, adoption and handover plans"}
                    .
                  </p>
                  <a href="#discuss" className="text-action">
                    Discuss this route
                  </a>
                </details>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
