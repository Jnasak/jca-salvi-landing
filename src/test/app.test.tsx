import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import App from "@/App";
it("renders the local landing page with one preserved workflow and no live enquiry form", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  expect(screen.getAllByRole("tablist", { name: "Workflow focus areas" })).toHaveLength(1);
  expect(document.querySelector("form")).toBeNull();
});
