import { fireEvent, render, screen } from "@testing-library/react-native";
import StateMessage from "./StateMessage";

describe("StateMessage", () => {
  it("shows the message and runs the recovery action", () => {
    const onAction = jest.fn();
    render(
      <StateMessage
        actionLabel="Try again"
        message="Server unavailable"
        onAction={onAction}
        title="We couldn't load services"
        tone="error"
      />,
    );
    expect(screen.getByText("We couldn't load services")).toBeOnTheScreen();
    expect(screen.getByText("Server unavailable")).toBeOnTheScreen();
    fireEvent.press(screen.getByRole("button", { name: "Try again" }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("omits the action when no handler is given", () => {
    render(<StateMessage actionLabel="Refresh" title="Nothing here" />);
    expect(screen.queryByRole("button")).toBeNull();
  });
});
