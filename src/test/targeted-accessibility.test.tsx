import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { WorkflowGraphic } from "@/components/landing/WorkflowGraphic";

function motionPreference(initial: boolean) {
  let change: ((event: MediaQueryListEvent) => void) | undefined;
  const remove = vi.fn();
  vi.spyOn(window, "matchMedia").mockReturnValue({
    matches: initial,
    addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
      change = listener;
    },
    removeEventListener: remove,
  } as unknown as MediaQueryList);
  return {
    change: (matches: boolean) => act(() => change?.({ matches } as MediaQueryListEvent)),
    remove,
  };
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

it("starts paused with reduced motion and does not advance automatically", () => {
  vi.useFakeTimers();
  motionPreference(true);
  const { container } = render(<WorkflowGraphic />);
  const selected = screen.getAllByRole("tab")[0]!;
  expect(screen.getByRole("button", { name: "Play workflow animation" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(container.firstChild).toHaveClass("wf-paused");
  act(() => vi.advanceTimersByTime(12000));
  expect(selected).toHaveAttribute("aria-selected", "true");
});

it("pauses when reduced motion is enabled at runtime and removes the listener on unmount", () => {
  vi.useFakeTimers();
  const preference = motionPreference(false);
  const { unmount } = render(<WorkflowGraphic />);
  act(() => vi.advanceTimersByTime(3800));
  expect(screen.getAllByRole("tab")[1]).toHaveAttribute("aria-selected", "true");
  preference.change(true);
  expect(screen.getByRole("button", { name: "Play workflow animation" })).toBeInTheDocument();
  act(() => vi.advanceTimersByTime(12000));
  expect(screen.getAllByRole("tab")[1]).toHaveAttribute("aria-selected", "true");
  preference.change(false);
  expect(screen.getByRole("button", { name: "Play workflow animation" })).toBeInTheDocument();
  unmount();
  expect(preference.remove).toHaveBeenCalledWith("change", expect.any(Function));
});

it("pauses and resumes automatic selection, and preserves tab focus with Arrow/Home/End keys", () => {
  vi.useFakeTimers();
  motionPreference(false);
  render(<WorkflowGraphic />);
  fireEvent.click(screen.getByRole("button", { name: "Pause workflow animation" }));
  act(() => vi.advanceTimersByTime(7600));
  expect(screen.getAllByRole("tab")[0]).toHaveAttribute("aria-selected", "true");
  fireEvent.click(screen.getByRole("button", { name: "Play workflow animation" }));
  act(() => vi.advanceTimersByTime(3800));
  const tabs = screen.getAllByRole("tab");
  expect(tabs[1]).toHaveAttribute("aria-selected", "true");
  for (const [key, index] of [
    ["End", 2],
    ["Home", 0],
    ["ArrowLeft", 2],
    ["ArrowRight", 0],
  ] as const) {
    fireEvent.keyDown(screen.getByRole("tab", { selected: true }), { key });
    expect(tabs[index]).toHaveFocus();
    expect(tabs[index]).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("tabpanel")).toHaveAttribute("aria-labelledby", tabs[index]!.id);
  }
  expect(screen.getByRole("button", { name: "Play workflow animation" })).toBeInTheDocument();
});
