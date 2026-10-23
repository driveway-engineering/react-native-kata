import { View, type ViewProps } from "react-native";
import styles from "./Card.styles";

const Card = ({ style, ...props }: ViewProps) => {
  return <View {...props} style={[styles.card, style]} />;
}

export default Card;
