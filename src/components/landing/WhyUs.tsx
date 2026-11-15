const benefits = [
  "Understand Before Solving",
  "Complementary Expertise",
  "Clear Scope & Responsibilities",
  "Practical, Scoped Support",
  "Structured Coordination",
  "Solutions Suited to Your Needs",
] as const;
const profiles = [
  {
    name: "JCA",
    position: "Business & Product",
    summary:
      "Business Analysis and Product Management, supported by Customer Experience and Operations & Workflow Automation.",
  },
  {
    name: "Salvi",
    position: "Programme & Operations",
    summary: "Programme, project and operational coordination supporting structured delivery.",
  },
] as const;

const clarity = ["Business analysis", "Product thinking"];
const coordination = ["Customer experience", "Operations", "Delivery coordination"];

function BrandCross({ className }: { className?: string }) {
  // Decorative cross echoing the logo's ×, persimmon used decoratively only.
  return (
    <svg viewBox="396 60 56 56" className={className} aria-hidden="true" focusable="false">
      <path
        fill="var(--persimmon)"
        d="M441.22 60.28 424.45 77.05 407.68 60.28 396.76 71.33 413.53 87.97 396.89 104.61 407.81 115.53 424.45 98.89 441.09 115.66 452.01 104.74 435.37 87.97 452.14 71.2Z"
      />
    </svg>
  );
}

export function WhyUs() {
  return (
    <section id="why" aria-labelledby="why-title" className="py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <p className="eyebrow text-evergreen-soft">Why JCA × Salvi</p>
          <h2 id="why-title" className="mt-4 text-4xl font-medium sm:text-5xl">
            Business clarity meets practical coordination.
          </h2>
          <p className="mt-6 max-w-xl text-lg">
            We are independent professionals combining business analysis and product thinking with
            customer experience, operations and delivery coordination.
          </p>
          <p className="mt-6 inline-flex items-center gap-3 rounded-full border border-evergreen/15 bg-paper px-4 py-2 text-sm font-semibold">
            <span aria-hidden="true" className="size-2 rounded-full bg-champagne" />
            Scope and responsibilities agreed for each project.
          </p>
        </div>

        <div className="relative grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="rounded-3xl bg-sage p-7">
            <p className="eyebrow text-evergreen">Business clarity</p>
            <ul className="mt-4 space-y-2 font-display text-xl">
              {clarity.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <BrandCross className="mx-auto size-8 sm:size-10" />
          <div className="on-dark bg-evergreen-rich rounded-3xl p-7 text-cream">
            <p className="eyebrow text-champagne">Practical coordination</p>
            <ul className="mt-4 space-y-2 font-display text-xl">
              {coordination.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="container-page mt-14 sm:mt-20">
        <h3 className="font-display text-2xl font-semibold sm:text-3xl">
          The people behind the partnership
        </h3>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {profiles.map((person) => (
            <article
              key={person.name}
              className="rounded-3xl border border-evergreen/15 bg-paper p-6 shadow-soft sm:p-8"
            >
              <div
                aria-label={`Approved photograph of ${person.name} pending`}
                className="flex min-h-32 items-center justify-center rounded-2xl bg-sage-soft text-sm text-evergreen-soft"
              >
                Internal preview — portrait pending approval
              </div>
              <p className="eyebrow mt-5 text-evergreen-soft">
                {person.name} — {person.position}
              </p>
              <p className="mt-3 leading-relaxed">{person.summary}</p>
            </article>
          ))}
        </div>
        <div className="mt-14">
          <p className="eyebrow text-evergreen-soft">Our approach to collaboration</p>
          <h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
            Practical support, clearly scoped.
          </h3>
          <p className="mt-3 text-sm text-evergreen-soft">
            Draft benefit headings for internal review — not approved publication copy.
          </p>
          <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <li
                key={benefit}
                className="rounded-3xl border border-evergreen/15 bg-paper p-6 shadow-soft"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 items-center justify-center rounded-full bg-sage text-sm font-semibold text-evergreen"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-8 font-display text-xl font-semibold leading-snug">{benefit}</h4>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
