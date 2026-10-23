import { fireEvent, render, screen } from "@testing-library/react-native";
import ScreenHeader from "./ScreenHeader";

describe("ScreenHeader", () => {
  it("shows the title as a heading", () => {
    render(<ScreenHeader subtitle="Pick one" title="Select a Service" />);
    expect(screen.getByRole("header", { name: "Select a Service" })).toBeOnTheScreen();
    expect(screen.getByText("Pick one")).toBeOnTheScreen();
  });

  it("only renders a back button when onBack is provided", () => {
    const { rerender } = render(<ScreenHeader title="Title" />);
    expect(screen.queryByRole("button", { name: "Go back" })).toBeNull();

    const onBack = jest.fn();
    rerender(<ScreenHeader onBack={onBack} title="Title" />);
    fireEvent.press(screen.getByRole("button", { name: "Go back" }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
