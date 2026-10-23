import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import Screen from "./Screen";

describe("Screen", () => {
  it("renders its content", () => {
    render(
      <Screen testID="screen">
        <Text>Content</Text>
      </Screen>,
    );
    expect(screen.getByTestId("screen")).toBeOnTheScreen();
    expect(screen.getByText("Content")).toBeOnTheScreen();
  });
});
