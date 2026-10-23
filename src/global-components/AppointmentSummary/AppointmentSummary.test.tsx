import { render, screen } from "@testing-library/react-native";
import AppointmentSummary from "./AppointmentSummary";

describe("AppointmentSummary", () => {
  it("formats the appointment for display", () => {
    render(
      <AppointmentSummary
        duration={5400}
        serviceName="Express Auto Detailing"
        start="2026-10-26T15:00:00.000Z"
      />,
    );
    expect(screen.getByLabelText("Service: Express Auto Detailing")).toBeOnTheScreen();
    expect(screen.getByLabelText("Date: Monday, October 26")).toBeOnTheScreen();
    expect(screen.getByLabelText("Time: 3:00 PM")).toBeOnTheScreen();
    expect(screen.getByLabelText("Duration: 1 hr 30 min")).toBeOnTheScreen();
  });
});
