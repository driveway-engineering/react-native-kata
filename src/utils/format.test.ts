import {
  formatAppointmentDate,
  formatAppointmentDateTime,
  formatAppointmentTime,
  formatDuration,
} from "./format";

describe("formatDuration", () => {
  it.each([
    [1800, "30 min"],
    [3600, "1 hr"],
    [5400, "1 hr 30 min"],
    [7200, "2 hr"],
    [0, "0 min"],
  ])("formats %i seconds as %s", (seconds, expected) => {
    expect(formatDuration(seconds)).toBe(expected);
  });
});

describe("appointment date formatting", () => {
  const iso = "2026-05-05T08:00:00.000Z";

  it("formats date, time and both together", () => {
    expect(formatAppointmentDate(iso)).toBe("Tuesday, May 5");
    expect(formatAppointmentTime(iso)).toBe("8:00 AM");
    expect(formatAppointmentDateTime(iso)).toBe("Tuesday, May 5 at 8:00 AM");
  });
});
