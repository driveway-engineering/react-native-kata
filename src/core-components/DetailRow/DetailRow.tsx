import Typography from "@core-components/Typography";
import { View } from "react-native";
import styles from "./DetailRow.styles";

export type DetailRowProps = {
  label: string;
  value: string;
  testID?: string;
};

/** Label/value pair, read by screen readers as one item. */
const DetailRow = ({ label, value, testID }: DetailRowProps) => {
  return (
    <View accessibilityLabel={`${label}: ${value}`} accessible style={styles.row} testID={testID}>
      <Typography variant="caption">{label}</Typography>
      <Typography variant="subtitle">{value}</Typography>
    </View>
  );
}

export default DetailRow;
