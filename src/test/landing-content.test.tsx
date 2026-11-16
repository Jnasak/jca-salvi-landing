import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { allServices, buyerSituations, serviceCategories } from "@/content/landing";
import { BuyerCarousel } from "@/components/landing/BuyerCarousel";

describe("services", () => {
  it("lists exactly the eight agreed services with exact IDs and names", () => {
    expect(allServices.map((s) => `${s.id} — ${s.name}`).sort()).toEqual([
      "S01 — Business Systems & Workflow Improvement",
      "S02 — Product Discovery & Improvement",
      "S03 — Programme & Project Delivery",
      "S04 — Customer Experience & Operations Improvement",
      "S05 — Implementation Recovery & Operational Adoption",
      "S06 — E-commerce Operations Improvement",
      "S07 — Product Discovery & Technical Delivery Partnerships",
      "S08 — AI & Automation Readiness Solutions",
    ]);
  });

  it("groups services into the three agreed categories", () => {
    expect(serviceCategories.map((c) => [c.title, c.services.map((s) => s.id)])).toEqual([
      ["Business & Workflow Improvement", ["S01", "S04", "S06", "S08"]],
      ["Product & Solution Development Support", ["S02", "S07"]],
      ["Programme & Project Delivery", ["S03", "S05"]],
    ]);
  });
});

describe("buyer situations", () => {
  it("has six situations mapped to the agreed service IDs and CTAs", () => {
    expect(buyerSituations.map((s) => [s.serviceIds, s.cta])).toEqual([
      [["S01", "S03", "S04"], "Discuss your client workflow"],
      [["S01", "S02"], "Discuss your business priorities"],
      [["S02", "S07"], "Discuss your product challenge"],
      [["S03", "S05"], "Discuss your delivery challenge"],
      [["S04", "S01"], "Discuss your customer journey"],
      [["S06", "S08"], "Discuss your operations challenge"],
    ]);
  });
});

function Harness() {
  const [i, setI] = useState(0);
  return <BuyerCarousel index={i} onIndexChange={setI} />;
}

describe("approved editorial interactions", () => {
  it("reveals all six ICP challenges and functional service routes", () => {
    render(<Harness />);
    buyerSituations.forEach((s) => {
      fireEvent.click(screen.getByRole("button", { name: s.segment + " " + s.friction }));
      expect(screen.getByRole("heading", { name: s.problem })).toBeVisible();
      s.serviceIds.forEach((id) =>
        expect(screen.getByRole("link", { name: new RegExp(id) })).toHaveAttribute(
          "href",
          "#service-explorer",
        ),
      );
    });
  });
  it("keeps the fixed proposition and actions mounted while three manual stories change", async () => {
    const { Hero } = await import("@/components/landing/Hero");
    render(<Hero />);
    const title = screen.getByRole("heading", {
      level: 1,
      name: "Business Challenges Deserve Practical Solutions.",
    });
    const cta = screen.getByRole("link", { name: "Discuss Your Project" });
    fireEvent.click(screen.getByRole("button", { name: "Next service story" }));
    expect(screen.getByRole("tab", { selected: true })).toHaveAccessibleName(/Story 2/);
    expect(screen.getByRole("heading", { level: 1 })).toBe(title);
    expect(screen.getByRole("link", { name: "Discuss Your Project" })).toBe(cta);
    fireEvent.keyDown(screen.getByRole("tab", { selected: true }), { key: "End" });
    expect(screen.getByRole("tab", { selected: true })).toHaveAccessibleName(/Story 3/);
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
    expect(screen.getByRole("link", { name: "Explore Solutions" })).toHaveAttribute(
      "href",
      "#solutions",
    );
  });

  it("shows the workflow graphic once, in Our Approach, with its pause control and three tabs", async () => {
    const { OurApproach } = await import("@/components/landing/OurApproach");
    render(<OurApproach />);
    expect(screen.getAllByRole("tablist", { name: "Workflow focus areas" })).toHaveLength(1);
    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(screen.getByRole("button", { name: /workflow animation/ })).toBeInTheDocument();
    expect(screen.getByText("Illustrative workflow — not client data.")).toBeInTheDocument();
  });
});
