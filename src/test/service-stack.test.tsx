import { act, renderHook } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { useServiceStack } from "@/components/landing/useServiceStack";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it("enables layering only on a fitting desktop without reduced motion, and cleans up observers", () => {
  let onResize = () => {};
  const disconnect = vi.fn();
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(callback: () => void) {
        onResize = callback;
      }
      observe() {}
      disconnect = disconnect;
    },
  );
  let reduce = false;
  let desktop = true;
  const changes: (() => void)[] = [];
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query) =>
      ({
        get matches() {
          return query.includes("reduced-motion") ? reduce : desktop;
        },
        addEventListener: (_event: string, callback: () => void) => changes.push(callback),
        removeEventListener: vi.fn(),
      }) as unknown as MediaQueryList,
  );
  vi.spyOn(window, "innerHeight", "get").mockReturnValue(1000);
  const stack = document.createElement("div");
  const card = document.createElement("article");
  card.className = "service-stack-card";
  let height = 600;
  Object.defineProperty(card, "offsetHeight", { get: () => height });
  stack.appendChild(card);
  const { result, unmount } = renderHook(() => useServiceStack({ current: stack }, ["S01"]));
  expect(result.current).toBe(true);
  height = 900;
  act(() => onResize());
  expect(result.current).toBe(false);
  height = 600;
  act(() => onResize());
  expect(result.current).toBe(true);
  reduce = true;
  act(() => changes.forEach((callback) => callback()));
  expect(result.current).toBe(false);
  reduce = false;
  desktop = false;
  act(() => changes.forEach((callback) => callback()));
  expect(result.current).toBe(false);
  unmount();
  expect(disconnect).toHaveBeenCalled();
});

it("keeps normal document flow if ResizeObserver is unavailable", () => {
  vi.stubGlobal("ResizeObserver", undefined);
  const { result } = renderHook(() =>
    useServiceStack({ current: document.createElement("div") }, ["S01"]),
  );
  expect(result.current).toBe(false);
});
