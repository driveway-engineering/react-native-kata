import { render, screen } from "@testing-library/react-native";
import Typography from "./Typography";

describe("Typography", () => {
  it("exposes headings to assistive technology", () => {
    render(<Typography variant="heading">Select a Service</Typography>);
    expect(screen.getByRole("header", { name: "Select a Service" })).toBeOnTheScreen();
  });

  it("does not mark body text as a header", () => {
    render(<Typography>Some details</Typography>);
    expect(screen.queryByRole("header")).toBeNull();
    expect(screen.getByText("Some details")).toBeOnTheScreen();
  });
});
