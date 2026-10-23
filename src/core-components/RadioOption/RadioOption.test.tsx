import { fireEvent, render, screen } from "@testing-library/react-native";
import RadioOption from "./RadioOption";

describe("RadioOption", () => {
  it("exposes its checked state", () => {
    const { rerender } = render(<RadioOption label="9:00 AM" onSelect={jest.fn()} selected={false} />);
    expect(screen.getByRole("radio", { name: "9:00 AM" })).not.toBeChecked();

    rerender(<RadioOption label="9:00 AM" onSelect={jest.fn()} selected />);
    expect(screen.getByRole("radio", { name: "9:00 AM" })).toBeChecked();
  });

  it("calls onSelect when pressed", () => {
    const onSelect = jest.fn();
    render(<RadioOption label="9:00 AM" onSelect={onSelect} selected={false} />);
    fireEvent.press(screen.getByRole("radio", { name: "9:00 AM" }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
