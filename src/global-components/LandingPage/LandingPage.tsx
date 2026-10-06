import { landingPageCopy } from "@copy/landingPage";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./LandingPage.styles";

const LandingPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text accessibilityRole="header" style={styles.heading}>
        {landingPageCopy.heading}
      </Text>
      {/* TODO: add logo here */}
    </SafeAreaView>
  );
}

export default LandingPage;
