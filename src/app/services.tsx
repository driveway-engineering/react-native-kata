import ServicesPage from "@global-components/ServicesPage";
import { selectedAppointmentToParams } from "@utils/routeParams";
import { useRouter } from "expo-router";

const ServicesScreen = () => {
  const router = useRouter();
  return (
    <ServicesPage
      onBack={router.canGoBack() ? router.back : undefined}
      onBookSlot={(slot) =>
        router.push({ pathname: "/booking", params: selectedAppointmentToParams(slot) })
      }
    />
  );
}

export default ServicesScreen;
