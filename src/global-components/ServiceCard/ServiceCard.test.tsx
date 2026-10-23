import { fireEvent, render, screen } from "@testing-library/react-native";
import type { Appointment, Service } from "@utils/types";
import { useState } from "react";
import ServiceCard from "./ServiceCard";

const service: Service = { id: 1, name: "Synthetic Oil Change", duration: 1800 };
const slots: Appointment[] = [
  {
    id: "slot-a",
    serviceId: 1,
    serviceName: service.name,
    start: "2026-10-26T08:30:00.000Z",
    duration: 1800,
    booked: false,
  },
  {
    id: "slot-b",
    serviceId: 1,
    serviceName: service.name,
    start: "2026-10-27T14:00:00.000Z",
    duration: 1800,
    booked: false,
  },
];

// Mirrors how ServicesPage owns the expanded/selected state.
const StatefulCard = ({ onBook }: { onBook: (slot: Appointment) => void }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  return (
    <ServiceCard
      expanded={expanded}
      onBook={onBook}
      onSelectSlot={setSelectedSlotId}
      onToggle={() => setExpanded((value) => !value)}
      selectedSlotId={selectedSlotId}
      service={service}
      slots={slots}
    />
  );
};

describe("ServiceCard", () => {
  it("summarises the service and hides slots until expanded", () => {
    render(<StatefulCard onBook={jest.fn()} />);
    const toggle = screen.getByRole("button", {
      name: "Synthetic Oil Change, 30 min · 2 available appointments",
    });
    expect(toggle).toBeCollapsed();
    expect(screen.queryByRole("radio")).toBeNull();

    fireEvent.press(toggle);
    expect(toggle).toBeExpanded();
    expect(screen.getAllByRole("radio")).toHaveLength(2);
    expect(screen.getByRole("radio", { name: "Monday, October 26 at 8:30 AM" })).toBeOnTheScreen();
  });

  it("only allows booking after a slot is selected", () => {
    const onBook = jest.fn();
    render(<StatefulCard onBook={onBook} />);
    fireEvent.press(screen.getByTestId("service-toggle-1"));

    const bookButton = screen.getByRole("button", { name: "Book Now" });
    expect(bookButton).toBeDisabled();

    fireEvent.press(screen.getByRole("radio", { name: "Tuesday, October 27 at 2:00 PM" }));
    expect(screen.getByRole("radio", { name: "Tuesday, October 27 at 2:00 PM" })).toBeChecked();
    expect(bookButton).toBeEnabled();

    fireEvent.press(bookButton);
    expect(onBook).toHaveBeenCalledWith(slots[1]);
  });
});
