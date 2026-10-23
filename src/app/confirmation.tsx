import ConfirmationPage from "@global-components/ConfirmationPage";
import { parseConfirmation } from "@utils/routeParams";
import { useLocalSearchParams, useRouter } from "expo-router";

const ConfirmationScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <ConfirmationPage
      confirmation={parseConfirmation(params)}
      onBookAnother={() => router.dismissTo("/services")}
      onDone={() => router.dismissTo("/")}
    />
  );
}

export default ConfirmationScreen;
