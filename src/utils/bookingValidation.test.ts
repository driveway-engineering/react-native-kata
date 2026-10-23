import { bookingPageCopy } from "@copy/bookingPage";
import {
  emptyBookingForm,
  hasErrors,
  toBookingRequest,
  validateBookingForm,
  type BookingFormValues,
} from "./bookingValidation";

const now = new Date("2026-10-23T12:00:00.000Z");
const valid: BookingFormValues = {
  customerName: "Jane Doe",
  email: "jane@example.com",
  modelYear: "2020",
  make: "Mazda",
  model: "Miata",
};
const { errors } = bookingPageCopy;

describe("validateBookingForm", () => {
  it("accepts a complete form", () => {
    expect(hasErrors(validateBookingForm(valid, now))).toBe(false);
  });

  it("requires every field, ignoring whitespace", () => {
    const result = validateBookingForm({ ...emptyBookingForm, customerName: "   " }, now);
    expect(result).toEqual({
      customerName: errors.customerNameRequired,
      email: errors.emailRequired,
      modelYear: errors.modelYearRequired,
      make: errors.makeRequired,
      model: errors.modelRequired,
    });
  });

  it.each(["jane", "jane@", "jane@example", "jane doe@example.com"])(
    "rejects the email %s",
    (email) => {
      expect(validateBookingForm({ ...valid, email }, now).email).toBe(errors.emailInvalid);
    },
  );

  it.each(["1899", "2028", "20", "abcd"])("rejects the model year %s", (modelYear) => {
    expect(validateBookingForm({ ...valid, modelYear }, now).modelYear).toBe(
      errors.modelYearInvalid(1900, 2027),
    );
  });

  it("allows next year's models", () => {
    expect(validateBookingForm({ ...valid, modelYear: "2027" }, now).modelYear).toBeUndefined();
  });
});

describe("toBookingRequest", () => {
  it("trims text and converts the year to a number", () => {
    expect(
      toBookingRequest({ ...valid, customerName: " Jane Doe ", email: " jane@example.com " }),
    ).toEqual({
      customerName: "Jane Doe",
      email: "jane@example.com",
      modelYear: 2020,
      make: "Mazda",
      model: "Miata",
    });
  });
});
