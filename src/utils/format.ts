const LOCALE = "en-US";

// Some ICU versions use a narrow no-break space before AM/PM; normalise it.
const normaliseSpaces = (value: string) => value.replace(/[  ]/g, " ");

/** e.g. 1800 → "30 min", 3600 → "1 hr", 5400 → "1 hr 30 min". */
export const formatDuration = (seconds: number): string => {
  const totalMinutes = Math.max(0, Math.round(seconds / 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }
  return minutes === 0 ? `${hours} hr` : `${hours} hr ${minutes} min`;
};

/** e.g. "Monday, May 5". */
export const formatAppointmentDate = (iso: string): string =>
  normaliseSpaces(
    new Date(iso).toLocaleDateString(LOCALE, {
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
  );

/** e.g. "8:00 AM". */
export const formatAppointmentTime = (iso: string): string =>
  normaliseSpaces(
    new Date(iso).toLocaleTimeString(LOCALE, {
      hour: "numeric",
      minute: "2-digit",
    }),
  );

/** e.g. "Monday, May 5 at 8:00 AM". */
export const formatAppointmentDateTime = (iso: string): string =>
  `${formatAppointmentDate(iso)} at ${formatAppointmentTime(iso)}`;
