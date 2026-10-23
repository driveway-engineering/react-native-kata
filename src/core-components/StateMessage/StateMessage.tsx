import Button from "@core-components/Button";
import Typography from "@core-components/Typography";
import { View } from "react-native";
import { animations } from "@styles/animations";
import Animated from "react-native-reanimated";
import styles from "./StateMessage.styles";

export type StateMessageProps = {
  title: string;
  message?: string;
  tone?: "info" | "error";
  actionLabel?: string;
  onAction?: () => void;
  testID?: string;
};

/** Full-area message for empty and error states, with an optional recovery action. */
const StateMessage = ({
  title,
  message,
  tone = "info",
  actionLabel,
  onAction,
  testID,
}: StateMessageProps) => {
  return (
    <Animated.View entering={animations.fadeIn} style={styles.container} testID={testID}>
      <View accessibilityLiveRegion="polite" accessible>
        <Typography
          accessibilityRole={tone === "error" ? "alert" : "header"}
          style={[styles.text, tone === "error" && styles.errorTitle]}
          variant="title"
        >
          {title}
        </Typography>
        {message ? <Typography style={styles.text}>{message}</Typography> : null}
      </View>
      {actionLabel && onAction ? (
        <Button onPress={onAction} style={styles.action}>
          {actionLabel}
        </Button>
      ) : null}
    </Animated.View>
  );
}

export default StateMessage;
