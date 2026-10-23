import { getServiceAppointments } from "@utils/appointments";
import { queryKeys } from "@utils/queryKeys";
import { getServices } from "@utils/services";
import type { Appointment, Service } from "@utils/types";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getUpcomingSlots } from "@utils/availability";

export type ServiceAvailability = {
  service: Service;
  slots: Appointment[];
};

export type ServiceAvailabilityResult = {
  status: "loading" | "error" | "success";
  error: Error | null;
  /** Services that have at least one bookable slot in the next two weeks. */
  availableServices: ServiceAvailability[];
  /** Services whose availability could not be loaded, even after retries. */
  failedServices: Service[];
  isRefreshing: boolean;
  /** Re-requests only what failed. */
  retry: () => void;
  /** Re-requests everything (pull to refresh). */
  refresh: () => void;
};

/**
 * `/services` only returns definitions, so availability is derived by loading
 * each service's appointments in parallel and filtering out past, booked and
 * out-of-window slots on the client.
 */
export const useServiceAvailability = (): ServiceAvailabilityResult => {
  const servicesQuery = useQuery({
    queryKey: queryKeys.services,
    queryFn: ({ signal }) => getServices(signal),
  });
  const services = servicesQuery.data ?? [];

  const appointmentQueries = useQueries({
    queries: services.map((service) => ({
      queryKey: queryKeys.serviceAppointments(service.id),
      queryFn: ({ signal }: { signal: AbortSignal }) => getServiceAppointments(service.id, signal),
    })),
  });

  const now = new Date();
  const availableServices: ServiceAvailability[] = [];
  const failedServices: Service[] = [];
  appointmentQueries.forEach((query, index) => {
    const service = services[index];
    if (query.data) {
      const slots = getUpcomingSlots(query.data, now);
      if (slots.length > 0) {
        availableServices.push({ service, slots });
      }
    } else if (query.isError) {
      failedServices.push(service);
    }
  });

  const isLoading = servicesQuery.isPending || appointmentQueries.some((query) => query.isPending);
  const allAppointmentsFailed =
    services.length > 0 && failedServices.length === services.length;

  let status: ServiceAvailabilityResult["status"] = "success";
  // A failed background refresh keeps showing the cached list rather than an error.
  if ((servicesQuery.isError && !servicesQuery.data) || allAppointmentsFailed) {
    status = "error";
  } else if (isLoading) {
    status = "loading";
  }

  const error =
    servicesQuery.error ?? appointmentQueries.find((query) => query.error)?.error ?? null;

  const isRefreshing =
    !isLoading &&
    (servicesQuery.isRefetching || appointmentQueries.some((query) => query.isRefetching));

  const retry = () => {
    if (servicesQuery.isError && !servicesQuery.data) {
      void servicesQuery.refetch();
      return;
    }
    appointmentQueries.forEach((query) => {
      if (query.isError) {
        void query.refetch();
      }
    });
  };

  const refresh = () => {
    void servicesQuery.refetch();
    appointmentQueries.forEach((query) => void query.refetch());
  };

  return {
    status,
    error,
    availableServices,
    failedServices,
    isRefreshing,
    retry,
    refresh,
  };
};
