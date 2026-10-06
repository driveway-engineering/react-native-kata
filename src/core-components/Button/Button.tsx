import {
  Pressable,
  Text,
  type PressableProps,
  type StyleProp,
  type TextStyle,
} from "react-native";
import styles from "./Button.styles";

export type ButtonProps = Omit<PressableProps, "children"> & {
  children: string;
  textStyle?: StyleProp<TextStyle>;
};

const Button = ({
  accessibilityState,
  children,
  disabled = false,
  style,
  textStyle,
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityState={{ ...accessibilityState, disabled: Boolean(disabled) }}
      disabled={disabled}
      style={(state) => [
        styles.button,
        (state.pressed || disabled) && styles.dimmed,
        typeof style === "function" ? style(state) : style,
      ]}
    >
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </Pressable>
  );
}



export default Button;
