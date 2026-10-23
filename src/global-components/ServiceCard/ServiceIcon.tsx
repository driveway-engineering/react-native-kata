import DetailIcon from "@assets/detail-icon.svg";
import OilChangeIcon from "@assets/oil-change-icon.svg";
import TiresIcon from "@assets/tires-icon.svg";
import type { SvgProps } from "react-native-svg";

export type ServiceIconProps = SvgProps & {
  serviceId: number;
};

const ServiceIcon = ({ serviceId, ...props }: ServiceIconProps) => {
  switch (serviceId) {
    case 1:
      return <OilChangeIcon {...props} />;
    case 4:
      return <DetailIcon {...props} />;
    default:
      // Tire rotation (3). No brake icon was supplied, so brake inspection and
      // any new service fall back to the wheel icon as the closest match.
      return <TiresIcon {...props} />;
  }
}

export default ServiceIcon;
