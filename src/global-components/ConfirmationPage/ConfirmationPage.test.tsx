import { confirmationPageCopy } from "@copy/confirmationPage";
import { fireEvent, render, screen } from "@testing-library/react-native";
import type { BookingConfirmation } from "@utils/types";
import ConfirmationPage from "./ConfirmationPage";

const confirmation: BookingConfirmation = {
  id: "972836c4-a389-4b23-9709-78cf33c246ed",
  serviceName: "Synthetic Oil Change",
  start: "2026-10-26T08:30:00.000Z",
  duration: 1800,
  booked: true,
  email: "JohnDoe123@example.com",
  customerName: "John Doe",
  modelYear: 2005,
  make: "Mazda",
  model: "Miata",
};

describe("ConfirmationPage", () => {
  it("shows the details returned by the API", () => {
    render(<ConfirmationPage confirmation={confirmation} onBookAnother={jest.fn()} onDone={jest.fn()} />);

    expect(screen.getByRole("header", { name: confirmationPageCopy.heading })).toBeOnTheScreen();
    expect(screen.getByLabelText("Service: Synthetic Oil Change")).toBeOnTheScreen();
    expect(screen.getByLabelText("Date: Monday, October 26")).toBeOnTheScreen();
    expect(screen.getByLabelText("Time: 8:30 AM")).toBeOnTheScreen();
    expect(screen.getByLabelText("Duration: 30 min")).toBeOnTheScreen();
    expect(screen.getByLabelText("Name: John Doe")).toBeOnTheScreen();
    expect(screen.getByLabelText("Email: JohnDoe123@example.com")).toBeOnTheScreen();
    expect(screen.getByLabelText("Vehicle: 2005 Mazda Miata")).toBeOnTheScreen();
    expect(screen.getByLabelText(`Confirmation #: ${confirmation.id}`)).toBeOnTheScreen();
  });

  it("offers ways to finish or book again", () => {
    const onDone = jest.fn();
    const onBookAnother = jest.fn();
    render(<ConfirmationPage confirmation={confirmation} onBookAnother={onBookAnother} onDone={onDone} />);

    fireEvent.press(screen.getByRole("button", { name: confirmationPageCopy.done }));
    fireEvent.press(screen.getByRole("button", { name: confirmationPageCopy.bookAnother }));
    expect(onDone).toHaveBeenCalledTimes(1);
    expect(onBookAnother).toHaveBeenCalledTimes(1);
  });

  it("never claims success without booking details", () => {
    render(<ConfirmationPage confirmation={null} onBookAnother={jest.fn()} onDone={jest.fn()} />);
    expect(screen.queryByText(confirmationPageCopy.heading)).toBeNull();
    expect(screen.getByText(confirmationPageCopy.missingTitle)).toBeOnTheScreen();
  });
});
