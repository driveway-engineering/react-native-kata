import { fireEvent, render, screen } from "@testing-library/react-native";
import TextField from "./TextField";

describe("TextField", () => {
  it("is labelled and reports text changes", () => {
    const onChangeText = jest.fn();
    render(<TextField label="Email" onChangeText={onChangeText} value="" />);
    fireEvent.changeText(screen.getByLabelText("Email"), "jane@example.com");
    expect(onChangeText).toHaveBeenCalledWith("jane@example.com");
  });

  it("shows the error message and announces it with the field", () => {
    render(<TextField error="Enter your email address." label="Email" value="" />);
    expect(screen.getByText("Enter your email address.")).toBeOnTheScreen();
    expect(screen.getByLabelText("Email")).toHaveProp(
      "accessibilityHint",
      "Enter your email address.",
    );
  });
});
