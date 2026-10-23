import type { BookingRequest } from "@utils/types";
import { bookingPageCopy } from "@copy/bookingPage";

export type BookingFormValues = {
  customerName: string;
  email: string;
  modelYear: string;
  make: string;
  model: string;
};

export type BookingFormField = keyof BookingFormValues;

export type BookingFormErrors = Partial<Record<BookingFormField, string>>;

export const emptyBookingForm: BookingFormValues = {
  customerName: "",
  email: "",
  modelYear: "",
  make: "",
  model: "",
};

export const MIN_MODEL_YEAR = 1900;

// Intentionally simple: catches typos without rejecting unusual valid addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const { errors: messages } = bookingPageCopy;

export const validateBookingForm = (
  values: BookingFormValues,
  now: Date = new Date(),
): BookingFormErrors => {
  const errors: BookingFormErrors = {};
  const maxYear = now.getFullYear() + 1;

  if (!values.customerName.trim()) {
    errors.customerName = messages.customerNameRequired;
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = messages.emailRequired;
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = messages.emailInvalid;
  }

  const modelYear = values.modelYear.trim();
  if (!modelYear) {
    errors.modelYear = messages.modelYearRequired;
  } else if (
    !/^\d{4}$/.test(modelYear) ||
    Number(modelYear) < MIN_MODEL_YEAR ||
    Number(modelYear) > maxYear
  ) {
    errors.modelYear = messages.modelYearInvalid(MIN_MODEL_YEAR, maxYear);
  }

  if (!values.make.trim()) {
    errors.make = messages.makeRequired;
  }
  if (!values.model.trim()) {
    errors.model = messages.modelRequired;
  }

  return errors;
};

export const hasErrors = (errors: BookingFormErrors) => Object.keys(errors).length > 0;

export const toBookingRequest = (values: BookingFormValues): BookingRequest => ({
  customerName: values.customerName.trim(),
  email: values.email.trim(),
  modelYear: Number(values.modelYear.trim()),
  make: values.make.trim(),
  model: values.model.trim(),
});
