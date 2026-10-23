import { commonCopy } from "@copy/common";
import { servicesPageCopy } from "@copy/servicesPage";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { formatAppointmentDateTime } from "@utils/format";
import type { Appointment, Service } from "@utils/types";
import { mockFetch } from "../../../test/mockFetch";
import { renderWithProviders } from "../../../test/renderWithProviders";
import ServicesPage from "./ServicesPage";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
const fromNow = (ms: number) => new Date(Date.now() + ms).toISOString();

const services: Service[] = [
  { id: 1, name: "Synthetic Oil Change", duration: 1800 },
  { id: 2, name: "Brake Inspection", duration: 1800 },
  { id: 3, name: "Tire Rotation & Inspection", duration: 3600 },
];

const slot = (id: string, serviceId: number, start: string, booked = false): Appointment => ({
  id,
  serviceId,
  serviceName: services.find((service) => service.id === serviceId)!.name,
  start,
  duration: 1800,
  booked,
});

const oilSlots = [
  slot("oil-later", 1, fromNow(3 * DAY)),
  slot("oil-past", 1, fromNow(-HOUR)),
  slot("oil-soon", 1, fromNow(DAY)),
];
// Brake only has slots that aren't bookable, so it must not be listed.
const brakeSlots = [slot("brake-past", 2, fromNow(-DAY)), slot("brake-far", 2, fromNow(20 * DAY))];
const tireSlots = [slot("tire-1", 3, fromNow(2 * DAY))];

const serverError = () => ({ status: 500, body: "Unable to load appointments. Please try again." });

describe("ServicesPage", () => {
  it("lists only services with bookable slots in the next two weeks", async () => {
    mockFetch({
      "GET /services": () => ({ body: services }),
      "GET /appointments/1": () => ({ body: oilSlots }),
      "GET /appointments/2": () => ({ body: brakeSlots }),
      "GET /appointments/3": () => ({ body: tireSlots }),
    });
    renderWithProviders(<ServicesPage onBookSlot={jest.fn()} />);

    expect(screen.getByRole("progressbar", { name: servicesPageCopy.loading })).toBeOnTheScreen();
    expect(await screen.findByText("Synthetic Oil Change")).toBeOnTheScreen();
    expect(screen.getByText("Tire Rotation & Inspection")).toBeOnTheScreen();
    expect(screen.queryByText("Brake Inspection")).toBeNull();
    expect(screen.getByText(/2 available appointments/)).toBeOnTheScreen();
  });

  it("lets the user pick a sorted, upcoming slot and book it", async () => {
    mockFetch({
      "GET /services": () => ({ body: services.slice(0, 1) }),
      "GET /appointments/1": () => ({ body: oilSlots }),
    });
    const onBookSlot = jest.fn();
    renderWithProviders(<ServicesPage onBookSlot={onBookSlot} />);

    fireEvent.press(await screen.findByTestId("service-toggle-1"));
    const radios = screen.getAllByRole("radio");
    expect(radios.map((radio) => radio.props.accessibilityLabel)).toEqual([
      formatAppointmentDateTime(oilSlots[2].start),
      formatAppointmentDateTime(oilSlots[0].start),
    ]);

    fireEvent.press(radios[1]);
    fireEvent.press(screen.getByRole("button", { name: servicesPageCopy.bookNow }));
    expect(onBookSlot).toHaveBeenCalledWith(oilSlots[0]);
  });

  it("shows an empty state when no service has availability", async () => {
    mockFetch({
      "GET /services": () => ({ body: services.slice(1, 2) }),
      "GET /appointments/2": () => ({ body: brakeSlots }),
    });
    renderWithProviders(<ServicesPage onBookSlot={jest.fn()} />);
    expect(await screen.findByText(servicesPageCopy.emptyTitle)).toBeOnTheScreen();
  });

  it("recovers when the services request fails", async () => {
    mockFetch({
      "GET /services": [() => ({ status: 500, body: "Server down" }), () => ({ body: services.slice(0, 1) })],
      "GET /appointments/1": () => ({ body: oilSlots }),
    });
    renderWithProviders(<ServicesPage onBookSlot={jest.fn()} />);

    expect(await screen.findByText(servicesPageCopy.loadErrorTitle)).toBeOnTheScreen();
    expect(screen.getByText("Server down")).toBeOnTheScreen();

    fireEvent.press(screen.getByRole("button", { name: commonCopy.retry }));
    expect(await screen.findByText("Synthetic Oil Change")).toBeOnTheScreen();
    expect(screen.queryByText(servicesPageCopy.loadErrorTitle)).toBeNull();
  });

  it("keeps working services usable and retries only the failed ones", async () => {
    const fetchMock = mockFetch({
      "GET /services": () => ({ body: services }),
      "GET /appointments/1": () => ({ body: oilSlots }),
      "GET /appointments/2": () => ({ body: brakeSlots }),
      "GET /appointments/3": [serverError, () => ({ body: tireSlots })],
    });
    renderWithProviders(<ServicesPage onBookSlot={jest.fn()} />);

    expect(await screen.findByText("Synthetic Oil Change")).toBeOnTheScreen();
    expect(
      screen.getByText(servicesPageCopy.partialFailure(["Tire Rotation & Inspection"])),
    ).toBeOnTheScreen();
    expect(screen.queryByText("Tire Rotation & Inspection")).toBeNull();

    fireEvent.press(screen.getByRole("button", { name: commonCopy.retry }));
    expect(await screen.findByText("Tire Rotation & Inspection")).toBeOnTheScreen();
    expect(screen.queryByTestId("services-partial-error")).toBeNull();

    const requested = fetchMock.mock.calls.map(([url]) => String(url));
    expect(requested.filter((url) => url.endsWith("/appointments/1"))).toHaveLength(1);
    expect(requested.filter((url) => url.endsWith("/appointments/3"))).toHaveLength(2);
  });

  it("shows a full error when no availability could be loaded", async () => {
    mockFetch({
      "GET /services": () => ({ body: services.slice(0, 1) }),
      "GET /appointments/1": serverError,
    });
    renderWithProviders(<ServicesPage onBookSlot={jest.fn()} />);

    expect(await screen.findByText(servicesPageCopy.loadErrorTitle)).toBeOnTheScreen();
    expect(screen.getByText("Unable to load appointments. Please try again.")).toBeOnTheScreen();
  });

  it("calls onBack from the header", async () => {
    mockFetch({ "GET /services": () => ({ body: [] }) });
    const onBack = jest.fn();
    renderWithProviders(<ServicesPage onBack={onBack} onBookSlot={jest.fn()} />);
    await waitFor(() => expect(screen.getByText(servicesPageCopy.emptyTitle)).toBeOnTheScreen());
    fireEvent.press(screen.getByRole("button", { name: commonCopy.back }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
