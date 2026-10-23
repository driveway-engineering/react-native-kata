import { fireEvent, render, screen } from "@testing-library/react-native";
import { Linking } from "react-native";
import TextLink from "./TextLink";

describe("TextLink", () => {
  it("opens its URL when pressed", () => {
    const openURL = jest.spyOn(Linking, "openURL").mockResolvedValue(true);
    render(<TextLink href="tel:5558723289">555-872-3289</TextLink>);
    fireEvent.press(screen.getByRole("link", { name: "555-872-3289" }));
    expect(openURL).toHaveBeenCalledWith("tel:5558723289");
    openURL.mockRestore();
  });
});
