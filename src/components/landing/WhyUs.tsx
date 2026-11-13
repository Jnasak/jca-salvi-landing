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
    </section>
  );
}
