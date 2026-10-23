import type { Appointment } from "@utils/types";

export const AVAILABILITY_WINDOW_DAYS = 14;
const AVAILABILITY_WINDOW_MS = AVAILABILITY_WINDOW_DAYS * 24 * 60 * 60 * 1000;

/**
 * Unbooked slots that start after `now` and within the availability window,
 * sorted by start time. The mock API neither removes past slots nor sorts.
 */
export const getUpcomingSlots = (
  appointments: Appointment[],
  now: Date = new Date(),
): Appointment[] => {
  const nowMs = now.getTime();
  const windowEndMs = nowMs + AVAILABILITY_WINDOW_MS;

  return appointments
    .filter((appointment) => {
      const startMs = Date.parse(appointment.start);
      return (
        !appointment.booked &&
        Number.isFinite(startMs) &&
        startMs > nowMs &&
        startMs <= windowEndMs
      );
    })
    .sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
};
