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

describe("buyer carousel", () => {
  it("moves with Next/Previous, wraps, and supports arrow keys on tabs", () => {
    render(<Harness />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(6);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    fireEvent.click(screen.getByRole("button", { name: "Next situation" }));
    expect(screen.getAllByRole("tab")[1]).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(screen.getAllByRole("tab")[1]!, { key: "ArrowRight" });
    expect(screen.getAllByRole("tab")[2]).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(screen.getAllByRole("tab")[2]!, { key: "End" });
    expect(screen.getAllByRole("tab")[5]).toHaveAttribute("aria-selected", "true");

    fireEvent.click(screen.getByRole("button", { name: "Next situation" }));
    expect(screen.getAllByRole("tab")[0]).toHaveAttribute("aria-selected", "true");

    fireEvent.click(screen.getByRole("button", { name: "Previous situation" }));
    expect(screen.getAllByRole("tab")[5]).toHaveAttribute("aria-selected", "true");
  });
});

describe("hero redesign", () => {
  it("uses the approved headline, eyebrow and supporting copy exactly", async () => {
    const { heroCopy } = await import("@/content/landing");
    expect(heroCopy.headlineSentences.flat().join(" ")).toBe(heroCopy.headline);
    expect(heroCopy.headline).toBe("Your business is growing. Let's make the way it works even better.");
    expect(heroCopy.eyebrow).toBe("Business, Product & Operations Delivery Partners");
    expect(heroCopy.supporting).toBe(
      "We help growing teams untangle workflows, clarify product needs and coordinate delivery — with practical solutions scoped around your business.",
    );
  });

  it("links the hero CTAs to #discuss and #solutions and shows both pending portraits, without the workflow graphic", async () => {
    const { Hero } = await import("@/components/landing/Hero");
    render(<Hero />);
    expect(screen.getByRole("link", { name: /Discuss Your Project/ })).toHaveAttribute("href", "#discuss");
    expect(screen.getByRole("link", { name: /Explore Solutions/ })).toHaveAttribute("href", "#solutions");
    expect(screen.getByRole("img", { name: "JCA — approved portrait pending" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Salvi — approved portrait pending" })).toBeInTheDocument();
    expect(screen.queryByRole("tablist", { name: "Workflow focus areas" })).toBeNull();
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

