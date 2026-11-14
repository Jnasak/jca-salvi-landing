import { useRef, type KeyboardEvent, type TouchEvent } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buyerSituations, serviceById } from "@/content/landing";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

interface Props {
  index: number;
  onIndexChange: (i: number) => void;
}

/** Manually navigated (never auto-rotating) carousel of illustrative buyer situations. */
export function BuyerCarousel({ index, onIndexChange }: Props) {
  const total = buyerSituations.length;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchX = useRef<number | null>(null);

  const go = (i: number, focusTab = false) => {
    const next = (i + total) % total;
    onIndexChange(next);
    if (focusTab) {
      tabRefs.current[next]?.focus();
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const fromTab = target.getAttribute("role") === "tab";
    // Arrow keys navigate from the tabs and Previous/Next controls; inside a slide they keep default behaviour.
    if (!fromTab && !target.hasAttribute("data-carousel-nav")) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1, fromTab);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1, fromTab);
    } else if (fromTab && e.key === "Home") {
      e.preventDefault();
      go(0, true);
    } else if (fromTab && e.key === "End") {
      e.preventDefault();
      go(total - 1, true);
    }
  };

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      id="solutions"
      aria-labelledby="solutions-title"
      className="on-dark bg-evergreen-rich relative overflow-hidden py-20 text-cream sm:py-24"
    >
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-champagne">Buyer problems &amp; solutions</p>
            <h2 id="solutions-title" className="mt-4 text-4xl font-medium sm:text-5xl">
              Where work tends to get stuck — and how we can help.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-on-dark-muted">
            Six illustrative buyer situations, not verified client cases. Use the tabs, arrows or
            your keyboard’s arrow keys <span className="sm:hidden">— or swipe —</span> to explore.
          </p>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Illustrative buyer situations"
          onKeyDown={onKeyDown}
          className="mt-10"
        >
          <div
            role="tablist"
            aria-label="Choose a buyer situation"
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none]"
          >
            {buyerSituations.map((s, i) => {
              const on = i === index;
              return (
                <button
                  key={s.segment}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`buyer-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls={`buyer-slide-${i}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => go(i)}
                  className={cn(
                    "flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-all",
                    on
                      ? "border-cream bg-cream text-evergreen"
                      : "border-cream/25 text-cream hover:border-cream/60",
                  )}
                >
                  <span
                    className={cn("tabular-nums", on ? "text-evergreen-soft" : "text-champagne")}
                  >
                    {pad(i + 1)}
                  </span>
                  {s.shortLabel}
                </button>
              );
            })}
          </div>

          <div
            className="mt-6 overflow-hidden rounded-3xl"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{ touchAction: "pan-y" }}
          >
            <div
              className="carousel-track flex"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {buyerSituations.map((s, i) => {
                const on = i === index;
                return (
                  <div
                    key={s.segment}
                    id={`buyer-slide-${i}`}
                    role="tabpanel"
                    aria-roledescription="slide"
                    aria-labelledby={`buyer-tab-${i}`}
                    aria-hidden={!on}
                    inert={!on}
                    className="w-full shrink-0"
                  >
                    <article className="on-light grid h-full gap-8 rounded-3xl bg-paper p-6 text-evergreen sm:p-10 md:grid-cols-[1.1fr_1fr] md:gap-12">
                      <div className="flex flex-col">
                        <p className="eyebrow text-evergreen-soft">
                          Situation {pad(i + 1)} of {pad(total)} · Illustrative
                        </p>
                        <h3 className="mt-3 text-3xl font-medium sm:text-4xl">{s.segment}</h3>
                        <div className="mt-6">
                          <p className="text-sm font-semibold text-evergreen-soft">The problem</p>
                          <p className="mt-1 font-display text-xl leading-snug sm:text-2xl">
                            {s.problem}
                          </p>
                        </div>
                        <div className="mt-6 flex gap-3 rounded-2xl border border-evergreen/10 bg-cream-deep p-4">
                          <AlertCircle
                            aria-hidden="true"
                            className="mt-0.5 size-5 shrink-0 text-persimmon"
                          />
                          <div>
                            <p className="text-sm font-semibold">Possible friction</p>
                            <p className="mt-0.5 text-evergreen">{s.friction}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col border-t border-evergreen/10 pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
                        <p className="text-sm font-semibold text-evergreen-soft">How we can help</p>
                        <ul className="mt-3 space-y-2.5">
                          {s.help.map((h) => (
                            <li key={h} className="flex gap-3">
                              <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-sage">
                                <Check
                                  aria-hidden="true"
                                  className="size-3 text-evergreen"
                                  strokeWidth={3}
                                />
                              </span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-7 text-sm font-semibold text-evergreen-soft">
                          Applicable services
                        </p>
                        <ul className="mt-2.5 flex flex-col gap-2">
                          {s.serviceIds.map((id) => (
                            <li key={id} className="flex items-baseline gap-2.5 text-sm">
                              <span className="rounded-md bg-sage px-1.5 py-0.5 text-xs font-bold tabular-nums">
                                {id}
                              </span>
                              <span>{serviceById(id).name}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-auto pt-8">
                          <Button asChild variant="hero" size="xl" className="w-full sm:w-auto">
                            <a href="#discuss">
                              {s.cta}
                              <ArrowRight aria-hidden="true" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <Button
              type="button"
              variant="creamOutline"
              size="iconRound"
              onClick={() => go(index - 1)}
              aria-label="Previous situation"
              data-carousel-nav=""
            >
              <ArrowLeft aria-hidden="true" />
            </Button>
            <div className="flex flex-col items-center gap-2.5">
              <p
                className="text-sm font-semibold tabular-nums"
                aria-live="polite"
                aria-atomic="true"
              >
                <span className="sr-only">Situation </span>
                {pad(index + 1)}
                <span className="text-on-dark-muted"> / {pad(total)}</span>
                <span className="sr-only">: {buyerSituations[index]?.segment}</span>
              </p>
              <div className="flex gap-1.5" aria-hidden="true">
                {buyerSituations.map((s, i) => (
                  <span
                    key={s.segment}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      i === index ? "w-8 bg-champagne" : "w-1.5 bg-cream/30",
                    )}
                  />
                ))}
              </div>
            </div>
            <Button
              type="button"
              variant="creamOutline"
              size="iconRound"
              onClick={() => go(index + 1)}
              aria-label="Next situation"
              data-carousel-nav=""
            >
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
