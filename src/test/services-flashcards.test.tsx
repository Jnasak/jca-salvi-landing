import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Services } from "@/components/landing/Services";
import { WhyUs } from "@/components/landing/WhyUs";
import { allServices, serviceCategories } from "@/content/landing";

describe("service discovery", () => {
  it("shows three compact category routes and all eight service controls without duplicate scope panels", () => {
    render(<Services />);
    expect(
      within(screen.getByRole("navigation", { name: "Three Service Categories" })).getAllByRole(
        "link",
      ),
    ).toHaveLength(3);
    expect(screen.getAllByRole("article")).toHaveLength(3);
    allServices.forEach((s) =>
      expect(screen.getByRole("button", { name: new RegExp(`^${s.id}`) })).toBeVisible(),
    );
    expect(
      screen.getAllByRole("region", { name: "Business Systems & Workflow Improvement" }),
    ).toHaveLength(1);
    serviceCategories.forEach((c) =>
      expect(screen.getAllByRole("heading", { level: 3, name: c.title })).toHaveLength(2),
    );
  });
  it("opens every exact service and retains technical exclusions and enquiry context", () => {
    const discuss = vi.fn();
    render(<Services onDiscuss={discuss} />);
    for (const s of allServices) {
      fireEvent.click(screen.getByRole("button", { name: new RegExp(`^${s.id}`) }));
      expect(
        within(screen.getByRole("region", { name: s.name })).getByRole("heading", {
          level: 3,
          name: s.name,
        }),
      ).toBeVisible();
    }
    fireEvent.click(screen.getByRole("button", { name: /^S07/ }));
    expect(screen.getByText(/Software development is not automatically included/)).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: /^S08/ }));
    expect(screen.getByText(/AI development and automation implementation/)).toBeVisible();
    fireEvent.click(screen.getByRole("link", { name: /Discuss this service/ }));
    expect(discuss).toHaveBeenCalledWith({ serviceIds: ["S08"] });
  });
  it("focuses the shared detail heading when following an external contextual request", () => {
    const frames: FrameRequestCallback[] = [];
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      frames.push(cb);
      return frames.length;
    });
    const { rerender } = render(<Services />);
    rerender(<Services requested={{ id: "S07", revision: 1 }} />);
    act(() => frames.forEach((cb) => cb(0)));
    expect(
      screen.getByRole("heading", { name: "Product Discovery & Technical Delivery Partnerships" }),
    ).toHaveFocus();
    vi.restoreAllMocks();
  });
});
it("keeps equal partner recognition and six proposed benefits", () => {
  render(<WhyUs />);
  expect(screen.getAllByRole("article")).toHaveLength(6);
  expect(screen.getByRole("img", { name: "JCA — portrait placeholder" })).toBeVisible();
  expect(screen.getByRole("img", { name: "Salvi — portrait placeholder" })).toBeVisible();
  expect(screen.getByText(/Partner portraits are placeholders/)).toBeVisible();
  expect(screen.getByRole("link", { name: /Discuss Your Project/ })).toHaveAttribute(
    "href",
    "#discuss",
  );
});
