import { render, screen } from "@testing-library/react-native";
import LoadingState from "./LoadingState";

describe("LoadingState", () => {
  it("announces what is loading", () => {
    render(<LoadingState message="Loading services…" />);
    expect(screen.getByRole("progressbar", { name: "Loading services…" })).toBeOnTheScreen();
  });
});
