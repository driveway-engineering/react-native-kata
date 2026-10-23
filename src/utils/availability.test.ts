import { getUpcomingSlots } from "./availability";
import type { Appointment } from "./types";

const now = new Date("2026-10-23T12:00:00.000Z");

const slot = (id: string, start: string, booked = false): Appointment => ({
  id,
  serviceId: 1,
  serviceName: "Synthetic Oil Change",
  start,
  duration: 1800,
  booked,
});

describe("getUpcomingSlots", () => {
  it("removes past, booked and out-of-window slots", () => {
    const result = getUpcomingSlots(
      [
        slot("past", "2026-10-23T11:59:00.000Z"),
        slot("booked", "2026-10-24T09:00:00.000Z", true),
        slot("too-far", "2026-11-06T12:00:01.000Z"),
        slot("invalid", "not a date"),
        slot("ok", "2026-10-24T09:00:00.000Z"),
        slot("edge", "2026-11-06T12:00:00.000Z"),
      ],
      now,
    );
    expect(result.map((appointment) => appointment.id)).toEqual(["ok", "edge"]);
  });

  it("sorts slots by start time because the API does not", () => {
    const result = getUpcomingSlots(
      [
        slot("c", "2026-10-30T09:00:00.000Z"),
        slot("a", "2026-10-24T09:00:00.000Z"),
        slot("b", "2026-10-24T15:00:00.000Z"),
      ],
      now,
    );
    expect(result.map((appointment) => appointment.id)).toEqual(["a", "b", "c"]);
  });

  it("returns an empty list when nothing is bookable", () => {
    expect(getUpcomingSlots([], now)).toEqual([]);
  });
});
