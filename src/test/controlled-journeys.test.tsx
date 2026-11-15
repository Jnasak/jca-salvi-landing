import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { Faq } from "@/components/landing/Faq";
import App from "@/App";
import { buyerSituations, serviceById } from "@/content/landing";
import { ConversationOptions } from "@/components/landing/AdditionalSections";
it("connects each of the six ICPs to every associated canonical service detail", () => {
  const frames: FrameRequestCallback[] = [];
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    frames.push(cb);
    return frames.length;
  });
  render(<App />);
  for (const s of buyerSituations) {
    fireEvent.click(screen.getByRole("button", { name: s.segment + " " + s.friction }));
    const panel = screen.getByRole("region", { name: s.problem });
    for (const id of s.serviceIds) {
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
    }
  }
  vi.restoreAllMocks();
});
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
