import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { heroCopy, heroStories, serviceCategories } from "@/content/landing";
import { ReferenceMedia } from "./ReferenceMedia";

/** Proposition and CTAs never belong to the changing slide or its animation. No autoplay. */
export function Hero() {
  const [index, setIndex] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function key(event: KeyboardEvent, current: number) {
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? 2
          : event.key === "ArrowRight"
            ? (current + 1) % 3
            : event.key === "ArrowLeft"
              ? (current + 2) % 3
              : null;
    if (next === null) return;
    event.preventDefault();
    setIndex(next);
    buttons.current[next]?.focus();
  }
  return (
    <section className="hero-intro container-page" aria-labelledby="hero-title">
      <div className="editorial-hero">
        <div className="hero-proposition">
          <p className="eyebrow">{heroCopy.eyebrow}</p>
          <h1 id="hero-title" aria-label={heroCopy.headline}>
            {heroCopy.headline.slice(0, -1)}
            <span className="accent-dot">.</span>
          </h1>
          <p className="hero-supporting">{heroCopy.supporting}</p>
          <div className="hero-actions">
            <a className="primary-action" href="#discuss">
              Discuss Your Project <ArrowRight aria-hidden="true" size={19} />
            </a>
            <a className="secondary-action" href="#solutions">
              Explore Solutions
            </a>
          </div>
        </div>
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Service category stories"
          className="hero-carousel"
        >
          {heroStories.map((story, i) => (
            <div
              key={i}
              role="tabpanel"
              id={`hero-story-${i}`}
              aria-labelledby={`hero-story-tab-${i}`}
              hidden={index !== i}
              className="hero-story"
            >
              <ReferenceMedia index={i} />
              <span className="story-category">
                0{i + 1} / {serviceCategories[i]!.title}
              </span>
              <div className="story-caption">
                <h2>{story.title}</h2>
                <p>{story.caption}</p>
                <a href={`#service-category-${i}`}>
                  {serviceCategories[i]!.title} <ArrowRight aria-hidden="true" size={16} />
                </a>
              </div>
            </div>
          ))}
          <div className="story-controls">
            <div role="tablist" aria-label="Choose a service story">
              {heroStories.map((_, i) => (
                <button
                  key={i}
                  ref={(el) => {
                    buttons.current[i] = el;
                  }}
                  id={`hero-story-tab-${i}`}
                  role="tab"
                  aria-selected={index === i}
                  aria-controls={`hero-story-${i}`}
                  tabIndex={index === i ? 0 : -1}
                  onKeyDown={(e) => key(e, i)}
                  onClick={() => setIndex(i)}
                  aria-label={`Story ${i + 1}: ${serviceCategories[i]!.title}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <span className="sr-only" aria-live="polite">
              Story {index + 1} of 3: {serviceCategories[index]!.title}
            </span>
            <div className="story-arrows">
              <button
                type="button"
                onClick={() => setIndex((index + 2) % 3)}
                aria-label="Previous service story"
              >
                <ArrowLeft aria-hidden="true" size={17} /> Previous
              </button>
              <button
                type="button"
                onClick={() => setIndex((index + 1) % 3)}
                aria-label="Next service story"
              >
                Next <ArrowRight aria-hidden="true" size={17} />
              </button>
            </div>
          </div>
        </div>
        <p className="prototype-note">
          Design preview · imagery is illustrative and does not depict the partners.
        </p>
      </div>
    </section>
  );
}
