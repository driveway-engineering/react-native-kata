import type { BookingRequest } from "@utils/types";
import {
  emptyBookingForm,
  hasErrors,
  toBookingRequest,
  validateBookingForm,
  type BookingFormErrors,
  type BookingFormField,
  type BookingFormValues,
} from "@utils/bookingValidation";
import { useCallback, useState } from "react";

export const useBookingForm = (initialValues: BookingFormValues = emptyBookingForm) => {
  const [values, setValues] = useState(initialValues);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Errors stay hidden until the first submit, then update live as the user types.
  const errors: BookingFormErrors = hasSubmitted ? validateBookingForm(values) : {};

  const setValue = useCallback((field: BookingFormField, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
  }, []);

  /** Shows any errors and returns the request payload when the form is valid. */
  const submit = (): BookingRequest | null => {
    setHasSubmitted(true);
    return hasErrors(validateBookingForm(values)) ? null : toBookingRequest(values);
  };

  return { values, errors, setValue, submit };
};
