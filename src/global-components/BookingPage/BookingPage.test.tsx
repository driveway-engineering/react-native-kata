import { bookingPageCopy } from "@copy/bookingPage";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { queryKeys } from "@utils/queryKeys";
import { mockFetch } from "../../../test/mockFetch";
import { renderWithProviders } from "../../../test/renderWithProviders";
import BookingPage from "./BookingPage";

const appointment = {
  id: "slot-1",
  serviceName: "Synthetic Oil Change",
  start: "2026-10-26T08:30:00.000Z",
  duration: 1800,
};

const booking = {
  customerName: "Jane Doe",
  email: "jane@example.com",
  modelYear: 2020,
  make: "Mazda",
  model: "Miata",
};

const confirmation = { ...appointment, booked: true, ...booking };

const fillAndSubmit = () => {
  const { labels } = bookingPageCopy;
  fireEvent.changeText(screen.getByLabelText(labels.customerName), booking.customerName);
  fireEvent.changeText(screen.getByLabelText(labels.email), booking.email);
  fireEvent.changeText(screen.getByLabelText(labels.modelYear), String(booking.modelYear));
  fireEvent.changeText(screen.getByLabelText(labels.make), booking.make);
  fireEvent.changeText(screen.getByLabelText(labels.model), booking.model);
  fireEvent.press(screen.getByRole("button", { name: bookingPageCopy.submit }));
};

const renderPage = (props: Partial<Parameters<typeof BookingPage>[0]> = {}) => {
  const handlers = { onBack: jest.fn(), onBooked: jest.fn() };
  const result = renderWithProviders(
    <BookingPage appointment={appointment} {...handlers} {...props} />,
  );
  return { ...result, ...handlers };
};

describe("BookingPage", () => {
  it("shows the selected appointment", () => {
    renderPage();
    expect(screen.getByLabelText("Service: Synthetic Oil Change")).toBeOnTheScreen();
    expect(screen.getByLabelText("Time: 8:30 AM")).toBeOnTheScreen();
  });

  it("books the slot and hands back the API confirmation", async () => {
    const fetchMock = mockFetch({
      "PATCH /appointments/book/slot-1": () => ({ body: confirmation }),
    });
    const { onBooked, queryClient } = renderPage();
    const invalidate = jest.spyOn(queryClient, "invalidateQueries");

    fillAndSubmit();

    await waitFor(() => expect(onBooked).toHaveBeenCalledWith(confirmation));
    expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body))).toEqual(booking);
    expect(invalidate).toHaveBeenCalledWith({ queryKey: queryKeys.allAppointments });
  });

  it("does not call the API when the form is invalid", () => {
    const fetchMock = mockFetch({});
    renderPage();
    fireEvent.press(screen.getByRole("button", { name: bookingPageCopy.submit }));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows the API error, never confirms, and lets the user retry", async () => {
    mockFetch({
      "PATCH /appointments/book/slot-1": [
        () => ({ status: 400, body: "invalid make/model/modelYear" }),
        () => ({ body: confirmation }),
      ],
    });
    const { onBooked } = renderPage();

    fillAndSubmit();

    expect(await screen.findByText(bookingPageCopy.submitErrorTitle)).toBeOnTheScreen();
    expect(screen.getByText("invalid make/model/modelYear")).toBeOnTheScreen();
    expect(onBooked).not.toHaveBeenCalled();

    // Form values are kept, so retrying is a single tap.
    fireEvent.press(screen.getByRole("button", { name: bookingPageCopy.submit }));
    await waitFor(() => expect(onBooked).toHaveBeenCalledWith(confirmation));
  });

  it("explains when the slot was taken and offers another time", async () => {
    mockFetch({
      "PATCH /appointments/book/slot-1": () => ({
        status: 400,
        body: "This appointment is already booked.",
      }),
    });
    const { onBack, onBooked } = renderPage();

    fillAndSubmit();

    expect(await screen.findByText(bookingPageCopy.slotTakenMessage)).toBeOnTheScreen();
    fireEvent.press(screen.getByRole("button", { name: bookingPageCopy.chooseAnotherTime }));
    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onBooked).not.toHaveBeenCalled();
  });

  it("handles a missing appointment selection", () => {
    const { onBack } = renderPage({ appointment: null });
    expect(screen.getByText(bookingPageCopy.missingAppointmentTitle)).toBeOnTheScreen();
    expect(screen.queryByRole("button", { name: bookingPageCopy.submit })).toBeNull();
    fireEvent.press(screen.getByRole("button", { name: bookingPageCopy.chooseAppointment }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
