import type { ReactElement, ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  type RefreshControlProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";
import styles from "./Screen.styles";

export type ScreenProps = {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  edges?: Edge[];
  refreshControl?: ReactElement<RefreshControlProps>;
  testID?: string;
};

/**
 * Shared screen shell: respects safe areas, scrolls on small phones, and keeps
 * focused inputs above the keyboard.
 */
const Screen = ({
  children,
  contentContainerStyle,
  edges = ["top", "bottom", "left", "right"],
  refreshControl,
  testID,
}: ScreenProps) => {
  return (
    <SafeAreaView edges={edges} style={styles.safeArea} testID={testID}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={[styles.content, contentContainerStyle]}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          refreshControl={refreshControl}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Screen;
