import { commonCopy } from "@copy/common";
import { servicesPageCopy } from "@copy/servicesPage";
import InlineNotice from "@core-components/InlineNotice";
import LoadingState from "@core-components/LoadingState";
import Screen from "@core-components/Screen";
import ScreenHeader from "@core-components/ScreenHeader";
import StateMessage from "@core-components/StateMessage";
import ServiceCard from "@global-components/ServiceCard";
import { useServiceAvailability } from "@hooks/useServiceAvailability";
import { colors } from "@styles/colors";
import type { Appointment } from "@utils/types";
import { useState } from "react";
import { RefreshControl, View } from "react-native";
import { styles } from "./ServicesPage.styles";

export type ServicesPageProps = {
  onBack?: () => void;
  onBookSlot: (slot: Appointment) => void;
};

const ServicesPage = ({ onBack, onBookSlot }: ServicesPageProps) => {
  const { status, error, availableServices, failedServices, isRefreshing, retry, refresh } =
    useServiceAvailability();
  const [expandedServiceId, setExpandedServiceId] = useState<number | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const toggleService = (serviceId: number) => {
    setExpandedServiceId((current) => (current === serviceId ? null : serviceId));
    setSelectedSlotId(null);
  };

  const renderContent = () => {
    if (status === "loading") {
      return <LoadingState message={servicesPageCopy.loading} />;
    }

    if (status === "error") {
      return (
        <StateMessage
          actionLabel={commonCopy.retry}
          message={error?.message}
          onAction={retry}
          testID="services-error"
          title={servicesPageCopy.loadErrorTitle}
          tone="error"
        />
      );
    }

    return (
      <>
        {failedServices.length > 0 ? (
          <InlineNotice
            actionLabel={commonCopy.retry}
            actionLoading={isRefreshing}
            message={servicesPageCopy.partialFailure(failedServices.map((service) => service.name))}
            onAction={retry}
            testID="services-partial-error"
          />
        ) : null}

        {availableServices.length === 0 && failedServices.length === 0 ? (
          <StateMessage
            actionLabel={servicesPageCopy.refresh}
            message={servicesPageCopy.emptyMessage}
            onAction={refresh}
            testID="services-empty"
            title={servicesPageCopy.emptyTitle}
          />
        ) : (
          <View style={styles.list}>
            {availableServices.map(({ service, slots }, index) => (
              <ServiceCard
                expanded={expandedServiceId === service.id}
                index={index}
                key={service.id}
                onBook={onBookSlot}
                onSelectSlot={setSelectedSlotId}
                onToggle={() => toggleService(service.id)}
                selectedSlotId={selectedSlotId}
                service={service}
                slots={slots}
              />
            ))}
          </View>
        )}
      </>
    );
  };

  return (
    <Screen
      refreshControl={
        <RefreshControl
          colors={[colors.primary]}
          onRefresh={refresh}
          refreshing={isRefreshing}
          tintColor={colors.primary}
        />
      }
      testID="services-page"
    >
      <ScreenHeader
        onBack={onBack}
        subtitle={servicesPageCopy.intro}
        title={servicesPageCopy.heading}
      />
      {renderContent()}
    </Screen>
  );
}

export default ServicesPage;
