import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { Faq } from "@/components/landing/Faq";
import App from "@/App";
import { buyerSituations, serviceById } from "@/content/landing";
import { ConversationOptions } from "@/components/landing/AdditionalSections";
it.each(buyerSituations)(
  "preserves $segment through every mapped service and enquiry",
  (s) => {
    const frames: FrameRequestCallback[] = [];
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      frames.push(cb);
      return frames.length;
    });
    render(<App />);
    fireEvent.change(screen.getByLabelText("Full name *"), {
      target: { value: "Synthetic draft" },
    });
    fireEvent.click(screen.getByRole("button", { name: s.segment + " " + s.friction }));
    for (const id of s.serviceIds) {
      const panel = screen.getByRole("region", { name: s.problem });
      fireEvent.click(within(panel).getByRole("link", { name: new RegExp(id) }));
      act(() => {
        frames.splice(0).forEach((cb) => cb(0));
      });
      expect(
        within(screen.getByRole("region", { name: serviceById(id).name })).getByRole("heading", {
          name: serviceById(id).name,
          level: 3,
        }),
      ).toHaveFocus();
      fireEvent.click(screen.getByRole("link", { name: "Discuss this service" }));
      const form = screen.getByRole("form");
      expect(form.querySelector('[name="buyer_segment"]')).toHaveValue(s.segment);
      expect(form.querySelector('[name="buyer_problem"]')).toHaveValue(s.problem);
      expect(form.querySelector('[name="service_interest"]')).toHaveValue(id);
      expect(screen.getByLabelText("Full name *")).toHaveValue("Synthetic draft");
      expect(
        screen.getByRole("heading", { name: "What would you like to make work better?" }),
      ).toHaveFocus();
      expect(form).not.toHaveAttribute("action");
    }
    vi.restoreAllMocks();
  },
  15000,
);
it("keeps three commercial routes distinct and prevents bookings or payment", () => {
  render(<ConversationOptions />);
  expect(screen.getAllByRole("article")).toHaveLength(3);
  expect(screen.getByRole("button", { name: "Booking not enabled" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "Consultation not enabled" })).toBeDisabled();
  expect(screen.getByRole("link", { name: /Preview Project Intake/ })).toHaveAttribute(
    "href",
    "#discuss",
  );
  expect(screen.getAllByRole("listitem").map((n) => n.textContent)).toEqual([
    "Project Intake",
    "Review and Qualification",
    "Discovery Scheduling",
    "Scope and Proposal",
  ]);
  expect(document.querySelector('a[href^="https:"]')).toBeNull();
});
it("keeps the existing FAQ accessible without motion", () => {
  render(<Faq />);
  const question = screen.getByRole("button", {
    name: "Do we need to know exactly what support we need?",
  });
  fireEvent.click(question);
  expect(question).toHaveAttribute("aria-expanded", "true");
});

it("keeps internal approval language out of visible page copy", () => {
  render(<App />);
  expect(document.body.textContent).not.toMatch(
    /SIA|principal clearance|awaiting.*approval|internal governance|risk.acceptance|release authori[sz]ation/i,
  );
});
