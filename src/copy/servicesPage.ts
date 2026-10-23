export const servicesPageCopy = {
  heading: "Select a Service",
  intro: "Choose a service to see available appointments in the next two weeks.",
  loading: "Loading available appointments…",
  loadErrorTitle: "We couldn't load services",
  emptyTitle: "No appointments available",
  emptyMessage: "There are no open appointments in the next two weeks. Please check back later.",
  refresh: "Refresh",
  partialFailure: (serviceNames: string[]) =>
    `We couldn't load availability for ${serviceNames.join(", ")}.`,
  availableAppointments: "Available Appointments",
  appointmentsCount: (count: number) =>
    `${count} available appointment${count === 1 ? "" : "s"}`,
  expandHint: "Shows available appointments",
  collapseHint: "Hides available appointments",
  bookNow: "Book Now",
  selectSlotHint: "Select an appointment time first",
};
