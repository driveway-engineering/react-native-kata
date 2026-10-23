import {
  ActivityIndicator,
  Pressable,
  Text,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { pressScale } from "@styles/animations";
import { colors } from "@styles/colors";
import styles from "./Button.styles";

export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = Omit<PressableProps, "children" | "style"> & {
  children: string;
  /** Applied to the outer container, so layout styles (margins, alignSelf) work as expected. */
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: ButtonVariant;
  /** Shows a spinner and blocks presses while an action is in flight. */
  loading?: boolean;
};

const Button = ({
  accessibilityState,
  children,
  disabled = false,
  loading = false,
  onPressIn,
  onPressOut,
  style,
  textStyle,
  variant = "primary",
  ...props
}: ButtonProps) => {
  const isDisabled = Boolean(disabled) || loading;
  const isSecondary = variant === "secondary";
  const reduceMotion = useReducedMotion();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const animateTo = (value: number) => {
    if (!reduceMotion) {
      scale.set(withSpring(value, { damping: 15, stiffness: 300 }));
    }
  };

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Pressable
        accessibilityLabel={children}
        {...props}
        accessibilityRole="button"
        accessibilityState={{ ...accessibilityState, disabled: isDisabled, busy: loading }}
        disabled={isDisabled}
        onPressIn={(event) => {
          animateTo(pressScale);
          onPressIn?.(event);
        }}
        onPressOut={(event) => {
          animateTo(1);
          onPressOut?.(event);
        }}
        style={({ pressed }) => [
          styles.button,
          isSecondary && styles.secondary,
          (pressed || isDisabled) && styles.dimmed,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={isSecondary ? colors.primaryDark : colors.onPrimary} />
        ) : null}
        <Text style={[styles.text, isSecondary && styles.secondaryText, textStyle]}>{children}</Text>
      </Pressable>
    </Animated.View>
  );
}

export default Button;
