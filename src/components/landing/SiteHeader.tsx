import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./Logo";

const nav = [
  { href: "#solutions", label: "Solutions" },
  { href: "#who-we-help", label: "Who we help" },
  { href: "#services", label: "Services" },
  { href: "#how-we-work", label: "How we work" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const destination = useRef<string | null>(null);
  const logo = useRef<HTMLAnchorElement>(null);
  const resizedToDesktop = useRef(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) {
        resizedToDesktop.current = true;
        setOpen(false);
      }
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  function navigate(href: string) {
    destination.current = href;
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-3 sm:h-20">
        <a
          ref={logo}
          href="#top"
          className="-ml-4 shrink-0 rounded-md sm:-ml-6"
          aria-label="JCA × Salvi — back to top"
        >
          <Logo className="w-[150px] sm:w-[220px]" />
        </a>
        <nav aria-label="Page sections" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="inline-flex min-h-11 items-center text-evergreen-soft transition-colors hover:text-evergreen"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="hero"
            size="pill"
            className="hidden min-h-11 px-5 sm:inline-flex"
          >
            <a href="#discuss">
              Discuss Your Project
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
          <Sheet
            open={open}
            onOpenChange={(next) => {
              if (next) {
                destination.current = null;
                resizedToDesktop.current = false;
              }
              setOpen(next);
            }}
          >
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="iconRound"
                className="lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              className="w-[min(100%,24rem)] overflow-y-auto overscroll-contain bg-cream pt-20"
              onCloseAutoFocus={(event) => {
                if (destination.current) {
                  event.preventDefault();
                  const section = document.querySelector(destination.current);
                  const target = section?.querySelector<HTMLElement>("h2") ?? section;
                  if (target instanceof HTMLElement) {
                    target.setAttribute("tabindex", "-1");
                    target.focus({ preventScroll: true });
                    section?.scrollIntoView({ block: "start" });
                  }
                  destination.current = null;
                } else if (resizedToDesktop.current) {
                  event.preventDefault();
                  logo.current?.focus({ preventScroll: true });
                  resizedToDesktop.current = false;
                }
              }}
            >
              <SheetHeader className="text-left">
                <SheetTitle>Explore JCA × Salvi</SheetTitle>
                <SheetDescription>Find the right support for your business.</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile page sections" className="mt-6">
                <ul className="divide-y divide-border">
                  {nav.map((n) => (
                    <li key={n.href}>
                      <a
                        href={n.href}
                        onClick={() => navigate(n.href)}
                        className="flex min-h-14 items-center justify-between rounded-md py-3 font-medium"
                      >
                        {n.label}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="hero" size="xl" className="mt-6 w-full">
                  <a href="#discuss" onClick={() => navigate("#discuss")}>
                    Discuss Your Project
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
