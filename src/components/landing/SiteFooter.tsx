import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-cream py-10">
      <div className="container-page flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <Logo className="w-[220px]" />
        <p className="max-w-sm text-sm text-evergreen-soft sm:text-right">
          Prototype for review. Buyer situations, workflow graphic and approach are illustrative.
        </p>
      </div>
    </footer>
  );
}

