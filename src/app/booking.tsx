import BookingPage from "@global-components/BookingPage";
import { confirmationToParams, parseSelectedAppointment } from "@utils/routeParams";
import { useLocalSearchParams, useRouter } from "expo-router";

const BookingScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const goBack = () => (router.canGoBack() ? router.back() : router.replace("/services"));

  return (
    <BookingPage
      appointment={parseSelectedAppointment(params)}
      onBack={goBack}
      // Replace so "back" from the confirmation can't resubmit the booking form.
      onBooked={(confirmation) =>
        router.replace({ pathname: "/confirmation", params: confirmationToParams(confirmation) })
      }
    />
  );
}

export default BookingScreen;
