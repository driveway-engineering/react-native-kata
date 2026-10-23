import { confirmationPageCopy } from "@copy/confirmationPage";
import Card from "@core-components/Card";
import DetailRow from "@core-components/DetailRow";
import { formatAppointmentDate, formatAppointmentTime, formatDuration } from "@utils/format";
import type { ReactNode } from "react";
import { styles } from "./AppointmentSummary.styles";

export type AppointmentSummaryProps = {
  serviceName: string;
  start: string;
  duration: number;
  /** Extra rows, e.g. customer details on the confirmation screen. */
  children?: ReactNode;
};

const { labels } = confirmationPageCopy;

const AppointmentSummary = ({ serviceName, start, duration, children }: AppointmentSummaryProps) => {
  return (
    <Card style={styles.card} testID="appointment-summary">
      <DetailRow label={labels.service} value={serviceName} />
      <DetailRow label={labels.date} value={formatAppointmentDate(start)} />
      <DetailRow label={labels.time} value={formatAppointmentTime(start)} />
      <DetailRow label={labels.duration} value={formatDuration(duration)} />
      {children}
    </Card>
  );
}

export default AppointmentSummary;
