import Typography from "@core-components/Typography";
import { animations } from "@styles/animations";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";
import styles from "./RadioOption.styles";

export type RadioOptionProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
  testID?: string;
};

const RadioOption = ({ label, selected, onSelect, testID }: RadioOptionProps) => {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      onPress={onSelect}
      style={({ pressed }) => [styles.option, selected && styles.selected, pressed && styles.pressed]}
      testID={testID}
    >
      <View style={styles.circle}>{selected ? <Animated.View entering={animations.scaleIn} style={styles.dot} /> : null}</View>
      <Typography style={styles.label}>{label}</Typography>
    </Pressable>
  );
}

export default RadioOption;
