import { useEffect, useRef, useState, type FormEvent } from "react";
import { serviceCategories } from "@/content/landing";
import {
  emptyEnquiry,
  ENQUIRY_FORM_NAME,
  type EnquiryContext,
  type EnquiryErrors,
  type EnquiryValues,
  validateEnquiry,
} from "@/content/enquiry";
import { Button } from "@/components/ui/button";

type Status = "idle" | "pending" | "error" | "success";
const labels: Record<keyof EnquiryValues, string> = {
  full_name: "Full name",
  email: "Work email",
  organisation: "Organisation or business name",
  description: "Business challenge / project description",
  support_area: "Area of support",
  phone: "Phone / WhatsApp",
  contact_preference: "Preferred contact method",
  privacy_acknowledged: "Privacy acknowledgement",
};

export function EnquiryForm({ context = {} }: { context?: EnquiryContext }) {
  const [values, setValues] = useState<EnquiryValues>({ ...emptyEnquiry });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [simulateFailure, setSimulateFailure] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  const receipt = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const submitting = useRef(false);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (Object.keys(errors).length || status === "error") summary.current?.focus();
    if (status === "success") receipt.current?.focus();
  }, [errors, status]);
  function update<K extends keyof EnquiryValues>(key: K, value: EnquiryValues[K]) {
    setValues((previous) => ({ ...previous, [key]: value }));
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const next = validateEnquiry(values);
    // This build deliberately has no live transport. Use reserved synthetic addresses in tests.
    if (!next.email && !values.email.trim().toLowerCase().endsWith("@example.test"))
      next.email = "For this internal test, use an address ending in @example.test.";
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("idle");
      return;
    }
    submitting.current = true;
    setStatus("pending");
    const failed = simulateFailure || Boolean(new FormData(event.currentTarget).get("bot-field"));
    timer.current = setTimeout(() => {
      submitting.current = false;
      setStatus(failed ? "error" : "success");
    }, 350);
  }
  const inputClass =
    "mt-2 min-h-12 min-w-0 w-full rounded-xl border border-evergreen/40 bg-paper px-3 py-2 text-evergreen";
  const attrs = (key: keyof EnquiryValues) => ({
    id: `enquiry-${key}`,
    name: key,
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `error-${key}` : undefined,
  });
  const error = (key: keyof EnquiryValues) =>
    errors[key] ? (
      <p id={`error-${key}`} className="mt-1 text-sm font-semibold text-evergreen">
        {errors[key]}
      </p>
    ) : null;
  return (
    <div className="on-light mt-10 rounded-3xl bg-paper p-5 text-evergreen sm:p-8">
      <p
        id="enquiry-demo"
        className="rounded-xl border border-evergreen/30 bg-sage-soft p-4 text-sm"
      >
        <strong>JS BusinessSuite — internal form test.</strong> Use synthetic details only,
        including an @example.test email. Nothing is sent or stored. Live enquiries are not enabled.
      </p>
      {status === "success" ? (
        <div
          ref={receipt}
          tabIndex={-1}
          role="status"
          className="mt-6 rounded-xl border border-evergreen/30 p-5"
        >
          <h3 className="text-2xl">Test complete — no enquiry sent</h3>
          <p className="mt-3">
            This is a simulated confirmation. No submission reference, lead, notification or
            appointment was created.
          </p>
          <Button
            type="button"
            variant="hero"
            size="xl"
            className="mt-4"
            onClick={() => {
              setStatus("idle");
              setTimeout(() => document.getElementById("enquiry-full_name")?.focus(), 0);
            }}
          >
            Edit test details
          </Button>
        </div>
      ) : (
        <form
          name={ENQUIRY_FORM_NAME}
          noValidate
          onSubmit={submit}
          aria-label="Discuss Your Project — internal test"
          aria-describedby="enquiry-demo"
          aria-busy={status === "pending"}
        >
          <input type="hidden" name="form-name" value={ENQUIRY_FORM_NAME} />
          <input type="hidden" name="buyer_segment" value={context.segment ?? ""} />
          <input type="hidden" name="buyer_problem" value={context.problem ?? ""} />
          <input
            type="hidden"
            name="service_interest"
            value={context.serviceIds?.join(", ") ?? ""}
          />
          <div hidden aria-hidden="true">
            <label>
              Leave this blank
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          {(context.segment || context.problem || context.serviceIds?.length) && (
            <aside
              aria-label="Selected enquiry context"
              className="mt-5 rounded-xl bg-sage-soft p-4 text-sm"
            >
              <strong>Selected context</strong>
              {context.segment && <p>{context.segment}</p>}
              {context.problem && <p>{context.problem}</p>}
              {context.serviceIds?.length ? (
                <p>Service interest: {context.serviceIds.join(", ")}</p>
              ) : null}
            </aside>
          )}
          {(Object.keys(errors).length > 0 || status === "error") && (
            <div
              ref={summary}
              tabIndex={-1}
              role="alert"
              className="mt-5 rounded-xl border-2 border-evergreen p-4"
            >
              <h3 className="text-lg font-semibold">
                {status === "error"
                  ? "Simulated failure — no enquiry sent"
                  : "Check your test details"}
              </h3>
              {status === "error" && (
                <p className="mt-2">
                  Your entries are still here. Turn off “Simulate a submission failure” and try the
                  test again.
                </p>
              )}
              <ul className="mt-2 space-y-1">
                {(Object.keys(errors) as (keyof EnquiryValues)[]).map((key) => (
                  <li key={key}>
                    <a
                      className="underline"
                      href={`#enquiry-${key}`}
                      onClick={() => document.getElementById(`enquiry-${key}`)?.focus()}
                    >
                      {labels[key]}: {errors[key]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <fieldset disabled={status === "pending"} className="mt-6 min-w-0 space-y-5">
            <legend className="mb-4 text-sm">
              Fields marked * are required. Organisation can be your trading name.
            </legend>
            <div className="grid gap-5 sm:grid-cols-2">
              {(["full_name", "email", "organisation"] as const).map((key) => (
                <div key={key}>
                  <label className="font-medium" htmlFor={`enquiry-${key}`}>
                    {labels[key]} *
                  </label>
                  <input
                    {...attrs(key)}
                    required
                    type={key === "email" ? "email" : "text"}
                    autoComplete={
                      key === "full_name" ? "name" : key === "email" ? "email" : "organization"
                    }
                    maxLength={key === "email" ? 254 : 160}
                    placeholder={key === "email" ? "prospect@example.test" : undefined}
                    value={values[key]}
                    onChange={(e) => update(key, e.target.value)}
                    className={inputClass}
                  />
                  {error(key)}
                </div>
              ))}
              <div>
                <label className="font-medium" htmlFor="enquiry-support_area">
                  Area of support <span className="text-sm">(optional)</span>
                </label>
                <select
                  {...attrs("support_area")}
                  value={values.support_area}
                  onChange={(e) => update("support_area", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Choose an area</option>
                  {[...serviceCategories.map((c) => c.title), "Not sure yet"].map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                {error("support_area")}
              </div>
            </div>
            <div>
              <label className="font-medium" htmlFor="enquiry-description">
                Business challenge / project description *
              </label>
              <p id="challenge-help" className="text-sm">
                Keep it concise. Do not include confidential records, passwords or sensitive
                personal information.
              </p>
              <textarea
                {...attrs("description")}
                aria-describedby={
                  errors.description ? "challenge-help error-description" : "challenge-help"
                }
                required
                rows={4}
                maxLength={3000}
                value={values.description}
                onChange={(e) => update("description", e.target.value)}
                className={inputClass}
              />
              {error("description")}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="font-medium" htmlFor="enquiry-phone">
                  Phone / WhatsApp <span className="text-sm">(optional)</span>
                </label>
                <input
                  {...attrs("phone")}
                  type="tel"
                  autoComplete="tel"
                  maxLength={30}
                  value={values.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={inputClass}
                />
                {error("phone")}
              </div>
              <div>
                <label className="font-medium" htmlFor="enquiry-contact_preference">
                  Preferred contact method <span className="text-sm">(optional)</span>
                </label>
                <select
                  {...attrs("contact_preference")}
                  value={values.contact_preference}
                  onChange={(e) => update("contact_preference", e.target.value)}
                  className={inputClass}
                >
                  <option value="">No preference selected</option>
                  {["Email", "WhatsApp", "Either"].map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                {error("contact_preference")}
              </div>
            </div>
            <div className="rounded-xl bg-sage-soft p-4">
              <h3 className="text-lg font-semibold">Privacy notice — draft for internal review</h3>
              <p className="mt-2 text-sm">
                The intended purpose is to review project enquiries and discuss relevant next steps.
                The final Privacy Notice, responsible contact and retention arrangements are not yet
                available. No live information is collected in this test.
              </p>
              <label className="mt-3 flex min-h-11 cursor-pointer items-start gap-3 py-2">
                <input
                  {...attrs("privacy_acknowledged")}
                  type="checkbox"
                  required
                  checked={values.privacy_acknowledged}
                  onChange={(e) => update("privacy_acknowledged", e.target.checked)}
                  className="mt-1 size-5 shrink-0 accent-evergreen"
                />
                <span>I have read the draft notice for this internal test. *</span>
              </label>
              {error("privacy_acknowledged")}
            </div>
            <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={simulateFailure}
                onChange={(e) => setSimulateFailure(e.target.checked)}
                className="size-5 accent-evergreen"
              />
              Simulate a submission failure
            </label>
            <Button
              type="submit"
              variant="hero"
              size="xl"
              className="w-full whitespace-normal sm:w-auto"
            >
              {status === "pending" ? "Running test…" : "Test enquiry form"}
            </Button>
          </fieldset>
          <p role="status" className="mt-3 text-sm">
            {status === "pending"
              ? "Simulating only — no network request."
              : "Live submission is disabled. No response time or engagement is promised."}
          </p>
        </form>
      )}
    </div>
  );
}
