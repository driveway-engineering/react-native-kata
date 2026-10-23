import { bookingPageCopy } from "@copy/bookingPage";
import InlineNotice from "@core-components/InlineNotice";
import Screen from "@core-components/Screen";
import ScreenHeader from "@core-components/ScreenHeader";
import StateMessage from "@core-components/StateMessage";
import AppointmentSummary from "@global-components/AppointmentSummary";
import BookingForm from "@global-components/BookingForm";
import { useBookAppointment } from "@hooks/useBookAppointment";
import { animations } from "@styles/animations";
import { ApiError } from "@utils/apiClient";
import type { SelectedAppointment } from "@utils/routeParams";
import type { BookingConfirmation, BookingRequest } from "@utils/types";
import Animated from "react-native-reanimated";

export type BookingPageProps = {
  appointment: SelectedAppointment | null;
  onBack: () => void;
  onBooked: (confirmation: BookingConfirmation) => void;
};

const isSlotTakenError = (error: Error | null) =>
  error instanceof ApiError && error.isClientError && /already booked/i.test(error.message);

const BookingPage = ({ appointment, onBack, onBooked }: BookingPageProps) => {
  const { mutate, isPending, error } = useBookAppointment();

  if (!appointment) {
    return (
      <Screen>
        <ScreenHeader onBack={onBack} title={bookingPageCopy.heading} />
        <StateMessage
          actionLabel={bookingPageCopy.chooseAppointment}
          message={bookingPageCopy.missingAppointmentMessage}
          onAction={onBack}
          title={bookingPageCopy.missingAppointmentTitle}
        />
      </Screen>
    );
  }

  const handleSubmit = (booking: BookingRequest) => {
    // Navigation only happens on success, so a failed booking can never
    // reach the confirmation screen.
    mutate({ appointmentId: appointment.id, booking }, { onSuccess: (confirmation) => onBooked(confirmation) });
  };

  const slotTaken = isSlotTakenError(error);

  return (
    <Screen testID="booking-page">
      <ScreenHeader onBack={onBack} subtitle={bookingPageCopy.intro} title={bookingPageCopy.heading} />
      <Animated.View entering={animations.enterUp(0)}>
        <AppointmentSummary
          duration={appointment.duration}
          serviceName={appointment.serviceName}
          start={appointment.start}
        />
      </Animated.View>
      {error ? (
        <InlineNotice
          actionLabel={slotTaken ? bookingPageCopy.chooseAnotherTime : undefined}
          message={slotTaken ? bookingPageCopy.slotTakenMessage : error.message}
          onAction={slotTaken ? onBack : undefined}
          testID="booking-error"
          title={bookingPageCopy.submitErrorTitle}
        />
      ) : null}
      <Animated.View entering={animations.enterUp(1)} layout={animations.layout}>
        <BookingForm isSubmitting={isPending} onSubmit={handleSubmit} />
      </Animated.View>
    </Screen>
  );
}

export default BookingPage;
