import { ArrowUpRight } from "lucide-react";
import { buyerSituations } from "@/content/landing";

export function WhoWeHelp({ onSelect }: { onSelect: (i: number) => void }) {
  return (
    <section id="who-we-help" aria-labelledby="who-title" className="py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="eyebrow text-evergreen-soft">Who We Help</p>
            <h2 id="who-title" className="mt-4 text-4xl font-medium sm:text-5xl">
              Growing organisations with work that needs to flow better.
            </h2>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
            {buyerSituations.map((s, i) => (
              <li key={s.segment} className="bg-cream">
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  className="group flex h-full w-full items-start gap-4 p-5 text-left transition-colors hover:bg-sage-soft sm:p-6"
                >
                  <span className="w-7 shrink-0 font-display text-lg text-evergreen-soft tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-lg leading-snug sm:text-xl">
                      {s.segment}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-evergreen-soft group-hover:text-evergreen">
                      View situation
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
