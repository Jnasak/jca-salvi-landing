import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Services } from "@/components/landing/Services";
import { WhyUs } from "@/components/landing/WhyUs";
import { allServices, serviceCategories } from "@/content/landing";

describe("service discovery", () => {
  it("exposes every exact service in the overview and category without expanding anything", () => {
    render(<Services />);
    const overview = screen.getByRole("navigation", { name: "All eight Service Types" });
    expect(within(overview).getAllByRole("link")).toHaveLength(8);
    expect(screen.getAllByRole("article")).toHaveLength(3);
    allServices.forEach((service) => {
      expect(
        within(overview).getByRole("link", {
          name: new RegExp(`^${service.id} `),
        }),
      ).toBeVisible();
      expect(screen.getByRole("button", { name: new RegExp(`^${service.id}`) })).toBeVisible();
    });
  });

  it("changes the category scope and preserves technical-delivery exclusions and enquiry context", () => {
    const discuss = vi.fn();
    render(<Services onDiscuss={discuss} />);
    const cards = screen.getAllByRole("article");
    fireEvent.click(screen.getByRole("button", { name: /^S08/ }));
    expect(screen.getByRole("button", { name: /^S08/ })).toHaveAttribute("aria-pressed", "true");
    expect(
      within(cards[0]!).getByText(/AI development and automation implementation/),
    ).toBeVisible();
    expect(
      fireEvent.click(within(cards[0]!).getByRole("link", { name: /Discuss this service/ })),
    ).toBe(false);
    expect(discuss).toHaveBeenCalledWith({ serviceIds: ["S08"] });
    fireEvent.click(screen.getByRole("button", { name: /^S07/ }));
    expect(
      within(cards[1]!).getByText(/Software development is not automatically included/),
    ).toBeVisible();
    expect(within(cards[0]!).getByRole("button", { name: /^S08/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("deep-links every overview entry to the correct category and selected native control", () => {
    let frame: FrameRequestCallback | undefined;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      frame = callback;
      return 1;
    });
    const scroll = vi.spyOn(HTMLElement.prototype, "scrollIntoView");
    render(<Services />);
    const overview = screen.getByRole("navigation", { name: "All eight Service Types" });
    const target = within(overview).getByRole("link", { name: /S08/ });
    expect(target).toHaveAttribute("href", "#service-category-0");
    // React flushes the selection before the browser's next animation frame.
    fireEvent.click(target);
    act(() => frame?.(0));
    expect(screen.getByRole("button", { name: /^S08/ })).toHaveFocus();
    expect(scroll).toHaveBeenCalledWith({ block: "start" });
    vi.restoreAllMocks();
  });

  it("retains the catalogue's category labels and IDs", () => {
    render(<Services />);
    serviceCategories.forEach((category) =>
      expect(screen.getByRole("heading", { level: 3, name: category.title })).toBeInTheDocument(),
    );
  });
});

it("renders six benefits and an internal enquiry CTA without invented performance claims", () => {
  render(<WhyUs />);
  expect(screen.getAllByRole("article")).toHaveLength(6);
  expect(screen.getByRole("link", { name: /Discuss Your Project/ })).toHaveAttribute(
    "href",
    "#discuss",
  );
  expect(screen.getByText(/Technical delivery requires appropriately scoped/)).toBeVisible();
  expect(
    screen.queryByText(/measurable results|industry expertise|guaranteed/i),
  ).not.toBeInTheDocument();
});
