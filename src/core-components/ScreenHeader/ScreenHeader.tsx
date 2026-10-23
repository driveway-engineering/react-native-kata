import CaretIcon from "@assets/caret-icon.svg";
import { commonCopy } from "@copy/common";
import Typography from "@core-components/Typography";
import { Pressable, View } from "react-native";
import styles from "./ScreenHeader.styles";

export type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
};

const ScreenHeader = ({ title, subtitle, onBack }: ScreenHeaderProps) => {
  return (
    <View style={styles.container}>
      {onBack ? (
        <Pressable
          accessibilityLabel={commonCopy.back}
          accessibilityRole="button"
          hitSlop={8}
          onPress={onBack}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          testID="back-button"
        >
          <CaretIcon height={24} style={styles.backIcon} width={24} />
        </Pressable>
      ) : null}
      <Typography variant="heading">{title}</Typography>
      {subtitle ? (
        <Typography style={styles.subtitle} variant="caption">
          {subtitle}
        </Typography>
      ) : null}
    </View>
  );
}

export default ScreenHeader;
