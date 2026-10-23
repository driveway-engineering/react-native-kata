import { render, screen } from "@testing-library/react-native";
import DetailRow from "./DetailRow";

describe("DetailRow", () => {
  it("combines label and value for screen readers", () => {
    render(<DetailRow label="Service" value="Brake Inspection" />);
    expect(screen.getByLabelText("Service: Brake Inspection")).toBeOnTheScreen();
  });
});
