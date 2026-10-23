import { fireEvent, render, screen } from "@testing-library/react-native";
import InlineNotice from "./InlineNotice";

describe("InlineNotice", () => {
  it("renders an alert with an optional action", () => {
    const onAction = jest.fn();
    render(
      <InlineNotice
        actionLabel="Try again"
        message="Booking failed"
        onAction={onAction}
        title="Error"
      />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("ErrorBooking failed");
    fireEvent.press(screen.getByRole("button", { name: "Try again" }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
