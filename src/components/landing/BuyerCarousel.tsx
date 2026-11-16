import {
  ArrowRight,
  Building2,
  Rocket,
  Layers,
  CalendarCheck,
  Headphones,
  ShoppingCart,
} from "lucide-react";
import { buyerSituations, serviceById, serviceCategories, type ServiceId } from "@/content/landing";
import type { EnquiryContext } from "@/content/enquiry";
const icons = [Building2, Rocket, Layers, CalendarCheck, Headphones, ShoppingCart];
/** Six compact discovery cards and one contextual panel, not a second mandatory carousel. */
export function BuyerCarousel({
  index,
  onIndexChange,
  onDiscuss,
  onExplore,
}: {
  index: number;
  onIndexChange: (i: number) => void;
  onDiscuss?: (c: EnquiryContext) => void;
  onExplore?: (id: ServiceId) => void;
}) {
  const situation = buyerSituations[index]!;
  return (
    <section
      id="solutions"
      className="container-page section-space"
      aria-labelledby="solutions-title"
    >
      <div className="section-heading">
        <h2 id="solutions-title">Your Challenges, Our Solutions</h2>
        <span className="heading-rule pink" aria-hidden="true" />
        <a href="#buyer-details">
          Explore your situation <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
      <div className="icp-grid">
        {buyerSituations.map((s, i) => {
          const Icon = icons[i]!;
          return (
            <button
              type="button"
              key={s.segment}
              aria-expanded={index === i}
              aria-controls="buyer-details"
              onClick={() => onIndexChange(i)}
              className="icp-card"
            >
              <Icon aria-hidden="true" size={27} />
              <span className="icp-name">{s.segment}</span>
              <span className="icp-summary">{s.friction}</span>
              <span className="card-arrow" aria-hidden="true">
                <ArrowRight size={18} />
              </span>
            </button>
          );
        })}
      </div>
      <div
        id="buyer-details"
        className="buyer-detail"
        role="region"
        aria-labelledby="buyer-detail-title"
      >
        <div>
          <p className="eyebrow">0{index + 1} / Your challenge</p>
          <h3 id="buyer-detail-title">{situation.problem}</h3>
          <p className="mt-3">{situation.help.join(" · ")}.</p>
        </div>
        <div>
          <p className="eyebrow">Relevant support</p>
          <ul className="buyer-services">
            {situation.serviceIds.map((id) => (
              <li key={id}>
                <a
                  href="#service-explorer"
                  onClick={(e) => {
                    if (onExplore) {
                      e.preventDefault();
                      onExplore(id);
                    }
                  }}
                >
                  <span>{id}</span>{" "}
                  <span className="buyer-service-name">{serviceById(id).name}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <small>
                  {serviceCategories.find((c) => c.services.some((s) => s.id === id))!.title}
                </small>
              </li>
            ))}
          </ul>
          <a
            className="text-action"
            href="#discuss"
            onClick={(event) => {
              event.preventDefault();
              onDiscuss?.({
                segment: situation.segment,
                problem: situation.problem,
                serviceIds: situation.serviceIds,
              });
            }}
          >
            {situation.cta} <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
