import { fireEvent, render, screen } from "@testing-library/react-native";
import Button from "./Button";

describe("Button", () => {
  it("calls onPress with an accessible label", () => {
    const onPress = jest.fn();
    render(<Button onPress={onPress}>Continue</Button>);
    fireEvent.press(screen.getByRole("button", { name: "Continue" }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    render(
      <Button disabled onPress={onPress}>
        Continue
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Continue" });
    expect(button).toBeDisabled();
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("is busy and blocks presses while loading", () => {
    const onPress = jest.fn();
    render(
      <Button loading onPress={onPress}>
        Submit
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeBusy();
    expect(button).toBeDisabled();
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });
});
