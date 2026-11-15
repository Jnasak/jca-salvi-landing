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

describe("synthetic-only enquiry context", () => {
  it("preserves the selected buyer and canonical service in the test form", () => {
    render(
      <DiscussProject
        context={{ segment: "Product Teams & Digital Businesses", serviceIds: ["S02"] }}
      />,
    );
    expect(
      screen.getByRole("complementary", { name: "Selected enquiry context" }),
    ).toHaveTextContent("S02");
    expect(screen.getByRole("form")).not.toHaveAttribute("action");
    expect(screen.getByRole("form")).not.toHaveAttribute("data-netlify");
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
