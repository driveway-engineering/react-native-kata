import Typography from "@core-components/Typography";
import { animations } from "@styles/animations";
import { colors } from "@styles/colors";
import { useState, type Ref } from "react";
import { TextInput, View, type TextInputProps } from "react-native";
import Animated from "react-native-reanimated";
import styles from "./TextField.styles";

export type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
  ref?: Ref<TextInput>;
};

const TextField = ({ label, error, style, onBlur, onFocus, ref, ...props }: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Typography importantForAccessibility="no" variant="label">
        {label}
      </Typography>
      <TextInput
        accessibilityHint={error}
        accessibilityLabel={label}
        aria-invalid={Boolean(error)}
        placeholderTextColor={colors.textMuted}
        {...props}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        ref={ref}
        style={[styles.input, isFocused && styles.inputFocused, error && styles.inputError, style]}
      />
      {error ? (
        <Animated.View entering={animations.fadeIn} exiting={animations.fadeOut}>
          <Typography accessibilityLiveRegion="polite" style={styles.error} variant="caption">
            {error}
          </Typography>
        </Animated.View>
      ) : null}
    </View>
  );
}

export default TextField;
