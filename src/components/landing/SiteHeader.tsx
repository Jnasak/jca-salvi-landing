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
  { href: "#top", label: "Home" },
  { href: "#solutions", label: "Solutions" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
];

export function SiteHeader({ appearance = "light" }: { appearance?: "light" | "dark" }) {
  const header = useRef<HTMLElement>(null);
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

  useEffect(() => {
    const element = header.current;
    if (!element) return;
    const root = document.documentElement;
    const previous = root.style.getPropertyValue("--site-header-offset");
    const update = () => {
      const height = Math.ceil(element.getBoundingClientRect().height);
      const pinned = height > 0 && height <= window.innerHeight * 0.35;
      element.dataset["pinned"] = String(pinned);
      root.style.setProperty("--site-header-offset", `${pinned ? height + 12 : 12}px`);
    };
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    observer?.observe(element);
    window.addEventListener("resize", update);
    update();
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", update);
      if (previous) root.style.setProperty("--site-header-offset", previous);
      else root.style.removeProperty("--site-header-offset");
    };
  }, []);

  function navigate(href: string) {
    destination.current = href;
    setOpen(false);
  }

  return (
    <header ref={header} data-appearance={appearance} className="site-header">
      <div className="container-page site-header-row">
        <a
          ref={logo}
          href="#top"
          className="shrink-0 rounded-md"
          aria-label="JS BusinessSuite — back to top"
        >
          <Logo appearance={appearance} className="site-header-logo" />
        </a>
        <nav aria-label="Page sections" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="site-header-nav-link inline-flex min-h-11 items-center transition-colors"
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
                className="header-menu-trigger lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              data-appearance={appearance}
              className="site-menu w-[min(100%,24rem)] overflow-y-auto overscroll-contain"
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
                <SheetTitle className="site-menu-title">Explore JS BusinessSuite</SheetTitle>
                <SheetDescription className="site-menu-description">
                  Find the right support for your business.
                </SheetDescription>
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
                <Button asChild variant="hero" size="xl" className="header-menu-cta mt-6 w-full">
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
