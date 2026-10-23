import Typography from "@core-components/Typography";
import { colors } from "@styles/colors";
import { ActivityIndicator } from "react-native";
import { animations } from "@styles/animations";
import Animated from "react-native-reanimated";
import styles from "./LoadingState.styles";

export type LoadingStateProps = {
  message: string;
};

const LoadingState = ({ message }: LoadingStateProps) => {
  return (
    <Animated.View
      accessibilityLabel={message}
      accessibilityLiveRegion="polite"
      accessibilityRole="progressbar"
      accessible
      entering={animations.fadeIn}
      style={styles.container}
      testID="loading-state"
    >
      <ActivityIndicator color={colors.primary} size="large" />
      <Typography style={styles.message} variant="caption">
        {message}
      </Typography>
    </Animated.View>
  );
}

export default LoadingState;
