import { render, screen } from "@testing-library/react-native";
import { landingPageCopy } from "@copy/landingPage";
import LandingPage from "./LandingPage";

jest.mock(
  "react-native-safe-area-context",
  () => jest.requireActual("react-native-safe-area-context/jest/mock").default,
);

describe("LandingPage", () => {
  it("displays the heading without API configuration", () => {
    const original = process.env.EXPO_PUBLIC_API_URL;
    delete process.env.EXPO_PUBLIC_API_URL;
    try {
      render(<LandingPage />);
      expect(screen.getByRole("header", { name: landingPageCopy.heading })).toBeOnTheScreen();
    } finally {
      if (original === undefined) {
        delete process.env.EXPO_PUBLIC_API_URL;
      } else {
        process.env.EXPO_PUBLIC_API_URL = original;
      }
    }
  });
});
