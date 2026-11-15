import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Faq, prototypeFaqItems } from "@/components/landing/Faq";
import { Projects, canPublishProject } from "@/components/landing/Projects";
import { DiscussProject } from "@/components/landing/DiscussProject";
import { Hero } from "@/components/landing/Hero";

describe("evidence-controlled project presentation", () => {
  it("hides unapproved project claims behind generic placeholders", () => {
    const item = {
      id: "unapproved",
      category: "Business & Workflow Improvement",
      title: "Unapproved client identity",
      summary: "Unverified success claim",
      publicationApproved: false,
    };
    render(<Projects projects={[item]} />);
    expect(screen.queryByText(item.title)).not.toBeInTheDocument();
    expect(screen.queryByText(item.summary)).not.toBeInTheDocument();
    expect(screen.getAllByText("Project evidence pending publication approval")).toHaveLength(3);
    expect(canPublishProject(item)).toBe(false);
    expect(
      canPublishProject({
        ...item,
        publicationApproved: true,
        evidenceReference: "evidence-record",
        publicationApprovalReference: "approval-record",
      }),
    ).toBe(true);
  });
});

describe("accessible prototype FAQ", () => {
  it("discloses an answer on demand", () => {
    render(<Faq />);
    const question = screen.getByRole("button", {
      name: prototypeFaqItems[0].question,
    });
    expect(question).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(question);
    expect(question).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(prototypeFaqItems[0].answer)).toBeInTheDocument();
  });
});

describe("simulated commercial routes", () => {
  it("shows selected buyer and service without a live form", () => {
    render(
      <DiscussProject
        context={{ situation: "Product Teams & Digital Businesses", service: "S02" }}
      />,
    );
    expect(screen.getByText(/Selected buyer situation:/)).toHaveTextContent(
      "Product Teams & Digital Businesses",
    );
    expect(screen.getByText(/Selected service:/)).toHaveTextContent(
      "S02 — Product Discovery & Improvement",
    );
    fireEvent.click(screen.getAllByRole("button", { name: "Preview route" })[1]!);
    expect(screen.getByText("4. Scope and Proposal")).toBeInTheDocument();
    expect(document.querySelector("form")).toBeNull();
  });
});

describe("editorial hero stories", () => {
  it("preserves the fixed headline while manually changing story captions", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Business Challenges Deserve Practical Solutions/,
      }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next service story" }));
    expect(screen.getByText("Product & Solution Development Support")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Business Challenges Deserve Practical Solutions/,
      }),
    ).toBeInTheDocument();
  });
});
