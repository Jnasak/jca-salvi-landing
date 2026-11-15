import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { EnquiryForm } from "@/components/landing/EnquiryForm";
import { emptyEnquiry, encodeEnquiry, ENQUIRY_FORM_NAME, enquiryFields } from "@/content/enquiry";
import App from "@/App";

function complete() {
  fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "Sample Person" } });
  fireEvent.change(screen.getByLabelText("Work email *"), {
    target: { value: "sample@example.test" },
  });
  fireEvent.change(screen.getByLabelText("Organisation or business name *"), {
    target: { value: "Synthetic Company" },
  });
  fireEvent.change(screen.getByLabelText("Business challenge / project description *"), {
    target: { value: "Synthetic project for internal testing." },
  });
  fireEvent.click(screen.getByRole("checkbox", { name: /I have read the draft/ }));
}
function submit() {
  fireEvent.click(screen.getByRole("button", { name: "Test enquiry form" }));
}
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

it("links required validation errors and focuses an accessible summary", () => {
  render(<EnquiryForm />);
  submit();
  const summary = screen.getByRole("alert");
  expect(summary).toHaveFocus();
  expect(within(summary).getAllByRole("link")).toHaveLength(5);
  const email = screen.getByLabelText("Work email *");
  expect(email).toHaveAttribute("aria-invalid", "true");
  expect(email).toHaveAttribute("aria-describedby", "error-email");
  expect(screen.getByRole("checkbox", { name: /I have read the draft/ })).not.toBeChecked();
});

it("simulates one pending/confirmation journey without network or persistent storage", () => {
  vi.useFakeTimers();
  const network = vi.spyOn(globalThis, "fetch");
  const storage = vi.spyOn(Storage.prototype, "setItem");
  render(<EnquiryForm />);
  complete();
  submit();
  expect(screen.getByRole("button", { name: "Running test…" })).toBeDisabled();
  fireEvent.submit(screen.getByRole("form"));
  act(() => vi.advanceTimersByTime(350));
  expect(
    screen.getByRole("heading", { name: "Test complete — no enquiry sent" }),
  ).toBeInTheDocument();
  expect(screen.getByText(/No submission reference, lead/).parentElement).toHaveFocus();
  expect(network).not.toHaveBeenCalled();
  expect(storage).not.toHaveBeenCalled();
});

it("retains input through simulated failure and allows deliberate recovery", () => {
  vi.useFakeTimers();
  render(<EnquiryForm />);
  complete();
  fireEvent.click(screen.getByRole("checkbox", { name: "Simulate a submission failure" }));
  submit();
  act(() => vi.advanceTimersByTime(350));
  expect(screen.getByRole("alert")).toHaveFocus();
  expect(screen.getByLabelText("Organisation or business name *")).toHaveValue("Synthetic Company");
  fireEvent.click(screen.getByRole("checkbox", { name: "Simulate a submission failure" }));
  submit();
  act(() => vi.advanceTimersByTime(350));
  expect(
    screen.getByRole("heading", { name: "Test complete — no enquiry sent" }),
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Edit test details" }));
  act(() => vi.runOnlyPendingTimers());
  expect(screen.getByLabelText("Full name *")).toHaveFocus();
  expect(screen.getByLabelText("Full name *")).toHaveValue("Sample Person");
});

it("requires synthetic addresses in this build and keeps optional fields optional", () => {
  render(<EnquiryForm />);
  complete();
  fireEvent.change(screen.getByLabelText("Work email *"), {
    target: { value: "sample@example.com" },
  });
  submit();
  expect(screen.getByRole("alert")).toHaveTextContent("@example.test");
  expect(screen.getByLabelText(/Phone \/ WhatsApp/)).not.toBeRequired();
  expect(screen.getByLabelText(/Area of support/)).not.toBeRequired();
  expect(screen.queryByText(/marketing opt-in/i)).not.toBeInTheDocument();
});

it("preserves buyer/problem context and replaces it with a selected service without clearing a draft", () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "Sample Person" } });
  fireEvent.click(screen.getByRole("link", { name: "Discuss your client workflow" }));
  expect(screen.getByRole("complementary", { name: "Selected enquiry context" })).toHaveTextContent(
    "S01, S03, S04",
  );
  fireEvent.click(screen.getByRole("button", { name: /^Expand Business/ }));
  fireEvent.click(screen.getByRole("button", { name: /^S08/ }));
  fireEvent.click(screen.getByRole("link", { name: "Discuss this service" }));
  expect(screen.getByRole("complementary", { name: "Selected enquiry context" })).toHaveTextContent(
    "S08",
  );
  expect(screen.getByLabelText("Full name *")).toHaveValue("Sample Person");
  expect(screen.getByRole("form").querySelector('[name="service_interest"]')).toHaveValue("S08");
});

it("keeps the prepared Netlify encoding and undeployed HTML definition in parity", () => {
  const body = new URLSearchParams(
    encodeEnquiry(
      { ...emptyEnquiry, full_name: "Sample & Co", email: "sample@example.test" },
      { segment: "Example", serviceIds: ["S01"] },
    ),
  );
  expect(body.get("form-name")).toBe(ENQUIRY_FORM_NAME);
  expect(body.get("full_name")).toBe("Sample & Co");
  expect(body.get("service_interest")).toBe("S01");
  const html = readFileSync("netlify/enquiry-form.html", "utf8");
  const declared = [...html.matchAll(/<input[^>]+name="([^"]+)"/g)].map((match) => match[1]);
  expect(declared.sort()).toEqual(["form-name", ...enquiryFields].sort());
  expect([...body.keys()].sort()).toEqual(declared.sort());
  render(<EnquiryForm />);
  expect(screen.getByRole("form")).not.toHaveAttribute("data-netlify");
  expect(screen.getByRole("form")).not.toHaveAttribute("action");
});

it("rejects an invalid optional phone and catches a filled honeypot in the internal test", () => {
  vi.useFakeTimers();
  render(<EnquiryForm />);
  complete();
  fireEvent.change(screen.getByLabelText(/Phone \/ WhatsApp/), { target: { value: "......." } });
  submit();
  expect(screen.getByRole("alert")).toHaveTextContent("Enter a phone number");
  fireEvent.change(screen.getByLabelText(/Phone \/ WhatsApp/), { target: { value: "" } });
  fireEvent.change(document.querySelector('[name="bot-field"]')!, {
    target: { value: "synthetic bot" },
  });
  submit();
  act(() => vi.advanceTimersByTime(350));
  expect(screen.getByRole("alert")).toHaveTextContent("Simulated failure — no enquiry sent");
});
