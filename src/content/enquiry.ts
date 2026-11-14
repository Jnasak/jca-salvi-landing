import { serviceCategories } from "./landing";

export const ENQUIRY_FORM_NAME = "js-businesssuite-enquiry";
export const enquiryFields = [
  "full_name",
  "email",
  "organisation",
  "description",
  "support_area",
  "phone",
  "contact_preference",
  "privacy_acknowledged",
  "buyer_segment",
  "buyer_problem",
  "service_interest",
  "bot-field",
] as const;
export type EnquiryValues = {
  full_name: string;
  email: string;
  organisation: string;
  description: string;
  support_area: string;
  phone: string;
  contact_preference: string;
  privacy_acknowledged: boolean;
};
export type EnquiryContext = { segment?: string; problem?: string; serviceIds?: string[] };
export const emptyEnquiry: EnquiryValues = {
  full_name: "",
  email: "",
  organisation: "",
  description: "",
  support_area: "",
  phone: "",
  contact_preference: "",
  privacy_acknowledged: false,
};
export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;
export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!values.full_name.trim()) errors.full_name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Enter a valid work email address.";
  if (!values.organisation.trim()) errors.organisation = "Enter your organisation or trading name.";
  if (!values.description.trim())
    errors.description = "Describe your business challenge or project.";
  if (
    values.support_area &&
    ![...serviceCategories.map((c) => c.title), "Not sure yet"].includes(values.support_area)
  )
    errors.support_area = "Choose one of the listed support areas.";
  if (
    values.contact_preference &&
    !["Email", "WhatsApp", "Either"].includes(values.contact_preference)
  )
    errors.contact_preference = "Choose one of the listed contact methods.";
  if (
    values.phone.trim() &&
    (!/^\+?[\d\s().-]+$/.test(values.phone.trim()) ||
      values.phone.replace(/\D/g, "").length < 7 ||
      values.phone.replace(/\D/g, "").length > 20)
  )
    errors.phone = "Enter a phone number using digits and ordinary separators, or leave it blank.";
  if (!values.privacy_acknowledged)
    errors.privacy_acknowledged = "Acknowledge the draft notice for this internal test.";
  return errors;
}
/** Prepared encoding only; no transport or live activation. */
export function encodeEnquiry(values: EnquiryValues, context: EnquiryContext, honeypot = "") {
  return new URLSearchParams({
    "form-name": ENQUIRY_FORM_NAME,
    full_name: values.full_name.trim(),
    email: values.email.trim(),
    organisation: values.organisation.trim(),
    description: values.description.trim(),
    support_area: values.support_area,
    phone: values.phone.trim(),
    contact_preference: values.contact_preference,
    privacy_acknowledged: String(values.privacy_acknowledged),
    buyer_segment: context.segment ?? "",
    buyer_problem: context.problem ?? "",
    service_interest: context.serviceIds?.join(", ") ?? "",
    "bot-field": honeypot,
  }).toString();
}
