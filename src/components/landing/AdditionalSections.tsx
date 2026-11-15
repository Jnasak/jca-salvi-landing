import { ArrowRight, LockKeyhole } from "lucide-react";

export function ConversationOptions() {
  return (
    <section
      id="conversation"
      className="container-page section-space"
      aria-labelledby="conversation-title"
    >
      <p className="eyebrow">Three distinct conversations</p>
      <h2 id="conversation-title" className="editorial-title">
        Let’s Start with the Right Conversation
      </h2>
      <p className="prototype-note">
        Internal design only · commercial terms and availability remain subject to approval.
      </p>
      <div className="conversation-grid">
        <article className="conversation-card">
          <span className="eyebrow">01 / Proposed introduction</span>
          <h3>Free Enquiry Call</h3>
          <p>Ask about services and explore whether the partnership may be able to help.</p>
          <p className="prototype-note">
            Proposed free-call route. Entitlement, duration, availability and ownership are
            unconfirmed.
          </p>
          <button type="button" disabled>
            <LockKeyhole size={16} aria-hidden="true" /> Booking not enabled
          </button>
        </article>
        <article className="conversation-card featured">
          <span className="eyebrow">02 / Project enquiry</span>
          <h3>Project Discovery</h3>
          <p>Describe the challenge before a suitable next step is considered.</p>
          <ol className="intake-journey">
            <li>Project Intake</li>
            <li>Review and Qualification</li>
            <li>Discovery Scheduling</li>
            <li>Scope and Proposal</li>
          </ol>
          <a className="primary-action" href="#discuss">
            Preview Project Intake <ArrowRight size={18} aria-hidden="true" />
          </a>
          <p className="prototype-note">
            Synthetic-only test. No enquiry, booking or appointment is created.
          </p>
        </article>
        <article className="conversation-card">
          <span className="eyebrow">03 / Proposed advisory route</span>
          <h3>One-to-One Strategy Consultation</h3>
          <p>
            Focused guidance on a defined business, product, customer experience, operational or
            project challenge.
          </p>
          <p className="prototype-note">
            Proposed paid route. Scope, fees and terms await approval; no payment or booking is
            available.
          </p>
          <button type="button" disabled>
            <LockKeyhole size={16} aria-hidden="true" /> Consultation not enabled
          </button>
        </article>
      </div>
    </section>
  );
}
export function FinalConversion() {
  return (
    <section className="final-conversion container-page" aria-labelledby="final-title">
      <div>
        <p className="eyebrow">A practical next step</p>
        <h2 id="final-title">Let’s Turn Your Business Challenge into a Practical Plan.</h2>
        <p>
          Tell us what you’re working on. We’ll review your needs and explore the right next step.
        </p>
        <a className="primary-action" href="#discuss">
          Discuss Your Project <ArrowRight aria-hidden="true" size={18} />
        </a>
        <p className="prototype-note">Proposed copy · enquiry remains a non-live internal test.</p>
      </div>
    </section>
  );
}
