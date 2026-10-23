import SuccessIcon from "@assets/success-icon.svg";
import { confirmationPageCopy } from "@copy/confirmationPage";
import Button from "@core-components/Button";
import DetailRow from "@core-components/DetailRow";
import Screen from "@core-components/Screen";
import ScreenHeader from "@core-components/ScreenHeader";
import StateMessage from "@core-components/StateMessage";
import AppointmentSummary from "@global-components/AppointmentSummary";
import { animations } from "@styles/animations";
import type { BookingConfirmation } from "@utils/types";
import Animated from "react-native-reanimated";
import { styles } from "./ConfirmationPage.styles";

export type ConfirmationPageProps = {
  confirmation: BookingConfirmation | null;
  onDone: () => void;
  onBookAnother: () => void;
};

const { labels } = confirmationPageCopy;

const ConfirmationPage = ({ confirmation, onDone, onBookAnother }: ConfirmationPageProps) => {
  if (!confirmation) {
    return (
      <Screen>
        <StateMessage
          actionLabel={confirmationPageCopy.done}
          message={confirmationPageCopy.missingMessage}
          onAction={onDone}
          title={confirmationPageCopy.missingTitle}
        />
      </Screen>
    );
  }

  const vehicle = `${confirmation.modelYear} ${confirmation.make} ${confirmation.model}`;

  return (
    <Screen testID="confirmation-page">
      <Animated.View
        accessibilityElementsHidden
        entering={animations.pop}
        importantForAccessibility="no-hide-descendants"
        style={styles.badge}
      >
        <SuccessIcon height={48} width={48} />
      </Animated.View>
      <Animated.View entering={animations.enterUp(1)}>
        <ScreenHeader subtitle={confirmationPageCopy.intro} title={confirmationPageCopy.heading} />
      </Animated.View>
      {/* Every value below comes from the API response, not the submitted form. */}
      <Animated.View entering={animations.enterUp(2)}>
        <AppointmentSummary
          duration={confirmation.duration}
          serviceName={confirmation.serviceName}
          start={confirmation.start}
        >
          <DetailRow label={labels.name} value={confirmation.customerName} />
          <DetailRow label={labels.email} value={confirmation.email} />
          <DetailRow label={labels.vehicle} value={vehicle} />
          <DetailRow label={labels.confirmation} value={confirmation.id} />
        </AppointmentSummary>
      </Animated.View>
      <Animated.View entering={animations.enterUp(3)} style={styles.actions}>
        <Button onPress={onDone} testID="confirmation-done-button">
          {confirmationPageCopy.done}
        </Button>
        <Button onPress={onBookAnother} variant="secondary">
          {confirmationPageCopy.bookAnother}
        </Button>
      </Animated.View>
    </Screen>
  );
}

export default ConfirmationPage;
