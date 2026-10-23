import logo from "@assets/logo.png";
import { landingPageCopy } from "@copy/landingPage";
import Button from "@core-components/Button";
import Screen from "@core-components/Screen";
import TextLink from "@core-components/TextLink";
import Typography from "@core-components/Typography";
import { animations } from "@styles/animations";
import Animated from "react-native-reanimated";
import { styles } from "./LandingPage.styles";

export type LandingPageProps = {
  onGetStarted: () => void;
};

const telHref = `tel:${landingPageCopy.supportPhone.replace(/\D/g, "")}`;
const mailHref = `mailto:${landingPageCopy.supportEmail}`;

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <Screen contentContainerStyle={styles.content} testID="landing-page">
      <Animated.View entering={animations.enterUp(0)}>
        <Typography variant="heading">{landingPageCopy.heading}</Typography>
      </Animated.View>
      <Animated.Image
        accessibilityLabel={landingPageCopy.logoLabel}
        accessible
        entering={animations.enterUp(1)}
        resizeMode="contain"
        source={logo}
        style={styles.logo}
        testID="landing-logo"
      />
      <Animated.View entering={animations.enterUp(2)}>
        <Typography style={styles.intro}>{landingPageCopy.intro}</Typography>
      </Animated.View>
      <Animated.View entering={animations.enterUp(3)}>
        <Button onPress={onGetStarted} testID="get-started-button">
          {landingPageCopy.getStarted}
        </Button>
      </Animated.View>
      <Animated.View entering={animations.enterUp(4)} style={styles.support}>
        <Typography variant="label">{landingPageCopy.supportHeading}</Typography>
        <TextLink
          accessibilityHint={landingPageCopy.supportEmailHint}
          href={mailHref}
          style={styles.supportLink}
        >
          {landingPageCopy.supportEmail}
        </TextLink>
        <TextLink
          accessibilityHint={landingPageCopy.supportPhoneHint}
          href={telHref}
          style={styles.supportLink}
        >
          {landingPageCopy.supportPhone}
        </TextLink>
      </Animated.View>
    </Screen>
  );
}

export default LandingPage;
