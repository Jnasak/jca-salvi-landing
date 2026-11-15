import { useEffect, useState, type RefObject } from "react";

/** Only layer cards when every card fits. Zoom, short screens and focus keep native flow usable. */
export function useServiceStack(ref: RefObject<HTMLDivElement | null>, content: readonly string[]) {
  const [enabled, setEnabled] = useState(false);
  const contentKey = content.join("|");
  useEffect(() => {
    const stack = ref.current;
    if (!stack || typeof ResizeObserver === "undefined") return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = Array.from(stack.querySelectorAll<HTMLElement>(".service-stack-card"));
    const update = () => {
      const tallest = Math.max(...cards.map((card) => card.offsetHeight));
      // 112px header clearance + 2×18px stack offset + 32px breathing room.
      setEnabled(desktop.matches && !reduce.matches && tallest + 180 <= window.innerHeight);
    };
    const observer = new ResizeObserver(update);
    cards.forEach((card) => observer.observe(card));
    desktop.addEventListener("change", update);
    reduce.addEventListener("change", update);
    window.addEventListener("resize", update);
    update();
    return () => {
      observer.disconnect();
      desktop.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, [ref, contentKey]);
  return enabled;
}
