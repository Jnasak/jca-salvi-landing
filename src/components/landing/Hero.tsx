import { useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroCopy, partners, serviceCategories } from "@/content/landing";
import { PortraitPlaceholder } from "./PortraitPlaceholder";

/** Editorial brand opening: headline and CTAs, with equal JCA and Salvi frames as the main visual. */
export function Hero() {
  const sentences = heroCopy.headlineSentences;
  const lastSentence = sentences.length - 1;
  const [storyIndex, setStoryIndex] = useState(0);
  const stories = [
    "Improve the way your business works.",
    "Turn product ideas into clearer plans and actionable next steps.",
    "Bring structure and coordination to important projects.",
  ] as const;
  const advanceStory = (step: number) =>
    setStoryIndex((current) => (current + step + stories.length) % stories.length);

  return (
    <section aria-labelledby="hero-title" className="bg-hero relative overflow-hidden">
      <div className="container-page grid gap-10 pb-14 pt-10 sm:gap-14 sm:pb-20 sm:pt-16 lg:grid-cols-2 lg:items-center lg:gap-14 lg:pb-28 lg:pt-20 xl:gap-20">
        <div className="min-w-0">
          <p className="eyebrow enter-rise flex items-center gap-3 text-evergreen-soft">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-champagne sm:w-10" />
            {heroCopy.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="enter-rise mt-6 text-[2.5rem] font-normal leading-[1.03] tracking-[-0.025em] text-evergreen [--d:90ms] min-[390px]:text-[2.75rem] sm:mt-7 sm:text-[3.9rem] lg:text-[3.55rem] xl:text-[4.35rem]"
          >
            {sentences.map((lines, si) => (
              <span key={si} className={si > 0 ? "mt-1 block sm:mt-2" : "block"}>
                {lines.map((line, li) => {
                  const accent = si === lastSentence && li === lines.length - 1;
                  return (
                    <span key={line} className="sm:block">
                      {accent ? (
                        <span className="relative inline-block">
                          {line}
                          <span
                            aria-hidden="true"
                            className="enter-rule absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-persimmon sm:-bottom-1.5"
                          />
                        </span>
                      ) : (
                        line
                      )}
                      {li < lines.length - 1 ? " " : ""}
                    </span>
                  );
                })}{" "}
              </span>
            ))}
          </h1>

          <p className="enter-rise mt-7 max-w-[34rem] text-lg leading-relaxed text-evergreen [--d:200ms] sm:mt-9 sm:text-xl">
            {heroCopy.supporting}
          </p>

          <div className="enter-rise mt-8 flex flex-col gap-3 [--d:300ms] sm:mt-10 sm:flex-row sm:flex-wrap">
            <Button asChild variant="hero" size="xl">
              <a href={heroCopy.primaryCta.href}>
                {heroCopy.primaryCta.label}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <a href={heroCopy.secondaryCta.href}>
                {heroCopy.secondaryCta.label}
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <div className="min-w-0">
          <div
            aria-label="The partners"
            role="group"
            className="enter-rise grid w-full max-w-md grid-cols-2 items-start gap-4 [--d:380ms] min-[390px]:gap-5 sm:max-w-xl sm:gap-6 lg:max-w-none lg:gap-7"
          >
            {partners.map((p, i) => (
              <PortraitPlaceholder
                key={p.name}
                name={p.name}
                label={p.label}
                index={i + 1}
                className={i === 1 ? "mt-8 sm:mt-12 lg:mt-20" : "lg:mb-20"}
              />
            ))}
          </div>
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Service category stories"
            className="mt-6 rounded-3xl border border-evergreen/15 bg-paper p-5 shadow-soft sm:p-6"
          >
            <p className="eyebrow text-evergreen-soft">Explore our three service areas</p>
            <div aria-live="polite" aria-atomic="true" className="mt-3 min-h-28">
              <p className="text-sm text-evergreen-soft">
                Story {storyIndex + 1} of 3 · Draft captions for internal review
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold sm:text-2xl">
                {serviceCategories[storyIndex]?.title ?? serviceCategories[0].title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-evergreen-soft">
                {stories[storyIndex]}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => advanceStory(-1)}
                aria-label="Previous service story"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-evergreen/30"
              >
                <ArrowLeft aria-hidden="true" size={19} />
              </button>
              <div
                className="flex items-center gap-2"
                role="group"
                aria-label="Select service story"
              >
                {serviceCategories.map((category, index) => (
                  <button
                    type="button"
                    key={category.title}
                    onClick={() => setStoryIndex(index)}
                    aria-label={`Show story ${index + 1}: ${category.title}`}
                    aria-current={index === storyIndex ? "true" : undefined}
                    className={`min-h-11 min-w-11 rounded-full border text-sm font-semibold ${index === storyIndex ? "border-evergreen bg-evergreen text-cream" : "border-evergreen/30 text-evergreen"}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => advanceStory(1)}
                aria-label="Next service story"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-evergreen/30"
              >
                <ArrowRight aria-hidden="true" size={19} />
              </button>
              <a
                href="#services"
                className="ml-auto inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4"
              >
                Explore service details
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
