import { bookAppointment } from "@utils/appointments";
import { queryKeys } from "@utils/queryKeys";
import type { BookingRequest } from "@utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type BookAppointmentVariables = {
  appointmentId: string;
  booking: BookingRequest;
};

export const useBookAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appointmentId, booking }: BookAppointmentVariables) =>
      bookAppointment(appointmentId, booking),
    // Whether it succeeded or the slot was taken, cached availability is now stale.
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.allAppointments }),
  });
};
