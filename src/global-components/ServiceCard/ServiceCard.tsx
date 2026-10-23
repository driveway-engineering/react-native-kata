import CaretIcon from "@assets/caret-icon.svg";
import { servicesPageCopy } from "@copy/servicesPage";
import Button from "@core-components/Button";
import Card from "@core-components/Card";
import RadioOption from "@core-components/RadioOption";
import Typography from "@core-components/Typography";
import { animations, durations } from "@styles/animations";
import { formatAppointmentDateTime, formatDuration } from "@utils/format";
import type { Appointment, Service } from "@utils/types";
import { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { styles } from "./ServiceCard.styles";
import ServiceIcon from "./ServiceIcon";

export type ServiceCardProps = {
  service: Service;
  /** Position in the list, used to stagger the entrance animation. */
  index?: number;
  slots: Appointment[];
  expanded: boolean;
  onToggle: () => void;
  selectedSlotId: string | null;
  onSelectSlot: (slotId: string) => void;
  onBook: (slot: Appointment) => void;
};

const ServiceCard = ({
  service,
  index = 0,
  slots,
  expanded,
  onToggle,
  selectedSlotId,
  onSelectSlot,
  onBook,
}: ServiceCardProps) => {
  const caretRotation = useSharedValue(expanded ? 180 : 0);
  const caretStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${caretRotation.value}deg` }],
  }));

  useEffect(() => {
    caretRotation.set(
      withTiming(expanded ? 180 : 0, {
        duration: durations.normal,
        reduceMotion: ReduceMotion.System,
      }),
    );
  }, [caretRotation, expanded]);

  const selectedSlot = slots.find((slot) => slot.id === selectedSlotId);
  const summary = `${formatDuration(service.duration)} · ${servicesPageCopy.appointmentsCount(slots.length)}`;

  return (
    <Animated.View entering={animations.enterUp(index)} layout={animations.layout}>
      <Card style={styles.card} testID={`service-card-${service.id}`}>
        <Pressable
          accessibilityHint={expanded ? servicesPageCopy.collapseHint : servicesPageCopy.expandHint}
          accessibilityLabel={`${service.name}, ${summary}`}
          accessibilityRole="button"
          accessibilityState={{ expanded }}
          onPress={onToggle}
          style={({ pressed }) => [styles.header, pressed && styles.pressed]}
          testID={`service-toggle-${service.id}`}
        >
          <ServiceIcon height={48} serviceId={service.id} width={48} />
          <View style={styles.headerText}>
            <Typography style={styles.name} variant="title">
              {service.name}
            </Typography>
            <Typography variant="caption">{summary}</Typography>
          </View>
          <Animated.View style={caretStyle}>
            <CaretIcon height={24} width={24} />
          </Animated.View>
        </Pressable>

        {expanded ? (
          <Animated.View entering={animations.fadeIn} exiting={animations.fadeOut} style={styles.body}>
            <Typography variant="label">{servicesPageCopy.availableAppointments}</Typography>
            <View accessibilityRole="radiogroup" style={styles.slots}>
              {slots.map((slot, index) => (
                <RadioOption
                  key={slot.id}
                  label={formatAppointmentDateTime(slot.start)}
                  onSelect={() => onSelectSlot(slot.id)}
                  selected={slot.id === selectedSlotId}
                  testID={`slot-option-${index}`}
                />
              ))}
            </View>
            <Button
              accessibilityHint={selectedSlot ? undefined : servicesPageCopy.selectSlotHint}
              disabled={!selectedSlot}
              onPress={() => selectedSlot && onBook(selectedSlot)}
              style={styles.bookButton}
              testID="book-now-button"
            >
              {servicesPageCopy.bookNow}
            </Button>
          </Animated.View>
        ) : null}
      </Card>
    </Animated.View>
  );
}

export default ServiceCard;
