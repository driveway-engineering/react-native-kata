import Button from "@core-components/Button";
import Typography from "@core-components/Typography";
import { View } from "react-native";
import { animations } from "@styles/animations";
import Animated from "react-native-reanimated";
import styles from "./InlineNotice.styles";

export type InlineNoticeProps = {
  message: string;
  title?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionLoading?: boolean;
  testID?: string;
};

/** Compact error banner shown alongside content that is still usable. */
const InlineNotice = ({
  message,
  title,
  actionLabel,
  onAction,
  actionLoading,
  testID,
}: InlineNoticeProps) => {
  return (
    <Animated.View
      entering={animations.fadeIn}
      exiting={animations.fadeOut}
      style={styles.container}
      testID={testID}
    >
      <View accessibilityLiveRegion="assertive" accessibilityRole="alert" accessible>
        {title ? (
          <Typography style={styles.title} variant="label">
            {title}
          </Typography>
        ) : null}
        <Typography>{message}</Typography>
      </View>
      {actionLabel && onAction ? (
        <Button
          loading={actionLoading}
          onPress={onAction}
          style={styles.action}
          variant="secondary"
        >
          {actionLabel}
        </Button>
      ) : null}
    </Animated.View>
  );
}

export default InlineNotice;
