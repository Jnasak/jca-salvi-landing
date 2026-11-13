import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Services } from "@/components/landing/Services";

describe("service flashcards", () => {
  it("exposes all eight services through category expansion and minimises again", () => {
    render(<Services/>);
    const controls = screen.getAllByRole("button", {name:/^Expand/});
    expect(controls).toHaveLength(3);
    controls.forEach(button => fireEvent.click(button));
    expect(screen.getAllByRole("button", {name:/^S0[1-8]/})).toHaveLength(8);
    fireEvent.click(screen.getByRole("button", {name:/^Minimise Business/}));
    expect(screen.queryByRole("button", {name:/^S01/})).toBeNull();
  });
  it("retains the selected service when maximised, then closes with Escape", async () => {
    render(<Services/>);
    fireEvent.click(screen.getByRole("button", {name:/^Expand Business/}));
    fireEvent.click(screen.getByRole("button", {name:/^S08/}));
    const maximise = screen.getByRole("button", {name:/^Maximise Business/});
    maximise.focus();
    fireEvent.click(maximise);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/AI development and automation implementation/)).toBeInTheDocument();
    fireEvent.keyDown(document, {key:"Escape"});
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(maximise).toHaveFocus();
    expect(screen.getByRole("button", {name:/^S08/})).toHaveAttribute("aria-expanded","true");
  });
});
