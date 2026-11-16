import { useEffect, type RefObject } from "react";
/** Visible by default; optional single entrance, with no scroll listeners or React scroll state. */
export function useSectionReveals(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!reduce.matches) entry.target.classList.add("section-arrive");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 },
    );
    root
      .querySelectorAll(
        ".icp-card,.category-entry,.evidence-empty,.partner-profile,.conversation-card,.route-detail",
      )
      .forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [ref]);
}
