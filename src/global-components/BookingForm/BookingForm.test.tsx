import { bookingPageCopy } from "@copy/bookingPage";
import { fireEvent, render, screen } from "@testing-library/react-native";
import BookingForm from "./BookingForm";

const { labels, errors } = bookingPageCopy;

const fillForm = (overrides: Partial<Record<keyof typeof labels, string>> = {}) => {
  const values = {
    customerName: "  Jane Doe ",
    email: "jane@example.com",
    modelYear: "2020",
    make: "Mazda",
    model: "Miata",
    ...overrides,
  };
  (Object.keys(values) as (keyof typeof labels)[]).forEach((field) => {
    fireEvent.changeText(screen.getByLabelText(labels[field]), values[field]);
  });
};

describe("BookingForm", () => {
  it("does not submit and explains every missing field", () => {
    const onSubmit = jest.fn();
    render(<BookingForm onSubmit={onSubmit} />);

    expect(screen.queryByText(errors.customerNameRequired)).toBeNull();
    fireEvent.press(screen.getByRole("button", { name: bookingPageCopy.submit }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(errors.customerNameRequired)).toBeOnTheScreen();
    expect(screen.getByText(errors.emailRequired)).toBeOnTheScreen();
    expect(screen.getByText(errors.modelYearRequired)).toBeOnTheScreen();
    expect(screen.getByText(errors.makeRequired)).toBeOnTheScreen();
    expect(screen.getByText(errors.modelRequired)).toBeOnTheScreen();
  });

  it("clears errors as the user corrects fields after a failed submit", () => {
    render(<BookingForm onSubmit={jest.fn()} />);
    fireEvent.press(screen.getByRole("button", { name: bookingPageCopy.submit }));
    expect(screen.getByText(errors.makeRequired)).toBeOnTheScreen();

    fireEvent.changeText(screen.getByLabelText(labels.make), "Mazda");
    expect(screen.queryByText(errors.makeRequired)).toBeNull();
  });

  it("rejects an invalid email address", () => {
    const onSubmit = jest.fn();
    render(<BookingForm onSubmit={onSubmit} />);
    fillForm({ email: "jane@example" });
    fireEvent.press(screen.getByRole("button", { name: bookingPageCopy.submit }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(errors.emailInvalid)).toBeOnTheScreen();
  });

  it("keeps only digits in the year field", () => {
    render(<BookingForm onSubmit={jest.fn()} />);
    fireEvent.changeText(screen.getByLabelText(labels.modelYear), "20a2");
    expect(screen.getByLabelText(labels.modelYear)).toHaveDisplayValue("202");
  });

  it("submits a trimmed booking with a numeric year", () => {
    const onSubmit = jest.fn();
    render(<BookingForm onSubmit={onSubmit} />);
    fillForm();
    fireEvent.press(screen.getByRole("button", { name: bookingPageCopy.submit }));

    expect(onSubmit).toHaveBeenCalledWith({
      customerName: "Jane Doe",
      email: "jane@example.com",
      modelYear: 2020,
      make: "Mazda",
      model: "Miata",
    });
  });

  it("blocks duplicate submissions while a booking is in flight", () => {
    const onSubmit = jest.fn();
    render(<BookingForm isSubmitting onSubmit={onSubmit} />);
    const button = screen.getByRole("button", { name: bookingPageCopy.submit });
    expect(button).toBeDisabled();
    expect(button).toBeBusy();
  });
});
