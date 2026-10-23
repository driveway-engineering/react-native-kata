import { apiRequest } from "./apiClient";
import type { Appointment, BookingConfirmation, BookingRequest } from "./types";

/** Unbooked slots for a service. The API intentionally fails ~20% of these requests. */
export const getServiceAppointments = (serviceId: number, signal?: AbortSignal) =>
  apiRequest<Appointment[]>(`/appointments/${serviceId}`, { signal });

export const bookAppointment = (appointmentId: string, booking: BookingRequest) =>
  apiRequest<BookingConfirmation>(`/appointments/book/${encodeURIComponent(appointmentId)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
