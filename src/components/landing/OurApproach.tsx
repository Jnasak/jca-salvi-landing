import { approachCopy, approachSteps, workflowStages } from "@/content/landing";
import { WorkflowGraphic } from "./WorkflowGraphic";

export function OurApproach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <p className="eyebrow flex items-center gap-3 text-evergreen-soft">
              <span aria-hidden="true" className="h-px w-8 bg-champagne" />
              {approachCopy.eyebrow}
            </p>
            <h2 id="approach-title" className="mt-4 text-4xl font-medium sm:text-5xl">
              {approachCopy.title}
            </h2>
            <p className="mt-5 max-w-xl text-evergreen-soft">{approachCopy.intro}</p>
            <ul className="mt-9 divide-y divide-evergreen/10 border-y border-evergreen/10">
              {workflowStages.map((s, i) => (
                <li key={s.id} className="flex gap-5 py-5">
                  <span className="pt-0.5 font-display text-lg text-evergreen-soft">0{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium sm:text-2xl">{s.label}</h3>
                    <p className="mt-1.5 text-[0.95rem] text-evergreen-soft">{s.summary}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <figure className="min-w-0">
            <WorkflowGraphic />
            <figcaption className="mt-3 text-center text-xs text-evergreen-soft">
              {approachCopy.graphicLabel}
            </figcaption>
          </figure>
        </div>

        <div className="mt-20 border-t border-evergreen/10 pt-14 sm:mt-24">
          <div className="max-w-2xl">
            <h3 className="text-3xl font-medium sm:text-4xl">{approachCopy.stepsTitle}</h3>
            <p className="mt-4 text-evergreen-soft">{approachCopy.stepsIntro}</p>
          </div>
          <ol className="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
            <span
              aria-hidden="true"
              className="absolute bottom-4 left-[1.375rem] top-4 w-px bg-gradient-to-b from-evergreen/30 via-champagne to-persimmon/60 md:bottom-auto md:left-6 md:right-6 md:top-[1.375rem] md:h-px md:w-auto md:bg-gradient-to-r"
            />
            {approachSteps.map((s, i) => (
              <li key={s.title} className="relative flex gap-5 md:flex-col md:gap-6">
                <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border border-evergreen/20 bg-paper font-display text-lg shadow-soft">
                  {i + 1}
                </span>
                <div>
                  <h4 className="font-display text-xl font-medium tracking-[-0.02em] sm:text-2xl">
                    {s.title}
                    {i < approachSteps.length - 1 && <span className="sr-only">, then</span>}
                  </h4>
                  <p className="mt-2 text-[0.95rem] text-evergreen-soft">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

