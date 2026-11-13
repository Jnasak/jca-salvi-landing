import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const nav = [
  { href: "#solutions", label: "Solutions" },
  { href: "#who-we-help", label: "Who we help" },
  { href: "#services", label: "Services" },
  { href: "#how-we-work", label: "How we work" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-3 sm:h-20">
        <a href="#top" className="-ml-4 shrink-0 rounded-md sm:-ml-6" aria-label="JCA × Salvi — back to top">
          <Logo className="w-[150px] sm:w-[220px]" />
        </a>
        <nav aria-label="Page sections" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="text-evergreen-soft transition-colors hover:text-evergreen"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button asChild variant="hero" size="pill" className="px-4 sm:px-5">
          <a href="#discuss">
            <span className="sm:hidden">Discuss</span>
            <span className="hidden sm:inline">Discuss Your Project</span>
            <ArrowRight aria-hidden="true" />
          </a>
        </Button>
      </div>
    </header>
  );
}

