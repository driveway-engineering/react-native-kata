import type { Appointment, BookingConfirmation } from "@utils/types";

type RawParams = Record<string, string | string[] | undefined>;

export type SelectedAppointment = Pick<Appointment, "id" | "serviceName" | "start" | "duration">;

const getParam = (params: RawParams, key: string): string | undefined => {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
};

const getRequiredParams = <K extends string>(params: RawParams, keys: readonly K[]) => {
  const result = {} as Record<K, string>;
  for (const key of keys) {
    const value = getParam(params, key);
    if (!value) {
      return null;
    }
    result[key] = value;
  }
  return result;
};

const toDuration = (value: string) => {
  const duration = Number(value);
  return Number.isFinite(duration) ? duration : null;
};

// Route params are strings; these helpers convert between them and API types
// so screens can be deep-linked and survive reloads without global state.

export const selectedAppointmentToParams = (appointment: SelectedAppointment) => ({
  appointmentId: appointment.id,
  serviceName: appointment.serviceName,
  start: appointment.start,
  duration: String(appointment.duration),
});

export const parseSelectedAppointment = (params: RawParams): SelectedAppointment | null => {
  const values = getRequiredParams(params, ["appointmentId", "serviceName", "start", "duration"]);
  const duration = values && toDuration(values.duration);
  if (!values || duration === null) {
    return null;
  }
  return {
    id: values.appointmentId,
    serviceName: values.serviceName,
    start: values.start,
    duration,
  };
};

export const confirmationToParams = (confirmation: BookingConfirmation) => ({
  id: confirmation.id,
  serviceName: confirmation.serviceName,
  start: confirmation.start,
  duration: String(confirmation.duration),
  email: confirmation.email,
  customerName: confirmation.customerName,
  modelYear: String(confirmation.modelYear),
  make: confirmation.make,
  model: confirmation.model,
});

export const parseConfirmation = (params: RawParams): BookingConfirmation | null => {
  const values = getRequiredParams(params, [
    "id",
    "serviceName",
    "start",
    "duration",
    "email",
    "customerName",
    "modelYear",
    "make",
    "model",
  ]);
  const duration = values && toDuration(values.duration);
  if (!values || duration === null) {
    return null;
  }
  return { ...values, duration, booked: true };
};
