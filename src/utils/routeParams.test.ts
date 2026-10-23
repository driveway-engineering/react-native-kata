import {
  confirmationToParams,
  parseConfirmation,
  parseSelectedAppointment,
  selectedAppointmentToParams,
} from "./routeParams";
import type { BookingConfirmation } from "./types";

describe("selected appointment params", () => {
  const appointment = {
    id: "abc",
    serviceName: "Brake Inspection",
    start: "2026-10-24T09:00:00.000Z",
    duration: 1800,
  };

  it("round-trips through string params", () => {
    expect(parseSelectedAppointment(selectedAppointmentToParams(appointment))).toEqual(appointment);
  });

  it("returns null when params are missing or malformed", () => {
    expect(parseSelectedAppointment({})).toBeNull();
    expect(
      parseSelectedAppointment({ ...selectedAppointmentToParams(appointment), duration: "soon" }),
    ).toBeNull();
  });

  it("uses the first value of repeated params", () => {
    const params = { ...selectedAppointmentToParams(appointment), appointmentId: ["abc", "def"] };
    expect(parseSelectedAppointment(params)?.id).toBe("abc");
  });
});

describe("confirmation params", () => {
  const confirmation: BookingConfirmation = {
    id: "abc",
    serviceName: "Brake Inspection",
    start: "2026-10-24T09:00:00.000Z",
    duration: 1800,
    booked: true,
    email: "jane@example.com",
    customerName: "Jane Doe",
    modelYear: 2020,
    make: "Mazda",
    model: "Miata",
  };

  it("round-trips the API response", () => {
    expect(parseConfirmation(confirmationToParams(confirmation))).toEqual({
      ...confirmation,
      modelYear: "2020",
    });
  });

  it("returns null when any detail is missing", () => {
    const { email: _email, ...rest } = confirmationToParams(confirmation);
    expect(parseConfirmation(rest)).toBeNull();
  });
});
