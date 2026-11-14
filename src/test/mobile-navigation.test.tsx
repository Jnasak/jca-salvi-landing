import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Services } from "@/components/landing/Services";
import { SiteHeader } from "@/components/landing/SiteHeader";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it("opens an explicitly labelled modal menu and restores the trigger after Escape", async () => {
  render(<SiteHeader />);
  const trigger = screen.getByRole("button", { name: "Open navigation menu" });
  trigger.focus();
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(trigger);
  const dialog = screen.getByRole("dialog", { name: "Explore JCA × Salvi" });
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(within(dialog).getAllByRole("link")).toHaveLength(5);
  expect(dialog).toContainElement(document.activeElement as HTMLElement);
  fireEvent.keyDown(dialog, { key: "Escape" });
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  await waitFor(() => expect(trigger).toHaveFocus());
});

it("moves focus to the chosen section instead of back to the closed menu", async () => {
  const scroll = vi.fn();
  render(
    <>
      <SiteHeader />
      <main>
        <section id="services">
          <h2>Our services</h2>
        </section>
      </main>
    </>,
  );
  const section = document.getElementById("services")!;
  section.scrollIntoView = scroll;
  fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));
  fireEvent.click(within(screen.getByRole("dialog")).getByRole("link", { name: "Services" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  await waitFor(() => expect(screen.getByRole("heading", { name: "Our services" })).toHaveFocus());
  expect(scroll).toHaveBeenCalledWith({ block: "start" });
});

it("closes the menu at desktop width without leaving focus on a hidden trigger", async () => {
  let change: (() => void) | undefined;
  const media = {
    matches: false,
    addEventListener: vi.fn((_: string, listener: () => void) => {
      change = listener;
    }),
    removeEventListener: vi.fn(),
  };
  vi.spyOn(window, "matchMedia").mockReturnValue(media as unknown as MediaQueryList);
  render(<SiteHeader />);
  fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));
  media.matches = true;
  const { act } = await import("@testing-library/react");
  act(() => change?.());
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  await waitFor(() =>
    expect(screen.getByRole("link", { name: "JCA × Salvi — back to top" })).toHaveFocus(),
  );
});

it("keeps focus inside the modal when tabbing past its last or first control", () => {
  render(<SiteHeader />);
  fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));
  const dialog = screen.getByRole("dialog");
  const close = within(dialog).getByRole("button", { name: "Close" });
  const cta = within(dialog).getByRole("link", { name: "Discuss Your Project" });
  cta.focus();
  fireEvent.keyDown(cta, { key: "Tab" });
  expect(close).toHaveFocus();
  fireEvent.keyDown(close, { key: "Tab", shiftKey: true });
  expect(cta).toHaveFocus();
});

it("moves focus from a maximised service to the project discussion heading", async () => {
  const scroll = vi.fn();
  render(
    <>
      <Services />
      <section id="discuss">
        <h2 id="discuss-title">Discuss a project</h2>
      </section>
    </>,
  );
  document.getElementById("discuss")!.scrollIntoView = scroll;
  fireEvent.click(screen.getByRole("button", { name: /^Expand Business/ }));
  fireEvent.click(screen.getByRole("button", { name: /^S08/ }));
  fireEvent.click(screen.getByRole("button", { name: /^Maximise Business/ }));
  fireEvent.click(
    within(screen.getByRole("dialog")).getByRole("link", { name: "Discuss this service" }),
  );
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  await waitFor(() =>
    expect(screen.getByRole("heading", { name: "Discuss a project" })).toHaveFocus(),
  );
  expect(scroll).toHaveBeenCalledWith({ block: "start" });
});
