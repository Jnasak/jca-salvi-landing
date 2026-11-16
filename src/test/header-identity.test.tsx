import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { SiteHeader } from "@/components/landing/SiteHeader";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it("keeps the two supplied primary SVGs byte-identical and reserves their intrinsic aspect ratio", () => {
  for (const [file, hash] of [
    ["primary", "54c0ef46dbe263e4b2d23c9d1d2f234ca00b924eb924c1d33a02701c1efa39ae"],
    ["reverse", "cc1f55707c3f102c52666fe099afb767e5da30be1f9ff55c7f13409bb63bc1e0"],
  ])
    expect(
      createHash("sha256")
        .update(readFileSync(`public/brand/js-businesssuite-v241-${file}.svg`))
        .digest("hex"),
    ).toBe(hash);
  render(<SiteHeader />);
  const image = screen.getByRole("img", { name: "JS BusinessSuite" });
  expect(image).toHaveAttribute("width", "680");
  expect(image).toHaveAttribute("height", "490");
});

it("uses the reverse master and labelled modal in the dark header", async () => {
  render(<SiteHeader appearance="dark" />);
  expect(screen.getByRole("banner")).toHaveAttribute("data-appearance", "dark");
  expect(screen.getByRole("img", { name: "JS BusinessSuite" })).toHaveAttribute(
    "src",
    "/brand/js-businesssuite-v241-reverse.svg",
  );
  const trigger = screen.getByRole("button", { name: "Open navigation menu" });
  trigger.focus();
  fireEvent.click(trigger);
  const dialog = screen.getByRole("dialog", { name: "Explore JS BusinessSuite" });
  expect(dialog).toHaveAttribute("data-appearance", "dark");
  expect(within(dialog).getAllByRole("link")).toHaveLength(6);
  fireEvent.keyDown(dialog, { key: "Escape" });
  await waitFor(() => expect(trigger).toHaveFocus());
});

it("measures the header offset and releases sticky positioning when it occupies too much viewport height", () => {
  let resized = () => {};
  const disconnect = vi.fn();
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(callback: () => void) {
        resized = callback;
      }
      observe() {}
      disconnect = disconnect;
    },
  );
  let height = 148.3;
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    () => ({ height }) as DOMRect,
  );
  vi.spyOn(window, "innerHeight", "get").mockReturnValue(812);
  const { unmount } = render(<SiteHeader />);
  expect(screen.getByRole("banner")).toHaveAttribute("data-pinned", "true");
  expect(document.documentElement.style.getPropertyValue("--site-header-offset")).toBe("161px");
  height = 320;
  act(() => resized());
  expect(screen.getByRole("banner")).toHaveAttribute("data-pinned", "false");
  expect(document.documentElement.style.getPropertyValue("--site-header-offset")).toBe("12px");
  unmount();
  expect(disconnect).toHaveBeenCalled();
  expect(document.documentElement.style.getPropertyValue("--site-header-offset")).toBe("");
});
